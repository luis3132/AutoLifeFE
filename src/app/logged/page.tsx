"use client";

import Comprobar from "@/lib/scripts/comprobar";
import React, { useEffect, useState } from "react";

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
  constraseña: string;
  email: string;
  nombreUsuario: string;
  fotos: Fotos[];
}

export default function Home() {

  const [token, setToken] = useState<string | undefined>(undefined);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      const { token, usuario } = Comprobar({ document });

      if (token !== undefined && usuario !== null) {
        setToken(token);
        setUsuario(usuario);
      } else {
        window.location.href = "/";
      }
    }
  }, [])

  return (
    <>
      NIGGER
    </>
  );
}
