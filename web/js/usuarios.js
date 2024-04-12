function loadData(){
    let request = sendRequest('api/usuarios/list', 'GET', '')
    let table = document.getElementById('usuarios-table');
    table.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
            table.innerHTML += `
                <tr>
                    <th>${element.id}</th>
                    <td>${element.idTipoDocumento.tipo}</td>
                    <td>${element.numeroDocumento}</td>
                    <td>${element.nombre}</td>
                    <td>${element.email}</td>
                    <td>${element.nombreUsuario}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = 
                        "form_usuarios.html?idusuario=${element.id}"'>Ver</button>
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

function loadDataTipo(){
    let request = sendRequest('api/usuarios/tipoDocumento', 'GET', '')
    let $tipo = document.getElementById('usuario-tipodocumento')
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        let elementos = '<option selected disables>--Seleccione--</option>'
        for(let i = 0;i < data.length; i++){
            elementos += '<option value="' + data[i].id +'" >' + data[i].tipo +'</option>'
        }
        $tipo.innerHTML = elementos
        console.log($tipo);
        listaTipo = data;
        console.log(listaTipo);
    }
    request.onerror = function(){
        table.innerHTML = `
            <tr>
                <td colspan="5">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}

function saveUsuario(){
    let email = document.getElementById('usuario-email').value
    let id = document.getElementById('usuario-id').value
    let documento = document.getElementById('usuario-documento').value
    let tipdoc = document.getElementById('usuario-tipodocumento').value
    let nombre = document.getElementById('usuario-nombres').value
    let nombreUsuario = document.getElementById('usuario-nombreusuario').value
    let password = document.getElementById('usuario-password').value
    let data = {'id': id,'idTipoDocumento':tipdoc,'numeroDocumento':documento,'nombre': nombre, 
        'password': password, 'nombreUsuario': nombreUsuario, 'email':email }
    console.log(data);
    let request = sendRequest('api/usuarios/', id ? 'PUT' : 'POST', data)
    request.onload = function(){
        window.location = 'usuarios.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}

function loadUsuario(idusuario){
    let request = sendRequest('api/usuarios/list/'+idusuario, 'GET', '')
    let email = document.getElementById('usuario-email')
    let id = document.getElementById('usuario-id')
    let documento = document.getElementById('usuario-documento')
    let tipdoc = document.getElementById('usuario-tipodocumento')
    let nombre = document.getElementById('usuario-nombres')
    let nombreUsuario = document.getElementById('usuario-nombreusuario')
    let password = document.getElementById('usuario-password')
    request.onload = function(){
        let data = request.response;
        //Se actualiza el valor de las variables según el JSON
        console.log(data);
        console.log(data.idTipoDocumento);
        id.value = data.id
        documento.value = data.numeroDocumento
        tipdoc.value = data.idTipoDocumento.id
        nombre.value = data.nombre
        nombreUsuario.value = data.nombreUsuario
        password.value = data.password
        email.value = data.email
        console.log(listaTipo);
        console.log(data.idTipoDocumento.id);
        console.log(data.idTipoDocumento.tipo);
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}

function deleteUsuario(){
    let id = document.getElementById('usuario-id').value
    let request = sendRequest('api/usuarios/'+ id , 'DELETE', '')
    request.onload = function(){
        alert('Registro Eliminado Exitosamente.')
        window.location = 'usuarios.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}


