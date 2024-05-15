import { cookies } from 'next/headers'
import "./globals.css";
import NavBarD from "@/components/NavBar/navbarD";


export const metadata = {
  title: "AutoLife",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const XD = cookies().get("authToken");
  var token = null;
  var Usuario = null;
  var Vehiculos = null;
  var error = false;
  if (XD != undefined && XD != "") {
    token = XD.value;
  }

  //validacion del token

  if (token != undefined && token != "") {
    var verificacion = null;
    try {
      const Verify_Url = "http://localhost:8090/auth/verify";
      const response = await fetch(Verify_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token })
      });
      verificacion = await response.json();
    } catch (error) {
      console.log(error)
    }

    // cargar datos del usuario

    try {
      const Usuario_API_URL = `http://localhost:8090/api/usuarios/list/nombreusuario/${verificacion.userLogin}`;
      const response = await fetch(Usuario_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      Usuario = await response.json()
    } catch (error) {
      console.log(error)
    } console.log(Usuario)

    // cargar datos de los vehiculos del usuario

    try {
      const Vehiculos_API_URL = `http://localhost:8090/api/vehiculo/list/usuario/${Usuario.dni}`;
      const response = await fetch(Vehiculos_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      Vehiculos = await response.json();
    } catch (error) {
      console.log(error)
    } console.log(Vehiculos)
  } else {
    error = true;
  }
  return (
    <html lang="en">
      <body>
        <header className="bg-white">
          <NavBarD usuario={Usuario}/>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
