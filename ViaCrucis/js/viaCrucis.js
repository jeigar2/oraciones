document.addEventListener('DOMContentLoaded', function() {
  const oracionInicial = document.getElementById('oracionInicial');
  const estacion = document.getElementById('estacion');
  const btnMostrarOracionInicial = document.getElementById('btnMostrarOracionInicial');
  const btnMostrarPrimeraEstacion = document.getElementById('btnMostrarPrimeraEstacion');

  btnMostrarOracionInicial.addEventListener('click', function() {
    oracionInicial.style.display = 'block';
  });

  btnMostrarPrimeraEstacion.addEventListener('click', function() {
    mostrarEstacion(0);
  });

  function mostrarEstacion(index) {
    const data = viaCrucisData[index];
    const oraciones = oracionesComunes;
    document.getElementById('tituloEstacion').textContent = data.estacion;
    document.getElementById('subtituloEstacion').textContent = data.titulo;
    document.getElementById('fraseOrante').textContent = oraciones.fraseOrante;
    document.getElementById('respuestaPueblo').textContent = oraciones.respuestaPueblo;
    document.getElementById('cita').textContent = data.cita;
    document.getElementById('reflexion').innerHTML = '';
    // el data.reflexion es un array de strings, por lo que se debe iterar y añadir un parrafo por cada elemento
    for (let i = 0; i < data.reflexion.length; i++) {
      const reflexion = document.createElement('p');
      reflexion.textContent = data.reflexion[i];
      document.getElementById('reflexion').appendChild(reflexion);
    }
    document.getElementById('padrenuestro').textContent = oraciones.padrenuestro;
    document.getElementById('avemaria').textContent = oraciones.avemaria;
    document.getElementById('gloria').textContent = oraciones.gloria;
    document.getElementById('jaculatoria1').textContent = oraciones.jaculatoria1;
    document.getElementById('jaculatoria2').textContent = oraciones.jaculatoria2;
    document.getElementById('poema').innerHTML = '';
    // el data.poema es un array de strings, por lo que se debe iterar y añadir un parrafo por cada elemento
    let poema = document.createElement('ul');
    for (let i = 0; i < data.poema.length; i++) {
      let verso = document.createElement('li');
      if(data.poema[i] === ''){
        verso = document.createElement('br');
      } else if (i === data.poema.length) {
        // el último verso es el autor sera un elemento <cite>
        verso = document.createElement('cite');
        verso.textContent = data.poema[i];
      } else {
        verso.textContent = data.poema[i];
      }
      poema.appendChild(verso);
    }
    document.getElementById('poema').appendChild(poema);

    document.getElementById('imagenEstacion').src = "imagenes/" + data.imagen;
    estacion.style.display = 'block';
  }

  // Añadir event listener para el teclado
  document.addEventListener('keydown', function(e) {
    const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);

    if (e.key === 'ArrowRight' && currentIndex < viaCrucisData.length - 1) {
      mostrarEstacion(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      mostrarEstacion(currentIndex - 1);
    }
  }
  );    


  // Añadir event listener para el toque en la capa de estaciones
  estacion.addEventListener('touchstart', function(e) {
    const touchX = e.touches[0].clientX;
    const rect = estacion.getBoundingClientRect();
    const midX = rect.left + (rect.width / 10);

    if (touchX > midX) {
      // Avanzar a la siguiente estación
      const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
      if (currentIndex < viaCrucisData.length - 1) {
        mostrarEstacion(currentIndex + 1);
      }
    } else {
      // Retroceder a la estación anterior
      const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
      if (currentIndex > 0) {
        mostrarEstacion(currentIndex - 1);
      }
    }
  });
});