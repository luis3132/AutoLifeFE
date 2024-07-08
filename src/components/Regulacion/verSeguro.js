"use client";

import { Icon } from '@iconify/react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Historialss from './historialSS';
import Swal from 'sweetalert2';
import DetailsSST from "./detailsSST";

export default function Verseguro({ token, vehiculo, closecomponent }) {
    // auto set foto if the vehiculo doesn't have it
    var foto = null;
    if (vehiculo.fotos.length > 0) {
        foto = vehiculo.fotos[0].foto
    } else {
        foto = "/imagenes/logo/logoSL.png";
    }

    // set date
    const hoy = new Date(); const dia = hoy.getDate(); const mes = hoy.getMonth() + 1; const anio = hoy.getFullYear();
    const [ver, setVer] = useState(false)
    const [noDisponible, setNoDisponible] = useState(false);

    // check Seguro
    const [seguVige, setSeguVige] = useState({
        dateStart: "",
        dateFinish: ""
    });
    var diaVige = null;
    const [diasVige, setDiasVige] = useState(null);
    useEffect(() => {
        vehiculo.seguro?.map((seguro) => {
            const diaSeguro = new Date(seguro.dateFinish)
            const dife = diaSeguro - hoy
            const milisegundosPorDia = 1000 * 60 * 60 * 24;
            diaVige = Math.round(dife / milisegundosPorDia);

            if (diaVige > 0) {
                setSeguVige(seguro);
                setDiasVige(diaVige);
                setNoDisponible(!noDisponible);
            } else {
                setSeguVige({
                    dateStart: "",
                    dateFinish: ""
                })
            }
        })
    }, [])

    // change add and see profile
    const [add, setadd] = useState(false);
    const [change, setChange] = useState(false);

    let [isOpen, setIsOpen] = useState(true);
    function closeModal() {
        setIsOpen(false)
    }

    // Manage the upload file
    const [file, setFile] = useState(null);

    // create a new instance of "seguro"

    const saveSeguro = async (e) => {
        if (file != undefined && seguro1.dateStart && seguro1.dateFinish && seguro1.descripcion) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/seguro/new`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(seguro1)
                });
                if (response.ok) {
                    const _Seguro = await response;
                }
            } catch (error) {
                console.log(error)
                Swal.fire(
                    'Error',
                    'Hubo un error al guardar...',
                    'error'
                );
            }
            try {
                const form = new FormData();
                form.set('file', file);
                const seguroString = JSON.stringify(seguro1)
                form.set('seguro', seguroString);
                form.set('token', token);
                const res = await fetch('/api/uploadSeguro', {
                    method: "POST",
                    body: form
                })
                const data = await res.json()
                if (res.ok) {
                    Swal.fire(
                        'Guardado',
                        'Se agrego el Seguro con exito',
                        'success'
                    ).then(
                        window.location.href = "/loged/regulacion"
                    );
                }
            } catch (error) {
                console.log(error)
                Swal.fire(
                    'Error',
                    'Hubo un error al guardar...',
                    'error'
                );
            }
        } else {
            Swal.fire(
                'Error',
                'Complete todos los campos...',
                'error'
            );
        }
    }

    const [seguro1, setSeguro1] = useState({
        id: "",
        dateStart: "",
        dateFinish: "",
        descripcion: "",
        vehiculo: vehiculo.numSerie
    })


    const handleChange = (event) => {
        setSeguro1({ ...seguro1, [event.target.name]: event.target.value });
        if (event.target.name == "dateFinish") {
            setChange(!change);
        }
    }

    useEffect(() => {
        if (change) {
            setSeguro1({ ...seguro1, id: vehiculo.numSerie + seguro1.dateFinish })
            setChange(!change)
        }
    }, [seguro1])

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
                                    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[70%] w-[90%] bg-green-500 rounded-2xl pb-1  ">
                                        <div className="md:flex justify-center items-center">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="rounded-full">
                                                    <Image className="p-3 object-cover" src={foto} width={200} height={200} alt="Foto" />
                                                </div>
                                            </div>
                                            <div className="pl-[5%] pr-[5%] pt-[5%] ">
                                                <div className="w-full flex items-center justify-center h-16">
                                                    <div className="text-3xl font-bold">
                                                        Seguro
                                                    </div>
                                                </div>
                                                {add && <div>
                                                    <div>
                                                        <input name="file" type="file" onChange={(e) => { setFile(e.target.files[0]) }}></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center pt-2 ">
                                                        <div className="text-left w-full pl-5">Fecha de Inicio:</div>
                                                        <input name="dateStart" value={seguro1.dateStart} onChange={(e) => handleChange(e)} id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center ">
                                                        <div className="text-left w-full pl-5">Fecha de Final:</div>
                                                        <input name="dateFinish" value={seguro1.dateFinish} onChange={(e) => handleChange(e)} id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center ">
                                                        <div className="text-left w-full pl-5">Descripcion:</div>
                                                        <textarea name="descripcion" value={seguro1.descripcion} onChange={(e) => handleChange(e)} maxLength={1000} id="descripcion" type="text" className="bg-black bg-opacity-10 rounded-2xl text-center w-[80%] pl-2"></textarea>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center pb-3 ">
                                                        <div className="text-left w-full pl-5">Vehiculo:</div>
                                                        <input name="" value={seguro1.vehiculo} id="vehiculo" disabled type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
                                                    </div>
                                                </div>}
                                                {!add && <div>
                                                    <div className="p-3 text-lg">
                                                        Vigentes:
                                                    </div>
                                                    <div>
                                                        <table className="min-w-full bg-white border border-gray-300">
                                                            <thead>
                                                                <tr>
                                                                    <th className="py-2 px-4 border-b">Fecha Inicial</th>
                                                                    <th className="py-2 px-4 border-b">Fecha Final</th>
                                                                    <th className="py-2 px-4 border-b">Dias Restantes</th>
                                                                    <th className="py-2 px-4 border-b">Ver</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="py-2 px-4 border-b">{seguVige.dateStart}</td>
                                                                    <td className="py-2 px-4 border-b">{seguVige.dateFinish}</td>
                                                                    <td className="py-2 px-4 border-b">{diasVige}</td>
                                                                    <td className="py-2 px-4 border-b">
                                                                        {noDisponible && <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => { setVer(!ver) }} >
                                                                            Acción
                                                                        </button>}
                                                                    </td>
                                                                </tr>
                                                                {ver && <DetailsSST seguro={seguVige} closecomponent={() => { setVer(!ver) }} token={token} tipo={"seguro"} />}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="p-3 text-lg">
                                                        Historial:
                                                    </div>
                                                    <table className="min-w-full bg-white border border-gray-300">
                                                        <thead>
                                                            <tr>
                                                                <th className="py-2 px-4 border-b">Fecha Inicial</th>
                                                                <th className="py-2 px-4 border-b">Fecha Final</th>
                                                                <th className="py-2 px-4 border-b">Acción</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {vehiculo.seguro?.slice(-5).map((seg) => (
                                                                <Historialss key={seg.id} seguro={seg} token={token} tipo={"seguro"} />
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="flex-row justify-center w-full flex items-center pt-4 pb-2 ">
                                            {add ? (
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={saveSeguro} >
                                                    <Icon icon="ri:save-line" />
                                                    Guardar
                                                </button>
                                            ) : (
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={() => { setadd(!add) }}>
                                                    <Icon icon="gg:add" />
                                                    Agregar
                                                </button>
                                            )}
                                            <div className="w-[20%] "></div>
                                            {add ? (
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => { setadd(!add) }}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            ) : (
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={closecomponent}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog >
                </Transition >
            </div >
        </>
    )
}