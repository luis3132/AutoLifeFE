"use client";

import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginUser from '@/components/Login/login';
import { Transition } from '@headlessui/react'
import Perfil from '@/components/loged/perfil';
import CryptoJS from 'crypto-js';

export default function NavBarD({ usuario }) {
    // add sessionStorage info about usuario in crypto way
    useEffect(() => {
        // verifica si existe el usuario
        if (usuario != undefined && usuario != "") {
            // Verificar si estamos en el navegador antes de usar localStorage
            if (typeof window !== 'undefined') {
                const usuarioString = JSON.stringify(usuario)
                const cryp = CryptoJS.AES.encrypt(usuarioString, process.env.NEXT_PUBLIC_SECRETKEY).toString()
                sessionStorage.setItem("usuario", cryp)
            }
        }
    }, []);
    var foto = null;
    // comprobacion de una sola recarga
    const [render, setRender] = useState(0);
    if (render < 2) {
        setRender(prevRender => prevRender + 1);
    }
    const [loged, setLoged] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginButtonClick = () => {
        setShowLogin(!showLogin);
    };

    const handlePerfilButtonClick = () => {
        setShowLogin(!showLogin);
    };

    const handleLogout = () => {
        window.location.href = "/";
        document.cookie = "authToken =; path=/;"
        sessionStorage.clear();
    }

    if (usuario != null) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("loged", "true")
        }
        if (render == 1) {
            setLoged(!loged);
        }
        if (usuario.fotos.length > 0) {
            foto = usuario.fotos[0].foto
        } else {
            foto = "/imagenes/logo/logoSL.png";
        }
    } else {
        foto = "/imagenes/logo/logoSL.png";
    }
    return (
        <>
            {loged ? (
                <nav className="flex bg-amber-400 justify-between items-center w-full mx-auto">
                    <div className="pl-[1%] ">
                        <Link className="flex items-center hover:text-gray-500" href="/loged" style={{ cursor: 'pointer' }} replace>
                            <Image src="/imagenes/logo/logoSLSF.png" alt="Logo" width={100} height={100} className="pt-1 pb-1" />
                            <div className="md:static absolute top-[-100%] text-2xl font-bold">
                                AutoLife
                            </div>
                        </Link>
                    </div>
                    <div className="lg:static  absolute  min-h-fit left-0 top-[-100%] w-auto flex items-center px-5">
                        <ul className=" lg:flex-row flex-col flex lg:items-center lg:gap-[4vw] gap-8 justify-center">
                            <li className="flex">
                                <div className="p-1"><Icon icon="vaadin:car" /></div>
                                <Link className="hover:text-gray-500" href="/loged/vehiculoPrivado" replace>Mis Vehiculos</Link>
                            </li>
                            <li className="flex">
                                <div className="p-1"><Icon icon="vaadin:car" /></div>
                                <Link className="hover:text-gray-500" href="/loged/vehiculoPublico" replace>Vehiculos</Link>
                            </li>
                            <li className="flex">
                                <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                                <Link className="hover:text-gray-500" href="/loged/accidentePublico" replace>Accidentes</Link>
                            </li>
                            <li className="flex">
                                <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                                <Link className="hover:text-gray-500" href="/loged/accidentePrivado" replace>Mis Accidentes</Link>
                            </li>
                        </ul>
                    </div>
                    <Transition
                        show={isShowing}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className={`lg:hidden absolute bg-white min-h-[10%] left-0 top-[11%] w-full flex items-center px-5 justify-center ${navbar ? '' : 'hidden'
                            }`}>
                            <ul className="flex-col flex gap-8 justify-center items-center">
                                <li className="flex">
                                    <div className="p-1"><Icon icon="vaadin:car" /></div>
                                    <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/loged/vehiculoPrivado">Mis Vehiculos</Link>
                                </li>
                                <li className="flex">
                                    <div className="p-1"><Icon icon="vaadin:car" /></div>
                                    <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/loged/vehiculoPublico">Vehiculos</Link>
                                </li>
                                <li className="flex">
                                    <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                                    <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/loged/accidentePublico">Accidentes</Link>
                                </li>
                                <li className="flex">
                                    <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                                    <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/loged/accidentePrivado">Mis Accidentes</Link>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                    <div className="flex items-center gap-6 md:pr-2">
                        <button className="bg-lime-400 text-black p-2 rounded-full hover:bg-lime-500" onClick={handlePerfilButtonClick} >
                            <div className="flex items-center justify-center">
                                <Image src={foto} alt="Logo" width={40} height={40} className="rounded-full pl-1" />
                                <div className="pl-4 pr-3 pb-1">Perfil</div>
                            </div>
                        </button>
                        <button className="bg-red-500 text-black p-4 rounded-full hover:bg-red-600" onClick={handleLogout}>Logout</button>
                        {showLogin && <Perfil closeComponent={() => setShowLogin(false)} />}
                        <button className="text-3xl lg:hidden pr-5" onClick={() => {
                            setNavbar(!navbar);
                            setIsShowing(!isShowing);
                        }}>
                            {navbar ? (
                                <Icon icon="material-symbols:close" />
                            ) : (
                                <Icon icon="eva:menu-fill" />
                            )}
                        </button>
                    </div>
                </nav>
            ) : (
                <nav className="flex bg-amber-400 justify-between items-center w-full mx-auto">
                    <div className="pl-[1%] ">
                        <Link className="flex items-center hover:text-gray-500" href="/" style={{ cursor: 'pointer' }} replace>
                            <Image src="/imagenes/logo/logoSLSF.png" alt="Logo" width={100} height={100} className="pt-1 pb-1" />
                            <div className="md:static absolute top-[-100%] text-2xl font-bold">
                                AutoLife
                            </div>
                        </Link>
                    </div>
                    <div className="md:static  absolute  min-h-fit left-0 top-[-100%] w-auto flex items-center px-5">
                        <ul className=" md:flex-row flex-col flex md:items-center md:gap-[4vw] gap-8 justify-center">
                            <li className="flex">
                                <div className="p-1"><Icon icon="vaadin:car" /></div>
                                <Link className="hover:text-gray-500" href="/vehiculoPublico" replace>Vehiculos</Link>
                            </li>
                            <li className="flex">
                                <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                                <Link className="hover:text-gray-500" href="/accidentePublico" replace>Accidentes</Link>
                            </li>
                        </ul>
                    </div>
                    <Transition
                        show={isShowing}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className={`md:hidden absolute bg-white min-h-[10%] left-0 top-[11%] w-full flex items-center px-5 justify-center ${navbar ? '' : 'hidden'
                            }`}>
                            <ul className="flex-col flex gap-8 justify-center items-center">
                                <li className="flex">
                                    <div className="p-1"><Icon icon="vaadin:car" /></div>
                                    <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/vehiculoPublico">Vehiculos</Link>
                                </li>
                                <li className="flex">
                                    <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                                    <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/accidentePublico">Accidentes</Link>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                    <div className="flex items-center gap-6 md:pr-2">
                        <button className="bg-lime-400 text-black px-5 py-2 rounded-full hover:bg-lime-500" onClick={handleLoginButtonClick} >Sign in</button>
                        {showLogin && <LoginUser closeComponent={() => setShowLogin(false)} />}
                        <button className="text-3xl md:hidden pr-5" onClick={() => {
                            setNavbar(!navbar);
                            setIsShowing(!isShowing);
                        }}>
                            {navbar ? (
                                <Icon icon="material-symbols:close" />
                            ) : (
                                <Icon icon="eva:menu-fill" />
                            )}
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}