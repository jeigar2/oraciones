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