// TODO 
// los elementos tituloEstacion, subtituloEstacion, fraseOrante, respuestaPueblo se mostrarán siempre,
// pero cita, reflexión, padrenuestro avemaria, gloria, jaculatoria1 y jaculatoria2 y poema, 
// se mostrarán en una capa al pulsar la tecla + y se podrá retroceder con -
// se mostrará de uno en uno, primero la cita, luego la reflexion, luego el padrenuestro,
// luego el avemaria, luego el gloria, luego la jaculatoria1, luego la jaculatoria2 y por último el poema

document.addEventListener('DOMContentLoaded', function() {
  const oracionInicial = document.getElementById('oracionInicial');
  const estacion = document.getElementById('estacion');
  const btnMostrarOracionInicial = document.getElementById('btnMostrarOracionInicial');
  const btnMostrarPrimeraEstacion = document.getElementById('btnMostrarPrimeraEstacion');
  const btnMostrarSiguienteEstacion = document.getElementById('btnMostrarSiguienteEstacion');
  const btnMostrarAnteriorEstacion = document.getElementById('btnMostrarAnteriorEstacion');

  btnMostrarAnteriorEstacion.style.display = 'none';
  btnMostrarSiguienteEstacion.style.display = 'none';

  btnMostrarOracionInicial.addEventListener('click', function() {
    oracionInicial.style.display = 'block';
    estacion.style.display = 'none';
  });

  btnMostrarPrimeraEstacion.addEventListener('click', function() {
    oracionInicial.style.display = 'none';
    mostrarEstacion(0);
    btnMostrarSiguienteEstacion.style.display = 'block';
    btnMostrarPrimeraEstacion.style.display = 'none';
  });

  btnMostrarSiguienteEstacion.addEventListener('click', function() {
    const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
    if (currentIndex < viaCrucisData.length - 1) {
      mostrarEstacion(currentIndex + 1);
    } 
  });
  
  btnMostrarAnteriorEstacion.addEventListener('click', function() {
    oracionInicial.style.display = 'none';
    const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
    if (currentIndex > 0) {
      mostrarEstacion(currentIndex - 1);
    }
  });
  
  function mostrarEstacion(index) {
    const data = viaCrucisData[index];
    const total = viaCrucisData.length;
    const oraciones = oracionesComunes;
    document.getElementById('tituloEstacion').textContent = data.estacion;
    document.getElementById('subtituloEstacion').textContent = data.titulo;
    document.getElementById('fraseOrante').textContent = oraciones.fraseOrante;
    document.getElementById('respuestaPueblo').textContent = oraciones.respuestaPueblo;
    document.getElementById('cita').textContent = data.cita;
    document.getElementById('reflexion').innerHTML = '';
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
    let poema = document.createElement('ul');
    for (let i = 0; i < data.poema.length; i++) {
      let verso = document.createElement('li');
      if(data.poema[i] === ''){
        verso = document.createElement('br');
      } else if (i === data.poema.length) {
        verso = document.createElement('cite');
        verso.textContent = data.poema[i];
      } else {
        verso.textContent = data.poema[i];
      }
      poema.appendChild(verso);
      if (index === viaCrucisData.length - 1) {
        document.getElementById('oracionfinal').textContent = oracionFinal;
      } else {
        document.getElementById('oracionfinal').textContent = '';
      }
    }
    document.getElementById('poema').appendChild(poema);

    document.getElementById('imagenEstacion').src = "imagenes/" + data.imagen;
    estacion.style.display = 'block';
    if (index >= (total - 1)) {
        btnMostrarSiguienteEstacion.style.display = 'none';
    } else if (index <= 0 ) {
        btnMostrarAnteriorEstacion.style.display = 'none';
    } else {
        btnMostrarAnteriorEstacion.style.display = 'block';
        btnMostrarSiguienteEstacion.style.display = 'block';
    }

    // Desplazar la ventana al inicio de la pantalla
    window.scrollTo(0, 0);
  }

  // Añadir event listener para el teclado
  document.addEventListener('keydown', function(e) {
    oracionInicial.style.display = 'none';
    const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
    if (e.key === 'ArrowRight' && currentIndex < viaCrucisData.length - 1) {
      mostrarEstacion(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {   
      mostrarEstacion(currentIndex - 1);
    } else if (e.key === 'Escape') {
      oracionInicial.style.display = 'none';
      estacion.style.display = 'none';
      btnMostrarPrimeraEstacion.style.display = 'block';
      btnMostrarSiguienteEstacion.style.display = 'none';
      btnMostrarAnteriorEstacion.style.display = 'none';
    }
  });

  // Añadir event listener para el toque en la capa de estaciones
  estacion.addEventListener('touchstart', function(e) {
    const touchX = e.touches[0].clientX;
    const rect = estacion.getBoundingClientRect();
    const leftBoundary = rect.left + (rect.width * 0.1);
    const rightBoundary = rect.right - (rect.width * 0.1);

    if (touchX < leftBoundary) {
      // Retroceder a la estación anterior
      const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
      if (currentIndex > 0) {
        mostrarEstacion(currentIndex - 1);
      }
    } else if (touchX > rightBoundary) {
      // Avanzar a la siguiente estación
      const currentIndex = viaCrucisData.findIndex(data => data.estacion === document.getElementById('tituloEstacion').textContent);
      if (currentIndex < viaCrucisData.length - 1) {
        mostrarEstacion(currentIndex + 1);
      }
    }
  });
});