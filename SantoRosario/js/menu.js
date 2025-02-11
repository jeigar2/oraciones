// Función para controlar el menú lateral
function toggleMenu() {
    const sidebar = document.querySelector('.menu-sidebar');
    const overlay = document.querySelector('.menu-overlay');

    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
        traza("Cerrar menú lateral");
    } else {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
        traza("Abrir menú lateral");
    }
}

// Añadir atajo Alt+B para la barra del menú
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'b') {
        toggleMenu();
    }
});