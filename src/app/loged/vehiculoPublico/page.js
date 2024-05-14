"use client";
import {React, useEffect, useState } from 'react'
import Vehiculos from "@/components/vehiculos/vehiculos";

export default function Home() {
    const Vehiculos_API_URL = "http://localhost:8090/auth/vehiculo/list/publico/True"
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
    <>
    <div className="pl-[5%] pr-[5%] pt-[2%] justify-between">
        {!loading && (
          <div className="justify-between">
            {vehiculos?.map((vehiculos) => (
              <Vehiculos vehiculos={vehiculos} key={vehiculos.numSerie} />
            ))}
          </div>
        )}
    </div>
    </>
  );
}
