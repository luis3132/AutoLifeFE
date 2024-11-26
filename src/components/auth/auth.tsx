import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, FC, Fragment, KeyboardEventHandler, useState } from "react";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

interface authprops {
    closeComponent: () => void;
}

interface Usuario {
    dni: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    roles: number;
    contrasena: string;
    email: string;
    nombreUsuario: string;
}

interface Token {
    token: string;
}

interface Registro {
    nombreUsuario: string;
    contrasena: string;
}

interface Confirmar {
    confirmar: string;
}

const Auth: FC<authprops> = ({ closeComponent }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [confirmar, setConfirmar] = useState<Confirmar>({
        confirmar: ""
    })
    const [usuario, setUsuario] = useState<Usuario>({
        dni: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        roles: 2,
        contrasena: "",
        email: "",
        nombreUsuario: ""
    });
    const [registro, setRegistro] = useState<Registro>({
        nombreUsuario: "",
        contrasena: ""
    });

    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeConfirmar = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmar({
            confirmar: e.target.value
        });
    }

    const handleSignin = () => {
        setLoading(true);
        if (registro.nombreUsuario !== "" && registro.contrasena !== "") {
            signin();
        } else {
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: "Rellena todos los campos",
                icon: "error"
            });
        }
    }

    const signin = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registro)
            });
            const data = await res.json();
            setLoading(false);
            if (res.ok) {
                const token: Token = data;
                Cookies.set("authToken", token.token);
                window.location.href = "home";
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "Nombre de usuario o contrasena INCORRECTOS",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Regresar'
                });
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: error as string,
                icon: "error"
            });
        }
    }

    const handleSignup = () => {
        setLoading(true);
        if (usuario.nombreUsuario !== "" && usuario.contrasena !== "" && usuario.dni !== "" && usuario.nombre !== "" && usuario.apellidos !== "" && usuario.telefono !== "" && usuario.direccion !== "" && usuario.email !== "" && confirmar.confirmar !== "") {
            if (confirmar.confirmar === usuario.contrasena) {
                signup();
            } else {
                setLoading(false);
                Swal.fire({
                    title: "Error",
                    text: "Las contraseñas no coinciden",
                    icon: "error"
                });
            }
        } else {
            setLoading(false);
            console.log(usuario);
            Swal.fire({
                title: "Error",
                text: "Rellena todos los campos",
                icon: "error"
            });
        }
    }

    const signup = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
            const data = await res.json();
            setLoading(false);
            if (res.ok) {
                const token: Token = data;
                Cookies.set("authToken", token.token);
                window.location.href = "home";
            } else {
                Swal.fire({
                    title: "Error",
                    text: data as string,
                    icon: "error"
                });
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: error as string,
                icon: "error"
            });
        }
    }

    const handleEnterPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            if (isLogin) {
                handleSignin();
            } else {
                handleSignup();
            }
        }
    };

    return (
        <>
            <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black/25" />
                        </TransitionChild>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[30%] max-md:w-[80%] bg-white rounded-lg pb-1 `}>
                                        <button title="close" className=" float-right pr-1 pt-3" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        {isLogin ? (
                                            <>
                                                <div className="text-2xl pt-3 pl-10 font-bold" >Login</div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Nombre de Usuario:</div>
                                                    <input name="nombreUsuario" value={registro.nombreUsuario} onChange={(e) => handleChangeLogin(e)} maxLength={20} id="nombreUsuario" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Contraseña:</div>
                                                    <input name="contrasena" value={registro.contrasena} onKeyUp={handleEnterPress} onChange={(e) => handleChangeLogin(e)} maxLength={20} id="contrasena" type="password" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleSignin} >
                                                        <Icon icon="uil:signin" />
                                                        Iniciar Sesión
                                                    </button>
                                                </div>
                                                <div className="" >
                                                    <div className="text-center text-gray-400 w-full pl-5">No tiene cuenta?
                                                        <a className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}> Resgistrese!</a>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-2xl pt-3 pl-10 font-bold" >Register</div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Cedula:</div>
                                                    <input name="dni" value={usuario.dni} onChange={(e) => handleChangeRegister(e)} maxLength={20} id="dni" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Nombres:</div>
                                                    <input name="nombre" value={usuario.nombre} onChange={(e) => handleChangeRegister(e)} maxLength={100} id="nombre" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Apellidos:</div>
                                                    <input name="apellidos" value={usuario.apellidos} onChange={(e) => handleChangeRegister(e)} maxLength={100} id="apellidos" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Telefono:</div>
                                                    <input name="telefono" value={usuario.telefono} onChange={(e) => handleChangeRegister(e)} maxLength={15} id="telefono" type="tel" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Direccion:</div>
                                                    <input name="direccion" value={usuario.direccion} onChange={(e) => handleChangeRegister(e)} maxLength={200} id="direccion" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Email:</div>
                                                    <input name="email" value={usuario.email} onChange={(e) => handleChangeRegister(e)} maxLength={150} id="email" type="email" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Nombre de Usuario:</div>
                                                    <input name="nombreUsuario" value={usuario.nombreUsuario} onChange={(e) => handleChangeRegister(e)} maxLength={20} id="nombreUsuario" type="text" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Contraseña:</div>
                                                    <input name="contrasena" value={usuario.contrasena} onChange={(e) => handleChangeRegister(e)} maxLength={100} id="constrasena" type="password" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="" >
                                                    <div className="text-left w-full pl-5">Confirmar contraseña:</div>
                                                    <input name="confirmar" onKeyUp={handleEnterPress} value={confirmar.confirmar} onChange={(e) => handleChangeConfirmar(e)} maxLength={100} id="confirmar" type="password" className="bg-black bg-opacity-10 h-8 rounded-full text-center w-[80%] pl-2" ></input>
                                                </div>
                                                <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                    <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleSignup} >
                                                        <Icon icon="mdi:register" />
                                                        Registrese!
                                                    </button>
                                                </div>
                                                <div className="" >
                                                    <div className="text-center text-gray-400 w-full pl-5">Ya tiene cuenta?
                                                        <a className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}> Inicie Sesión!</a>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            {loading && <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-20">
                <div className={`p-10 flex-grow h-screen justify-center flex items-center`}>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Auth;