import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Icon } from '@iconify/react';


export default function LoginUser({ closeComponent }) {
    const Usuario_API_URL = "http://localhost:8090/api/usuarios/new"
    const [register, setRegister] = useState(false);
    let [isOpen, setIsOpen] = useState(true);
    const [Usuario, setUsuario] = useState({
        dni: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        contrasena: "",
        email: "",
        nombreUsuario: "",
        "roles": {
            id: "2",
            rol: "User"
        }
    })
    console.log(Usuario)
    const saveUsuario = async (e) => {
        const response = await fetch(Usuario_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Usuario)
        });
        if (!response.ok) {
            alert("DNI o Email o Nombre de Usuario ya registrado");
        } else {
            const _Usuario = await response.json();
            reset(e);
        }
    };
    const reset = (e) => {
        setUsuario({
            dni: "",
            nombre: "",
            apellidos: "",
            telefono: "",
            direccion: "",
            contrasena: "",
            email: "",
            nombreUsuario: "",
            "roles": {
                id: "2",
                rol: "User"
            }
        })
        closeComponent();
    }
    const handleChange = (event) => {
        const value = event.target.value;
        setUsuario({ ...Usuario, [event.target.name]: value });
    }
    function closeModal() {
        setIsOpen(false)
    }
    function changeRegister() {
        setRegister(!register)
    }
    return (
        <>
            <div className="w-full bg-black fixed inset-0 flex items-center justify-center bg-opacity-60 ">
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    {register ? (
                                        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[80%] bg-lime-400 rounded-lg pb-1  ">
                                            <button className=" float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                            <div className="text-2xl pt-3 pl-10" >Register</div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">DNI:</div>
                                                <input name="dni" value={Usuario.dni} onChange={(e) => handleChange(e)} id="DNI" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="1234" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Nombres:</div>
                                                <input name="nombre" value={Usuario.nombre} onChange={(e) => handleChange(e)} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Pepito" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Apellidos:</div>
                                                <input name="apellidos" value={Usuario.apellidos} onChange={(e) => handleChange(e)} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Perez" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Direccion:</div>
                                                <input name="direccion" value={Usuario.direccion} onChange={(e) => handleChange(e)} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Calle 1 #1-1" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Email:</div>
                                                <input name="email" value={Usuario.email} onChange={(e) => handleChange(e)} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="pp@email.com" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Nombre Usuario:</div>
                                                <input name="nombreUsuario" value={Usuario.nombreUsuario} onChange={(e) => handleChange(e)} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2 " placeholder="pepe" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Telefono:</div>
                                                <input name="telefono" value={Usuario.telefono} onChange={(e) => handleChange(e)} type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="3101234567" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Contrasena:</div>
                                                <input type="password" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Contrasena" ></input>
                                            </div>
                                            <div className="pt-2">
                                                <input name="contrasena" value={Usuario.contrasena} onChange={(e) => handleChange(e)} type="password" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Contrasena" ></input>
                                            </div>
                                            <div className="pt-2">
                                                <button className="pr-2 pl-2 rounded-full bg-amber-400 hover:bg-opacity-100 bg-opacity-70" onClick={saveUsuario}>Registro</button>
                                            </div>
                                            <div className="text-sm float-right pr-2 pt-2">
                                                Ya esta registrado? <button className="hover:text-gray-600" onClick={changeRegister}>Inicie seccion!</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[80%] bg-amber-400 rounded-lg ">
                                            <button className="float-right pr-1 pt-1" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                            <div className="text-2xl pt-3 pl-10" >Login</div>
                                            <div className="" >
                                                <div className="text-left w-full pl-5">Nombre Usuario:</div>
                                                <input type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="pepe" ></input>
                                            </div>
                                            <div className="pt-2" >
                                                <div className="text-left w-full pl-5">Nombre Usuario:</div>
                                                <input type="password" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="1234" ></input>
                                            </div>
                                            <div className="pt-2">
                                                <button className="pr-2 pl-2 rounded-full bg-lime-400 hover:bg-opacity-100 bg-opacity-70">Ingresar</button>
                                            </div>
                                            <div className="pt-2 text-right pr-3 text-sm">
                                                No se ha registrado? <button className="hover:text-gray-600" onClick={changeRegister}>Registrese!</button>
                                            </div>
                                        </div>
                                    )}
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}