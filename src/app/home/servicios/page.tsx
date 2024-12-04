"use client";

import { useState, useEffect } from "react";
import { Usuario } from "@/lib/types/types";
import Comprobar from "@/lib/scripts/comprobar";
import ListUsuario from "@/components/servicios/listUsuario";

export default function PublicVehiclesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [token, setToken] = useState<string | undefined>(undefined);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      const { token, usuario } = Comprobar();

      if (token !== undefined && usuario !== null) {
        setToken(token);
        setUsuario(usuario);
      } else {
        window.location.href = "/";
      }
    }
  }, []
  );

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const responseUsers = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuarios/list/talleres`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
        const usersData: Usuario[] = await responseUsers.json();
        setUsuarios(usersData);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      fetchPublicData();
    }
  }, [token]);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    usuario.apellidos.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full px-4 py-8 custom-scrollbar overflow-y-scroll h-[89dvh]">
      <h1 className="text-4xl font-bold mb-6 text-center">Talleres</h1>

      {filteredUsuarios.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No se encontraron usuarios.
        </div>
      ) : (
        <div className="w-full flex flex-wrap h-[79dvh] justify-around">
          {filteredUsuarios.map((u) => (
            <ListUsuario token={token} taller={u} usuario={usuario} key={u.dni} />
          ))}
        </div>
      )}
    </div>
  );
}