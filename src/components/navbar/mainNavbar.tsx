"use client";

import React, { FC, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import NavbarLogOut from "./navbarLogOut";
import NavbarUsuario from "./navbarUsuario";
import useAuth from "@/lib/hooks/auth";
import Cookies from 'js-cookie';

interface Roles {
    id: number;
    rol: string;
}

interface Fotos {
    id: number;
    path: string;
    vehiculo: string;
    servicio: number;
    accidentes: number;
    usuarios: string;
    legislacion: number;
    piezas: string;
    partes: string;
}

interface Usuario {
    dni: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    roles: Roles;
    contrasena: string;
    email: string;
    nombreUsuario: string;
    fotos: Fotos[];
}

const MainNavbar = () => {

    const { usuario, AuthContext, LogOut } = useAuth({ cookie: Cookies.get("authToken") });

    useEffect(() => {
        if (usuario) {
            if (document.readyState === "complete") {
                const usuarioString: string = JSON.stringify(usuario);
                // Encrypt
                const cryp: string = CryptoJS.AES.encrypt(usuarioString, process.env.NEXT_PUBLIC_SECRETKEY as string).toString();
                // Save
                sessionStorage.setItem("usuario", cryp);
            }
        }
    }, [usuario]);

    return (
        <AuthContext.Provider value={{
            usuario, logout() {
                LogOut();
            }
        }}>
            {usuario === null && <NavbarLogOut />}
            {usuario?.roles.rol === "ADMIN"}
            {usuario?.roles.rol === "USER" && <NavbarUsuario logout={LogOut} />}
            {usuario?.roles.rol === "TALLER"}
        </AuthContext.Provider>
    )
}

export default MainNavbar;