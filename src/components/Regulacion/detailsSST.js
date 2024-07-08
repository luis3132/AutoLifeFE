import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

export default function DetailsSST({ seguro, closecomponent, token, tipo }) {
    // Manage the Animation
    let [isOpen, setIsOpen] = useState(true);
    function closeModal() {
        setIsOpen(false)
    }

    const [tecnicoMecanica, setTecnicoMecanica] = useState(false);
    const [eliminar, setEliminar] = useState(true);
    const hoy = new Date();
    var diasVige = null;

    useEffect(() => {
        if (seguro.kilometraje) {
            setTecnicoMecanica(!tecnicoMecanica);
        }
        const diaSeguro = new Date(seguro.dateFinish)
        const dife = diaSeguro - hoy
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        diasVige = Math.round(dife / milisegundosPorDia);
        if (diasVige < 0) {
            setEliminar(!eliminar);
        }
    }, [])

    const deleteSeguro = async (e) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ELIMINAR!'
        }).then((result) => {
            if (!eliminar) {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "Sí, cambiarlo!"
                    Swal.fire(
                        'Cancelado',
                        'Ya hace parte de los registros del vehiculo',
                        'error'
                    );
                } else {
                    // El usuario hizo clic en "Cancelar"
                    Swal.fire(
                        'Cancelado',
                        'La eliminacion sido cancelada.',
                        'error'
                    );
                }
            } else {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "Sí, cambiarlo!"
                    Swal.fire(
                        'Eliminado!',
                        'La eliminacion ha sido confirmada.',
                        'success'
                    ).then(() => {
                        Eliminar();
                    })
                } else {
                    // El usuario hizo clic en "Cancelar"
                    Swal.fire(
                        'Cancelado',
                        'La eliminacion sido cancelada.',
                        'error'
                    );
                    // Lógica para cancelar el cambio
                }
            }
        });
    }

    const Eliminar = async (e) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/${tipo}/delete/${seguro.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const deleteV = await response.json();
            window.location.href = "/loged/regulacion"
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'ERROR',
                text: "Ha sucedido un error al eliminar...",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'okey!'
            }).then(()=>{
                window.location.href = "/loged/regulacion";
            })
        }
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
                                    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[90%] bg-white rounded-2xl pb-1  ">
                                        <div className="flex flex-col justify-center items-center">
                                            <div className=" py-3">
                                                <Image src={seguro.fotos[0].foto} width={200} height={200} alt="foto" />
                                            </div>
                                            <div>
                                                <table className="min-w-full border border-green-500 text-sm">
                                                    <thead>
                                                        <tr className="bg-green-300">
                                                            <th className="py-1 px-1 border-b">Fecha Inicial</th>
                                                            <th className="py-1 px-1 border-b">Fecha Final</th>
                                                            {tecnicoMecanica && <th className="py-1 px-1 border-b">Kilometraje</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-1 px-4 border-b">{seguro.dateStart} </td>
                                                            <td className="py-1 px-4 border-b">{seguro.dateFinish} </td>
                                                            {tecnicoMecanica && <th className="py-1 px-1 border-b">{seguro.kilometraje}</th>}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5">Descripcion:</div>
                                                <textarea name="descripcion" disabled value={seguro.descripcion} id="descripcion" type="text" className="bg-black bg-opacity-10 rounded-2xl text-center w-[80%] pl-2"></textarea>
                                            </div>
                                            <div className="py-3 flex flex-row ">
                                                {eliminar && <div className="flex flex-row">
                                                    <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={deleteSeguro}>
                                                        <Icon icon="material-symbols:delete-outline" />
                                                        Eliminar
                                                    </button>
                                                    <div className="w-[20%] "></div>
                                                </div>}
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={closecomponent}>
                                                    <Icon icon="material-symbols:close" />
                                                    Salir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}