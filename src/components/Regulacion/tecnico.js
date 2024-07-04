import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import Vertecnico from '@/components/Regulacion/verTecnico';

export default function Tecnico({vehiculo, token}) {
    const [showVerTecnico, setShowVerTecnico] = useState(false);
    return (
        <>
            <div className="pr-[10%] pl-[10%]">
                <div className="bg-red-400 h-10 flex items-center pl-5 hover:bg-red-500">
                    <p className="mr-1 max-sm:hidden">{vehiculo.marca}</p>
                    <p className="mr-1">{vehiculo.referencia}</p>
                    <p className="mr-1 max-sm:hidden">{vehiculo.serie}</p>
                    <p className="mr-1">{vehiculo.placa}</p>
                    <p className="mr-1 max-sm:hidden">{vehiculo.modelo}</p>
                    <div className="ml-auto pr-5">
                        <button onClick={() => setShowVerTecnico(!showVerTecnico)} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                            <Icon className="" icon="mdi:eye-outline" />Ver
                        </button>
                    </div>
                </div>
            </div>
            {showVerTecnico && <Vertecnico token = {token} vehiculo = {vehiculo} closecomponent={() => setShowVerTecnico(!showVerTecnico)} />}
        </>
    )
}