"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

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

  console.log(usuario)
  return (
    <div>
      parchadero :P
    </div>
  );
}
