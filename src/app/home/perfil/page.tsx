"use client";

import Perfil from "@/components/perfil/perfil";
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
  const [reload, setReload] = useState<boolean>(false);

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
  }, [reload]);

  return (
    <>
      <div className="w-full justify-center flex pt-16">
        <Perfil usuario={usuario} token={token} reload={() => setReload(!reload)} />
      </div>
    </>
  );
}
