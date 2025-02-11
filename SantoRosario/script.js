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

            // Restaurar posiciones originales de Santo Rosario y sus textos
            const santoRosarioRect = document.getElementById('SantoRosario');
            const sr1Text = document.getElementById('SR1');
            const sr2Text = document.getElementById('SR2');
            const pathPJ = document.getElementById('PJ');

            if (santoRosarioRect) santoRosarioRect.setAttribute('y', '993.3438');
            if (sr1Text) sr1Text.setAttribute('y', '1016.3389');
            if (sr2Text) sr2Text.setAttribute('y', '1032.6357');
            if (pathPJ) pathPJ.setAttribute('d', 'M82,1019.6406 L92,1019.6406 C107,1019.6406 107,1019.6406 122,1019.6406 L132,1019.6406');

            // Restaurar la posición del scroll
            window.scrollTo(0, scrollPosition);
        
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
            
            // Obtener el rectángulo del día actual y del lunes
            const currentDayRect = document.getElementById(currentDay);
            const lunesRect = document.getElementById("Lunes");
            
            if (currentDayRect && lunesRect && currentDay !== "Lunes") {
                // Obtener las coordenadas del lunes
                const lunesY = lunesRect.getAttribute('y');
                const currentY = currentDayRect.getAttribute('y');
                
                // Calcular la diferencia en Y
                const deltaY = parseFloat(lunesY) - parseFloat(currentY);
                
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

                // Mover Santo Rosario y sus textos
                const santoRosarioRect = document.getElementById('SantoRosario');
                const sr1Text = document.getElementById('SR1');
                const sr2Text = document.getElementById('SR2');
                const pathPJ = document.getElementById('PJ');

                if (santoRosarioRect) santoRosarioRect.setAttribute('y', '124.4453');
                if (sr1Text) sr1Text.setAttribute('y', '147.4404');
                if (sr2Text) sr2Text.setAttribute('y', '163.7373');
                if (pathPJ) pathPJ.setAttribute('d', 'M82.377,150.7422 L92.377,150.7422 C107.377,150.7422 107.377,150.7422 122.377,150.7422 L132.377,150.7422');

                // Mostrar el path del Jueves
                const pathJueves = document.getElementById('PJ');
                //const pathLunes1 = document.getElementById('PJ1');
                if (pathJueves) pathJueves.setAttribute('visibility', 'visible');
                //if (pathLunes1) pathLunes1.setAttribute('visibility', 'visible');
            } else if (currentDay === "Lunes") {
                // Mostrar solo el lunes
                const elements = [
                    lunesRect,
                    document.getElementById("L"),
                    document.getElementById("TL"),
                    document.getElementById("PL")
                ];
                
                // Añadir los misterios del día lunes
                for (let i = 1; i <= 5; i++) {
                    elements.push(
                        ...document.querySelectorAll(`#RL${i}`),
                        ...document.querySelectorAll(`#TL${i}`),
                        ...document.querySelectorAll(`#PL${i}`)
                    );
                }

                elements.forEach(element => {
                    if (element) {
                        //element.removeAttribute('transform');
                        element.setAttribute('visibility', 'visible');
                    }
                });

            }
            
            traza("Mostrando misterios del " + currentDay);

            // Guardar la posición del scroll y mover al inicio
            scrollPosition = window.scrollY;
            window.scrollTo(0, 0);
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

// Tomada las meditaciones por formulario de esta 
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
        'V': { nombre: 'Viernes', tipo: 'Doloroso' },
        'S': { nombre: 'Sabado', tipo: 'Gozoso' },
        'D': { nombre: 'Domingo', tipo: 'Glorioso' }
    };
    
    const { nombre: dia, tipo } = mapaDias[diaId];
    const misterio = formularios[formularioActual][dia].misterios[numeroMisterio - 1];
    const imagen = formularios[formularioActual][dia].imagen;
    let imagenesSantoRosario = null;
    
    // Cargar las imágenes alternativas según el tipo de misterio
 //   fetch('Imagenes-Santo_Rosario.json')
 //       .then(response => response.json())
 //       .then(data => {
 //           const tipoMisterio = tipo + "s"; // Convertir "Gozoso" a "Gozosos", etc.
 //           imagenesSantoRosario = data[tipoMisterio].imagenes;
 //            
 //       });
    
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
                        `<circle class="bola bola-ave" cx="${(i + 2) * 38 + 4}" cy="20" r="10"/>`
                    ).join('')}
                    <circle class="bola bola-jaculatoria" cx="${12 * 38 + 4}" cy="20" r="8"/>
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
            if (posicionActual < 11) {
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
                if (index === posicionActual) {
                    switch (index) {
                        case 0:
                            mostrarOracion('padrenuestro');
                            break;
                        case 11:
                            mostrarOracion('gloria');
                            break;
                        default:
                            mostrarOracion('avemaria');
                            break;
                    }
                    //mostrarOracion(index === 0 ? 'padrenuestro' : 'avemaria');
                }
            }
        });

        // Actualizar botones
        btnRetroceder.disabled = posicionActual < 0;
        btnAvanzar.disabled = posicionActual >= 11; // index 11 es la jaculatoria final
    }
    
    // Función para mostrar la oración
    function mostrarOracion(tipo) {
        // Verificar si existe la capa del misterio
        const capaMisterio = document.querySelector('.capa-flotante');
        if (!capaMisterio) {
            return;
        }
        
        const oraciones = {
            ES: {
                padrenuestro: {
                    primera: "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.",
                    segunda: "Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén."
                },
                avemaria: {
                    primera: "Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.",
                    segunda: "Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
                },
                gloria: {
                    primera: "Gloria al Padre, y al Hijo, y al Espíritu Santo.",
                    segunda: "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
                }
            }, 
            IT: {
                padrenuestro: {
                    primera: "Padre nostro, che sei nei cieli, sia santificato il tuo nome; venga il tuo regno; sia fatta la tua volontà, come in cielo così in terra.",
                    segunda: "Dacci oggi il nostro pane quotidiano; rimetti a noi i nostri debiti, come noi li rimettiamo ai nostri debitori; e non ci indurre in tentazione, ma liberaci dal male. Amen."
                },
                avemaria: {
                    primera: "Ave Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del tuo seno, Gesù.",
                    segunda: "Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen."
                },
                gloria: {
                    primera: "Gloria al Padre e al Figlio e allo Spirito Santo.",
                    segunda: "Come era nel principio, e ora e sempre, nei secoli dei secoli. Amen."
                }
            },
            LA: { // Latín
                padrenuestro: {
                    primera: "Pater noster, qui es in caelis, sanctificetur nomen tuum; adveniat regnum tuum; fiat voluntas tua, sicut in caelo et in terra.",
                    segunda: "Panem nostrum quotidianum da nobis hodie; et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris; et ne nos inducas in tentationem, sed libera nos a malo. Amen."
                },
                avemaria: {
                    primera: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus.",
                    segunda: "Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen."
                },
                gloria: {
                    primera: "Gloria Patri, et Filio, et Spiritui Sancto.",
                    segunda: "Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen."
                }
            }
        };
        
        // Remover oración anterior si existe
        const oracionExistente = document.querySelector('.capa-oracion');
        if (oracionExistente) oracionExistente.remove();
        
        const oracion = oraciones[configuracion.idiomaSeleccionado][tipo];
        const capaOracion = document.createElement('div');
        capaOracion.className = 'capa-oracion';
        capaOracion.innerHTML = `
            <div class="oracion-contenido">
                <p class="primera-parte">${oracion.primera}</p>
                <p class="segunda-parte">${oracion.segunda}</p>
            </div>
        `;
        
        document.body.appendChild(capaOracion);
        
        // Auto-ocultar si está configurado
        if (configuracion.autoOcultarOracion) {
            setTimeout(() => {
                if (capaOracion.parentNode) {
                    capaOracion.remove();
                }
            }, configuracion.tiempoOracion);
        }
    }
    
    // Función para cerrar la capa
    function cerrarCapa() {
        capaFlotante.remove();
        // Ocultar la capa de oración si existe
        const capaOracion = document.querySelector('.capa-oracion');
        if (capaOracion) {
            capaOracion.remove();
            traza("Cerrar ventana oración");
        }
        document.removeEventListener('click', cerrarAlClickFuera);
        document.removeEventListener('keydown', cerrarConEsc);
        document.removeEventListener('keydown', manejarTeclado);
        traza("Cerrar ventana misterio");
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
    // Si hay un input activo, no procesar atajos de teclado
    if (document.activeElement.tagName === 'INPUT') {
        return;
    }

    if (e.key.toLowerCase() === 'h') {
        mostrarAyuda();
    } else if (e.key.toLowerCase() === 'l') {
        mostrarHistorial();
    } else if (e.key.toLowerCase() === 'c') {
        mostrarConfiguracion();
    } else if (e.key.toLowerCase() === 'i') {   
        cambiarImagen(e.target.checked);
    } else {
        // Mapeo de teclas numéricas a días
        const teclasDias = {
            '0': 'SantoRosario',
            '1': 'Lunes',
            '2': 'Martes',
            '3': 'Miercoles',
            '4': 'Jueves',
            '5': 'Viernes',
            '6': 'Sabado',
            '7': 'Domingo'
        };
        
        if (teclasDias[e.key]) {
            const nodo = document.getElementById(teclasDias[e.key]);
            if (nodo) {
                toggleVisibility(teclasDias[e.key]);
                traza(`Activado ${teclasDias[e.key]} con tecla ${e.key}`);
            }
        }
    }
});

// Función para cambiar el idioma
function cambiarIdioma(nuevoIdioma) {
    if (oraciones[nuevoIdioma]) {
        idiomaSeleccionado = nuevoIdioma;
        traza("Idioma cambiado a: " + nuevoIdioma);
    } else {
        traza("Idioma no soportado: " + nuevoIdioma);
    }
}

/*
// Establecer el idioma por defecto en el selector
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('idioma').value = idiomaSeleccionado;
});
*/

obtenerInfoDispositivo();