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
    