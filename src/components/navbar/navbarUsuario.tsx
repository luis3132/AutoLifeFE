import Image from "next/image";
import Link from "next/link";
import { Transition } from '@headlessui/react';
import { Icon } from "@iconify/react";
import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/hooks/auth";
import Cookies from 'js-cookie';

interface NavbarUsuarioProps {
    logout: () => void;
}

const NavbarUsuario: FC<NavbarUsuarioProps> = ({ logout }) => {
    const { usuario } = useContext(AuthContext);
    const [isShowing, setIsShowing] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");

    useEffect(() => {
        if (usuario) {
            if (usuario.fotos.length > 0) {
                setFoto(usuario.fotos[usuario.fotos.length - 1].path);
            }
        }
    }, []);

    const hanldeLogout = () => {
        Cookies.remove("authToken");
        sessionStorage.clear();
        logout();
        window.location.href = "/";
    }

    return (
        <nav className="flex bg-amber-400 justify-between items-center w-full mx-auto shadow-lg">
            <div className="pl-[1%] ">
                <Link className="flex items-center hover:text-gray-500 cursor-pointer" href="/home" replace>
                    <Image src="/images/logo/logoSLSF.png" alt="Logo" width={100} height={100} className="pt-1 pb-1" />
                    <div className="sm:static absolute top-[-100%] text-2xl font-bold">
                        AutoLife
                    </div>
                </Link>
            </div>
            <div className="xl:static  absolute  min-h-fit left-0 top-[-100%] w-auto flex items-center px-5">
                <ul className=" xl:flex-row flex-col flex xl:items-center xl:gap-[4vw] gap-8 justify-center">
                    <li className="flex">
                        <div className="p-1"><Icon icon="vaadin:car" /></div>
                        <Link className="hover:text-gray-500" href="/home/vehiculoPrivado" replace>Mis Vehiculos</Link>
                    </li>
                    <li className="flex">
                        <div className="p-1"><Icon icon="vaadin:car" /></div>
                        <Link className="hover:text-gray-500" href="/home/vehiculoPublico" replace>Vehiculos</Link>
                    </li>
                    <li className="flex">
                        <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                        <Link className="hover:text-gray-500" href="/home/accidentePublico" replace>Accidentes</Link>
                    </li>
                    <li className="flex">
                        <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                        <Link className="hover:text-gray-500" href="/home/accidentePrivado" replace>Mis Accidentes</Link>
                    </li>
                    <li className="flex">
                        <div className="p-1"><Icon icon="mi:document" /></div>
                        <Link className="hover:text-gray-500" href="/home/regulacion" replace>Regulacion</Link>
                    </li>
                    <li className="flex">
                        <div className="p-1"><Icon icon="material-symbols:home-repair-service-outline" /></div>
                        <Link className="hover:text-gray-500" href="/home/servicios" replace>Servicios</Link>
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
                leaveTo="opacity-0" >
                <div className={`xl:hidden absolute bg-white min-h-[10%] left-0 top-[10%] max-sm:top-24 w-full flex items-center px-5 justify-center border-black border-2 transition-transform duration-300 ease-in-out ${navbar ? 'z-50 transform translate-y-0' : 'z-50 transform -translate-y-full'}`}>
                    <ul className="flex-col flex gap-8 justify-center items-center">
                        <li className="flex pt-2">
                            <div className="p-1"><Icon icon="vaadin:car" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/home/vehiculoPrivado">Mis Vehiculos</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="vaadin:car" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/home/vehiculoPublico">Vehiculos</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/home/accidentePublico">Accidentes</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="fluent:vehicle-car-collision-24-regular" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/home/accidentePrivado">Mis Accidentes</Link>
                        </li>
                        <li className="flex">
                            <div className="p-1"><Icon icon="mi:document" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/home/regulacion">Regulacion</Link>
                        </li>
                        <li className="flex pb-2">
                            <div className="p-1"><Icon icon="material-symbols:home-repair-service-outline" /></div>
                            <Link className="hover:text-gray-500" onClick={() => { setNavbar(!navbar); setIsShowing(!isShowing); }} replace href="/home/servicios">Servicios</Link>
                        </li>
                    </ul>
                </div>
            </Transition>
            <div className="flex items-center gap-6 md:pr-2">
                <button className="bg-lime-400 text-black p-2 rounded-full hover:bg-lime-500" >
                    <Link href="/home/perfil" className="flex items-center justify-center">
                        <Image src={foto} alt="Logo" width={40} height={40} className="rounded-full pl-1 max-sm:hidden" />
                        <div className="pl-4 pr-3 pb-1">Perfil</div>
                    </Link>
                </button>
                <button className="bg-red-500 text-black p-4 rounded-full hover:bg-red-600" onClick={hanldeLogout} >Logout</button>
                <button className="text-3xl xl:hidden pr-5" onClick={() => {
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
    )
}

export default NavbarUsuario;