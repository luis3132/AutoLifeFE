import { useEffect, useState } from "react"


export default function Listado({ vehiculo, tipo, expire, nextExpire }) {

    const hoy = new Date();
    var diaVige = null;
    const [diasVige, setDiasVige] = useState(null);

    useEffect(() => {
        if (tipo == "seguro") {
            vehiculo.seguro?.forEach((seguro) => {
                const diaSeguro = new Date(seguro.dateFinish)
                const dife = diaSeguro - hoy
                const milisegundosPorDia = 1000 * 60 * 60 * 24;
                diaVige = Math.round(dife / milisegundosPorDia);
                setDiasVige(diaVige);

                if (diaVige <= 30 && diaVige > 0) {
                    nextExpire();
                } else {
                    if (diaVige <= 0) {
                        expire();
                    }
                }
            })
        }
    }, [vehiculo])

    let bgColorClass = "bg-green-300 hover:bg-green-400"; // Default to green
    if (diasVige <= 0) {
        bgColorClass = "bg-red-400 hover:bg-red-500";
    } else if (diasVige <= 30) {
        bgColorClass = "bg-yellow-300 hover:bg-yellow-400";
    }

    return (
        <>
            <div className="px-[10%] w-full ">
                <div className={`h-10 flex items-center pl-5 ${bgColorClass}`}>
                    <p className="mr-1 max-2xl:hidden">{vehiculo.marca}</p>
                    <p className="mr-1">{vehiculo.referencia}</p>
                    <p className="mr-1 max-2xl:hidden">{vehiculo.serie}</p>
                    <p className="mr-1">{vehiculo.placa}</p>
                    <p className="mr-1 max-2xl:hidden">{vehiculo.modelo}</p>
                    <div className="ml-auto pr-5">{diasVige}</div>
                </div>
            </div>
        </>
    )
}