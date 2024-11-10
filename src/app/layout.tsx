import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";

interface Usuario {

}

export const metadata: Metadata = {
  title: "AutoLife",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const cook = cookies().get("authToken");
  var token: string | null = null;
  var Usuario;
  if (cook != undefined && cook.value != "") {
    token = cook.value;
  }
    
  //validacion del token

  const loadToken = async () => {
    if (token != undefined && token != "") {
      var verificacion = null;
      try {
        const response = await fetch(`${process.env.HOSTNAME}/auth/verify`, {
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
        const Usuario_API_URL = `${process.env.HOSTNAME}/api/usuarios/list/nombreusuario/${verificacion.userLogin}`;
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
      }
    }
  }
  loadToken();
  return (
    <html lang="en">
      <body className={` antialiased`}>
        {children}
      </body>
    </html>
  );
}
