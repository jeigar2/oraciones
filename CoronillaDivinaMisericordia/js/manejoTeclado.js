// Función para manejar eventos de teclado
function handleKeyboardEvent(event) {
    if (elements.length === 0) {
        initializeElements();
    }

    switch(event.key) {
        case ' ':
            //flashEffect(event.target);
        case 'ArrowDown':
            event.preventDefault();
            moveForward();
            break;
        case 'ArrowUp':
            event.preventDefault();
            moveBackward();
            break;
        case 'Escape':
            event.preventDefault();
            stopAllAudios();
            break;
        case 'Home':
            event.preventDefault();
            moveToFirstElement();
            break;
        case 'End':
            event.preventDefault();
            moveToLastElement();
            break;
    }
}

function moveToFirstElement() {
    if (elements.length === 0) {
        initializeElements();
    }
    currentIndex = 0;
    elements[currentIndex].scrollIntoView({ behavior: 'smooth' });
    simulateEvent(elements[currentIndex], 'mouseenter');
}

function moveToLastElement() {
    if (elements.length === 0) {
        initializeElements();
    }
    currentIndex = elements.length - 1;
    elements[currentIndex].scrollIntoView({ behavior: 'smooth' });
    simulateEvent(elements[currentIndex], 'mouseenter');
}

// Añadimos el listener para eventos de teclado
window.addEventListener('keydown', handleKeyboardEvent);