import { useEffect, useState } from "react";
import Listado from "./listado";


export default function Alregulacion({ usuario, token }) {

    const [vehiculo, setVehiculo] = useState(null);
    const [nextExpire, setNextExpire] = useState(false);
    const [expire, setExpire] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Vehiculos_API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculo/list/usuario/${usuario?.dni}`;
                const response = await fetch(Vehiculos_API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const vehiculos = await response.json();
                setVehiculo(vehiculos);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [usuario])

    let bgColorClass = "bg-green-200"; // Default to green
    if (expire) {
        bgColorClass = "bg-red-300";
    } else if (nextExpire) {
        bgColorClass = "bg-yellow-200 ";
    }

    return (
        <>
            <div className="w-full rounded-lg">
                <div className={`w-full ${bgColorClass} rounded-2xl flex flex-col`}>
                    <div className="w-full flex items-center justify-center h-16">
                        <div className="text-3xl font-bold">
                            Regulacion
                        </div>
                    </div>
                    <div className="p-3 text-lg">
                        Vigentes:
                    </div>
                    <div className="w-full md:flex ">
                        <div className="p-0 w-full">
                            <p className="pl-10">Seguro:</p>
                            {vehiculo?.map((veh) => (
                                <Listado vehiculo={veh} key={veh.numSerie} tipo={"seguro"} expire={()=>{setExpire(true)}} nextExpire={()=>{setNextExpire(true)}} />
                            ))}
                        </div>
                        <div className="p-1 w-full">
                            <p className="pl-10">Soat:</p>
                            {vehiculo?.map((veh) => (
                                <Listado vehiculo={veh} key={veh.numSerie} tipo={"soat"} expire={()=>{setExpire(true)}} nextExpire={()=>{setNextExpire(true)}} />
                            ))}
                        </div>
                        <div className="p-1 w-full">
                            <p className="pl-10">Tecnico Mecanica:</p>
                            {vehiculo?.map((veh) => (
                                <Listado vehiculo={veh} key={veh.numSerie} tipo={"tecnico"} expire={()=>{setExpire(true)}} nextExpire={()=>{setNextExpire(true)}} />
                            ))}
                        </div>
                    </div>
                    <div className="p-2"></div>
                </div>
                <div className="h-4"></div>
                <div className="w-full bg-green-200 rounded-2xl flex flex-col">
                    <div className="w-full flex items-center justify-center h-16">
                        <div className="text-3xl font-bold">
                            Servicios
                        </div>
                    </div>
                    <div className="p-3 text-lg">
                        Vigentes:
                    </div>
                    <div className="p-2"></div>
                </div>
            </div>
        </>
    )
}