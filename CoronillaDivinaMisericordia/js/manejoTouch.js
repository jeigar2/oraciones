// Función para manejar el toque
function handleTouch(e) {
    const area = e.target.classList.contains('_left') ? 'left' : right;
    /*
    const area = e.target.classList.contains('_top') ? 'top' :
                    e.target.classList.contains('_bottom') ? 'bottom' :
                    e.target.classList.contains('_left') ? 'left' : 
                    e.target.classList.contains('_right') ? 'right' :
                    'center';
    */

    switch (area) {
        //case 'top':
        //    break;
        //case 'bottom':
        //    break;
        case 'left':
            e.preventDefault();
            moveForward();
            flashEffect(e.target);
            break;
        case 'right':
            e.preventDefault();
            moveBackward();
            flashEffect(e.target);
            break;
        //case 'center':
        //    // Acción para el centro (puede ser personalizada)
        //    break;
    }
}

// Función para aplicar el efecto de flash
function flashEffect(element) {
    element.classList.add('flash');
    setTimeout(() => {
        element.classList.remove('flash');
    }, 500); // Eliminar la clase después de 1 segundo
}

// Agregar los event listeners para las áreas de toque
document.querySelectorAll('.touch-area').forEach(area => {
    area.addEventListener('touchend', handleTouch);
});