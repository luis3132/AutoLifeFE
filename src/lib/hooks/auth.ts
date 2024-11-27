import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Usuario } from "../types/types";

interface verificacion {
    nombreUsuario: string;
    contrasena: string;
}

interface Context {
    usuario: Usuario | null,
    logout: () => void;
}

const getUsuario = async (token: string | undefined) => {
    if (token && token != "") {
        let verificacion: verificacion = { nombreUsuario: "", contrasena: "" };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(token)
            });
            verificacion = await response.json();
        } catch (error) {
            Cookies.remove("authToken");
            sessionStorage.removeItem("usuario");
            window.location.href = "/";
            console.log(error)
        }

        // cargar datos del usuario

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuarios/list/nombreusuario/${verificacion.nombreUsuario}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return await response.json() as Usuario;
        } catch (error) {
            console.log(error)
        }
    }
}

export const AuthContext = createContext<Context>({
    usuario: null,
    logout: () => {}
});

export default function useAuth({ cookie }: { cookie: string | undefined }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    useEffect(() => {
        //validacion del token
        getUsuario(cookie).then((usuario) => {
            setUsuario(usuario || null);
        });

    }, []);

    const LogOut = () => {
        setUsuario(null);
    }

    return {usuario, AuthContext, LogOut};
};