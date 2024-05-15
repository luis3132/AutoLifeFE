"use client";

import Lista from "@/components/loged/lista";

export default function VehiculoP({ vehiculo }) {
  return (
    <div>
      <div className="float-right p-2">
        <button className="rounded-full bg-amber-300 p-1 hover:bg-amber-400">Anadir Vehiculo</button>
      </div>
      <div className="pl-[5%] pr-[5%] pt-[2%] justify-between">
        {vehiculo?.map((vehiculos) => (
          <Lista vehiculos={vehiculos} key={vehiculos.numSerie} />
        ))}
      </div>
    </div>
  );
}
