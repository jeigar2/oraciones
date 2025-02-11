
function traza(mensaje) {
    var capa = document.getElementById("evento");
    capa.innerText = mensaje;

    // Añadir nueva traza
    contadorTrazas++;
    historialTrazas.push(`#${contadorTrazas} - ${new Date().toLocaleTimeString()}: ${mensaje}`);

    // Limitar el número de trazas
    if (historialTrazas.length > configuracion.maxTrazas) {
        historialTrazas = historialTrazas.slice(-configuracion.maxTrazas);
    }

    // Actualizar la ventana de historial si está abierta
    const contenidoHistorial = document.querySelector('.contenido-historial');
    if (contenidoHistorial) {
        const nuevaTraza = document.createElement('div');
        nuevaTraza.className = 'traza-item';
        nuevaTraza.textContent = historialTrazas[historialTrazas.length - 1];
        contenidoHistorial.appendChild(nuevaTraza);

        // Mantener el scroll en la última traza
        contenidoHistorial.scrollTop = contenidoHistorial.scrollHeight;

        // Limitar el número de trazas visibles
        while (contenidoHistorial.children.length > configuracion.maxTrazas) {
            contenidoHistorial.removeChild(contenidoHistorial.firstChild);
        }
    }
}

function obtenerInfoDispositivo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;

    traza("Resolución: " + width + " x " + height);
    traza("User Agent: " + userAgent);
    traza("Plataforma: " + platform);
    traza("Idioma: " + language);
}