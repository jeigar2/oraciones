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
