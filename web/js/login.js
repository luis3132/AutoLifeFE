function validarLogin(){
    var userLogin = document.getElementById('icon_user').value
    var contrasena= document.getElementById('icon_pass').value
//    let mensajeError = document.getElementById('mensajeError');
//    mensajeError.innerHTML = "";
    console.log(userLogin)
    console.log(contrasena)
//    prompt("Una pausa por favor")
    let data = {"userLogin": userLogin,
                "contrasena":contrasena}
    console.log(data)
//    prompt("Una pausa por favor")
    let request = sendRequest('api/usuarios/login/nombreusuario', 'POST', data)
    request.onload = function(){
        
        let data1 = request.response;
        console.log(data1);

   	if(data1.Mensaje == "Datos correctos"){
            alert ("Login Correcto");
            window.location = 'menu.html';
	}else{
            alert('Alerta: Usuario o Password incorrectos.')
        }
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}
