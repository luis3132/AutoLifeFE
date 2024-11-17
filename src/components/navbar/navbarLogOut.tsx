import Image from "next/image";
import Link from "next/link";
import { Transition } from '@headlessui/react';
import { Icon } from "@iconify/react";
import { useState } from "react";
import Auth from "../auth/auth";

const NavbarLogOut = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [auth, setAuth] = useState(false);

    const handleSignin = () => {
        setAuth(true);
        setNavbar(false);
        setIsShowing(false)
    }
    return (
        <nav className="flex bg-amber-400 justify-between items-center w-full mx-auto">
            <div className="pl-[1%] ">
                <Link className="flex items-center hover:text-gray-500" href="/" style={{ cursor: 'pointer' }} replace>
                    <Image src="/images/logo/logoSLSF.png" alt="Logo" width={100} height={100} className="pt-1 pb-1" />
                    <div className="sm:static absolute top-[-100%] text-2xl font-bold">
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
                <div className={`xl:hidden absolute bg-white min-h-[10%] left-0 top-[11%] max-sm:top-24 w-full flex items-center px-5 justify-center border-black border-2 transition-transform duration-300 ease-in-out ${navbar ? 'z-50 transform translate-y-0' : 'z-50 transform -translate-y-full'}`}>
                    <ul className="flex-col flex gap-8 justify-center items-center">
                        <li className="flex pt-2">
                            <div className="p-1"><Icon icon="vaadin:car" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/vehiculoPublico">Vehiculos</Link>
                        </li>
                        <li className="flex pb-2">
                            <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/accidentePublico">Accidentes</Link>
                        </li>
                    </ul>
                </div>
            </Transition>
            <div className="flex items-center gap-6 md:pr-2">
                <button className="bg-lime-400 text-black px-5 py-2 rounded-full hover:bg-lime-500" onClick={handleSignin} >Sign in</button>
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
            {auth && <Auth closeComponent={() => setAuth(false)} />}
        </nav>
    );
}

export default NavbarLogOut;