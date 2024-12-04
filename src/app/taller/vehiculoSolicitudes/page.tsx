"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { Usuario } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Notificaciones from "@/components/notificaciones/notificacion";

export default function Home() {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        if (document.readyState === "complete") {
            const { token, usuario } = Comprobar();

            if (token !== undefined && usuario !== null) {
                setToken(token);
                setUsuario(usuario);
            }
            if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "" || usuario === null) {
                window.location.href = "/";
            }
        }
    }, []);

    return(
        <>
            <Notificaciones token={token} usuario={usuario} key={1} />
        </>
    );
}