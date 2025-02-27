// Función para manejar eventos de teclado
function handleKeyboardEvent(event) {
    if (elements.length === 0) {
        initializeElements();
    }

    switch(event.key) {
        case ' ':
            flashEffect(event.target);
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
    }
}

// Añadimos el listener para eventos de teclado
window.addEventListener('keydown', handleKeyboardEvent);