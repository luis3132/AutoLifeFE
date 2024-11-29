import { Notificacion, NotificacionUpdate, ServiciosUpdate } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, Fragment, useEffect, useState } from "react"
import Swal from "sweetalert2";

interface DetailsNotificacionesProps {
    closeComponent: () => void;
    notificacion: Notificacion;
    reload: () => void;
    token: string | undefined;
}

const DetailsNotificaciones: FC<DetailsNotificacionesProps> = ({ closeComponent, notificacion, reload, token }) => {

    const [isOpen, setIsOpen] = useState(true);
    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const [loading, setLoading] = useState<boolean>(false);

    const [servicio, setServicio] = useState<ServiciosUpdate>({
        id: notificacion.servicio.id,
        fecha: notificacion.servicio.fecha,
        fechaProximo: notificacion.servicio.fechaProximo,
        tipoServicio: notificacion.servicio.tipoServicio.id,
        costoServicio: notificacion.servicio.costoServicio,
        descripcion: notificacion.servicio.descripcion,
        kilometraje: notificacion.servicio.kilometraje,
        vehiculo: notificacion.vehiculo.numSerie,
        mecanico: notificacion.servicio.mecanico.dni,
        estado: notificacion.servicio.estado
    });
    const [notificacionState, setNotificacionState] = useState<NotificacionUpdate>({
        id: notificacion.id,
        texto: notificacion.texto,
        estado: notificacion.estado,
        usuario: notificacion.usuario,
        vehiculo: notificacion.vehiculo.numSerie,
        servicio: notificacion.servicio.id,
        fecha: notificacion.fecha,
        taller: notificacion.taller
    });

    const fecha: Date = new Date(notificacion.fecha);

    useEffect(() => {
        if (notificacion.servicio.mecanico.fotos.length > 0) {
            setFoto(notificacion.servicio.mecanico.fotos[notificacion.servicio.mecanico.fotos.length - 1].path);
        }
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleApprove = () => {
        setLoading(true);
        Swal.fire({
            title: "¿Estas seguro de aprobar la solicitud?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then(result => {
            if (result.isConfirmed) {
                setNotificacionState({
                    ...notificacionState,
                    estado: "VISTA"
                });
                setServicio({
                    ...servicio,
                    estado: "ACEPTADO"
                });
            }
        });
    };

    const handleNoApprove = () => {
        setLoading(true);
        Swal.fire({
            title: "¿Estas seguro de no aprobar la solicitud?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then(result => {
            if (result.isConfirmed) {
                setNotificacionState({
                    ...notificacionState,
                    estado: "VISTA"
                });
                setServicio({
                    ...servicio,
                    estado: "RECHAZADO"
                });
            }
        });
    }

    useEffect(() => {
        if (notificacionState.estado !== "NVISTA" && servicio.estado !== "PENDIENTE" && notificacion.estado === "NVISTA") {
            update();
            setLoading(false);
        }
    }, [notificacionState, servicio]);

    const update = async () => {
        let success: boolean = false;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/notificaciones/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(notificacionState)
            });
            const data = await response.json();
            if (data) {
                success = true;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        if (success) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/servicios/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(servicio)
                });
                const data = await response.json();
                if (data) {
                    Swal.fire({
                        title: "Solicitud Aprobada",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false);
                    reload();
                    closeModal();
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
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
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[50%] max-md:w-[80%] bg-white rounded-lg pb-1 `}>
                                        <button title="close" className=" float-right pr-1 pt-3" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10 font-bold" >Notificacion de Servicio</div>
                                        <div className="flex max-md:flex-col justify-between px-10 py-2">
                                            <div className="flex items-center md:w-1/4 max-md:w-full">
                                                <div className="flex justify-center items-center">
                                                    <img src={foto} alt="Foto del Mecanico" className="w-full h-1/2 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 max-md:w-full">
                                                <div className="sm:flex justify-around px-10 py-2">
                                                    <div>
                                                        <p className="text-xl font-bold">Taller:</p>
                                                        <p>{notificacion.servicio.mecanico.nombre}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-bold">Fecha:</p>
                                                        <p>{fecha.getFullYear()}-{fecha.getMonth() + 1}-{fecha.getDate()}</p>
                                                    </div>
                                                </div>
                                                <div className="sm:flex justify-around px-10 py-2">
                                                    <div>
                                                        <p className="text-xl font-bold">Servicio:</p>
                                                        <p>{notificacion.servicio.tipoServicio.servicio}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-bold">Kilometraje:</p>
                                                        <p>{notificacion.servicio.kilometraje}</p>
                                                    </div>
                                                </div>
                                                <div className="sm:flex justify-around px-10 py-2">
                                                    <div>
                                                        <p className="text-xl font-bold">Costo:</p>
                                                        <p>{notificacion.servicio.costoServicio}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-bold">Estado de la Solicitud:</p>
                                                        <p>{notificacion.servicio.estado}</p>
                                                    </div>
                                                </div>
                                                <div className="w-full justify-around px-10 py-2">
                                                    <div>
                                                        <p className="text-xl font-bold">Descripcion:</p>
                                                        <p>{notificacion.servicio.descripcion}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`flex justify-around w-full pb-2 ${notificacion.servicio.estado !== "PENDIENTE" && "hidden"}`}>
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold flex items-center py-1 px-4 rounded" onClick={handleApprove}>
                                                <Icon icon="mdi:success-bold" />
                                                Aprobar
                                            </button>
                                            <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold flex items-center py-1 px-4 rounded" onClick={handleNoApprove}>
                                                <Icon icon="line-md:cancel-twotone" />
                                                No Aprobar
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold flex items-center py-1 px-4 rounded" onClick={closeComponent}>
                                                <Icon icon="material-symbols:close" />
                                                Cerrar
                                            </button>
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
    )
}

export default DetailsNotificaciones;