// Variable global para almacenar el historial de trazas
let historialTrazas = [];

function traza(mensaje){
    var capa = document.getElementById("evento");
    capa.innerText = mensaje;
    historialTrazas.push(new Date().toLocaleTimeString() + ": " + mensaje);
}

function toggleVisibility(parentId) {
    traza("toggleVisibility: " + parentId);
    
    if (parentId === "SantoRosario") {
        // Obtener todos los días
        const allDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        
        // Verificar si hay algún día oculto
        let hayDiasOcultos = false;
        allDays.forEach(day => {
            const dayElement = document.getElementById(day);
            if (dayElement && dayElement.getAttribute('visibility') === 'hidden') {
                hayDiasOcultos = true;
            }
        });

        if (hayDiasOcultos) {
            // Si hay días ocultos, mostrar todo
            allDays.forEach(day => {
                const dayCode = day === "Miercoles" ? "X" : day.charAt(0);
                
                // Crear array con todos los elementos del día
                const elements = [
                    document.getElementById(day),          // rect del día
                    document.getElementById(dayCode),      // texto del nombre del día
                    document.getElementById(`T${dayCode}`),// texto del tipo de misterio
                    document.getElementById(`P${dayCode}`) // path principal del día
                ];
                
                // Añadir los misterios del día
                for (let i = 1; i <= 5; i++) {
                    elements.push(
                        ...document.querySelectorAll(`#R${dayCode}${i}`),
                        ...document.querySelectorAll(`#T${dayCode}${i}`),
                        ...document.querySelectorAll(`#P${dayCode}${i}`)
                    );
                }
                
                elements.forEach(element => {
                    if (element) {
                        element.removeAttribute('transform');
                        element.setAttribute('visibility', 'visible');
                    }
                });
            });
            traza("Mostrando todos los misterios");
            
            // Restaurar las posiciones originales
            allDays.forEach(day => {
                const dayRect = document.getElementById(day);
                if (dayRect) {
                    dayRect.removeAttribute('transform');
                }
            });
        } else {
            // Si todo está visible, mostrar solo el día actual
            const today = new Date().getDay();
            const dayMap = {
                0: "Domingo",
                1: "Lunes",
                2: "Martes",
                3: "Miercoles",
                4: "Jueves",
                5: "Viernes",
                6: "Sabado"
            };
            
            // Ocultar todos los días y sus misterios
            allDays.forEach(day => {
                const dayCode = day === "Miercoles" ? "X" : day.charAt(0);
                
                // Ocultar el nodo del día y sus textos asociados
                const dayElements = [
                    document.getElementById(day),          // rect del día
                    document.getElementById(dayCode),      // texto del nombre del día
                    document.getElementById(`T${dayCode}`),// texto del tipo de misterio
                    document.getElementById(`P${dayCode}`) // path principal del día
                ];
                
                dayElements.forEach(element => {
                    if (element) {
                        element.setAttribute('visibility', 'hidden');
                    }
                });
                
                // Ocultar todos sus misterios
                for (let i = 1; i <= 5; i++) {
                    const elements = [
                        ...document.querySelectorAll(`#R${dayCode}${i}`),
                        ...document.querySelectorAll(`#T${dayCode}${i}`),
                        ...document.querySelectorAll(`#P${dayCode}${i}`)
                    ];
                    
                    elements.forEach(element => {
                        if (element) {
                            element.setAttribute('visibility', 'hidden');
                        }
                    });
                }
            });
            
            // Mostrar solo el día actual
            const currentDay = dayMap[today];
            const currentDayCode = currentDay === "Miercoles" ? "X" : currentDay.charAt(0);
            
            // Obtener el rectángulo del día actual y del jueves
            const currentDayRect = document.getElementById(currentDay);
            const juevesRect = document.getElementById("Jueves");
            
            if (currentDayRect && juevesRect && currentDay !== "Jueves") {
                // Obtener las coordenadas del jueves
                const juevesY = juevesRect.getAttribute('y');
                const currentY = currentDayRect.getAttribute('y');
                
                // Calcular la diferencia en Y
                const deltaY = parseFloat(juevesY) - parseFloat(currentY);
                
                // Aplicar la transformación al día actual y sus elementos
                const elements = [
                    currentDayRect,
                    document.getElementById(currentDayCode),
                    document.getElementById(`T${currentDayCode}`),
                    //document.getElementById(`P${currentDayCode}`)
                ];
                
                // Añadir los misterios del día
                for (let i = 1; i <= 5; i++) {
                    elements.push(
                        ...document.querySelectorAll(`#R${currentDayCode}${i}`),
                        ...document.querySelectorAll(`#T${currentDayCode}${i}`),
                        ...document.querySelectorAll(`#P${currentDayCode}${i}`)
                    );
                }
                
                elements.forEach(element => {
                    if (element) {
                        element.setAttribute('transform', `translate(0,${deltaY})`);
                        element.setAttribute('visibility', 'visible');
                    }
                });

                // Mostrar el path del Jueves
                const pathJueves = document.getElementById('PJ');
                //const pathJueves1 = document.getElementById('PJ1');
                if (pathJueves) pathJueves.setAttribute('visibility', 'visible');
                //if (pathJueves1) pathJueves1.setAttribute('visibility', 'visible');
            }
            
            traza("Mostrando misterios del " + currentDay);
        }
    } else {
        // Comportamiento original para los otros días
        let dayCode = parentId.charAt(0);
        if (parentId === "Miercoles") {
            dayCode = "X";
        }
        
        // Incluir los elementos del día
        const elements = [
            document.getElementById(parentId),          // rect del día
            document.getElementById(dayCode),           // texto del nombre del día
            document.getElementById(`T${dayCode}`),     // texto del tipo de misterio
            document.getElementById(`P${dayCode}`)      // path principal del día
        ];
        
        // Añadir los misterios
        for (let i = 1; i <= 5; i++) {
            elements.push(
                ...document.querySelectorAll(`#R${dayCode}${i}`),
                ...document.querySelectorAll(`#T${dayCode}${i}`),
                ...document.querySelectorAll(`#P${dayCode}${i}`)
            );
        }
        
        const validElements = elements.filter(el => el !== null && el !== undefined);
        const isVisible = validElements.length > 0 ? 
            validElements[0].getAttribute('visibility') !== 'hidden' : true;
        
        const newVisibility = isVisible ? 'hidden' : 'visible';
        
        validElements.forEach(element => {
            element.setAttribute('visibility', newVisibility);
        });
    }
}


// Tomada las metidaciones por formulario de esta 
// url https://contemplativos.com/espiritualidad/oracion/el-rosario-meditado/
const formularios = {
  1: formulario1,
  2: formulario2,
  3: formulario3
};

// obtener el formulario actual desde un valor aleatorio
let formularioActual = Math.floor(Math.random() * 3) + 1;

// mostrar traza con el formulario actual
traza("Formulario actual: " + formularioActual);

// Variable global para el estado de las imágenes alternativas
let usarImagenesAlternativas = false;

function mostrarMisterio(diaId, numeroMisterio) {
    traza("Mostrando misterio " + numeroMisterio + " del día " + diaId);
    
    // Remover cualquier capa flotante existente
    const capaExistente = document.querySelector('.capa-flotante');
    if (capaExistente) {
        capaExistente.remove();
    }
    
    // Mapear el ID del día al nombre del día y tipo de misterio
    const mapaDias = {
        'L': { nombre: 'Lunes', tipo: 'Gozoso' },
        'M': { nombre: 'Martes', tipo: 'Doloroso' },
        'X': { nombre: 'Miercoles', tipo: 'Glorioso' },
        'J': { nombre: 'Jueves', tipo: 'Luminoso' },
        'V': { nombre: 'Doloroso', tipo: 'Doloroso' },
        'S': { nombre: 'Sabado', tipo: 'Gozoso' },
        'D': { nombre: 'Domingo', tipo: 'Glorioso' }
    };
    
    const { nombre: dia, tipo } = mapaDias[diaId];
    const misterio = formularios[formularioActual][dia].misterios[numeroMisterio - 1];
    const imagen = formularios[formularioActual][dia].imagen;
    let imagenesSantoRosario = null;
    
    // Cargar las imágenes alternativas según el tipo de misterio
    fetch('Imagenes-Santo_Rosario.json')
        .then(response => response.json())
        .then(data => {
            const tipoMisterio = tipo + "s"; // Convertir "Gozoso" a "Gozosos", etc.
            imagenesSantoRosario = data[tipoMisterio].imagenes;
            
        });
    
    // Separar autor y obra
    const [autor, obra] = imagen.autor_obra.split(',').map(s => s.trim());
    
    // Función para cambiar la imagen
    function cambiarImagen(useAlternativa) {
        const imgElement = capaFlotante.querySelector('.imagen-container img');
        const autorElement = capaFlotante.querySelector('.autor');
        const obraElement = capaFlotante.querySelector('.obra');
        const notaElement = capaFlotante.querySelector('.nota');
        
        if (useAlternativa && imagenesSantoRosario) {
            const imagenAlternativa = imagenesSantoRosario[0][numeroMisterio - 1];
            traza("Usando imagen alternativa: " + imagenAlternativa.url + " - " + imagenAlternativa.nota);
            imgElement.src = imagenAlternativa.url;
            autorElement.textContent = imagenAlternativa.autor || '';
            obraElement.textContent = imagenAlternativa.titulo || '';
            if (imagenAlternativa.nota) {
                if (!notaElement) {
                    const p = document.createElement('p');
                    p.className = 'nota';
                    p.textContent = imagenAlternativa.nota;
                    imgElement.parentElement.appendChild(p);
                } else {
                    notaElement.textContent = imagenAlternativa.nota;
                }
            } else if (notaElement) {
                notaElement.remove();
            }
        } else {
            imgElement.src = imagen.src;
            autorElement.textContent = autor;
            obraElement.textContent = obra;
            if (notaElement) notaElement.remove();
        }
    }
    
    // Crear la capa flotante
    const capaFlotante = document.createElement('div');
    capaFlotante.className = 'capa-flotante';
    capaFlotante.style.display = 'block';
    capaFlotante.style.visibility = 'visible';
    
    // Preparar los botones de navegación
    let botonesNavegacion = '';
    if (numeroMisterio > 1) {
        botonesNavegacion += `<button class="nav-btn anterior" onclick="mostrarMisterio('${diaId}', ${numeroMisterio - 1})">← Anterior</button>`;
    }
    if (numeroMisterio < 5) {
        botonesNavegacion += `<button class="nav-btn siguiente" onclick="mostrarMisterio('${diaId}', ${numeroMisterio + 1})">Siguiente →</button>`;
    }
    
    capaFlotante.innerHTML = `
        <span class="cerrar-flotante" onclick="this.parentElement.remove()">&times;</span>
        <div class="imagen-container">
            <img src="${imagen.src}" alt="${obra}">
            <p><span class="autor">${autor}</span>, <span class="obra">${obra}</span></p>
            <label class="toggle-imagenes">
                <input type="checkbox" id="alternarImagenes" ${usarImagenesAlternativas ? 'checked' : ''}> Usar imágenes alternativas
            </label>
        </div>
        <div class="contenido-misterio">
            <p>Misterio ${tipo} ${misterio.numero}</p>
            <p class="titulo-misterio">${misterio.titulo}</p>
            <p class="cita">${misterio.cita}</p>
            <p class="meditacion">${misterio.meditacion}</p>
            <div class="contenedor-avemarias">
                <button class="btn-rezar" id="btn-retroceder" disabled>&lt;</button>
                <svg width="480" height="40" viewBox="0 0 480 40">
                    <circle class="bola bola-padre" cx="25" cy="20" r="13" data-index="0"/>
                    ${Array(10).fill('').map((_, i) => 
                        `<circle class="bola bola-ave" cx="${(i + 2) * 40 + 5}" cy="20" r="10"/>`
                    ).join('')}
                </svg>
                <button class="btn-rezar" id="btn-avanzar">&gt;</button>
            </div>
        </div>
        <div class="navegacion-misterios">
            ${botonesNavegacion}
        </div>
    `;
    
    // Asegurarnos de que todos los elementos dentro de la capa sean visibles
    Array.from(capaFlotante.getElementsByTagName('*')).forEach(element => {
        element.style.visibility = 'visible';
    });
    
    // Gestionar el rezo
    let posicionActual = -1;
    const btnAvanzar = capaFlotante.querySelector('#btn-avanzar');
    const btnRetroceder = capaFlotante.querySelector('#btn-retroceder');
    const bolas = capaFlotante.querySelectorAll('.bola');
    
    // Función para manejar eventos de teclado
    function manejarTeclado(e) {
        if (e.key === 'ArrowRight') {
            // Flecha derecha: avanzar bola
            if (posicionActual < 10) {
                posicionActual++;
                actualizarBolas();
                traza("Avanzar misterio");
            }
        } else if (e.key === 'ArrowLeft') {
            // Flecha izquierda: retroceder bola
            if (posicionActual >= 0) {
                posicionActual--;
                actualizarBolas();
                traza("Retroceder misterio");
            }
        } else if (e.key === '+') {
            // AvPág: siguiente misterio
            if (numeroMisterio < 5) {
                mostrarMisterio(diaId, numeroMisterio + 1);
                traza("Avanzar misterio");
            } else {
                // Opcional: dar feedback visual o sonoro de que no hay más misterios
                btnAvanzar.style.backgroundColor = '#ffdddd';
                setTimeout(() => btnAvanzar.style.backgroundColor = '', 200);
                traza("No se puede avanzar más, ya estamos en el último misterio");
            }
        } else if (e.key === '-') {
            // RePág: misterio anterior
            if (numeroMisterio > 1) {
                mostrarMisterio(diaId, numeroMisterio - 1);
                traza("Retroceder misterio");
            } else {
                // Opcional: dar feedback visual o sonoro de que no hay más misterios
                btnRetroceder.style.backgroundColor = '#ffdddd';
                setTimeout(() => btnRetroceder.style.backgroundColor = '', 200);
                traza("No se puede retroceder más, ya estamos en el primer misterio");
            }
        }
        e.preventDefault(); // Prevenir el comportamiento por defecto
    }
    
    // Agregar el event listener para el teclado
    document.addEventListener('keydown', manejarTeclado);
    
    btnAvanzar.addEventListener('click', () => {
        posicionActual++;
        actualizarBolas();
        traza("Avanzar misterio");
    });
    
    btnRetroceder.addEventListener('click', () => {
        posicionActual--;
        actualizarBolas();
        traza("Retroceder misterio");
    });
    
    function actualizarBolas() {
        // Actualizar bolas
        bolas.forEach((bola, index) => {
            bola.classList.remove('activa');
            if (index <= posicionActual) {
                bola.classList.add('activa');
            }
        });

        // Actualizar botones
        btnRetroceder.disabled = posicionActual < 0;
        btnAvanzar.disabled = posicionActual >= 10;
    }
    
    // Función para cerrar la capa
    function cerrarCapa() {
        capaFlotante.remove();
        document.removeEventListener('click', cerrarAlClickFuera);
        document.removeEventListener('keydown', cerrarConEsc);
        document.removeEventListener('keydown', manejarTeclado);
    }
    
    // Función para manejar clic fuera
    function cerrarAlClickFuera(e) {
        if (!capaFlotante.contains(e.target)) {
            cerrarCapa();
            traza("Cerrar ventana con clic fuera");
        }
    }
    
    // Función para manejar tecla ESC
    function cerrarConEsc(e) {
        if (e.key === 'Escape') {
            cerrarCapa();
            traza("Cerrar ventana con ESC");
        }
    }
    
    // Prevenir que los clics dentro de la capa la cierren
    capaFlotante.addEventListener('click', e => e.stopPropagation());
    
    // Agregar los event listeners
    document.addEventListener('click', cerrarAlClickFuera);
    document.addEventListener('keydown', cerrarConEsc);
    
    // Agregar event listener para el checkbox
    capaFlotante.querySelector('#alternarImagenes').addEventListener('change', function(e) {
        usarImagenesAlternativas = e.target.checked;
        if (e.target.checked && !imagenesSantoRosario) {
            cargarImagenes();
        } else {
            cambiarImagen(e.target.checked);
        }
    });
    
    document.body.appendChild(capaFlotante);
}

// Modificar la función toggleVisibility para incluir la funcionalidad de mostrar misterio
function toggleVisibilityMisterio(nodeId) {
    // Prevenir que el evento se propague al SVG si existe el evento

    if (event) {
        event.stopPropagation();
    }
    
    // Verificar si es un clic en un misterio
    if (nodeId.match(/^[R][LMXJVSD][1-5]$/)) {
        const dia = nodeId[1];  // L, M, X, J, V, S o D
        const numeroMisterio = parseInt(nodeId[2]);
        mostrarMisterio(dia, numeroMisterio);
    }
}

// Event listener global para la tecla H
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'h') {
        mostrarAyuda();

    } else if (e.key.toLowerCase() === 'l') {
        mostrarHistorial();
    } else if (e.key.toLowerCase() === 'i') {   
        cambiarImagen(e.target.checked);
    }
});

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