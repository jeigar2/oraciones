function traza(mensaje){
  var capa = document.getElementById("evento");
  capa.innerText = mensaje;
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
                
                // Mostrar el nodo del día y sus textos asociados
                const dayElements = [
                    document.getElementById(day),          // rect del día
                    document.getElementById(dayCode),      // texto del nombre del día
                    document.getElementById(`T${dayCode}`),// texto del tipo de misterio
                    document.getElementById(`P${dayCode}`) // path principal del día
                ];
                
                dayElements.forEach(element => {
                    if (element) {
                        element.setAttribute('visibility', 'visible');
                    }
                });
                
                // Mostrar todos sus misterios
                for (let i = 1; i <= 5; i++) {
                    const elements = [
                        ...document.querySelectorAll(`#R${dayCode}${i}`),
                        ...document.querySelectorAll(`#T${dayCode}${i}`),
                        ...document.querySelectorAll(`#P${dayCode}${i}`)
                    ];
                    
                    elements.forEach(element => {
                        if (element) {
                            element.setAttribute('visibility', 'visible');
                        }
                    });
                }
            });
            traza("Mostrando todos los misterios");
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
            
            // Mostrar el nodo del día actual y sus textos asociados
            const currentDayElements = [
                document.getElementById(currentDay),          // rect del día
                document.getElementById(currentDayCode),      // texto del nombre del día
                document.getElementById(`T${currentDayCode}`),// texto del tipo de misterio
                document.getElementById(`P${currentDayCode}`) // path principal del día
            ];
            
            currentDayElements.forEach(element => {
                if (element) {
                    element.setAttribute('visibility', 'visible');
                }
            });
            
            // Mostrar los misterios del día actual
            for (let i = 1; i <= 5; i++) {
                const elements = [
                    ...document.querySelectorAll(`#R${currentDayCode}${i}`),
                    ...document.querySelectorAll(`#T${currentDayCode}${i}`),
                    ...document.querySelectorAll(`#P${currentDayCode}${i}`)
                ];
                
                elements.forEach(element => {
                    if (element) {
                        element.setAttribute('visibility', 'visible');
                    }
                });
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
function mostrarMisterio(diaId, numeroMisterio) {
    traza("Mostrando misterio " + numeroMisterio + " del día " + diaId);
    
    // Remover cualquier capa flotante existente
    const capaExistente = document.querySelector('.capa-flotante');
    if (capaExistente) {
        capaExistente.remove();
    }
    
    // Mapear el ID del día al nombre del día
    const mapaDias = {
        'L': 'Lunes',
        'M': 'Martes',
        'X': 'Miercoles',
        'J': 'Jueves',
        'V': 'Viernes',
        'S': 'Sabado',
        'D': 'Domingo'
    };
    
    const dia = mapaDias[diaId];
    const misterio = formularios[formularioActual][dia].misterios[numeroMisterio - 1];
    const imagen = formularios[formularioActual][dia].imagen;
    
    // Separar autor y obra
    const [autor, obra] = imagen.autor_obra.split(',').map(s => s.trim());
    
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
        </div>
        <div class="contenido-misterio">
            <p>Misterio ${misterio.numero}</p>
            <p class="titulo-misterio">${misterio.titulo}</p>
            <p class="cita">${misterio.cita}</p>
            <p class="meditacion">${misterio.meditacion}</p>
        </div>
        <div class="navegacion-misterios">
            ${botonesNavegacion}
        </div>
    `;
    
    // Asegurarnos de que todos los elementos dentro de la capa sean visibles
    Array.from(capaFlotante.getElementsByTagName('*')).forEach(element => {
        element.style.visibility = 'visible';
    });
    
    // Función para cerrar la capa
    function cerrarCapa() {
        capaFlotante.remove();
        document.removeEventListener('click', cerrarAlClickFuera);
        document.removeEventListener('keydown', cerrarConEsc);
    }
    
    // Función para manejar clic fuera
    function cerrarAlClickFuera(e) {
        if (!capaFlotante.contains(e.target)) {
            cerrarCapa();
        }
    }
    
    // Función para manejar tecla ESC
    function cerrarConEsc(e) {
        if (e.key === 'Escape') {
            cerrarCapa();
        }
    }
    
    // Prevenir que los clics dentro de la capa la cierren
    capaFlotante.addEventListener('click', e => e.stopPropagation());
    
    // Agregar los event listeners
    document.addEventListener('click', cerrarAlClickFuera);
    document.addEventListener('keydown', cerrarConEsc);
    
    document.body.appendChild(capaFlotante);
}

// Modificar la función toggleVisibility para incluir la funcionalidad de mostrar misterio
function toggleVisibilityMisterio(nodeId) {
    // Prevenir que el evento se propague al SVG
    event.stopPropagation();
    
    // Verificar si es un clic en un misterio
    if (nodeId.match(/^[R][LMXJVSD][1-5]$/)) {
        const dia = nodeId[1];  // L, M, X, J, V, S o D
        const numeroMisterio = parseInt(nodeId[2]);
        mostrarMisterio(dia, numeroMisterio);
    }
}
