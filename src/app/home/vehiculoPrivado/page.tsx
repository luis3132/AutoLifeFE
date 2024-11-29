"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { Usuario, Vehiculo } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Page() {

    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

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
    }, [usuario])

    return (
        <div className="w-full p-5 md:flex custom-scrollbar overflow-y-scroll h-[89dvh]">
            <div className=""></div>
        </div>
    );
}