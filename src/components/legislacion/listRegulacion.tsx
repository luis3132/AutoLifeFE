import { Legislacion, Vehiculo } from "@/lib/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useEffect, useState } from "react";
import DetailsRegulacion from "./detailsRegulacion";

interface listRegulacionProp {
    vehiculo: Vehiculo;
    tipoRegulacion: string;
    reload: () => void;
    token: string | undefined;
}

const ListRegulacion: FC<listRegulacionProp> = ({ vehiculo, tipoRegulacion, reload, token }) => {
    const [fondo, setFondo] = useState<string>("bg-white");
    const hoy: Date = new Date();
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const vigentes: Legislacion[] = vehiculo.legislacion.filter((l) => l.tipoLegislacion.legislacion === tipoRegulacion && new Date(l.fechaFin).getTime() > hoy.getTime());
    
    useEffect(() => {
        if (tipoRegulacion === "SOAT") {
            if (vigentes.length > 0) {
                vigentes.map((l) => {
                    if (l.tipoLegislacion.legislacion === tipoRegulacion) {
                        const fechaVencimiento = new Date(l.fechaFin);
                        const diferencia = fechaVencimiento.getTime() - hoy.getTime();
                        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
                        if (dias < 10) {
                            setFondo("bg-red-200");
                        } else if (dias < 30) {
                            setFondo("bg-yellow-200");
                        }
                    }
                });
            } else {
                setFondo("bg-red-200");
            }
        }
        if (tipoRegulacion === "Seguro") {
            if (vigentes.length > 0) {
                vigentes.map((l) => {
                    if (l.tipoLegislacion.legislacion === tipoRegulacion) {
                        const fechaVencimiento = new Date(l.fechaFin);
                        const diferencia = fechaVencimiento.getTime() - hoy.getTime();
                        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
                        if (dias < 10) {
                            setFondo("bg-red-200");
                        } else if (dias < 30) {
                            setFondo("bg-yellow-200");
                        }
                    }
                });
            } else {
                setFondo("bg-red-200");
            }
        }
        if (tipoRegulacion === "Tecnico Mecanica") {
            if (vigentes.length > 0) {
                vigentes.map((l) => {
                    if (l.tipoLegislacion.legislacion === tipoRegulacion) {
                        const fechaVencimiento = new Date(l.fechaFin);
                        const diferencia = fechaVencimiento.getTime() - hoy.getTime();
                        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
                        if (dias < 10) {
                            setFondo("bg-red-200");
                        } else if (dias < 30) {
                            setFondo("bg-yellow-200");
                        }
                    }
                });
            } else {
                setFondo("bg-red-200");
            }
        }
    }, [vehiculo])
    return (
        <>
            <div className={`mb-4 p-4 ${fondo} rounded max-sm:flex-col flex sm:justify-around shadow-lg`}>
                <div>
                    <p className="text-2xl font-bold max-sm:text-center">{vehiculo.placa}</p>
                    <p className="max-sm:text-center">{vehiculo.marca} {vehiculo.modelo}</p>
                </div>
                <div>
                    <button className="mt-2 px-4 py-2 max-sm:w-full bg-blue-500 text-white rounded flex items-center justify-center shadow-xl" onClick={() => setShowDetails(true)}>
                        <Icon className="mr-1 text-xl" icon="mdi:eye-outline" />
                        Ver más detalles
                    </button>
                </div>
            </div>
            {showDetails && <DetailsRegulacion key={1} token={token} reload={reload} tipoRegulacion={tipoRegulacion} vehiculo={vehiculo} closeComponent={() => setShowDetails(!showDetails)} />}
        </>
    );
}

export default ListRegulacion;