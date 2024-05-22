"use client";

import Anadir from "@/components/vehiculos/anadir";
import Vehiculos from "@/components/vehiculos/vehiculos";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";


export default function VehiculoP() {
  const [showAnadir, setShowAnadir] = useState(false);
  const [vehiculo, setVehiculo] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Vehiculos_API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculo/list/usuario/${usuario?.dni}`;
        const response = await fetch(Vehiculos_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const vehiculos = await response.json();
        setVehiculo(vehiculos)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [usuario])

  const [tipoVehiculo, setTipoVehiculo] = useState(null);
  const fetchTipovehiculo = async () => {
    try {
      const Tipovehiculo_API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tipovehiculo/list`
      const response = await fetch(Tipovehiculo_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const tipo = await response.json();
      setTipoVehiculo(tipo);
    } catch (error) {
      console.log(error)
    }
    console.log(tipoVehiculo)
  }

  return (
    <div>
      <div>
        <div className="float-right pt-6 p-2">
          <button className="rounded-full bg-amber-300 p-1 hover:bg-amber-400" onClick={() => { fetchTipovehiculo(); setShowAnadir(!showAnadir) }}>Anadir Vehiculo</button>
        </div>
        <div className="p-8"></div>
      </div>
      <div className="md:flex">
        <div className={`${showAnadir ? 'md:pl-[2%] md:pr-0 pl-[5%] pr-[5%] pt-[2%]' : 'hidden'} `}>
          {showAnadir && <Anadir tipovehiculo={tipoVehiculo} dni={usuario.dni} token={token} showAnadir={() => setShowAnadir(!showAnadir)} />}
        </div>
        <div className="w-full">
          <div className="pl-[5%] pr-[5%] pt-[2%] justify-between">
            {vehiculo?.map((vehiculos) => (
              <Vehiculos token={token} vehiculos={vehiculos} key={vehiculos.numSerie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
