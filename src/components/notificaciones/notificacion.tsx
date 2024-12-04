import { Notificacion, Usuario } from "@/lib/types/types";
import { FC, useEffect, useState } from "react";
import ListNotificaciones from "./listNotificaciones";

interface NotificacionProps {
    usuario: Usuario | null;
    token: string | undefined;
}

const Notificaciones: FC<NotificacionProps> = ({ usuario, token }) => {

    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
    const [notificacionesLeidas, setNotificacionesLeidas] = useState<Notificacion[]>([]);
    const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState<Notificacion[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [leidas, setLeidas] = useState<boolean>(false);

    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/notificaciones/list/taller/${usuario?.dni}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setNotificaciones(data as Notificacion[]);
            } catch (error) {
                console.log(error);
            }
        }
        if (usuario) {
            fetchNotificaciones();
        }
    }, [usuario, reload]);

    const handleReload = () => {
        setReload(!reload);
    }
    console.log(notificaciones);

    useEffect(() => {
        if (notificaciones) {
            const leidas = notificaciones.filter(noti => noti.estado === "VISTA");
            const noLeidas = notificaciones.filter(noti => noti.estado === "NVISTA");
            setNotificacionesLeidas(leidas);
            setNotificacionesNoLeidas(noLeidas);
        }
    }, [notificaciones]);

    return (
        <>
            <div className="w-full h-[89dvh] custom-scrollbar overflow-y-scroll">
                <div className="float-right flex justify-center p-5">
                    <button className="w-min bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={() => setLeidas(!leidas)}>{leidas ? ("Ver No vistas") : ("Ver Vistas")}</button>
                </div>
                <p className="text-center text-4xl pt-5 pb-3 font-bold">Vehiculos solicitados</p>
                <div className={`${leidas && "hidden"} w-full flex flex-wrap justify-around px-5`}>
                    {notificacionesNoLeidas.length > 0 ? (
                        notificacionesNoLeidas.map((notificacion, index) => (
                            <ListNotificaciones reload={handleReload} notificaciones={notificacion} token={token} index={index} key={index} />
                        ))
                    ) : (
                        <>
                            <p className="text-center font-bold text-red-500 h-inherit flex items-center text-2xl">No hay notificaciones nuevas</p>
                        </>
                    )}
                </div>
                <div className={`${!leidas && "hidden"} w-full flex flex-wrap justify-around px-5`}>
                    {notificacionesLeidas.length > 0 ? (
                        notificacionesLeidas.map((notificacion, index) => (
                            <ListNotificaciones reload={handleReload} notificaciones={notificacion} token={token} index={index} key={index} />
                        ))
                    ) : (
                        <>
                            <p className="text-center font-bold text-red-500 h-inherit flex items-center text-2xl">No hay notificaciones</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Notificaciones;