import { Legislacion } from "@/lib/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";

interface legislacionProps {
    legislacion: Legislacion;
}

const ListLegislacion: FC<legislacionProps> = ({ legislacion }) => {
    return (
        <tr>
            <td className=" px-4 py-2 max-sm:hidden">{new Date(legislacion.fechaInicio).toISOString()}</td>
            <td className=" px-4 py-2">{new Date(legislacion.fechaFin).toISOString()}</td>
            <td className={` px-4 py-2 max-sm:hidden ${legislacion.tipoLegislacion.legislacion !== "Tecnico Mecanica" && "hidden"}`}>{legislacion.kilometraje}</td>
            <td className=" px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    <Icon className="mr-1" icon="mdi:eye-outline" />
                    Ver
                </button>
            </td>
        </tr>
    )
}

export default ListLegislacion;