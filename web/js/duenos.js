function loadData(usuario){
    let request = sendRequest('api/usuarios/list/nombreusuario/'+usuario, 'GET', '')
    request.onload = function () {
        let data = request.response;
        let request1 = sendRequest('api/duenos/list/usuario/'+data.dni, 'GET', '')
        request1.onload = function(){
            let data1 = request1.response
            let table = document.getElementById('duenos-table');
            table.innerHTML = "";
            data1.forEach((element, index) => {
                table.innerHTML += `
                    <tr>
                        <th>${element.id}</th>
                        <td>${element.usuario}</td>
                        <td>${element.vehiculo}</td>
                        <td>${element.kmStart}</td>
                        <td>${element.kmFinish}</td>
                        <td>${element.dateStart}</td>
                        <td>${element.dateFinish}</td>
                        <td>${element.ciudadPromTransi}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick='window.location = 
                            "form_edicion_duenos.html?id=${element.id}"'>Ver</button>
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