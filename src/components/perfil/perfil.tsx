import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Image from 'next/image';
import Swal from "sweetalert2";
import { Usuario, UsuarioNewOUpdate } from "@/lib/types/types";

interface perfilProps {
    usuario: Usuario | null;
    token: string | undefined;
    reload: () => void;
}

const Perfil: FC<perfilProps> = ({ usuario, token, reload }) => {

    const [usuarioEdit, setUsuarioEdit] = useState<UsuarioNewOUpdate | null>(null);
    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const [editar, setEditar] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (usuario) {
            if (usuario.fotos.length > 0) {
                setFoto(usuario.fotos[usuario.fotos.length - 1].path);
            }
        }
    }, []);

    useEffect(() => {
        if (usuario) {
            setUsuarioEdit({
                dni: usuario.dni,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                roles: usuario.roles.id,
                contrasena: usuario.contrasena,
                email: usuario.email,
                nombreUsuario: usuario.nombreUsuario,
                estado: usuario.estado,
            });
        }
    }, [usuario]);

    const handleUsuarioEdit = (e: ChangeEvent<HTMLInputElement>) => {
        if (usuarioEdit) {
            setUsuarioEdit({ ...usuarioEdit, [e.target.name]: e.target.value } as UsuarioNewOUpdate);
        }
    };

    const handleCancelar = () => {
        if (usuario) {
            setUsuarioEdit({
                dni: usuario.dni,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                roles: usuario.roles.id,
                contrasena: usuario.contrasena,
                email: usuario.email,
                nombreUsuario: usuario.nombreUsuario,
                estado: usuario.estado,
            });
        }
        setEditar(!editar);
    };

    const handleSave = () => {
        setLoading(true);
        if (usuarioEdit?.dni !== usuario?.dni || usuarioEdit?.nombre !== usuario?.nombre || usuarioEdit?.apellidos !== usuario?.apellidos || usuarioEdit?.telefono !== usuario?.telefono || usuarioEdit?.direccion !== usuario?.direccion || usuarioEdit?.contrasena !== usuario?.contrasena || usuarioEdit?.email !== usuario?.email || usuarioEdit?.nombreUsuario !== usuario?.nombreUsuario) {
            Swal.fire({
                icon: 'question',
                title: 'Guardar',
                text: 'Seguro que desea guardar los cambios',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    update();
                    window.location.href = "/home";
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se ha modificado ningún campo',
            });
        }
    };

    const update = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuarios/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(usuarioEdit),
            })
            reload();
            await res.json();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <>
            <div className="max-md:w-2/3 max-sm:w-[90%] md:w-1/3 rounded-2xl bg-gray-300 h-min flex flex-col py-2">
                <h1 className="text-center text-4xl font-bold">Perfil</h1>
                {editar ? (
                    <div className="w-full">
                        <div className="w-full justify-center items-center flex">
                            <div className="w-fit rounded-2xl overflow-hidden m-5">
                                <Image className="object-cover" src={foto} width={200} height={200} alt="Foto" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center ">
                            <input name="file" type="file" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">DNI:</div>
                            <input name="dni" disabled value={usuarioEdit?.dni} id="dni" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre:</div>
                            <input name="nombre" value={usuarioEdit?.nombre} id="nombre" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Apellidos:</div>
                            <input name="apellidos" value={usuarioEdit?.apellidos} id="apellidos" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Telefono:</div>
                            <input name="telefono" value={usuarioEdit?.telefono} id="telefono" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Dirección:</div>
                            <input name="direccion" value={usuarioEdit?.direccion} id="direccion" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre usuario:</div>
                            <input name="nombre_usuario" value={usuarioEdit?.nombreUsuario} id="nombre_usuario" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Email:</div>
                            <input name="email" value={usuarioEdit?.email} id="email" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-row justify-center w-full flex items-center pt-2 pl-4 pr-4 pb-2">
                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleSave} >
                                <Icon icon="ri:save-line" />
                                Guardar
                            </button>
                            <div className="w-[50%] "></div>
                            <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={handleCancelar}>
                                <Icon icon="line-md:cancel-twotone" />
                                Cancelar
                            </button>
                        </div>
                    </div>) : (
                    <div className="w-full">
                        <div className="w-full justify-center items-center flex">
                            <div className="w-fit rounded-2xl overflow-hidden m-5">
                                <Image className="object-cover" src={foto} width={200} height={200} alt="Foto" />
                            </div>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">DNI:</div>
                            <input disabled value={usuario?.dni} id="dnid" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre:</div>
                            <input disabled value={usuario?.nombre} id="nombred" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Apellidos:</div>
                            <input disabled value={usuario?.apellidos} id="apellidosd" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Telefono:</div>
                            <input disabled value={usuario?.telefono} id="telefonod" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Dirección:</div>
                            <input disabled value={usuario?.direccion} id="direcciond" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre usuario:</div>
                            <input disabled value={usuario?.nombreUsuario} id="nombre_usuariod" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Email:</div>
                            <input disabled value={usuario?.email} id="emaild" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-row justify-center w-full flex items-center pt-2 pb-2">
                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={() => { setEditar(!editar) }} >
                                <Icon icon="lucide:edit" />
                                Editar
                            </button>
                        </div>
                    </div>
                )}
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
}

export default Perfil;