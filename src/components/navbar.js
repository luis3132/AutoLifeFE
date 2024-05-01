"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    return (
        <nav className="flex bg-amber-400 justify-between items-center w-full mx-auto">
            <div>
                <Link className="flex items-center hover:text-gray-500" href="/" style={{ cursor: 'pointer' }}>
                    <Image src="/imagenes/logo/logoSLSF.png" alt="Logo" width={100} height={100} />
                    <div className="text-2xl font-bold">
                        AutoLife
                    </div>
                </Link>
            </div>
            <div className="md:static  absolute  min-h-fit left-0 top-[-100%] w-auto flex items-center px-5">
                <ul className=" md:flex-row flex-col flex md:items-center md:gap-[4vw] gap-8 justify-center">
                    <li>
                        <Link className="hover:text-gray-500" href="">Vehiculos</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" href="">Accidentes</Link>
                    </li>
                </ul>
            </div>
            <div className={`md:hidden absolute bg-white min-h-[10%] left-0 top-[10%] w-full flex items-center px-5 justify-center ${
                navbar ? '': 'hidden'
            }`}>
                <ul className="flex-col flex gap-8 justify-center">
                    <li>
                        <Link className="hover:text-gray-500" onClick={()=> setNavbar(!Navbar)} href="">Vehiculos</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" onClick={()=> setNavbar(!Navbar)} href="">Accidentes</Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6 md:pr-2">
                <button className="bg-lime-400 text-black px-5 py-2 rounded-full hover:bg-lime-500">Sign in</button>
                <button className="text-3xl md:hidden pr-5" onClick={() => setNavbar(!navbar)}>
                    {navbar ? (
                        <Icon icon="material-symbols:close" />
                    ): (
                        <Icon icon="eva:menu-fill"/>
                    )}
                </button>
            </div>
        </nav>
    );
}