function loadData(){
    let request = sendRequest('api/proveedor/list', 'GET', '')
    let table = document.getElementById('proveedor-table');
    table.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
            table.innerHTML += `
                <tr>
                    <th>${element.id}</th>
                    <td>${element.nit}</td>
                    <td>${element.nombre}</td>
                    <td>${element.ciudad}</td>
                    <td>${element.telefono}</td>
                    <td>${element.direccion}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = 
                        "form_proveedores.html?idproveedor=${element.id}"'>Ver</button>
                    </td>
                </tr>

                `
        });
    }
    request.onerror = function(){
        table.innerHTML = `
            <tr>
                <td colspan="5">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}


function saveProveedor(){
    let ciudad = document.getElementById('proveedor-ciudad').value
    let id = document.getElementById('proveedor-id').value
    let nit = document.getElementById('proveedor-nit').value
    let nombre = document.getElementById('proveedor-nombre').value
    let telefono = document.getElementById('proveedor-telefono').value
    let direccion = document.getElementById('proveedor-direccion').value
    let data = {'id': id,'ciudad':ciudad,'direccion':direccion,'nombre': nombre, 
        'telefono': telefono, 'nit': nit}
    console.log(data);
    let request = sendRequest('api/proveedor/', id ? 'PUT' : 'POST', data)
    request.onload = function(){
        alert('Proveedor Creado Exitosamente.')
        window.location = 'proveedores.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}

function loadProveedor(idproveedor){
    let request = sendRequest('api/proveedor/list/'+idproveedor, 'GET', '')
    let ciudad = document.getElementById('proveedor-ciudad')
    let id = document.getElementById('proveedor-id')
    let nit = document.getElementById('proveedor-nit')
    let nombre = document.getElementById('proveedor-nombre')
    let telefono = document.getElementById('proveedor-telefono')
    let direccion = document.getElementById('proveedor-direccion')
    request.onload = function(){
        let data = request.response;
        //Se actualiza el valor de las variables según el JSON
        console.log(data);
        id.value = data.id
        ciudad.value = data.ciudad
        nit.value = data.nit
        nombre.value = data.nombre
        telefono.value = data.telefono
        direccion.value = data.direccion
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}

function deleteProveedor(){
    let id = document.getElementById('proveedor-id').value
    let request = sendRequest('api/proveedor/'+ id , 'DELETE', '')
    request.onload = function(){
        alert('Registro Eliminado Exitosamente.')
        window.location = 'proveedores.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}


