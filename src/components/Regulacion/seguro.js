"use client";

import { Icon } from '@iconify/react';
import Verseguro from '@/components/Regulacion/verSeguro';
import { useEffect, useState } from "react";

export default function Seguro({vehiculo, token}) {
    const [showVerSeguro, setShowVerSeguro] = useState(false);
    return (
        <>
            <div className="pr-[10%] pl-[10%]">
                <div className="bg-green-300 h-10 flex items-center pl-5 hover:bg-green-400">
                    <p className="mr-1 max-sm:hidden">{vehiculo.marca}</p>
                    <p className="mr-1">{vehiculo.referencia}</p>
                    <p className="mr-1 max-sm:hidden">{vehiculo.serie}</p>
                    <p className="mr-1">{vehiculo.placa}</p>
                    <p className="mr-1 max-sm:hidden">{vehiculo.modelo}</p>
                    <div className="ml-auto pr-5">
                        <button onClick={() => setShowVerSeguro(!showVerSeguro)} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                            <Icon className="" icon="mdi:eye-outline" />Ver
                        </button>
                    </div>
                </div>
            </div>
            {showVerSeguro && <Verseguro token = {token} vehiculo = {vehiculo} closecomponent={() => setShowVerSeguro(!showVerSeguro)} />}
        </>
    )
}