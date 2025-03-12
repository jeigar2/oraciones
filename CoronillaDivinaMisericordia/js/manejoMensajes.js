// Función para mostrar texto
// el id es opcional, si no se proporciona, se asume que es null y no se reproduce audio
// el id se pasa a la función playAudio para reproducir el audio correspondiente  
// el id lo capturamos en la funcion simulateEvent  
function mostrarTexto(id = null, obj, respuesta = null) {
    var mensaje = window.document.getElementById("mensaje");
    var frase = obj.textContent ? obj.textContent : obj;
    
    if (respuesta) {
        mensaje.innerHTML = "<span class='frase'>" + frase + "</span><br><span class='respuesta'>" + respuesta + ".<span>";
    } else {
        mensaje.textContent = frase;
    }
    
    var imageColumn = document.getElementById('image-column');
    var maxTop = imageColumn.clientHeight - mensaje.offsetHeight - 40;
    mensaje.style.top = Math.min(410, maxTop) + "px";
}

// Función para mostrar HTML
function mostrarHTML(id = null, fragmentoHTML, altura) {
    var mensaje = window.document.getElementById("mensaje");
    mensaje.innerHTML = fragmentoHTML;
    var imageColumn = document.getElementById('image-column');
    var maxTop = imageColumn.clientHeight - mensaje.offsetHeight - 40;
    mensaje.style.top = Math.min(altura, maxTop) + "px";
}

// Función para ocultar texto
function ocultarTexto() {
    var mensaje = window.document.getElementById("mensaje");
    mensaje.textContent = "";
}

// Función para ocultar un elemento
function ocultar(obj) {
    obj.style.display = 'none';
}