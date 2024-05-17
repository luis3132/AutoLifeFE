"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    // verify if we are in the browser
    if (typeof window !== 'undefined') {
      // verify if the user is login
      const loged = sessionStorage.getItem("loged");
      if (loged) {
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

  console.log(usuario)
  return (
    <div>
      parchadero :P
    </div>
  );
}
