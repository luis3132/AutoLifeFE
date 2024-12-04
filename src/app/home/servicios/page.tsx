"use client";
import { useState, useEffect } from "react";
import { Usuario, Vehiculo } from "@/lib/types/types";
import Comprobar from "@/lib/scripts/comprobar";
import Cookies from "js-cookie";
import ListUsuario from "@/components/servicios/listUsuario";

export default function PublicVehiclesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (document.readyState === "complete") {
      const { token, usuario } = Comprobar();

      if (token !== undefined && usuario !== null) {
        setToken(token);
      } else {
        
        window.location.href = "/";
      }
    }
  }, []
);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        setIsLoading(true);
        const responseUsers = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuario/list/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });

        if (!responseUsers.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData: Usuario[] = await responseUsers.json();
        setUsuarios(usersData);

    

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }



return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Usuarios</h1>
  
      {filteredUsuarios.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No se encontraron usuarios.
        </div>
      ) : (
        <ul>
          {filteredUsuarios.map((usuario) => (
            <li key={usuario.dni}>
              {usuario.nombre} {usuario.apellidos}
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );}