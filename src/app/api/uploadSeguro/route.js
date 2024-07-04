import { writeFile } from 'fs/promises'
import path from 'path';

export async function POST(request) {
    // get all info to save in server
    const data = await request.formData();
    const file = data.get('file');
    const token = data.get('token');
    const seguroString = data.get('seguro');
    const seguro = JSON.parse(seguroString);

    const fs = require('fs');

    // Name of the folder
    const nombreCarpeta = seguro.vehiculo;

    // Verify if the folder exist
    const rutaCarpeta = path.join(process.cwd(), 'public', 'imagenes', 'Regulacion', 'Seguro', nombreCarpeta);

    if (!fs.existsSync(rutaCarpeta)) {
        // mkdir
        fs.mkdirSync(rutaCarpeta, { recursive: true }); // the recursive option create the father folder only if this foldes doesn't exist
        console.log('Carpeta creada exitosamente.');
    } else {
        console.log('La carpeta ya existe.');
    }


    // Verify if the uploaded file is an image
    if (!file || !file.type.startsWith('image/')) {
        return new Response(JSON.stringify({
            error: "El archivo subido no es una imagen"
        }), { status: 400 });
    }

    // convert to bytes info of file
    const bytesFile = await file.arrayBuffer();
    const buffer = Buffer.from(bytesFile);

    // add Path to save the image
    const folderName = seguro.vehiculo;
    const pathFile = path.join(process.cwd(), 'public/imagenes/Regulacion/Seguro', folderName, file.name)

    // set hour
    const hoy = new Date(); const dia = hoy.getDate(); const mes = hoy.getMonth() + 1; const anio = hoy.getFullYear();
    const hora = hoy.getHours(); const min = hoy.getMinutes(); const seg = hoy.getSeconds();

    // Set ID
    const id = seguro.id + '-' + anio + '-' + mes + '-' + dia + '-' + hora + '-' + min + '-' + seg
    const pathFoto = path.join('/imagenes/Regulacion/Seguro', folderName, file.name)

    // Set the fotos object
    const foto = {
        id: id,
        foto: pathFoto,
        seguro: seguro.id
    }

    // Add register in DB and save image in server
    try {
        const response = await fetch(`${process.env.HOSTNAME}/api/fotos/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(foto)
        });
        if (response.ok) {
            const res = await response.json();
            writeFile(pathFile, buffer);
        } else {
            return new Response(JSON.stringify({
                error: "Error al subir la Imagen"
            }), { status: 400 });
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: "Error al subir la Imagen"
        }), { status: 400 });
    }

    return new Response(
        JSON.stringify({
            message: "Uploaded File"
        }))
}