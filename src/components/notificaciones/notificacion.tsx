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
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/notificaciones/list/usuario/${usuario?.dni}`, {
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
            <div className="w-full h-min shadow-2xl rounded-2xl">
                <p className="text-center text-2xl pt-5 pb-3">Notificaciones</p>
                <div className={`${leidas && "hidden"} w-full flex justify-around px-5 min-h-[500px]`}>
                    {notificacionesNoLeidas.length > 0 ? (
                        <>
                            <table className="w-full">
                                <thead>
                                    <tr className="flex justify-between pb-2 px-4">
                                        <th>Taller</th>
                                        <th>Servicio</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notificacionesNoLeidas.map((notificacion, index) => (
                                        <ListNotificaciones reload={handleReload} notificaciones={notificacion} token={token} index={index} key={index} />
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <p className="text-center font-bold text-red-500 h-inherit flex items-center text-2xl">No hay notificaciones nuevas</p>
                        </>
                    )}
                </div>
                <div className={`${!leidas && "hidden"} w-full flex justify-center px-10 min-h-[500px]`}>
                    {notificacionesLeidas.length > 0 ? (
                        <>
                            <table className="w-full">
                                <thead>
                                    <tr className="flex justify-around">
                                        <th>Taller</th>
                                        <th>Servicio</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notificacionesLeidas.map((notificacion, index) => (
                                        <ListNotificaciones reload={handleReload} notificaciones={notificacion} token={token} index={index} key={index} />
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <p className="text-center font-bold text-red-500 h-inherit flex items-center text-2xl">No hay notificaciones</p>
                        </>
                    )}
                </div>
                <div className="w-full flex justify-center py-2">
                    <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={() => setLeidas(!leidas)}>{leidas ? ("Ver No vistas") : ("Ver Vistas")}</button>
                </div>
            </div>
        </>
    );
}

export default Notificaciones;