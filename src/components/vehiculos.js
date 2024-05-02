import React from 'react'
import Image from 'next/image';

export default function Vehiculos({vehiculos}){
  return (
    <div className="flex bg-gray-100 pt-[1%] pb-[1%] rounded-xl ">
        <div className="md:w-[25%] w-[30%] items-center justify-center">
            <Image alt="Foto" width={100} height={100} src={vehiculos.fotos.foto} />
        </div>
        <div className="w-full">
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
            <div className="float-right pr-3">
                <button>Ver</button>
            </div>
        </div>
    </div>
  )
}