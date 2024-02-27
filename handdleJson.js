const fs = require('fs');

function guardarEnJSON(datos, rutaCompletaArchivo) {
    let datosExistente = [];

    try {
        // Intenta leer el archivo JSON si existe
        const datosArchivo = fs.readFileSync(rutaCompletaArchivo, 'utf8');
        datosExistente = JSON.parse(datosArchivo);
    } catch (error) {
        // Si el archivo no existe, se maneja creando uno nuevo
        if (error.code === 'ENOENT') {
            console.log("El archivo no existe, se creará uno nuevo.");
            fs.writeFileSync(rutaCompletaArchivo, '[]');
        } else {
            console.error("Ocurrió un error:", error.message);
            return;
        }
    }

    // Agrega los nuevos datos al conjunto existente
    datosExistente = datosExistente.concat(datos);

    // Convierte los datos actualizados a formato JSON
    const datosActualizados = JSON.stringify(datosExistente, null, 2);

    // Escribe los datos en el archivo JSON
    fs.writeFileSync(rutaCompletaArchivo, datosActualizados);

    console.log('Datos agregados correctamente al archivo JSON.');
}




function obtenerDatosJSON(rutaCompletaArchivo) {
    try {
        const datosArchivo = fs.readFileSync(rutaCompletaArchivo, 'utf8');
        const datos = JSON.parse(datosArchivo);
        return datos;
    } catch (error) {
        console.error("Ocurrió un error al leer el archivo:", error.message);
        return null;
    }
}



/*
// Datos de ejemplo para agregar al archivo JSON
const nuevosDatos = [16, 17, 18, 19, 20];

// Ruta completa donde se guardará el archivo JSON
const rutaArchivo = '/ruta/completa/hacia/el/archivo/datos.json';

// Llamada a la función para guardar los nuevos datos en el archivo JSON
guardarEnJSON(nuevosDatos, rutaArchivo);
*/
module.exports={ guardarEnJSON,obtenerDatosJSON};
