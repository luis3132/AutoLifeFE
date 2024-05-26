import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

export default function LoginUser({ closeComponent }) {
    const Usuario_API_URL = "http://localhost:8090/auth/register"
    const Usuario_API_Login = "http://localhost:8090/auth/login"
    const [register, setRegister] = useState(false);
    const [confirmar, setConfirmar] = useState({
        confirmar: ""
    })
    let [isOpen, setIsOpen] = useState(true);
    const [login, setLogin] = useState({
        userLogin: "",
        contrasena: ""
    });
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
    const saveUsuario = async (e) => {
        if(confirmar.confirmar == Usuario.contrasena){
            const response = await fetch(Usuario_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Usuario)
            });
            if (!response.ok) {
                Swal.fire({
                    title: 'Error',
                    text: "DNI o Email o Nombre de Usuario ya registrado",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Regresar'
                })
            } else {
                const _Usuario = await response.json();
                Swal.fire({
                    title: 'Creado!',
                    text: "Usuario Creado con exito",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Regresar'
                })
                document.cookie = `authToken=${_Usuario.token}; path=/;`;
                reset(e);
                window.location.href = "loged"
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: "Contrasenas no cohinciden",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Regresar'
            })
            setUsuario({...Usuario, contrasena: ""})
            setConfirmar({confirmar: ""})
        }
    };
    const loginUsuario = async (e) => {
        try {
            const response = await fetch(Usuario_API_Login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            });
            if (!response.ok) {
                Swal.fire({
                    title: 'Error',
                    text: "Nombre de usuario o contrasena INCORRECTOS",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Regresar'
                })
                setLogin({
                    userLogin: "",
                    contrasena: ""
                })
            } else {
                const _Login = await response.json();
                document.cookie = `authToken=${_Login.token}; path=/;`;
                reset(e);
                window.location.href = "loged"
            }
        } catch (error){
            Swal.fire({
                title: 'Error',
                text: "Error al iniciar seccion",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Regresar'
            })
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
        setLogin({
            userLogin: "",
            contrasena: ""
        })
        closeComponent();
    }
    const handleChange = (event) => {
        setUsuario({ ...Usuario, [event.target.name]: event.target.value });
    }
    const handleChangeLogin = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value });
    }
    const handleChangeConfirmar = (event) => {
        setConfirmar({ ...confirmar, [event.target.name]: event.target.value });
    }
    function closeModal() {
        setIsOpen(false)
    }
    function changeRegister() {
        setRegister(!register)
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
        setLogin({
            userLogin: "",
            contrasena: ""
        })
    }
    return (
        <>
            <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
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
                                                <input name="dni" value={Usuario.dni} onChange={(e) => handleChange(e)} maxLength={20} id="DNI" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="1234" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Nombres:</div>
                                                <input name="nombre" value={Usuario.nombre} onChange={(e) => handleChange(e)} maxLength={100} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Pepito" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Apellidos:</div>
                                                <input name="apellidos" value={Usuario.apellidos} onChange={(e) => handleChange(e)} maxLength={100} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Perez" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Direccion:</div>
                                                <input name="direccion" value={Usuario.direccion} onChange={(e) => handleChange(e)} maxLength={200} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Calle 1 #1-1" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Email:</div>
                                                <input name="email" value={Usuario.email} onChange={(e) => handleChange(e)} maxLength={150} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="pp@email.com" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Nombre Usuario:</div>
                                                <input name="nombreUsuario" value={Usuario.nombreUsuario} onChange={(e) => handleChange(e)} maxLength={20} className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2 " placeholder="pepe" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Telefono:</div>
                                                <input name="telefono" value={Usuario.telefono} onChange={(e) => handleChange(e)} maxLength={15} type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="3101234567" ></input>
                                            </div>
                                            <div>
                                                <div className="text-left w-full pl-5">Contrasena:</div>
                                                <input name="contrasena" value={Usuario.contrasena} onChange={(e) => handleChange(e)} type="password" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Contrasena" ></input>
                                            </div>
                                            <div className="pt-2">
                                                <input name="confirmar" value={confirmar.confirmar} onChange={(e) => handleChangeConfirmar(e)} type="password" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Contrasena" ></input>
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
                                                <input name="userLogin" value={login.userLogin} onChange={(e) => handleChangeLogin(e)} type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="Nombre Usuario" ></input>
                                            </div>
                                            <div className="pt-2" >
                                                <div className="text-left w-full pl-5">Contrasena:</div>
                                                <input name="contrasena" value={login.contrasena} onChange={(e) => handleChangeLogin(e)} type="password" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="1234" ></input>
                                            </div>
                                            <div className="pt-2">
                                                <button onClick={loginUsuario} className="pr-2 pl-2 rounded-full bg-lime-400 hover:bg-opacity-100 bg-opacity-70">Ingresar</button>
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