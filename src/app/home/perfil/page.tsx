"use client";

import Perfil from "@/components/perfil/perfil";
import Comprobar from "@/lib/scripts/comprobar";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Usuario } from "@/lib/types/types";

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
      if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "") {
        window.location.href = "/";
      }
    }
  }, [reload]);

  useEffect(() => {
    if (!usuario && !token) {
      setReload(!reload);
    }
  }, [usuario, token, reload]);

  return (
    <>
      <div className="w-full justify-center flex pt-16 h-[89dvh]">
        <Perfil usuario={usuario} token={token} reload={() => setReload(!reload)} />
      </div>
    </>
  );
}
