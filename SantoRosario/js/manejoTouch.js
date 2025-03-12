document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el toque en la capa de oraciones iniciales
    function handleTouchOraciones(e) {
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const oracionesIniciales = document.getElementById('oracionesIniciales');
        const rect = oracionesIniciales.getBoundingClientRect();
        const midX = rect.left + (rect.width / 2);

        if (touchX > midX) {
            // Tocado en la mitad derecha
            avanzarOracion();
        } else {
            // Tocado en la mitad izquierda
            retrocederOracion();
        }
    }

    // Mostrar la capa de oraciones iniciales
    document.getElementById('btnMostrarOraciones').addEventListener('click', function() {
        mostrarOracionesIniciales();
    });

    // Verificar existencia de oracionesIniciales antes de agregar event listener
    const oracionesIniciales = document.getElementById('oracionesIniciales');
    if (oracionesIniciales) {
        oracionesIniciales.addEventListener('touchstart', handleTouchOraciones);
    } else {
        console.error('Elemento oracionesIniciales no encontrado en el DOM');
    }
});