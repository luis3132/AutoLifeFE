import { Notificacion } from "@/lib/types/types";
import { FC, useState } from "react";
import DetailsNotificaciones from "./detailsNotificaciones";
import { Icon } from "@iconify/react/dist/iconify.js";

interface NotificacionProps {
    notificaciones: Notificacion;
    token: string | undefined;
    index: number;
    reload: () => void;
}

const ListNotificaciones: FC<NotificacionProps> = ({ notificaciones, token, index, reload }) => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <tr className={`flex justify-around rounded-lg h-10 items-center px-4 ${index % 2 === 0 && "bg-slate-400"}`}>
                <td className="w-1/3">{notificaciones.taller}</td>
                <td className="w-1/3">{notificaciones.servicio.tipoServicio.servicio}</td>
                <td className="w-1/3 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 flex items-center text-white font-bold py-1 px-4 rounded" onClick={() => setShow(!show)}>
                        <Icon className="" icon="mdi:eye-outline" />
                        <p>Ver</p>
                        </button>
                </td>
            </tr>
            {show && <DetailsNotificaciones token={token} reload={reload} closeComponent={() => setShow(false)} notificacion={notificaciones} key={notificaciones.id} />}
        </>
    );
};

export default ListNotificaciones;