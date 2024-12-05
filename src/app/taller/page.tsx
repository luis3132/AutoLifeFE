"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { Usuario } from "@/lib/types/types";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
   <div className="h-[89dvh] overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12 px-4 py-8 lg:px-24">
   
        <header className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-[1.01]">
          <h1 className="text-5xl font-bold mb-4 text-[#3B6BC0] tracking-tight">¿Que puedes hacer en nuestra pagina?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En esta pagina podras tener un control de los vehiculos que aceptes hacer parte de tu taller
          </p>
        </header>

      
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Apartado vehiculos",
              description: "Si necesitas ver los autos que esten en reparacion dentro de tu taller dale click en la barra al apartado de cehiculos",
              bgColor: "bg-gradient-to-br from-green-100 to-green-200",
              textColor: "text-green-700"
            },
            {
              title: "Apartado solicitudes",
              description: "Aca podras ver a los vehiculos de los usuarios que solicitaron tu ayuda, para acceder a este dale click a solicitudes en la barra",
              bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
              textColor: "text-blue-700"
            },
            
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 text-center`}
            >
              <h2 className={`text-2xl font-semibold mb-3 ${feature.textColor}`}>{feature.title}</h2>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

       

        <section className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#3B6BC0]">Contacto</h2>
          <p className="text-gray-700 mb-4">
            ¿Tienes preguntas o necesitas ayuda?
          </p>
          <a 
            href="mailto:contacto@autolife.com" 
            className="bg-[#3B6BC0] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >

            Contáctanos
          </a>
        </section>
       
    
      </div>
 
    </div>

  );
}

