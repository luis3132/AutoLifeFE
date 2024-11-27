"use client";

import React, { FC, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import NavbarLogOut from "./navbarLogOut";
import NavbarUsuario from "./navbarUsuario";
import useAuth from "@/lib/hooks/auth";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

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
        if (usuario?.estado === "INACTIVO" || (usuario?.estado === "PENDIENTE" && usuario?.roles.rol === "TALLER") || usuario?.estado === "NOAPROBADO") {
            Swal.fire({
                title: "Usuario inactivo o no Aprovado",
                text: "Su usuario ha sido desactivado, contacte con el administrador",
                icon: "error",
                timer: 5000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    LogOut();
                    sessionStorage.removeItem("usuario");
                    Cookies.remove("authToken");
                    window.location.reload();
                }
            });
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