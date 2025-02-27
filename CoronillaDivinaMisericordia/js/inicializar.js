var mensaje = window.document.getElementById("mensaje");
var currentIndex = -1;
var elements = [];

// Función para inicializar el array de elementos interactivos
function initializeElements() {
    elements = Array.from(document.querySelectorAll('p[onmouseenter], li[onmouseenter]'));
}

// Función para simular eventos del mouse
// al estudiar el atributo onmouseenter, buscamos tanto mostrarTexto como mostrarHTML
// si encontramos un id numérico mayor que 0, reproducimos el audio correspondiente
function simulateEvent(element, eventName) {
    var event = new MouseEvent(eventName, {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(event);
    
    // Agregamos o quitamos el efecto hover
    if (eventName === 'mouseenter') {
        element.style.backgroundColor = '#0000ff';
        element.style.color = '#fff';
    } else if (eventName === 'mouseout') {
        element.style.backgroundColor = '';
        element.style.color = '';
    }

    // Obtenemos el id del atributo onmouseenter
    const onmouseenterAttr = element.getAttribute('onmouseenter');
    console.log(onmouseenterAttr);
    if (onmouseenterAttr) {
        // Buscamos el primer argumento numérico en mostrarTexto o mostrarHTML
        const matchTexto = onmouseenterAttr.match(/mostrarTexto\((\d+)|mostrarTexto\(null/);
        const matchHTML = onmouseenterAttr.match(/mostrarHTML\((\d+)|mostrarHTML\(null/);

        //si matchTexto es numerico pero es cero, no reproducir audio
        if(matchTexto && matchTexto[1] == parseInt(0)){
            stopAllAudios();
            return;
        }
        // si matchHTML es numerico pero es cero, no reproducir audio
        if(matchHTML && matchHTML[1] == parseInt(0)){
            stopAllAudios();
            return;
        }

        // Reproducimos el audio solo si encontramos un id numérico mayor que 0
        if ((matchTexto && matchTexto[1]) || (matchHTML && matchHTML[1])) {
            const id = parseInt(matchTexto?.[1] || matchHTML?.[1]);
            playAudio(id);
        }
    }
}

// Función para manejar el scroll
function scrollToElement(element) {
    const leftColumn = document.querySelector('.column.left');
    const elementRect = element.getBoundingClientRect();
    const containerRect = leftColumn.getBoundingClientRect();
    
    if (elementRect.bottom > containerRect.bottom || elementRect.top < containerRect.top) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Función para manejar el movimiento hacia adelante
function moveForward() {
    if (currentIndex >= 0) {
        simulateEvent(elements[currentIndex], 'mouseout');
        elements[currentIndex].style.color = 'gray'; // Restaurar color gris
    }
    currentIndex++;
    if (currentIndex >= elements.length) {
        currentIndex = 0;
    }
    simulateEvent(elements[currentIndex], 'mouseenter');
    scrollToElement(elements[currentIndex]);
}

// Función para manejar el movimiento hacia atrás
function moveBackward() {
    if (currentIndex >= 0) {
        simulateEvent(elements[currentIndex], 'mouseout');
        elements[currentIndex].style.color = 'gray'; // Restaurar color gris
    }
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = elements.length - 1;
    }
    simulateEvent(elements[currentIndex], 'mouseenter');
    scrollToElement(elements[currentIndex]);
}

// Inicializamos los elementos cuando se carga la página
window.addEventListener('load', initializeElements);