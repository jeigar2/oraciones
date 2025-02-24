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
    cerrarOracion();
    
    const oracion = oraciones[configuracion.idiomaSeleccionado][tipo];
    const capaOracion = document.createElement('div');
    capaOracion.className = 'capa-oracion';
    capaOracion.innerHTML = `
        <div class="oracion-contenido">
        <span class="cerrar-oracion" onclick="cerrarOracion()">X</span>
        <span class="contador">${configuracion.tiempoOracion}</span>
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
    const capaContador = document.querySelector('.contador');
    let segundosRestantes = configuracion.tiempoOracion / 1000;
    // Actualizar el contador cada segundo
    const intervalo = setInterval(() => {
        segundosRestantes--;
        capaContador.innerHTML = segundosRestantes;
        if (segundosRestantes <= 0) {
            clearInterval(intervalo);
            
        }
    }, 1000);
}

// Función para cerrar la oración
function cerrarOracion() {
    const oracionExistente = document.querySelector('.capa-oracion');
    if (oracionExistente) {
        oracionExistente.remove();
    }
}


// Función para mostrar la capa de oraciones iniciales
function mostrarOracionesIniciales() {
    let activo = true;
    let posicionActualOracion = 0;
    oracionInicialVisible = true;

    const capaOracionesIniciales = document.createElement('div');
    capaOracionesIniciales.className = 'capa-oraciones-iniciales';
    capaOracionesIniciales.style.display = 'block';
    capaOracionesIniciales.style.visibility = 'visible';


    capaOracionesIniciales.innerHTML = `
        <span class="cerrar-oraciones-iniciales" onclick="this.parentElement.remove()">&times;</span>
        <div class="oracion-inicial-container">
            <svg width="480" height="40" viewBox="0 0 480 40">
                ${oracionesIniciales.map((oracion, i) => 
                    `<rect class="oracion-inicial" x="${i * 38}" y="0" width="38" height="38" fill="green" data-index="${i}"/>`
                ).join('')}
            </svg>
            <p class="oracion-inicial-texto">${oracionesIniciales[0]}</p>
        </div>
        <button class="btn-rezar" id="btn-retroceder-oracion" disabled>&lt;</button>
        <button class="btn-rezar" id="btn-avanzar-oracion">&gt;</button>
    `;

    document.body.appendChild(capaOracionesIniciales);

    const btnAvanzarOracion = capaOracionesIniciales.querySelector('#btn-avanzar-oracion');
    const btnRetrocederOracion = capaOracionesIniciales.querySelector('#btn-retroceder-oracion');
    const oracionInicialTexto = capaOracionesIniciales.querySelector('.oracion-inicial-texto');

    btnAvanzarOracion.addEventListener('click', () => {
        avanzarOracion();
    });

    btnRetrocederOracion.addEventListener('click', () => {
        retrocederOracion();
    });

    function actualizarBotonesOracion() {
        btnRetrocederOracion.disabled = posicionActualOracion <= 0;
        btnAvanzarOracion.disabled = posicionActualOracion >= oracionesIniciales.length - 1;
    }

    // Función para manejar eventos de teclado
    function manejarTecladoOracionesIniciales(e) {
        if (activo) {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                avanzarOracion();                 
            } else if (e.key === 'ArrowLeft') {
                retrocederOracion();
            } else if (e.key === 'Escape') {
                eliminarOracionesIniciales();
            }
        }
        e.preventDefault(); // Prevenir el comportamiento por defecto
    }
    
    // Agregar el event listener para el teclado
    document.addEventListener('keydown', manejarTecladoOracionesIniciales);

    function avanzarOracion() {
        if (posicionActualOracion < oracionesIniciales.length - 1) {
            posicionActualOracion++;
            oracionInicialTexto.textContent = oracionesIniciales[posicionActualOracion];
            actualizarBotonesOracion();
        } else {
            eliminarOracionesIniciales();
        }
    }
    
    function retrocederOracion() {
        const oracionInicialTexto = document.querySelector('.oracion-inicial-texto');
        if (posicionActualOracion > 0) {
            posicionActualOracion--;
            oracionInicialTexto.textContent = oracionesIniciales[posicionActualOracion];
            actualizarBotonesOracion();
        }
    }

    function eliminarOracionesIniciales() { 
        document.removeEventListener('keydown', manejarTecladoOracionesIniciales);
        //capaOracionesIniciales.parentNode.removeChild(capaOracionesIniciales);
        capaOracionesIniciales.remove();
        activo = false;
    }
}


// Función para mostrar la capa de jaculatorias

function mostrarJaculatorias() {
    let activo = true;
    let posicionActualJaculatoria = 0;
    const capaJaculatorias = document.createElement('div');
    capaJaculatorias.className = 'capa-jaculatorias';
    capaJaculatorias.style.display = 'block';
    capaJaculatorias.style.visibility = 'visible';


    capaJaculatorias.innerHTML = `
        <span class="cerrar-jaculatorias" onclick="this.parentElement.remove()">&times;</span>
        <div class="jaculatoria-container">
            <svg width="480" height="40" viewBox="0 0 480 40">
                ${jaculatorias.map((jaculatoria, i) => 
                    `<rect class="jaculatoria" x="${i * 38}" y="0" width="38" height="38" fill="green" data-index="${i}"/>`
                ).join('')}
            </svg>
            <p class="jaculatoria-texto">${jaculatorias[0]}</p>
        </div>
        <button class="btn-rezar" id="btn-retroceder-jaculatoria" disabled>&lt;</button>
        <button class="btn-rezar" id="btn-avanzar-jaculatoria">&gt;</button>
    `;

    document.body.appendChild(capaJaculatorias);

    const btnAvanzarJaculatoria = capaJaculatorias.querySelector('#btn-avanzar-jaculatoria');
    const btnRetrocederJaculatoria = capaJaculatorias.querySelector('#btn-retroceder-jaculatoria');
    const jaculatoriaTexto = capaJaculatorias.querySelector('.jaculatoria-texto');

    btnAvanzarJaculatoria.addEventListener('click', () => {
        avanzarJaculatoria();
    });

    btnRetrocederJaculatoria.addEventListener('click', () => {
        retrocederJaculatoria();
    });

    function actualizarBotonesJaculatoria() {
        btnRetrocederJaculatoria.disabled = posicionActualJaculatoria <= 0;
        btnAvanzarJaculatoria.disabled = posicionActualJaculatoria >= jaculatorias.length - 1;
    }

    // Función para manejar eventos de teclado
    function manejarTecladoJaculatorias(e) {
        if(activo) {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                avanzarJaculatoria();                 
            } else if (e.key === 'ArrowLeft') {
                retrocederJaculatoria();
            } else if (e.key === 'Escape') {
                eliminarJaculatorias();
            }
        }
        e.preventDefault(); // Prevenir el comportamiento por defecto
    }
    
    // Agregar el event listener para el teclado
    document.addEventListener('keydown', manejarTecladoJaculatorias);

    function avanzarJaculatoria() {
        const jaculatoriaTexto = document.querySelector('.jaculatoria-texto');
        if (posicionActualJaculatoria < jaculatorias.length - 1) {
            posicionActualJaculatoria++;
            jaculatoriaTexto.textContent = jaculatorias[posicionActualJaculatoria];
            actualizarBotonesJaculatoria();
        } else {
            eliminarJaculatorias();
        }
    }
    
    function retrocederJaculatoria() {
        const jaculatoriaTexto = document.querySelector('.jaculatoria-texto');
        if (posicionActualJaculatoria > 0) {
            posicionActualJaculatoria--;
            jaculatoriaTexto.textContent = jaculatorias[posicionActualJaculatoria];
            actualizarBotonesJaculatoria();
        }
    }

    function eliminarJaculatorias() { 
        document.removeEventListener('keydown', manejarTecladoJaculatorias);
        //capaJaculatorias.parentNode.removeChild(capaJaculatorias);
        capaJaculatorias.remove();
        activo = false;

    }
}

