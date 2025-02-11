// Función para mostrar la ayuda
function mostrarAyuda() {
    const ayudaExistente = document.querySelector('.capa-ayuda');
    if (ayudaExistente) {
        ayudaExistente.remove();
        document.removeEventListener('keydown', cerrarAyudaConEsc);
        traza("Cerrar ventana Ayuda");
        return;
    }

    const ayudaHTML = `
        <div class="capa-ayuda">
            <span class="cerrar-flotante" onclick="cerrarAyuda()">&times;</span>
            <h2>Atajos de Teclado</h2>
            <ul>
                <li><strong>→</strong> Avanzar cuenta del rosario</li>
                <li><strong>←</strong> Retroceder cuenta del rosario</li>
                <li><strong>+</strong> Siguiente misterio</li>
                <li><strong>-</strong> Misterio anterior</li>
                <li><strong>ESC</strong> Cerrar ventana</li>
                <li><strong>H</strong> Mostrar/ocultar esta ayuda</li>
                <li><strong>I</strong> Usar imágenes alternativas</li>
                <li><strong>L</strong> Mostrar/ocultar historial de eventos</li>
                <li><strong>C</strong> Mostrar configuración</li>
                <li><strong>0</strong> Mostrar/ocultar Santo Rosario</li>
                <li><strong>1-7</strong> Mostrar/ocultar días (1:Lunes ... 7:Domingo)</li>
            </ul>
        </div>
    `;

    const ayudaElement = document.createElement('div');
    ayudaElement.innerHTML = ayudaHTML;
    const capaAyuda = ayudaElement.firstElementChild;
    document.body.appendChild(capaAyuda);

    // Función global para cerrar la ayuda
    window.cerrarAyuda = function() {
        const ayuda = document.querySelector('.capa-ayuda');
        if (ayuda) {
            ayuda.remove();
            document.removeEventListener('keydown', cerrarAyudaConEsc);
        }
    };

    // Función para cerrar la ayuda con ESC
    function cerrarAyudaConEsc(e) {
        if (e.key === 'Escape') {
            cerrarAyuda();
            e.stopPropagation(); // Evitar que el ESC cierre también la capa del misterio
        }
    }

    document.addEventListener('keydown', cerrarAyudaConEsc);
    traza("Mostrar Ayuda");
}