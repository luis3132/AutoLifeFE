"use client";

import Comprobar from "@/lib/scripts/comprobar";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface Roles {
  id: number;
  rol: string;
}

interface Fotos {
  id: number;
  path: string;
  vehiculo: string;
  servicio: number;
  accidentes: number;
  usuarios: string;
  legislacion: number;
  piezas: string;
  partes: string;
}

interface Usuario {
  dni: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  roles: Roles;
  contrasena: string;
  email: string;
  nombreUsuario: string;
  fotos: Fotos[];
}

export default function Home() {

  const [token, setToken] = useState<string | undefined>(undefined);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      const { token, usuario } = Comprobar();

      if (token !== undefined && usuario !== null) {
        setToken(token);
        setUsuario(usuario);
      }
      if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "" || usuario === null) {
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <>
      <div className="w-full p-5">
        <div className="w-1/3 bg-gray-300 rounded-xl">
          <div className="h-min">
            <p className="text-center text-2xl">Notificaciones</p>
            
          </div>
        </div>
      </div>
    </>
  );
}
