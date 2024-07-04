"use client";

import { Icon } from '@iconify/react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Historialtm from './historialTM';
import Swal from 'sweetalert2';

export default function Vertecnico({ token, vehiculo, closecomponent }) {
    // auto set foto if the vehiculo doesn't have it
    var foto = null;
    if (vehiculo.fotos.length > 0) {
        foto = vehiculo.fotos[0].foto
    } else {
        foto = "/imagenes/logo/logoSL.png";
    }

    // set date
    const hoy = new Date(); const dia = hoy.getDate(); const mes = hoy.getMonth() + 1; const anio = hoy.getFullYear();

    // Manage the upload file
    const [file, setFile] = useState(null);

    // change add and see profile
    const [add, setadd] = useState(false);
    const [change, setChange] = useState(false);

    // check TecnicoMecanica
    const [tecnoVige, setTecnoVige] = useState({
        dateStart: "",
        dateFinish: "",
        kilometraje: ""
    });
    var diaVige = null;
    const [diasVige, setDiasVige] = useState(null);

    const [tecnicoMecanica1, setTecnicoMecanica1] = useState({
        id: "",
        kilometraje: vehiculo.kilometraje,
        dateStart: "",
        dateFinish: "",
        descripcion: "",
        vehiculo: vehiculo.numSerie
    })

    useEffect(() => {
        vehiculo.tecnicoMecanica?.map((seguro) => {
            const diaSeguro = new Date(seguro.dateFinish)
            const dife = diaSeguro - hoy
            const milisegundosPorDia = 1000 * 60 * 60 * 24;
            diaVige = Math.round(dife / milisegundosPorDia);

            if (diaVige > 0) {
                setTecnoVige(seguro);
                setDiasVige(diaVige);
            } else {
                setTecnoVige({
                    dateStart: "NN",
                    dateFinish: "NN",
                    kilometraje: "NN"
                })
            }
        })
    }, [])

    // create a new instance of "tecnicoMecanica"

    const saveTecnico = async (e) => {
        if (file != undefined && tecnicoMecanica1.dateStart && tecnicoMecanica1.dateFinish && tecnicoMecanica1.descripcion && tecnicoMecanica1.kilometraje) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tecnicomecanica/new`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(tecnicoMecanica1)
                });
                if (response.ok) {
                    const _tecnicoMecanica1 = await response;
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
                const seguroString = JSON.stringify(tecnicoMecanica1)
                form.set('tecnicomecanica', seguroString);
                form.set('token', token);
                const res = await fetch('/api/uploadTecnicoMecanica', {
                    method: "POST",
                    body: form
                })
                const data = await res.json()
                if (res.ok) {
                    Swal.fire(
                        'Guardado',
                        'Se agrego la tecnico mecanica con exito',
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

    const handleChange = (event) => {
        setTecnicoMecanica1({ ...tecnicoMecanica1, [event.target.name]: event.target.value });
        if (event.target.name == "dateFinish") {
            setChange(!change);
        }
    }

    useEffect(() => {
        if (change) {
            setTecnicoMecanica1({ ...tecnicoMecanica1, id: vehiculo.numSerie + tecnicoMecanica1.dateFinish })
            setChange(!change)
        }
    }, [tecnicoMecanica1])

    let [isOpen, setIsOpen] = useState(true);
    function closeModal() {
        setIsOpen(false)
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
                                    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[70%] w-[90%] bg-red-500 rounded-2xl pb-1  ">
                                        <div className="md:flex justify-center items-center">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="rounded-full">
                                                    <Image className="p-3 object-cover" src={foto} width={200} height={200} alt="Foto" />
                                                </div>
                                            </div>
                                            <div className="pl-[5%] pr-[5%] pt-[5%] ">
                                                <div className="w-full flex items-center justify-center h-16">
                                                    <div className="text-3xl font-bold">
                                                        Tecnico Mecanica
                                                    </div>
                                                </div>
                                                {add && <div>
                                                    <div>
                                                        <input name="file" type="file" onChange={(e) => { setFile(e.target.files[0]) }}></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center pt-2 ">
                                                        <div className="text-left w-full pl-5">Fecha de Inicio:</div>
                                                        <input name="dateStart" value={tecnicoMecanica1.dateStart} onChange={(e) => handleChange(e)} id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center ">
                                                        <div className="text-left w-full pl-5">Fecha de Final:</div>
                                                        <input name="dateFinish" value={tecnicoMecanica1.dateFinish} onChange={(e) => handleChange(e)} id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center ">
                                                        <div className="text-left w-full pl-5">Descripcion:</div>
                                                        <textarea name="descripcion" value={tecnicoMecanica1.descripcion} onChange={(e) => handleChange(e)} maxLength={1000} id="descripcion" type="text" className="bg-black bg-opacity-10 rounded-2xl text-center w-[80%] pl-2"></textarea>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center pb-3 ">
                                                        <div className="text-left w-full pl-5">Kilometraje:</div>
                                                        <input name="" value={tecnicoMecanica1.kilometraje} id="kilometraje" disabled type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center pb-3 ">
                                                        <div className="text-left w-full pl-5">Vehiculo:</div>
                                                        <input name="" value={tecnicoMecanica1.vehiculo} id="vehiculo" disabled type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2"></input>
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
                                                                    <th className="py-2 px-4 border-b">Kilometraje</th>
                                                                    <th className="py-2 px-4 border-b">Dias Restantes</th>
                                                                    <th className="py-2 px-4 border-b">Ver</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="py-2 px-4 border-b">{tecnoVige.dateStart}</td>
                                                                    <td className="py-2 px-4 border-b">{tecnoVige.dateFinish}</td>
                                                                    <td className="py-2 px-4 border-b">{tecnoVige.kilometraje}</td>
                                                                    <td className="py-2 px-4 border-b">{diasVige}</td>
                                                                    <td className="py-2 px-4 border-b">
                                                                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                                                            Acción
                                                                        </button>
                                                                    </td>
                                                                </tr>
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
                                                                <th className="py-2 px-4 border-b">Kilometraje</th>
                                                                <th className="py-2 px-4 border-b">Acción</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {vehiculo.tecnicoMecanica?.slice(-5).map((seg) => (
                                                                <Historialtm key={seg.id} seguro={seg} />
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="flex-row justify-center w-full flex items-center pt-4 pb-2 ">
                                            {add ? (
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={saveTecnico} >
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
                                                <button className="justify-center flex items-center p-1 bg-amber-500 hover:bg-amber-600 rounded-lg" onClick={() => { setadd(!add) }}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            ) : (
                                                <button className="justify-center flex items-center p-1 bg-amber-500 hover:bg-amber-600 rounded-lg" onClick={closecomponent}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            )}
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