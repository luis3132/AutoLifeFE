"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { Usuario } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Home() {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        if (document.readyState === "complete") {
            const { token, usuario } = Comprobar();

            if (token !== undefined && usuario !== null) {
                setToken(token);
                setUsuario(usuario);
            }
            if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "") {
                window.location.href = "/";
            }
        }
    }, [reload]);

    useEffect(() => {
        if (!usuario && !token) {
            setReload(!reload);
        } else {
            if (usuario?.roles.id === 1) {
                window.location.href = "admin";
            } else if (usuario?.roles.id === 2) {
                window.location.href = "home";
            } else if (usuario?.roles.id === 3) {
                window.location.href = "taller";
            }
        }
    }, [usuario, token, reload]);
    return (
        <></>
    )
}
