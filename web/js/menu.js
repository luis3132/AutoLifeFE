function defaultpage(){
    const urlParams = new URLSearchParams(window.location.search);
    let vehiculo = urlParams.get('Usuario')
    let div = document.getElementById('windowdisplay');
    div.innerHTML = `<iframe name="myFrame" style="height: 100%; width:100%; border: none" src="vehiculos.html?Usuario=${vehiculo}"></iframe>`;
}
function duenospage(){
    const urlParams = new URLSearchParams(window.location.search);
    let dueno = urlParams.get('Usuario')
    let div = document.getElementById('windowdisplay');
    div.innerHTML = `<iframe name="myFrame" style="height: 100%; width:100%; border: none" src="duenos.html?Usuario=${dueno}"></iframe>`;
}
function vehiculospage(){
    const urlParams = new URLSearchParams(window.location.search);
    let vehiculo = urlParams.get('Usuario')
    let div = document.getElementById('windowdisplay');
    div.innerHTML = `<iframe name="myFrame" style="height: 100%; width:100%; border: none" src="vehiculos.html?Usuario=${vehiculo}"></iframe>`;
}
function vehiculosform(){
    const urlParams = new URLSearchParams(window.location.search);
    let vehiculo = urlParams.get('numserie')
    let request = sendRequest('api/vehiculo/list/'+ vehiculo, 'GET', '')
    request.onload = function(){
        let data = request.response
        let request1 = sendRequest('api/usuarios/list/'+ data.usuario, 'GET', "")
        request1.onload = function(){
            let data1 = request1.response
            console.log(data1.nombreUsuario)
            window.location = `vehiculos.html?Usuario=${data1.nombreUsuario}`
        }
    }
}
function vehiculoCrear(){
    const urlParams = new URLSearchParams(window.location.search);
    let usuario = urlParams.get('Usuario')
    window.location = `form_crear_vehiculo.html?Usuario=${usuario}`
}
function vehiculosCrear(){
    const urlParams = new URLSearchParams(window.location.search);
    let vehiculo = urlParams.get('Usuario')
    window.location = `vehiculos.html?Usuario=${vehiculo}`
}
function duenoCrear(){
    const urlParams = new URLSearchParams(window.location.search);
    let usuario = urlParams.get('Usuario')
    window.location = `form_crear_duenos.html?Usuario=${usuario}`
}