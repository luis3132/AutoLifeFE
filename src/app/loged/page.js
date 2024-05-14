"use client";
import { React, useEffect, useState } from 'react'
import Vehiculos from "@/components/vehiculos/vehiculos";

export default function Home({ perfil }) {
  const memoria = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [vehiculos, setVehiculos] = useState(null);

  useEffect(() => {
    if (memoria != null && memoria !== "") {
      // Verificar el token de sesión al montar el componente
      const Verify_Url = "http://localhost:8090/auth/verify";
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(Verify_Url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: memoria })
          });
          const verificacion = await response.json();
          if (verificacion.userLogin) {
            // Si la verificación es exitosa, cargar datos del usuario y vehículos
            setUsuario(verificacion);
            setLoading(false);
          } else {
            // Si la verificación falla, redirigir a la página de inicio de sesión
            setLoading(false);
            window.location.href = "/";
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Si no hay token de sesión, redirigir a la página de inicio de sesión
      setLoading(false);
      window.location.href = "/";
    }
  }, []);
  console.log(usuario)
  useEffect(() => {
    // Cargar datos del usuario
    const Usuario_API_URL = `http://localhost:8090/api/usuarios/list/nombreusuario/${usuario?.userLogin}`;
    const fetchUsuarioData = async () => {
      try {
        const response = await fetch(Usuario_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${memoria}`
          }
        });
        const userData = await response.json();
        setUsuario(userData);
      } catch (error) {
        console.log(error);
      }
    };
    if (usuario) {
      fetchUsuarioData();
    }
  }, [usuario]);
  console.log(usuario)
  useEffect(() => {
    // Cargar datos de vehículos
    const Vehiculos_API_URL = `http://localhost:8090/api/vehiculo/list/usuario/${usuario?.userLogin}`;
    const fetchVehiculosData = async () => {
      try {
        const response = await fetch(Vehiculos_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${memoria}`
          }
        });
        const vehiculosData = await response.json();
        setVehiculos(vehiculosData);
      } catch (error) {
        console.log(error);
      }
    };
    if (usuario) {
      fetchVehiculosData();
    }
  }, [vehiculos, usuario]);
  console.log(vehiculos)
  return (
    <>
      <div className="">
        <div className="float-right p-2">
          <button className="rounded-full bg-amber-300 p-1 hover:bg-amber-400">Anadir Vehiculo</button>
        </div>
        <div className="pl-[5%] pr-[5%] pt-[2%] justify-between">
          {!loading && vehiculos && (
            <div className="justify-between">
              {vehiculos.map((vehiculo) => (
                <Vehiculos vehiculo={vehiculo} key={vehiculo.numSerie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
