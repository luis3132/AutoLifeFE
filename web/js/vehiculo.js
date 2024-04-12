function loadData() {
    let request = sendRequest('api/vehiculo/list', 'GET', '')
    let table = document.getElementById('vehiculo-table');
    table.innerHTML = "";
    request.onload = function () {

        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
            table.innerHTML += `
                <tr>
                    <th>${element.numSerie}</th>
                    <td>${element.placa}</td>
                    <td>${element.marca}</td>
                    <td>${element.modelo}</td>
                    <td>${element.referencia}</td>
                    <td>${element.serie}</td>
                    <td>${element.color}</td>
                    <td>${element.kilometraje}</td>
                    <td>${element.ciudadProcedencia}</td>
                    <td>${element.usuario}</td>
                    <td>${element.tipovehiculo.nombre}</td>
                    
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = 
                        "form_edicion_vehiculo.html?idvehiculo=${element.numSerie}"'>Ver</button>
                    </td>
                </tr>

                `
        });
    }
    request.onerror = function () {
        table.innerHTML = `
            <tr>
                <td colspan="5">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}


function loadVehiculo(idvehiculo) {
    let select = document.getElementById('tipo-vehi');
    select.innerHTML = "";
    let request = sendRequest('api/vehiculo/list/' + idvehiculo, 'GET', '')
    let request1 = sendRequest('api/tipovehiculo/list', 'GET', '')

    let numSerie = document.getElementById('num-serie')
    let placa = document.getElementById('placa')
    let marca = document.getElementById('marca')
    let modelo = document.getElementById('modelo')
    let referencia = document.getElementById('ref')
    let serie = document.getElementById('serie')
    let color = document.getElementById('color')
    let kilometraje = document.getElementById('km')
    let ciudadProcedencia = document.getElementById('ciudad-proce')
    let usuario = document.getElementById('usuario')

    request.onload = function () {
        let data = request.response;
        numSerie.value = data.numSerie
        placa.value = data.placa
        marca.value = data.marca
        modelo.value = data.modelo
        referencia.value = data.referencia
        serie.value = data.serie
        color.value = data.color
        kilometraje.value = data.kilometraje
        ciudadProcedencia.value = data.ciudadProcedencia
        usuario.value = data.usuario

        let data1 = request1.response;
        console.log(data.tipovehiculo.id);
        console.log(data1.id);
        data1.forEach((element, index) => {
            if (data.tipovehiculo.id == element.id) {
                select.innerHTML += `
                    <option selected ="selected" value="${element.id}">"${element.nombre}"</option>
                `
            } else {
                select.innerHTML += `
                    <option value="${element.id}">"${element.nombre}"</option>
                `
            }
        });
    }
    request.onerror = function () {
        alert("Error al recuperar los datos.");
    }
}
function crearVehiculo() {
    let numSerie = document.getElementById('num-serie').value
    let placa = document.getElementById('placa').value
    let marca = document.getElementById('marca').value
    let modelo = document.getElementById('modelo').value
    let referencia = document.getElementById('ref').value
    let serie = document.getElementById('serie').value
    let color = document.getElementById('color').value
    let kilometraje = document.getElementById('km').value
    let ciudadProcedencia = document.getElementById('ciudad-proce').value
    let usuario = document.getElementById('usuario').value
    let tipovehiculo = document.getElementById('tipo-vehi').value
    console.log(tipovehiculo)
    let tv = sendRequest('api/tipovehiculo/list/' + tipovehiculo, 'GET', '')

    tv.onload = function () {
        let data = {
            'numSerie': numSerie,
            'placa': placa,
            'marca': marca,
            'modelo': modelo,
            'referencia': referencia,
            'serie': serie,
            'color': color,
            "kilometraje": kilometraje,
            "ciudadProcedencia": ciudadProcedencia,
            "usuario": usuario,
            "tipovehiculo": tv.response
        }
        let request = sendRequest('api/vehiculo/new', 'POST', data)
        
        request.onload = function () {
            window.location = 'vehiculos.html';
        }
        request.onerror = function () {
            alert('Error al guardar los cambios.')
        }
    }

}

function guardarVehiculo(){


}


function loadTipoVehiculo() {
    let select = document.getElementById('tipo-vehi');
    select.innerHTML = "";

    let request1 = sendRequest('api/tipovehiculo/list', 'GET', "")

    request1.onload = function () {

        let data1 = request1.response;
        data1.forEach((element, index) => {
            select.innerHTML += `
                <option value="${element.id}">"${element.nombre}"</option>
            `});
    }

}

function eliminarVehiculo() {
    let id = document.getElementById('num-serie').value
    let request = sendRequest('api/vehiculo/delete/' + id, 'DELETE', '')
    request.onload = function () {
        alert('Registro Eliminado Exitosamente.')
        window.location = 'vehiculos.html';
    }
    request.onerror = function () {
        alert('Error al elminar.')
    }
}

