// Variables globales de configuración
let configuracion = {
    tiempoOracion: 10000,
    autoOcultarOracion: true,
    maxTrazas: 100,
    idiomaSeleccionado: 'ES',
    version: '3.2'
};

// Variable global para almacenar el historial de trazas
let historialTrazas = [];

// Variable para el contador de trazas
let contadorTrazas = 0;

// Variable para controlar si hay cambios sin guardar
let configCambiada = false;