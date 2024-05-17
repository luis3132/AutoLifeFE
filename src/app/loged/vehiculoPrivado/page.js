"use client";

import Vehiculos from "@/components/vehiculos/vehiculos";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";


export default function VehiculoP({ vehiculo }) {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    // verify if we are in the browser
    if (typeof window !== 'undefined') {
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
      <div>
        <div className="float-right p-2">
          <button className="rounded-full bg-amber-300 p-1 hover:bg-amber-400">Anadir Vehiculo</button>
        </div>
      </div>
      <div className="pl-[5%] pr-[5%] pt-[2%] justify-between">
        {vehiculo?.map((vehiculos) => (
          <Vehiculos vehiculos={vehiculos} key={vehiculos.numSerie} />
        ))}
      </div>
    </div>
  );
}
