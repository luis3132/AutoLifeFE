function loadData(usuario) {
    let request = sendRequest('api/usuarios/list/nombreusuario/' + usuario, 'GET', '')
    request.onload = function () {
        let data = request.response;
        let request1 = sendRequest('api/vehiculo/list/usuario/' + data.dni, 'GET', '')
        request1.onload = function () {
            let data1 = request1.response
            let table = document.getElementById('vehiculo-table');
            table.innerHTML = "";
            data1.forEach((element, index) => {
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
                            "form_edicion_vehiculo.html?numserie=${element.numSerie}"'>Ver</button>
                        </td>
                    </tr>
    
                    `
            });
        }
        request1.onerror = function () {
            table.innerHTML = `
                <tr>
                    <td colspan="5">Error al recuperar los datos, o no Tiene vehiculos</td>
                </tr>
            `;
        }
    }
    request.onerror = function () {
        table.innerHTML = `
            <tr>
                <td colspan="5">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}


function loadVehiculo(numserie) {
    let request = sendRequest('api/vehiculo/list/' + numserie, 'GET', '')
    let request1 = sendRequest('api/tipovehiculo/list', 'GET', '')

    let numSerie = document.getElementById('num-serie')
    let placa = document.getElementById('placa')
    let marca = document.getElementById('marca')
    let modelo = document.getElementById('modelo')
    let referencia = document.getElementById('ref')
    let serie = document.getElementById('serie')
    let color = document.getElementById('color')
    let kilometraje = document.getElementById('km')
    let ciudadPromTransi = document.getElementById('ciudadpromtran')
    let ciudadProcedencia = document.getElementById('ciudad-proce')
    let usuario = document.getElementById('usuario')

    let select = document.getElementById('tipo-vehi');
    select.innerHTML = "";

    request1.onload = function () {
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
            let dueind = data.duenos.length - 1;
            let data1 = request1.response;
            data1.forEach((element, index) => {
                if (data.tipovehiculo.id == element.id) {
                    select.innerHTML += `
                <option selected ="selected" value="${element.id}">"${element.nombre}"</option>`
                } else {
                    select.innerHTML += `
                <option value="${element.id}">"${element.nombre}"</option>`
                }
            });
            let div = document.getElementById("fechacompra")
            var fecham = modificarfecha(data.duenos[dueind].dateStart)
            div.innerHTML = `<label for="fechacompra" class="form-label">Fecha Compra</label>
            <input type="date" class="form-control" id="fechacompra" name="fechacompra" value="${fecham}"></input>`
            ciudadPromTransi.value = data.duenos[dueind].ciudadPromTransi
        }
    }
    request1.onerror = function () {
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
    let fechacompra = document.getElementById('fechacompra').value
    let ciudadPromTransi = document.getElementById('ciudadpromtran').value
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
        let request2 = sendRequest('api/duenos/list', 'GET', '')

        request2.onload = function () {
            let data2 = request2.response
            const maxid = encontrarMayorId(data2) + 1;
            let fecham = modificarfecha(fechacompra);
            let data1 = {
                'id': maxid,
                'usuario': usuario,
                'vehiculo': numSerie,
                'kmStart': 0,
                'kmFinish': null,
                'dateStart': fecham,
                'kmFinish': null,
                'ciudadPromTransi': ciudadPromTransi
            }
            let request1 = sendRequest('api/duenos/new', 'POST', data1)
            request.onload = function () {
                request1.onload = function () {
                    const urlParams = new URLSearchParams(window.location.search);
                    let usuario = urlParams.get('Usuario')
                    window.location = `vehiculos.html?Usuario=${usuario}`;
                }
            }
            request.onerror = function () {
                alert('Error al guardar los cambios.')
            }
        }
    }

}

//let tv = sendRequest('api/tipovehiculo/list/' + tipovehiculo, 'GET', '')
//let request = sendRequest('api/vehiculo/edit', 'PUT', data)
//let request1 = sendRequest('api/usuarios/list/' + usuario, 'GET', "")
//let request2 = sendRequest('api/vehiculo/list/' + numSerie, 'GET', '')
//let request3 = sendRequest('api/duenos/list', 'GET', '')
//let request4 = sendRequest('api/duenos/new', 'POST', data1)
//let request5 = sendRequest('api/duenos/edit', 'PUT', data5)


function guardarVehiculo() {
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
    let fechacompra = document.getElementById('fechacompra').value
    let ciudadPromTransi = document.getElementById('ciudadpromtran').value
    let tipovehiculo = document.getElementById('tipo-vehi').value
    let tv = sendRequest('api/tipovehiculo/list/' + tipovehiculo, 'GET', '')

    // Vehiculo
    request2.onload = function () {
        // Tipo vehiculo
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
            let request = sendRequest('api/vehiculo/edit', 'PUT', data)
            let request1 = sendRequest('api/usuarios/list/' + usuario, 'GET', "")
            // usuario
            request1.onload = function () {
                let data2 = request2.response
                // verifica si cambio
                if (data2.usuario == usuario) {
                    // hacer la modificacion de vehiculo
                    request.onload = function () {
                        let data1 = request1.response
                        window.location = `vehiculos.html?Usuario=${data1.nombreUsuario}`;
                    }
                    request.onerror = function () {
                        alert('Error al hacer los cambios.')
                    }
                } else {
                    let data2 = request2.response
                    const duenosmax = encontrarMayorId(data2.duenos) - 1;
                    const date = new Date();
                    let data5 = {
                        'id': data2.duenos[duenosmax].id,
                        'usuario': data2.duenos[duenosmax].usuario,
                        'vehiculo': numSerie,
                        'kmStart': data2.duenos[duenosmax].kmStart,
                        'kmFinish': kilometraje,
                        'dateStart': fechacompra,
                        'dateFinish': date.getFullYear + '-' + date.getMonth + '-' + date.getDate,
                        'ciudadPromTransi': ciudadPromTransi
                    }
                    let request5 = sendRequest('api/duenos/edit', 'PUT', data5)
                    // acutalizar dueno anterior
                    request5.onload = function () {
                        let request3 = sendRequest('api/duenos/list', 'GET', '')
                        // duenos
                        request3.onload = function () {
                            let data3 = request3.response
                            const maxid = encontrarMayorId(data3) + 1;
                            let data1 = {
                                'id': maxid,
                                'usuario': usuario,
                                'vehiculo': numSerie,
                                'kmStart': kilometraje,
                                'kmFinish': null,
                                'dateStart': date.getFullYear + '-' + date.getMonth + '-' + date.getDate,
                                'kmFinish': null,
                                'ciudadPromTransi': ciudadPromTransi
                            }
                            let request4 = sendRequest('api/duenos/new', 'POST', data1)
                            request.onload = function () {
                                request4.onload = function () {
                                    let data1 = request1.response
                                    window.location = `vehiculos.html?Usuario=${data1.nombreUsuario}`;
                                }
                            }
                            request.onerror = function () {
                                alert('Error al guardar los cambios.')
                            }
                        }
                    }
                }
            }
        }
        tv.onerror = function () {
            alert('Error al elminar.')

        }
    }
}
function loadUsuario(usuario) {
    let request = sendRequest('api/usuarios/list/nombreusuario/' + usuario, 'GET', "")
    let usuarioh = document.getElementById('usuario')
    request.onload = function () {
        let data = request.response
        usuarioh.value = data.dni
    }
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
    let usuario = document.getElementById('usuario').value
    let request = sendRequest('api/vehiculo/delete/' + id, 'DELETE', '')
    let request1 = sendRequest('api/usuarios/list/' + usuario, 'GET', "")
    let request2 = sendRequest('api/duenos/list/vehiculo/' + id, 'GET', "")
    request1.onload = function () {
        let data = request1.response
        request2.onload = function () {
            let data1 = request2.response
            if (data1.length < 2) {
                let data3;
                data1.forEach((element, index) => { return data3 = element.id })
                let request3 = sendRequest('api/duenos/delete/' + data3, 'DELETE', '')
                request3.onload = function () {
                    request.onload = function () {
                        alert('Registro Eliminado Exitosamente.')
                        window.location = `vehiculos.html?Usuario=${data.nombreUsuario}`;
                    }
                    request.onerror = function () {
                        alert('Error al elminar.')
                    }
                }
            } else {
                alert('Ya hay registros de este vehiculo, no se puede borrar')
                window.location = `vehiculos.html?Usuario=${data.nombreUsuario}`;
            }

        }
    }
}

function encontrarMayorId(jsonList) {
    let maxId = 0;
    for (let i = 0; i < jsonList.length; i++) {
        if (jsonList[i].id > maxId) {
            maxId = jsonList[i].id;
        }
    }
    return maxId;
}
function modificarfecha(fecha) {
    return fecha.slice(0, -19)
}