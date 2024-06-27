"use client";

import { Icon } from '@iconify/react';
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import Verseguro from '@/components/Regulacion/verSeguro';

export default function Home() {
    const [showVerSeguro, setShowVerSeguro] = useState(false);
    const [vehiculo, setVehiculo] = useState(null);

    // start validation

    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    useEffect(() => {
        // verify if we are in the browser
        if (typeof window !== 'undefined') {
            const t = document.cookie;
            const cookiesArray = t.split(';');
            // Recorrer el array de cookies para encontrar la cookie "authToken"
            cookiesArray.forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name === 'authToken') {
                    const valor = decodeURIComponent(value);
                    setToken(valor);
                }
            });
            // verify if the user are logged
            const loged = sessionStorage.getItem("loged");
            if (loged == "true") {
                // get the encrpt text
                const cryp = sessionStorage.getItem("usuario");
                // decrypt the text
                const usuarioStringBytes = CryptoJS.AES.decrypt(cryp, process.env.NEXT_PUBLIC_SECRETKEY);
                // convert to String the array of bytes
                const usuarioString = usuarioStringBytes.toString(CryptoJS.enc.Utf8);
                // convert to json the string of usuario
                const usuarioJson = JSON.parse(usuarioString);
                setUsuario(usuarioJson)
            } else {
                window.location.href = "/"
                alert("Inicia seccion!")
            }
        }
    }, []);

    // end validation

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
                setVehiculo(vehiculos)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [usuario])
    console.log(vehiculo)

    return (
        <>
            <div className="pr-[10%] pl-[10%] pt-6">
                <div className="w-full bg-green-200 rounded-2xl flex flex-col">
                    <div className="w-full flex items-center justify-center h-16">
                        <div className="text-3xl font-bold">
                            Seguro
                        </div>
                    </div>
                    <div className="p-3 text-lg">
                        Vehiculos Disponibles:
                    </div>
                    {vehiculo?.map((veh) => (
                        <div className="pr-[10%] pl-[10%]">
                            <div className="bg-green-300 h-10 flex items-center pl-5 hover:bg-green-400">
                                <p className="mr-1 max-sm:hidden">{veh.marca}</p>
                                <p className="mr-1">{veh.referencia}</p>
                                <p className="mr-1 max-sm:hidden">{veh.serie}</p>
                                <p className="mr-1">{veh.placa}</p>
                                <p className="mr-1 max-sm:hidden">{veh.modelo}</p>
                                <div className="ml-auto pr-5">
                                    <button onClick={() => setShowVerSeguro(!showVerSeguro)} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                                        <Icon className="" icon="mdi:eye-outline" />Ver
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                    <div className="p-2"></div>
                </div>
                <div className="p-2"></div>
                <div className="w-full bg-blue-200 rounded-2xl flex flex-col">
                    <div className="w-full flex items-center justify-center h-16">
                        <div className="text-3xl font-bold">
                            SOAT
                        </div>
                    </div>
                    <div className="p-3 text-lg">
                        Vehiculos Disponibles:
                    </div>
                    {vehiculo?.map((veh) => (
                        <div className="pr-[10%] pl-[10%]">
                            <div className="bg-blue-300 h-10 flex items-center pl-5 hover:bg-blue-400">
                                <p className="mr-1 max-sm:hidden">{veh.marca}</p>
                                <p className="mr-1">{veh.referencia}</p>
                                <p className="mr-1 max-sm:hidden">{veh.serie}</p>
                                <p className="mr-1">{veh.placa}</p>
                                <p className="mr-1 max-sm:hidden">{veh.modelo}</p>
                                <div className="ml-auto pr-5">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                                        <Icon className="" icon="mdi:eye-outline" />Ver
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                    <div className="p-2"></div>
                </div>
                <div className="p-2"></div>
                <div className="w-full bg-red-300 rounded-2xl flex flex-col">
                    <div className="w-full flex items-center justify-center h-16">
                        <div className="text-3xl font-bold">
                            Tecnico Mecanica
                        </div>
                    </div>
                    <div className="p-3 text-lg">
                        Vehiculos Disponibles:
                    </div>
                    {vehiculo?.map((veh) => (
                        <div className="pr-[10%] pl-[10%]">
                            <div className="bg-red-400 h-10 flex items-center pl-5 hover:bg-red-500">
                                <p className="mr-1 max-sm:hidden">{veh.marca}</p>
                                <p className="mr-1">{veh.referencia}</p>
                                <p className="mr-1 max-sm:hidden">{veh.serie}</p>
                                <p className="mr-1">{veh.placa}</p>
                                <p className="mr-1 max-sm:hidden">{veh.modelo}</p>
                                <div className="ml-auto pr-5">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                                        <Icon className="" icon="mdi:eye-outline" />Ver
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                    <div className="p-2"></div>
                </div>
            </div>
            {showVerSeguro && <Verseguro token = {token} vehiculo = {vehiculo} />}
        </>
    )
}