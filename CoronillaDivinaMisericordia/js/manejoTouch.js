// Función para manejar el toque
function handleTouch(e) {
    const area = e.target.classList.contains('_top') ? 'top' :
                    e.target.classList.contains('_bottom') ? 'bottom' :
                    e.target.classList.contains('_left') ? 'left' :
                    e.target.classList.contains('_right') ? 'right' :
                    'center';

    switch (area) {
        case 'top':
            break;
        case 'bottom':
            break;
        case 'left':
            event.preventDefault();
            moveForward();
            break;
        case 'right':
            event.preventDefault();
            moveBackward();
            break;
        case 'center':
            // Acción para el centro (puede ser personalizada)
            break;
    }
}

// Agregar los event listeners para las áreas de toque
document.querySelectorAll('.touch-area').forEach(area => {
    area.addEventListener('touchend', handleTouch);
});