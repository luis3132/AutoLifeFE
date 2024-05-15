"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Transition } from '@headlessui/react'
import Perfil from '@/components/loged/perfil';

export default function NavbarLi({ usuario }) {
    var foto = null;
    if (usuario != null) {
        if (usuario.fotos.length > 0) {
            foto = usuario.fotos[0].foto
        } else {
            foto = "/imagenes/logo/logoSL.png";
        }
    } else {
        foto = "/imagenes/logo/logoSL.png";
    }
    const [navbar, setNavbar] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handlePerfilButtonClick = () => {
        setShowLogin(!showLogin);
    };
    const handleLogout = () => {
        window.location.href = "/";
        document.cookie = "authToken =; path=/;"
    }
    return (
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
                            <Link className="hover:text-gray-500" onClick={() => setNavbar(!navbar)} replace href="/loged/vehiculoPrivado">Mis Vehiculos</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="vaadin:car" /></div>
                            <Link className="hover:text-gray-500" onClick={() => setNavbar(!navbar)} replace href="/loged/vehiculoPublico">Vehiculos</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                            <Link className="hover:text-gray-500" onClick={() => setNavbar(!navbar)} replace href="/loged/accidentePublico">Accidentes</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                            <Link className="hover:text-gray-500" onClick={() => setNavbar(!navbar)} replace href="/loged/accidentePrivado">Mis Accidentes</Link>
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
                    setIsShowing(!isShowing)
                }}>
                    {navbar ? (
                        <Icon icon="material-symbols:close" />
                    ) : (
                        <Icon icon="eva:menu-fill" />
                    )}
                </button>
            </div>
        </nav>
    );
}