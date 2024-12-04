"use client";

import { useState, useEffect } from "react";
import { Vehiculo } from "@/lib/types/types";
import ListVehiculo from "@/components/vehiculo/listVehiculo";

export default function PublicVehiclesPage() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const fetchPublicVehicles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/list/public`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data: Vehiculo[] = await response.json();
                setVehiculos(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPublicVehicles();
    }, []);

    const filteredVehiculos = vehiculos.filter(vehiculo =>
        vehiculo.marca.toLowerCase().includes(filter.toLowerCase()) ||
        vehiculo.modelo.toLowerCase().includes(filter.toLowerCase()) ||
        vehiculo.referencia.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 custom-scrollbar overflow-y-scroll h-[89dvh]">
            <h1 className="text-3xl font-bold mb-6 text-center">Vehículos Públicos</h1>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar por marca, modelo o referencia"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
            </div>
            {filteredVehiculos.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No se encontraron vehículos públicos.
                </div>
            ) : (
                <div className="w-full flex flex-wrap justify-around">
                    {filteredVehiculos.map((vehiculo) => (
                        <ListVehiculo
                            key={vehiculo.numSerie}
                            publico={true}
                            vehiculo={vehiculo}
                            token={undefined}
                            reload={() => { }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}