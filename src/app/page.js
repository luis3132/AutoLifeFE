"use client";
import {React, useEffect, useState } from 'react'
import Vehiculos from "@/components/vehiculos";

export default function Home() {
    const Vehiculos_API_URL = "http://localhost:8090/api/vehiculo/list"
    const [vehiculos, setVehiculos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(Vehiculos_API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const vehiculo = await response.json();
            setVehiculos(vehiculo);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
    console.log(vehiculos)
  return (
    <div>
      <table class="table table-striped table-bordered mt-4">
        <thead className="bg-gray-400">
          <tr class="table-bordered">
            <th id="num-serie" scope="col">Numero de serie</th>
            <th id="placa" scope="col">Placa</th>
            <th id="marca" scope="col">Marca</th>
            <th id="modelo" scope="col">Modelo</th>
            <th id="ref" scope="col">Referencia</th>
            <th id="serie" scope="col">Serie</th>
            <th id="color" scope="col">Color</th>
            <th id="km" scope="col">Kilometraje</th>
            <th id="ciudad-proce" scope="col">Ciudad procedencia</th>
            <th id="usuario" scope="col">Usuario</th>
            <th id="tipo-vehi" scope="col">Tipo de vehiculo</th>
            <th id="acciones" scope="col">Acciones</th>
          </tr>
        </thead>
        {!loading && (
        <tbody>
          {vehiculos?.map((vehiculos) => (
            <Vehiculos vehiculos={vehiculos} key={vehiculos.numSerie} />
          ))}
        </tbody>
      )};
      </table>
    </div>
  );
}
