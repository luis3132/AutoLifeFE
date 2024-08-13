import React, { useState } from 'react'
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Vervehiculo from './ver';

export default function Vehiculos({ vehiculos, token }) {
    const [showVer, setShowVer] = useState(false);
    var foto = null;
    if (vehiculos.fotos.length > 0) {
        foto = vehiculos.fotos[0].foto
    } else {
        foto = "/imagenes/logo/logoSL.png";
    }
    return (
        <>
            <div className='pb-3'></div>
            <div className="flex bg-gray-200 pt-1 pb-1 rounded-2xl ">
                <div className="md:w-[25%] w-[30%] items-center justify-center flex p-2">
                    <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden z-10" >
                        <Image className="z-10" alt="Foto" priority={true} src={foto} objectFit="cover" layout='fill' />
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <div>
                        {vehiculos.marca} {vehiculos.referencia} {vehiculos.serie} {vehiculos.modelo}
                    </div>
                    <div>
                        {vehiculos.placa}
                    </div>
                    <div>
                        {vehiculos.color}
                    </div>
                    <div>
                        Kilometraje: {vehiculos.kilometraje}
                    </div>
                    <div className="self-end mt-auto float-right pr-3">
                        <button onClick={() => setShowVer(!showVer)}>
                            <div className="flex items-center">
                                <Icon className="" icon="mdi:eye-outline" />
                                <div className="pl-2">Ver</div>
                            </div>
                        </button>
                    </div>
                    {showVer && <Vervehiculo token={token} vehiculo={vehiculos} closecomponent={() => setShowVer(!showVer)} />}
                </div>
            </div>
        </>
    )
}