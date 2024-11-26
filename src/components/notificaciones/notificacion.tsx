import { Usuario } from "@/lib/types/types";
import { FC, useEffect } from "react";

interface NotificacionProps {
    usuario: Usuario | null;
    token: string | undefined;
}

const Notificacion: FC<NotificacionProps> = ({ usuario, token }) => {

    useEffect(()=> {
        const fetchNotificaciones = async () => {
            try {
                const response = fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/notificaciones/list/usuario/${usuario?.dni}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            } catch (error) {
                
            }
        }
    })

    return (
        <>
            <div className="h-min bg-gray-300 rounded-xl">
                <p className="text-center text-2xl">Notificaciones</p>

            </div>
        </>
    );
}

export default Notificacion;