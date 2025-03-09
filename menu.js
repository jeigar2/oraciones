// Configuración del menú
const menuConfig = {
    version: '2.2.3',
    items: [
        {
            id: 'home',
            title: 'Inicio',
            icon: 'fa-home',
            url: '../index.html',
            shortcut: 'Alt+I'
        },
        {
            id: 'rosario',
            title: 'Santo Rosario',
            icon: 'fa-pray',
            url: '../SantoRosario/SantoRosario-SVG-v.1.html',
            shortcut: 'Alt+R'
        },
        {
            id: 'coronilla',
            title: 'Coronilla',
            icon: 'fa-cross',
            url: '../CoronillaDivinaMisericordia/CoronillaDivinaMisericordia.html',
            shortcut: 'Alt+C'
        },
        {
            id: 'letanias',
            title: 'Letanías',
            icon: 'fa-church',
            url: '../Letanias_.html',
            shortcut: 'Alt+L'
        },
        {
            id: 'magnificat',
            title: 'Magníficat',
            icon: 'fa-dove',
            url: '../Magnificat.html',
            shortcut: 'Alt+M'
        },
        {
            id: 'ivoox',
            title: 'ivoox-player',
            icon: 'fa-headphones',
            url: '../ivoox-player.html',
            shortcut: 'Alt+P'
        },
        {
            id: 'viacrucis',
            title: 'Vía Crucis',
            icon: 'fa-cross',
            url: '../ViaCrucis/ViaCrucis-Cuaresma.html',
            shortcut: 'Alt+V'
        }
    ]
};

// Función para crear el menú
function createMenu() {
    // Determinar la página actual
    const currentPath = window.location.pathname;
    
    // Ajustar las URLs según la ubicación actual
    const isInSubfolder = currentPath.includes('SantoRosario') || currentPath.includes('CoronillaDivinaMisericordia') || currentPath.includes('ViaCrucis');
    const urlPrefix = isInSubfolder ? '../' : '';
    
    // Actualizar las URLs del menú
    menuConfig.items.forEach(item => {
        item.url = urlPrefix + item.url.replace(/^\.\.\//, '');
    });
    
    // Crear elementos del menú
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.onclick = toggleMenu;

    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.onclick = toggleMenu;

    const menuSidebar = document.createElement('div');
    menuSidebar.className = 'menu-sidebar';
    
    // Crear contenido del menú
    menuSidebar.innerHTML = `
        <h2>Oraciones <span class="version">v.${menuConfig.version}</span></h2>
        <div class="menu-links">
            ${menuConfig.items.map(item => `
                <a href="${item.url}" class="menu-link ${currentPath.includes(item.id) ? 'active' : ''}">
                    <i class="fas ${item.icon}"></i>
                    ${item.title}
                    <span class="tecla">${item.shortcut}</span>
                </a>
            `).join('')}
        </div>
    `;

    // Añadir elementos al DOM
    document.body.appendChild(menuToggle);
    document.body.appendChild(menuOverlay);
    document.body.appendChild(menuSidebar);

    // Añadir event listener para atajos de teclado
    document.addEventListener('keydown', handleMenuShortcuts);
}

// Función para manejar atajos de teclado
function handleMenuShortcuts(e) {
    if (e.altKey) {
        const key = e.key.toLowerCase();
        const item = menuConfig.items.find(item => 
            item.shortcut.toLowerCase().endsWith(key));
        
        if (item && window.location.pathname !== item.url) {
            window.location.href = item.url;
        }
    }
}

// Función para controlar el menú lateral
function toggleMenu() {
    const sidebar = document.querySelector('.menu-sidebar');
    const overlay = document.querySelector('.menu-overlay');
    
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    } else {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
    }
}

// Crear el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createMenu); 

// eliminar menu
function deleteMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuSidebar = document.querySelector('.menu-sidebar');

    menuToggle.remove();
    menuOverlay.remove();
    menuSidebar.remove();
    menuSidebar.innerHTML = '';
    menuSidebar.style.display = 'none';
    menuToggle.style.display = 'none';
    menuOverlay.style.display = 'none';
}