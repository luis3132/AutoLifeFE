"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { Usuario, Vehiculo } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ListVehiculo from "@/components/vehiculo/listVehiculo";
import AddVehiculo from "@/components/vehiculo/addVehiculo";

export default function Page() {

    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [showAddVehiculo, setShowAddVehiculo] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

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
    }, [usuario, reload]);

    useEffect(() => {
        if (!reload) {
            setReload(true);
        }
    }, [reload]);

    return (
        <>
            <div className="w-full p-5 custom-scrollbar overflow-y-scroll h-[89dvh]">
                <div className="md:float-right max-md:w-full pb-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg" onClick={() => setShowAddVehiculo(true)} >Agregar Vehiculo</button>
                </div>
                <div className="w-full flex flex-wrap h-[79dvh] justify-around">
                    {vehiculos.map((vehiculo, index) => (
                        <ListVehiculo key={index} vehiculo={vehiculo} token={token} reload={handleReload} />
                    ))}
                </div>
            </div>
            {showAddVehiculo && <AddVehiculo closeComponent={() => setShowAddVehiculo(false)} token={token} usuario={usuario?.dni} reload={handleReload} />}
        </>
    );
}