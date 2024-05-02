"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginUser from './login';
import { Transition } from '@headlessui/react'

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const handleLoginButtonClick = () => {
        setShowLogin(!showLogin);
    };
    return (
        <nav className="flex bg-amber-400 justify-between items-center w-full mx-auto">
            <div className="pl-[1%] ">
                <Link className="flex items-center hover:text-gray-500" href="/" style={{ cursor: 'pointer' }}>
                    <Image src="/imagenes/logo/logoSLSF.png" alt="Logo" width={100} height={100} className="pt-1 pb-1" />
                    <div className="text-2xl font-bold">
                        AutoLife
                    </div>
                </Link>
            </div>
            <div className="md:static  absolute  min-h-fit left-0 top-[-100%] w-auto flex items-center px-5">
                <ul className=" md:flex-row flex-col flex md:items-center md:gap-[4vw] gap-8 justify-center">
                    <li>
                        <Link className="hover:text-gray-500" href="/vehiculoPublico">Vehiculos</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="">Accidentes</Link>
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
                    <ul className="flex-col flex gap-8 justify-center">
                        <li>
                            <Link className="hover:text-gray-500" onClick={() => setNavbar(!Navbar)} href="/vehiculoPublico">Vehiculos</Link>
                        </li>
                        <li>
                            <Link className="hover:text-gray-500" onClick={() => setNavbar(!Navbar)} href="">Accidentes</Link>
                        </li>
                    </ul>
                </div>
            </Transition>
            <div className="flex items-center gap-6 md:pr-2">
                <button className="bg-lime-400 text-black px-5 py-2 rounded-full hover:bg-lime-500" onClick={handleLoginButtonClick} >Sign in</button>
                {showLogin && <LoginUser closeComponent={() => setShowLogin(false)} />}
                <button className="text-3xl md:hidden pr-5" onClick={() => {
                    setNavbar(!navbar);
                    setIsShowing((isShowing) => !isShowing)
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