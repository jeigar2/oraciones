// Función para mostrar la configuración
function mostrarConfiguracion() {
    const configExistente = document.querySelector('.capa-configuracion');
    if (configExistente) {
        configExistente.remove();
        document.removeEventListener('keydown', cerrarConfigConEsc);
        traza("Cerrar ventana Configuración");
        return;
    }

    // Resetear el estado de cambios
    configCambiada = false;

    const configHTML = `
        <div class="capa-configuracion">
            <span class="cerrar-flotante" onclick="intentarCerrarConfiguracion()">&times;</span>
            <h2>Configuración <span class="version">v.${configuracion.version}</span></h2>
            <div class="config-contenido">
                <div class="config-item">
                    <label for="tiempoOracion">Tiempo mostrar oración (segundos):</label>
                    <input type="number" id="tiempoOracion" min="1" max="30" 
                        value="${configuracion.tiempoOracion/1000}">
                </div>
                <div class="config-item">
                    <label>
                        <input type="checkbox" id="autoOcultarOracion" 
                            ${configuracion.autoOcultarOracion ? 'checked' : ''}>
                        Auto-ocultar oración
                    </label>
                </div>
                <div class="config-item">
                    <label for="maxTrazas">Máximo número de trazas:</label>
                    <input type="number" id="maxTrazas" min="10" max="1000" 
                        value="${configuracion.maxTrazas}">
                </div>
                <div class="config-item">
                    <label for="idioma">Seleccionar Idioma:</label>
                    <select id="idioma" onchange="cambiarIdioma(this.value)">
                        <option value="ES">Español</option>
                        <option value="IT">Italiano</option>
                        <option value="LA">Latin</option>
                    </select>
                </div>
                <button class="config-guardar" onclick="guardarConfiguracion()">Guardar</button>
            </div>
        </div>
    `;

    const configElement = document.createElement('div');
    configElement.innerHTML = configHTML;
    const capaConfig = configElement.firstElementChild;
    document.body.appendChild(capaConfig);

    // Añadir detectores de cambios
    ['tiempoOracion', 'autoOcultarOracion', 'maxTrazas'].forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener('change', () => configCambiada = true);
            elemento.addEventListener('input', () => configCambiada = true);
        }
    });

    // Función global para intentar cerrar la configuración
    window.intentarCerrarConfiguracion = function() {
        if (configCambiada) {
            if (confirm('Hay cambios sin guardar. ¿Desea salir sin guardar?')) {
                cerrarConfiguracion();
                traza("Configuración cerrada sin guardar");
            }
        } else {
            cerrarConfiguracion();
        }
    };

    // Función global para cerrar la configuración
    window.cerrarConfiguracion = function() {
        const config = document.querySelector('.capa-configuracion');
        if (config) {
            config.remove();
            document.removeEventListener('keydown', cerrarConfigConEsc);
        }
    };

    // Función global para guardar la configuración
    window.guardarConfiguracion = function() {
        const tiempoOracion = document.getElementById('tiempoOracion').value;
        const autoOcultar = document.getElementById('autoOcultarOracion').checked;
        const maxTrazas = document.getElementById('maxTrazas').value;
        const idiomaSeleccionado = document.getElementById('idioma').value;

        configuracion.tiempoOracion = tiempoOracion * 1000;
        configuracion.autoOcultarOracion = autoOcultar;
        configuracion.maxTrazas = parseInt(maxTrazas);
        configuracion.idiomaSeleccionado = idiomaSeleccionado;

        if (historialTrazas.length > configuracion.maxTrazas) {
            historialTrazas = historialTrazas.slice(-configuracion.maxTrazas);
        }

        configCambiada = false;
        cerrarConfiguracion();
        traza("Configuración guardada");
    };

    // Función para cerrar con ESC
    function cerrarConfigConEsc(e) {
        if (e.key === 'Escape') {
            intentarCerrarConfiguracion();
            e.stopPropagation();
        }
    }

    document.addEventListener('keydown', cerrarConfigConEsc);
    traza("Mostrar Configuración");
}
