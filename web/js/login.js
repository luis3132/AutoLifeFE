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


function registrarUsuario(){
   let dni =  document.getElementById('dni').value
   let nombre =  document.getElementById('nombre').value
   let apellidos =  document.getElementById('apellidos').value
   let telefono =  document.getElementById('telefono').value
   let direccion =  document.getElementById('direccion').value
   let email =  document.getElementById('email').value
   let nombreusuario =  document.getElementById('nombreusuario').value
   let contrasena =  document.getElementById('contrasena').value
}