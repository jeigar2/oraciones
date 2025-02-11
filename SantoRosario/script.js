// Tomada las meditaciones por formulario de esta 
// url https://contemplativos.com/espiritualidad/oracion/el-rosario-meditado/
const formularios = {
  1: formulario1,
  2: formulario2,
  3: formulario3
};

// obtener el formulario actual desde un valor aleatorio
let formularioActual = Math.floor(Math.random() * 3) + 1;

// mostrar traza con el formulario actual
traza("Formulario actual: " + formularioActual);

// Variable global para el estado de las imágenes alternativas
let usarImagenesAlternativas = false;

function mostrarMisterio(diaId, numeroMisterio) {
    traza("Mostrando misterio " + numeroMisterio + " del día " + diaId);
    
    // Remover cualquier capa flotante existente
    const capaExistente = document.querySelector('.capa-flotante');
    if (capaExistente) {
        capaExistente.remove();
    }
    
    // Mapear el ID del día al nombre del día y tipo de misterio
    const mapaDias = {
        'L': { nombre: 'Lunes', tipo: 'Gozoso' },
        'M': { nombre: 'Martes', tipo: 'Doloroso' },
        'X': { nombre: 'Miercoles', tipo: 'Glorioso' },
        'J': { nombre: 'Jueves', tipo: 'Luminoso' },
        'V': { nombre: 'Viernes', tipo: 'Doloroso' },
        'S': { nombre: 'Sabado', tipo: 'Gozoso' },
        'D': { nombre: 'Domingo', tipo: 'Glorioso' }
    };
    
    const { nombre: dia, tipo } = mapaDias[diaId];
    const misterio = formularios[formularioActual][dia].misterios[numeroMisterio - 1];
    const imagen = formularios[formularioActual][dia].imagen;
    let imagenesSantoRosario = null;
    
    // Separar autor y obra
    const [autor, obra] = imagen.autor_obra.split(',').map(s => s.trim());
    
    // Función para cambiar la imagen
    function cambiarImagen(useAlternativa) {
        const imgElement = capaFlotante.querySelector('.imagen-container img');
        const autorElement = capaFlotante.querySelector('.autor');
        const obraElement = capaFlotante.querySelector('.obra');
        const notaElement = capaFlotante.querySelector('.nota');
        
        if (useAlternativa && imagenesSantoRosario) {
            const imagenAlternativa = imagenesSantoRosario[0][numeroMisterio - 1];
            traza("Usando imagen alternativa: " + imagenAlternativa.url + " - " + imagenAlternativa.nota);
            imgElement.src = imagenAlternativa.url;
            autorElement.textContent = imagenAlternativa.autor || '';
            obraElement.textContent = imagenAlternativa.titulo || '';
            if (imagenAlternativa.nota) {
                if (!notaElement) {
                    const p = document.createElement('p');
                    p.className = 'nota';
                    p.textContent = imagenAlternativa.nota;
                    imgElement.parentElement.appendChild(p);
                } else {
                    notaElement.textContent = imagenAlternativa.nota;
                }
            } else if (notaElement) {
                notaElement.remove();
            }
        } else {
            imgElement.src = imagen.src;
            autorElement.textContent = autor;
            obraElement.textContent = obra;
            if (notaElement) notaElement.remove();
        }
    }
    
    // Crear la capa flotante
    const capaFlotante = document.createElement('div');
    capaFlotante.className = 'capa-flotante';
    capaFlotante.style.display = 'block';
    capaFlotante.style.visibility = 'visible';
    
    // Preparar los botones de navegación
    let botonesNavegacion = '';
    if (numeroMisterio > 1) {
        botonesNavegacion += `<button class="nav-btn anterior" onclick="mostrarMisterio('${diaId}', ${numeroMisterio - 1})">← Anterior</button>`;
    }
    if (numeroMisterio < 5) {
        botonesNavegacion += `<button class="nav-btn siguiente" onclick="mostrarMisterio('${diaId}', ${numeroMisterio + 1})">Siguiente →</button>`;
    }
    
    capaFlotante.innerHTML = `
        <span class="cerrar-flotante" onclick="this.parentElement.remove()">&times;</span>
        <div class="imagen-container">
            <img src="${imagen.src}" alt="${obra}">
            <p><span class="autor">${autor}</span>, <span class="obra">${obra}</span></p>
            <label class="toggle-imagenes">
                <input type="checkbox" id="alternarImagenes" ${usarImagenesAlternativas ? 'checked' : ''}> Usar imágenes alternativas
            </label>
        </div>
        <div class="contenido-misterio">
            <p>Misterio ${tipo} ${misterio.numero}</p>
            <p class="titulo-misterio">${misterio.titulo}</p>
            <p class="cita">${misterio.cita}</p>
            <p class="meditacion">${misterio.meditacion}</p>
            <div class="contenedor-avemarias">
                <button class="btn-rezar" id="btn-retroceder" disabled>&lt;</button>
                <svg width="480" height="40" viewBox="0 0 480 40">
                    <circle class="bola bola-padre" cx="25" cy="20" r="13" data-index="0"/>
                    ${Array(10).fill('').map((_, i) => 
                        `<circle class="bola bola-ave" cx="${(i + 2) * 38 + 4}" cy="20" r="10"/>`
                    ).join('')}
                    <circle class="bola bola-jaculatoria" cx="${12 * 38 + 4}" cy="20" r="8"/>
                </svg>
                <button class="btn-rezar" id="btn-avanzar">&gt;</button>
            </div>
        </div>
        <div class="navegacion-misterios">
            ${botonesNavegacion}
        </div>
    `;
    
    // Asegurarnos de que todos los elementos dentro de la capa sean visibles
    Array.from(capaFlotante.getElementsByTagName('*')).forEach(element => {
        element.style.visibility = 'visible';
    });
    
    // Gestionar el rezo
    let posicionActual = -1;
    const btnAvanzar = capaFlotante.querySelector('#btn-avanzar');
    const btnRetroceder = capaFlotante.querySelector('#btn-retroceder');
    const bolas = capaFlotante.querySelectorAll('.bola');
    
    // Función para manejar eventos de teclado
    function manejarTeclado(e) {
        if (e.key === 'ArrowRight') {
            // Flecha derecha: avanzar bola
            if (posicionActual < 11) {
                posicionActual++;
                actualizarBolas();
                traza("Avanzar misterio");
            }
        } else if (e.key === 'ArrowLeft') {
            // Flecha izquierda: retroceder bola
            if (posicionActual >= 0) {
                posicionActual--;
                actualizarBolas();
                traza("Retroceder misterio");
            }
        } else if (e.key === '+') {
            // AvPág: siguiente misterio
            if (numeroMisterio < 5) {
                mostrarMisterio(diaId, numeroMisterio + 1);
                traza("Avanzar misterio");
            } else {
                // Opcional: dar feedback visual o sonoro de que no hay más misterios
                btnAvanzar.style.backgroundColor = '#ffdddd';
                setTimeout(() => btnAvanzar.style.backgroundColor = '', 200);
                traza("No se puede avanzar más, ya estamos en el último misterio");
            }
        } else if (e.key === '-') {
            // RePág: misterio anterior
            if (numeroMisterio > 1) {
                mostrarMisterio(diaId, numeroMisterio - 1);
                traza("Retroceder misterio");
            } else {
                // Opcional: dar feedback visual o sonoro de que no hay más misterios
                btnRetroceder.style.backgroundColor = '#ffdddd';
                setTimeout(() => btnRetroceder.style.backgroundColor = '', 200);
                traza("No se puede retroceder más, ya estamos en el primer misterio");
            }
        }
        e.preventDefault(); // Prevenir el comportamiento por defecto
    }
    
    // Agregar el event listener para el teclado
    document.addEventListener('keydown', manejarTeclado);
    
    btnAvanzar.addEventListener('click', () => {
        posicionActual++;
        actualizarBolas();
        traza("Avanzar misterio");
    });
    
    btnRetroceder.addEventListener('click', () => {
        posicionActual--;
        actualizarBolas();
        traza("Retroceder misterio");
    });
    
    function actualizarBolas() {
        // Actualizar bolas
        bolas.forEach((bola, index) => {
            bola.classList.remove('activa');
            if (index <= posicionActual) {
                bola.classList.add('activa');
                if (index === posicionActual) {
                    switch (index) {
                        case 0:
                            mostrarOracion('padrenuestro');
                            break;
                        case 11:
                            mostrarOracion('gloria');
                            break;
                        default:
                            mostrarOracion('avemaria');
                            break;
                    }
                    //mostrarOracion(index === 0 ? 'padrenuestro' : 'avemaria');
                }
            }
        });

        // Actualizar botones
        btnRetroceder.disabled = posicionActual < 0;
        btnAvanzar.disabled = posicionActual >= 11; // index 11 es la jaculatoria final
    }
    
    // Función para cerrar la capa
    function cerrarCapa() {
        capaFlotante.remove();
        // Ocultar la capa de oración si existe
        const capaOracion = document.querySelector('.capa-oracion');
        if (capaOracion) {
            capaOracion.remove();
            traza("Cerrar ventana oración");
        }
        document.removeEventListener('click', cerrarAlClickFuera);
        document.removeEventListener('keydown', cerrarConEsc);
        document.removeEventListener('keydown', manejarTeclado);
        traza("Cerrar ventana misterio");
    }
    
    // Función para manejar clic fuera
    function cerrarAlClickFuera(e) {
        if (!capaFlotante.contains(e.target)) {
            cerrarCapa();
            traza("Cerrar ventana con clic fuera");
        }
    }
    
    // Función para manejar tecla ESC
    function cerrarConEsc(e) {
        if (e.key === 'Escape') {
            cerrarCapa();
            traza("Cerrar ventana con ESC");
        }
    }
    
    // Prevenir que los clics dentro de la capa la cierren
    capaFlotante.addEventListener('click', e => e.stopPropagation());
    
    // Agregar los event listeners
    document.addEventListener('click', cerrarAlClickFuera);
    document.addEventListener('keydown', cerrarConEsc);
    
    // Agregar event listener para el checkbox
    capaFlotante.querySelector('#alternarImagenes').addEventListener('change', function(e) {
        usarImagenesAlternativas = e.target.checked;
        if (e.target.checked && !imagenesSantoRosario) {
            cargarImagenes();
        } else {
            cambiarImagen(e.target.checked);
        }
    });
    
    // Variables para manejar los eventos de deslizamiento
    let touchStartX = 0;
    let touchStartY = 0;
    const umbralDeslizamiento = 30; // Umbral para considerar un deslizamiento

    // Función para manejar el inicio del toque
    function handleTouchStart(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }

    // Función para manejar el final del toque
    function handleTouchEnd(e) {
        const touch = e.changedTouches[0];
        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Determinar la dirección del deslizamiento
        if (Math.abs(deltaX) > umbralDeslizamiento) {
            // Deslizamiento horizontal
            if (deltaX > 0) {
                // Deslizar a la derecha: retroceder bola
                if (posicionActual >= 0) {
                    posicionActual--;
                    actualizarBolas();
                    traza("Retroceder bola");
                }
            } else {
                // Deslizar a la izquierda: avanzar bola
                if (posicionActual < 11) {
                    posicionActual++;
                    actualizarBolas();
                    traza("Avanzar bola");
                }
            }
        } else {
            // Deslizamiento vertical
            if (Math.abs(deltaY) > umbralDeslizamiento) {
                // Deslizar hacia abajo: retroceder misterio
                if (numeroMisterio > 1) {
                    mostrarMisterio(diaId, numeroMisterio - 1);
                    traza("Retroceder misterio");
                }
            } else {
                // Deslizar hacia arriba: avanzar misterio
                if (numeroMisterio < 5) {
                    mostrarMisterio(diaId, numeroMisterio + 1);
                    traza("Avanzar misterio");
                }
            }
        }
    }

    // Agregar los event listeners para los eventos de toque
    capaFlotante.addEventListener('touchstart', handleTouchStart);
    capaFlotante.addEventListener('touchend', handleTouchEnd);

    document.body.appendChild(capaFlotante);
}

// Modificar la función toggleVisibility para incluir la funcionalidad de mostrar misterio
function toggleVisibilityMisterio(nodeId) {
    // Prevenir que el evento se propague al SVG si existe el evento

    if (event) {
        event.stopPropagation();
    }
    
    // Verificar si es un clic en un misterio
    if (nodeId.match(/^[R][LMXJVSD][1-5]$/)) {
        const dia = nodeId[1];  // L, M, X, J, V, S o D
        const numeroMisterio = parseInt(nodeId[2]);
        mostrarMisterio(dia, numeroMisterio);
    }
}

// Event listener global para la tecla H
document.addEventListener('keydown', (e) => {
    // Si hay un input activo, no procesar atajos de teclado
    if (document.activeElement.tagName === 'INPUT') {
        return;
    }

    if (e.key.toLowerCase() === 'h') {
        mostrarAyuda();
    } else if (e.key.toLowerCase() === 'l') {
        mostrarHistorial();
    } else if (e.key.toLowerCase() === 'c') {
        mostrarConfiguracion();
    } else if (e.key.toLowerCase() === 'i') {   
        cambiarImagen(e.target.checked);
    } else {
        // Mapeo de teclas numéricas a días
        const teclasDias = {
            '0': 'SantoRosario',
            '1': 'Lunes',
            '2': 'Martes',
            '3': 'Miercoles',
            '4': 'Jueves',
            '5': 'Viernes',
            '6': 'Sabado',
            '7': 'Domingo'
        };
        
        if (teclasDias[e.key]) {
            const nodo = document.getElementById(teclasDias[e.key]);
            if (nodo) {
                toggleVisibility(teclasDias[e.key]);
                traza(`Activado ${teclasDias[e.key]} con tecla ${e.key}`);
            }
        }
    }
});

// Función para cambiar el idioma
function cambiarIdioma(nuevoIdioma) {
    if (oraciones[nuevoIdioma]) {
        idiomaSeleccionado = nuevoIdioma;
        traza("Idioma cambiado a: " + nuevoIdioma);
    } else {
        traza("Idioma no soportado: " + nuevoIdioma);
    }
}

/*
// Establecer el idioma por defecto en el selector
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('idioma').value = idiomaSeleccionado;
});
*/

obtenerInfoDispositivo();