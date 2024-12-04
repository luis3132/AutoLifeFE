import { NotificacionNew, ServiciosNew, TipoServicio, Usuario, Vehiculo } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface SeeUsuario {
    closeComponent: () => void;
    taller: Usuario;
    token: string | undefined;
    usuario: Usuario | null;
}

const SeeUsuario: FC<SeeUsuario> = ({ closeComponent, taller, token, usuario }) => {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [tiposServicios, setTiposServicios] = useState<TipoServicio[]>([]);

    useEffect(() => {
        const fetchPublicVehicles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/list/public`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data: Vehiculo[] = await response.json();
                setVehiculos(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            fetchPublicVehicles();
        }
    }, [token]);

    useEffect(() => {
        const fetchPublicVehicles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/servicios/list/tiposervicio`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data: TipoServicio[] = await response.json();
                setTiposServicios(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            fetchPublicVehicles();
        }
    }, [token]);

    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const [loading, setLoading] = useState<boolean>(false);
    const [notificacion, setNotificacion] = useState<NotificacionNew>({
        texto: "",
        estado: "NVISTO",
        usuario: usuario?.dni || "",
        vehiculo: "",
        servicio: 0,
        fecha: new Date(),
        taller: taller.dni
    });
    const [servicios, setServicios] = useState<ServiciosNew>({
        fecha: new Date(),
        fechaProximo: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        tipoServicio: 0,
        costoServicio: 0,
        descripcion: "",
        kilometraje: 0,
        vehiculo: "",
        mecanico: taller.dni,
        estado: "PENDIENTE"
    });

    useEffect(() => {
        if (taller) {
            if (taller.fotos.length > 0) {
                setFoto(taller.fotos[taller.fotos.length - 1].path);
            }
        }
    }, [taller]);

    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleChanges = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === "vehiculo") {
            const vh = vehiculos.find((v) => v.numSerie === e.target.value);
            setNotificacion({ ...notificacion, vehiculo: e.target.value });
            setServicios({ ...servicios, vehiculo: e.target.value, kilometraje: vh?.kilometraje || 0 });
        } else if (e.target.name === "servicio") {
            setServicios({ ...servicios, tipoServicio: parseInt(e.target.value) });
        } else if (e.target.name === "descripcion") {
            setServicios({ ...servicios, descripcion: e.target.value });
        } else if (e.target.name === "texto") {
            setNotificacion({ ...notificacion, texto: e.target.value });
        }
    }

    const handleSend = () => {
        setLoading(true);
        if (notificacion.vehiculo === "" || servicios.tipoServicio === 0 || servicios.descripcion === "" || notificacion.texto === "" || servicios.vehiculo === "" || servicios.kilometraje === 0) {
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: "Debes llenar todos los campos para enviar la solicitud de servicio",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        } else {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "¿Deseas enviar la solicitud de servicio al taller?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Si, enviar",
                cancelButtonText: "No, cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    send();
                } else {
                    setLoading(false);
                }
            });
        }
    }

    const send = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/servicios/new/notificacion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    notificacion: notificacion,
                    servicio: servicios
                })
            });
            if (response.ok) {
                setLoading(false);
                Swal.fire({
                    title: "Solicitud enviada",
                    text: "Se ha enviado la solicitud de servicio al taller",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    closeModal();
                });
            }else {
                setLoading(false);
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error al enviar la solicitud de servicio",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al enviar la solicitud de servicio",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };

    return (
        <>
            <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-1">
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
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[60%] max-md:w-[80%] bg-white rounded-lg pb-1 `}>
                                        <button title="close" className=" float-right pr-1 pt-3" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <h1 className="text-2xl font-bold text-center pt-3">{taller.nombre}</h1>
                                        <div className="w-full md:flex justify-center p-3">
                                            <div className="md:w-1/4 w-full flex overflow-hidden items-center">
                                                <div className="w-full rounded-2xl overflow-hidden shadow-xl m-2">
                                                    <img src={foto} height={500} width={500} alt={`Foto de ${taller.nombre}`} />
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 w-full px-3">
                                                <div className="w-full">
                                                    <div className="md:flex w-full justify-around">
                                                        <div className="flex">
                                                            <p className="text-xl font-semibold">Estado:</p>
                                                            <p className="text-xl ml-1">{taller.estado ? "Activo" : "Inactivo"}</p>
                                                        </div>
                                                        <div className="flex">
                                                            <p className="text-xl font-semibold">Telefono:</p>
                                                            <p className="text-xl ml-1">{taller.telefono}</p>
                                                        </div>
                                                    </div>
                                                    <div className="md:flex w-full justify-around">
                                                        <div className="flex">
                                                            <p className="text-xl font-semibold">Dirección:</p>
                                                            <p className="text-xl ml-1">{taller.direccion}</p>
                                                        </div>
                                                        <div className="flex">
                                                            <p className="text-xl font-semibold">Email:</p>
                                                            <p className="text-xl ml-1">{taller.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-3 py-2">
                                                    <h2 className="text-xl font-semibold">Solicitud de Servicio:</h2>
                                                    <div className="md:flex w-full justify-around py-2">
                                                        <p className="text-xl font-semibold">Vehiculo:</p>
                                                        <select name="vehiculo" value={notificacion.vehiculo} className="text-xl ml-1" onChange={handleChanges}>
                                                            <option value="">Seleccione un vehiculo</option>
                                                            {vehiculos.map((v) => (
                                                                <option key={v.placa} value={v.numSerie}>{v.marca} {v.placa}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="w-full px-3 py-2">
                                                        <div className="md:flex w-full justify-around">
                                                            <p className="text-xl font-semibold">Tipo de Servicio:</p>
                                                            <select name="servicio" className="text-xl ml-1" value={servicios.tipoServicio} onChange={handleChanges}>
                                                                <option value={0}>Seleccione un servicio</option>
                                                                {tiposServicios.map((t) => (
                                                                    <option key={t.id} value={t.id}>{t.servicio}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:flex px-3 py-2">
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                            <textarea name="descripcion" value={servicios.descripcion} id="descripcion" className="bg-black bg-opacity-10 rounded-xl text-center w-[80%] pl-2" onChange={handleChanges} placeholder="Describe el problema que tienes" ></textarea>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5 font-bold">Comentarios adicionales:</div>
                                                            <textarea name="texto" value={notificacion.texto} id="texto" className="bg-black bg-opacity-10 rounded-xl text-center w-[80%] pl-2" onChange={handleChanges} placeholder="Agrega algun comentario adicional que quieras decir al taller" ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center p-3">
                                            <button className="bg-green-500 hover:bg-green-700 text-white rounded-lg px-3 py-1 flex items-center" onClick={handleSend}>
                                                <Icon className="mr-1" icon="tabler:send" />
                                                Enviar Solicitud</button>
                                        </div>
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
}
export default SeeUsuario;