import { Vehiculo } from "@/lib/types/types";
import { FC, useEffect, useState } from "react";
import SeeVehiculo from "./seeVehiculo";

interface listVehiculoProps {
    vehiculo: Vehiculo;
    token: string | undefined;
}

const ListVehiculo: FC<listVehiculoProps> = ({ vehiculo, token }) => {

    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const [showEdit, setShowEdit] = useState<boolean>(false);

    useEffect(() => {
        if (vehiculo) {
            if (vehiculo.fotos.length > 0) {
                setFoto(vehiculo.fotos[vehiculo.fotos.length - 1].path);
            }
        }
    }, [vehiculo]);

    return (
        <>
            <div className="max-sm:w-full max-lg:w-1/2 w-[30%] bg-gray-100 rounded-lg shadow-lg mx-2 p-5 h-min mb-5">
                <div className="flex justify-center">
                    <p className="text-2xl font-bold">{vehiculo.marca}</p>
                    <p className="text-2xl font-semibold ml-2">{vehiculo.referencia}</p>
                    <p className="text-2xl font-semibold ml-2">{vehiculo.modelo}</p>
                </div>
                <div className="w-full flex justify-center p-3">
                    <div className="w-1/2 rounded-2xl overflow-hidden shadow-xl">
                        <img src={foto} height={500} width={500}></img>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-xl text-center font-semibold">{vehiculo.placa}</p>
                    <p className="text-xl text-center font-semibold">Kilometraje: {vehiculo.kilometraje}</p>
                </div>
                <div className="w-full flex justify-center pt-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg" onClick={() => setShowEdit(true)} >Ver Detalles</button>
                </div>
            </div>
            {showEdit && <SeeVehiculo vehiculo={vehiculo} token={token} closeComponent={() => setShowEdit(!showEdit)} />}
        </>
    );
};

export default ListVehiculo;