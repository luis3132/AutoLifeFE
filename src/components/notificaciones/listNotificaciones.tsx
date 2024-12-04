import { Notificacion } from "@/lib/types/types";
import { FC, useEffect, useState } from "react";
import DetailsNotificaciones from "./detailsNotificaciones";

interface NotificacionProps {
    notificaciones: Notificacion;
    token: string | undefined;
    index: number;
    reload: () => void;
}

const ListNotificaciones: FC<NotificacionProps> = ({ notificaciones, token, reload }) => {
    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const [showEdit, setShowEdit] = useState<boolean>(false);

    useEffect(() => {
        if (notificaciones) {
            if (notificaciones.vehiculo.fotos.length > 0) {
                setFoto(notificaciones.vehiculo.fotos[notificaciones.vehiculo.fotos.length - 1].path);
            }
        }
    }, [notificaciones]);

    return (
        <>
            <div className="max-sm:w-full max-lg:w-1/2 w-[30%] bg-gray-100 rounded-lg shadow-lg mx-2 p-5 h-min mb-5">
                <div className="w-full">
                    <p className="text-xl text-center font-semibold">{notificaciones.usuario}</p>
                </div>
                <div className="w-full flex justify-center p-3">
                    <div className="w-1/2 rounded-2xl overflow-hidden shadow-xl">
                        <img src={foto} height={500} width={500} />
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-xl text-center font-semibold">{notificaciones.servicio.tipoServicio.servicio}</p>
                </div>
                <div className="w-full flex justify-center pt-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg"
                        onClick={() => setShowEdit(true)}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
            {showEdit && <DetailsNotificaciones token={token} reload={reload} closeComponent={() => setShowEdit(false)} notificacion={notificaciones} key={notificaciones.id} />}
        </>
    );
};

export default ListNotificaciones;