function validarLogin() {
    var userLogin = document.getElementById('icon_user').value
    var contrasena = document.getElementById('icon_pass').value

    let data = {
        "userLogin": userLogin,
        "contrasena": contrasena
    }

    let request = sendRequest('api/usuarios/login/nombreusuario', 'POST', data)
    request.onload = function () {

        let data1 = request.response;

        if (data1.Mensaje == "Datos correctos") {
            alert("Login Correcto");
            window.location = `menu.html?Usuario=${userLogin}`;
        } else {
            alert('Alerta: Usuario o Password incorrectos.')
        }
    }
    request.onerror = function () {
        alert("Error al recuperar los datos.");
    }
}


function registrarUsuario() {
    let dni = document.getElementById('dni').value
    let nombre = document.getElementById('nombre').value
    let apellidos = document.getElementById('apellidos').value
    let telefono = document.getElementById('telefono').value
    let direccion = document.getElementById('direccion').value
    let email = document.getElementById('email').value
    let nombreusuario = document.getElementById('nombre-usuario').value
    let contrasena = document.getElementById('contrasena').value
    let contrasenac = document.getElementById('contrasenac').value
    let r = sendRequest('api/roles/list/2', 'GET', '')
    if (contrasena != contrasenac){
        alert("Contrasenas no coincinden")
    } else {
        r.onload = function(){
            let data = {
                "dni": dni,
                "nombre": nombre,
                "apellidos": apellidos,
                "telefono": telefono,
                "direccion": direccion,
                "email": email,
                "nombreusuario": nombreusuario,
                "contrasena": contrasena,
                "roles": r.response
            }
            let n = sendRequest('api/usuarios/new', 'POST', data)
            n.onload = function(){
                alert("Usuario: "+nombreusuario+" creado")
                window.location = `menu.html?Usuario=${nombreusuario}`;
            }
            n.onerror = function(){
                alert("Error al crear Usuario")
            }
        }
    }
}