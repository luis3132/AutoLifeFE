"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import VerPerfil from "@/components/Loged/perfil";

export default function Home() {
  // start validation

  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    // verify if we are in the browser
    if (typeof window !== 'undefined') {
      const t = document.cookie;
      const cookiesArray = t.split(';');
      // Recorrer el array de cookies para encontrar la cookie "authToken"
      cookiesArray.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
          const valor = decodeURIComponent(value);
          setToken(valor);
        }
      });
      // verify if the user are logged
      const loged = sessionStorage.getItem("loged");
      if (loged == "true") {
        // get the encrpt text
        const cryp = sessionStorage.getItem("usuario");
        // decrypt the text
        const usuarioStringBytes = CryptoJS.AES.decrypt(cryp, process.env.NEXT_PUBLIC_SECRETKEY);
        // convert to String the array of bytes
        const usuarioString = usuarioStringBytes.toString(CryptoJS.enc.Utf8);
        // convert to json the string of usuario
        const usuarioJson = JSON.parse(usuarioString);
        setUsuario(usuarioJson)
      } else {
        window.location.href = "/"
        alert("Inicia seccion!")
      }
    }
  }, []);

  // end validation

  var foto = null
  if (usuario != undefined && usuario != ""){
    if (usuario.fotos.length > 0){
      foto = usuario.fotos[0].foto;
    } else {
      foto = "/imagenes/logo/logoSL.png";
    }
  }
  return (
    <div>
      <div className="lg:flex-col flex pl-[5%] pr-[5%] pt-[2%] ">
        <div className="lg:w-[30%] w-full bg-gray-200 rounded-2xl flex flex-col justify-center items-center">
          <div className="text-2xl text-start pt-2 ">Perfil</div>
          <VerPerfil usuario={usuario} token ={token}/>
        </div>
      </div>
    </div>
  );
}
