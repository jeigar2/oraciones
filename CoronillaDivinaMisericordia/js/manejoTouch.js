    // Función para manejar el toque en la columna derecha
    function handleTouch(e) {
        const touchY = e.touches[0].clientY;
        const columnRight = document.querySelector('.column.right');
        const columnRect = columnRight.getBoundingClientRect();
        const columnMidY = columnRect.top + (columnRect.height / 2);
  
        if (touchY > columnMidY) {
          // Tocado en la mitad inferior
          e.preventDefault();
          moveForward();
        } else {
          // Tocado en la mitad superior
          e.preventDefault();
          moveBackward();
        }
      }
  
      // Añadir event listener para el toque en la columna derecha
      document.querySelector('.column.right').addEventListener('touchstart', handleTouch);