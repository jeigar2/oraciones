function changeStroke(rect, id, color, width) {
    console.log("changeStroke");
  //var rect = document.getElementById(id);
  rect.setAttribute('stroke', color);
 
  var size = 0;
  if (width == 1) {
    size = rect.getAttribute('font-size') * 1.15;
    size = 18;
  } else {
    size = rect.getAttribute('font-size') / 1.15;
    size = 12;
  }
  rect.setAttribute('stroke-width', width);
  rect.setAttribute('font-size', size);
  traza ("id: " + id + ", color: " + color + ", width: " + width + ", size: " + size);
}

function changeStyle(rect, id, className) {
    //var rect = document.getElementById(id);
    traza("id: " + id + ", estilo: " + rect.className + ", nuevo estilo:" + className)
    rect.className = className;
  }

function traza(mensaje){
    var capa = document.getElementById("evento");
    capa.innerText = mensaje;
}

function addBalls(yo) {
   /* console.log("addBalls");
    // Obtener el rectángulo y su posición
    var rect = document.getElementById('RL2');
    var x = parseInt(rect.getAttribute('x'));
    var y = parseInt(rect.getAttribute('y'));

    // Crear los elementos adicionales (bolas y texto)
    for (var i = 1; i <= 10; i++) {
    var ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ball.setAttribute('cx', x + 16 + Math.random() * 256);
    ball.setAttribute('cy', y + 16 + Math.random() * 256);
    ball.setAttribute('r', 8);
    ball.setAttribute('fill', 'none');
    ball.setAttribute('stroke', '#181818');
    ball.setAttribute('stroke-width', '1');

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = i.toString();
    text.setAttribute('x', x + 16 + Math.random() * 256);
    text.setAttribute('y', y + 16 + Math.random() * 256);
    text.setAttribute('font-size', '14');
    text.setAttribute('font-family', 'sans-serif');
    text.setAttribute('fill', '#181818');

    // Agregar los elementos adicionales al documento
    document.body.appendChild(ball);
    document.body.appendChild(text);
    }*/
    //alert("Cargado--- " + this + ",  " + yo + "- " + yo.width.baseVal.value + ", " + this.width);
}
