"use client";

import Comprobar from "@/lib/scripts/comprobar";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Notificacion from "@/components/notificaciones/notificacion";
import { Usuario } from "@/lib/types/types";

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
      if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "") {
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <>
      <div className="w-full p-5 md:flex">
        <div className="md:w-1/3 p-1">
          <Notificacion usuario={usuario} token={token} />
        </div>
        <div className="md:w-2/3 p-1">
          <div className="h-min bg-gray-300 rounded-xl">
            <p className="text-center text-2xl">Notificaciones</p>

          </div>
        </div>
      </div>
    </>
  );
}
