"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { Usuario, Vehiculo } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ListRegulacion from "@/components/legislacion/listRegulacion";

export default function Page() {

    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    let contador: number = 0;

    const handleReload = () => {
        setReload(!reload);
    }

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

    useEffect(() => {
        if (usuario) {
            const fetchVehiculo = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/list/${usuario.dni}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data: Vehiculo[] = await response.json();
                setVehiculos(data);
            }
            fetchVehiculo();
        }
    }, [usuario, reload]);

    useEffect(() => {
        if (!reload) {
            setReload(true);
        }
    }, [reload]);

    return (
        <>
            <div className="w-full max-sm:p-5 p-10 lg:flex justify-around max-h-[89dvh] overflow-y-scroll custom-scrollbar">
                <div className="lg:w-[30%] w-full max-lg:mb-5 bg-gray-200 rounded-xl shadow-xl">
                    <h1 className="text-center text-4xl font-bold pt-2">SOAT</h1>
                    <div className="w-full p-5">
                        {vehiculos.map((vehiculo) => {
                            contador++;
                            return <ListRegulacion key={contador} token={token} reload={handleReload} vehiculo={vehiculo} tipoRegulacion="SOAT" />
                        })}
                    </div>
                </div>
                <div className="lg:w-[30%] w-full max-lg:mb-5 bg-gray-200 rounded-xl shadow-xl">
                    <h1 className="text-center text-4xl font-bold pt-2">Tecnico Mecanica</h1>
                    <div className="w-full p-5">
                        {vehiculos.map((vehiculo) => {
                            contador++;
                            return <ListRegulacion key={contador} token={token} reload={handleReload} vehiculo={vehiculo} tipoRegulacion="Tecnico Mecanica" />
                        })}
                    </div>
                </div>
                <div className="lg:w-[30%] w-full max-lg:mb-5 bg-gray-200 rounded-xl shadow-xl">
                    <h1 className="text-center text-4xl font-bold pt-2">Seguro</h1>
                    <div className="w-full p-5">
                        {vehiculos.map((vehiculo) => {
                            contador++;
                            return <ListRegulacion key={contador} token={token} reload={handleReload} vehiculo={vehiculo} tipoRegulacion="Seguro" />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}