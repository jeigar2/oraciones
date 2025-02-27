// Array para mantener referencia a los audios activos
let activeAudios = [];
let ultimoParrafoMostrado = null;

// Modificamos la función playAudio para verificar si el audio está habilitado
function playAudio(id) {
    // Verificar si el audio está habilitado
    const audioEnabled = document.getElementById('audioEnabled').checked;
    if (!audioEnabled || !id) return;

    // Detener cualquier audio que esté reproduciéndose
    stopAllAudios();

    const oracion = audioData.oraciones.find(o => o.id === id);
    if (!oracion) return;

    let currentAudioIndex = 0;

    function playNextAudio() {
        if (currentAudioIndex < oracion.sonidos.length) {
            const audio = new Audio(`audios/${oracion.sonidos[currentAudioIndex]}`);

            // Agregamos el audio al array de audios activos
            activeAudios.push(audio);

            // Cuando termine el audio actual, reproducir el siguiente
            audio.onended = () => {
                // Removemos el audio del array cuando termina
                const index = activeAudios.indexOf(audio);
                if (index > -1) {
                    activeAudios.splice(index, 1);
                }
                currentAudioIndex++;
                playNextAudio();
            };

            audio.play();
        }
    }

    // Comenzar la reproducción secuencial
    playNextAudio();
}

// Modificamos la función stopAllAudios para verificar si hay audios activos
function stopAllAudios() {
    if (activeAudios.length > 0) {
        activeAudios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        activeAudios = [];
    }
}

// Función para obtener el audio correspondiente según el texto
function getAudioFile(text) {
    const textLower = text.toLowerCase();
    const oracion = audioData.oraciones.find(o => textLower.includes(o.texto.toLowerCase()));
    if (oracion) {
        // Por ahora retornamos el primer sonido, podríamos alternar entre las partes
        return oracion.sonidos[0];
    }
    return null; // sin audio
}

let audioQueue = [];
let isPlaying = false;

// Función para reproducir la cola de audio
async function playAudioQueue() {
    if (!isPlaying || audioQueue.length === 0) return;

    const audioFile = audioQueue.shift();
    const audio = new Audio(audioFile);

    audio.onended = () => {
        if (isPlaying && audioQueue.length > 0) {
            playAudioQueue();
        } else {
            isPlaying = false;
        }
    };

    try {
        await audio.play();
    } catch (error) {
        console.error('Error reproduciendo audio:', error);
        isPlaying = false;
    }
}

// Función para detener la reproducción
function stopAudioQueue() {
    isPlaying = false;
    audioQueue = [];
}

// Añadir event listener para las teclas
document.addEventListener('keydown', function (event) {
    const autoplayEnabled = document.getElementById('autoplayEnabled').checked;
    const audioEnabled = document.getElementById('audioEnabled').checked;
    const parrafos = document.querySelectorAll('p');
    const parrafosVisibles = Array.from(parrafos).filter(p => p.style.display !== 'none');
    const primerParrafoVisible = parrafosVisibles[0];

    // Detener reproducción con ESC
    if (event.key === 'Escape') {
        stopAudioQueue();
        return;
    }

    // Espacio o flecha abajo
    if (event.code === 'Space' || event.code === 'ArrowDown') {
        event.preventDefault(); // Prevenir scroll

        // Si está activa la reproducción automática
        if (autoplayEnabled && audioEnabled) {
            // Recopilar todos los audios restantes
            audioQueue = [];
            let collecting = false;

            parrafosVisibles.forEach(p => {
                if (!collecting && p === ultimoParrafoMostrado) {
                    collecting = true;
                }
                if (collecting) {
                    const audioFile = getAudioFile(p.textContent);
                    if (audioFile) {
                        audioQueue.push(audioFile);
                    }
                }
            });

            if (!isPlaying && audioQueue.length > 0) {
                isPlaying = true;
                playAudioQueue();
            }
        }

        if (!ultimoParrafoMostrado && primerParrafoVisible) {
            // Primera pulsación: simular mouseenter
            const mouseEnterEvent = new MouseEvent('mouseenter');
            primerParrafoVisible.dispatchEvent(mouseEnterEvent);
            ultimoParrafoMostrado = primerParrafoVisible;
        }
        else if (ultimoParrafoMostrado) {
            // Segunda pulsación: simular click, mouseout y mouseenter del siguiente
            const clickEvent = new MouseEvent('click');
            const mouseOutEvent = new MouseEvent('mouseout');
            ultimoParrafoMostrado.dispatchEvent(clickEvent);
            ultimoParrafoMostrado.dispatchEvent(mouseOutEvent);

            const siguienteParrafo = parrafosVisibles[1];
            if (siguienteParrafo) {
                const mouseEnterEvent = new MouseEvent('mouseenter');
                siguienteParrafo.dispatchEvent(mouseEnterEvent);
                ultimoParrafoMostrado = siguienteParrafo;
            } else {
                ultimoParrafoMostrado = null;
            }
        }
    }
});
