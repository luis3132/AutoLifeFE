function loadData(){
    let request = sendRequest('api/vehiculo/list', 'GET', '')
    let table = document.getElementById('vehiculo-table');
    table.innerHTML = "";
    request.onload = function(){
        
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
                        "form_clientes.html?idcliente=${element.numSerie}"'>Ver</button>
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


function loadCliente(idcliente){
    let select = document.getElementById('tipo-vehi');
    select.innerHTML = "";
    let request = sendRequest('api/vehiculo/list/'+idcliente, 'GET', '')
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
    let tipo_vehi = document.getElementById('tipo-vehi')
      request.onload = function(){
        
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
        console.log(data1);
        data1.forEach((element, index) => {
            table.innerHTML += `
                    <option value="${element.id}">"${element.nombre}"</option>
                `});
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}
function saveCliente(){
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
    data.forEach((element, index) => {
        table.innerHTML += `
                <option value="${element.id}">"${element.nombre}"</option>
            `});
    let data = {'numSerie': numSerie,'placa':placa,'marca': marca, 'modelo': modelo, 
        'referencia': referencia, 'serie': serie, 'color':color, "kilometraje": kilometraje, "ciudadProcedencia": ciudadProcedencia, "usuario": usuario, "tipovehiculo": tipovehiculo, }
    let request = sendRequest('api/vehiculo/new', 'POST', data)
    request.onload = function(){
        window.location = 'vehiculos.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}

function deleteCliente(){
    let id = document.getElementById('num-serie').value
    let request = sendRequest('api/vehiculo/'+ id , 'DELETE', '')
    request.onload = function(){
        alert('Registro Eliminado Exitosamente.')
        window.location = 'clientes.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}

