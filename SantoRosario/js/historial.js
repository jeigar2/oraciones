// Función para mostrar el historial
function mostrarHistorial() {
    const historialExistente = document.querySelector('.capa-historial');
    if (historialExistente) {
        historialExistente.remove();
        document.removeEventListener('keydown', cerrarHistorialConEsc);
        traza("Cerrar ventana Historial");
        return;
    }

    const historialHTML = `
        <div class="capa-historial">
            <span class="cerrar-flotante" onclick="cerrarHistorial()">&times;</span>
            <h2>Historial de Eventos</h2>
            <div class="contenido-historial">
                ${historialTrazas.map(traza => `<div class="traza-item">${traza}</div>`).join('')}
            </div>
        </div>
    `;

    const historialElement = document.createElement('div');
    historialElement.innerHTML = historialHTML;
    const capaHistorial = historialElement.firstElementChild;
    document.body.appendChild(capaHistorial);

    // Función global para cerrar el historial
    window.cerrarHistorial = function() {
        const historial = document.querySelector('.capa-historial');
        if (historial) {
            historial.remove();
            document.removeEventListener('keydown', cerrarHistorialConEsc);
        }
    };

    // Función para cerrar el historial con ESC
    function cerrarHistorialConEsc(e) {
        if (e.key === 'Escape') {
            cerrarHistorial();
            e.stopPropagation();
            traza("Cerrar ventana Historial con ESC");
        }
    }

    document.addEventListener('keydown', cerrarHistorialConEsc);
    traza("Mostrar Historial");
}