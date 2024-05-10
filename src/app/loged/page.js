"use client";
import { React, useEffect, useState } from 'react'
import Vehiculos from "@/components/vehiculos";

export default function Home() {
  const memoria = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
  const jwtToken = useState({
    token: memoria
  });
  const [loading, setLoading] = useState(true);
  const [Verify, setVerify] = useState({
    userLogin: "",
    contrasena: ""
  });

  if (memoria != null && memoria != "") {
    const Verify_Url = "https://localhost:8090/auth/verify"
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(Verify_Url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jwtToken)
          });
          const verificacion = await response.json();
          setVerify(verificacion);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
    console.log(Verify)
  } else {
    alert("Inicie seccion!");
    window.location.href = "/";
  }
  // termina verificacion de login
  const Vehiculos_API_URL = "http://localhost:8090/api/vehiculo/list/usuario/"
  const Usuario_API_URL = "http://localhost:8090/api/usuarios/list/nombreusuario/" + Verify.userLogin;
  const [vehiculos, setVehiculos] = useState(null);
  const [usuario, setUsuario] = useState({
    dni: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    email: "",
    nombreUsuario: "",
    roles: "",
    fotos: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(Vehiculos_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
          }
        });
        const vehiculo = await response.json();
        setVehiculos(vehiculo);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(vehiculos)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(Vehiculos_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
          }
        });
        const vehiculo = await response.json();
        setVehiculos(vehiculo);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(vehiculos)
  return (
    <>
      <div className="pl-[5%] pr-[5%] pt-[2%] justify-between">
        {!loading && (
          <div className="justify-between">
            {vehiculos?.map((vehiculos) => (
              <Vehiculos vehiculos={vehiculos} key={vehiculos.numSerie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
