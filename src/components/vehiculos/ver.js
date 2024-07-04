import { Icon } from '@iconify/react';
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import Swal from 'sweetalert2';

export default function Vervehiculo({ closecomponent, vehiculo, token }) {
    // auto set foto if the vehiculo doesn't have it
    var foto = null;
    if (vehiculo.fotos.length > 0) {
        foto = vehiculo.fotos[0].foto
    } else {
        foto = "/imagenes/logo/logoSL.png";
    }
    // set date
    const hoy = new Date(); const dia = hoy.getDate(); const mes = hoy.getMonth() + 1; const anio = hoy.getFullYear();
    // size of Duenos array
    const size = vehiculo.duenos.length - 1;
    // set if the Dueno is updated
    const [update, setUpdate] = useState();
    //set Duenos to a const
    const [dueno, setDueno] = useState(vehiculo.duenos[size]);
    // set duenos to add in case to change city or Dueno
    const [dueno2, setDueno2] = useState({
        usuario: vehiculo.usuario,
        vehiculo: vehiculo.numSerie,
        kmStart: vehiculo.kilometraje,
        kmFinish: 0,
        dateStart: anio + "-" + mes + "-" + dia,
        dateFinish: "",
        ciudadPromTransi: dueno.ciudadPromTransi
    })
    // change the page to see the car to edit him
    const [editar, setEditar] = useState(false);
    // Manage the changes of the car
    const [vehiculo1, setVehiculo1] = useState(vehiculo);
    // Manage the Animation
    let [isOpen, setIsOpen] = useState(true);
    function closeModal() {
        setIsOpen(false)
    }
    // Manage the upload file
    const [file, setFile] = useState(null);

    const handleEditar = () => {
        if (token) {
            setEditar(!editar)
        } else {
            Swal.fire({
                title: 'Error',
                text: "No es tu vehiculo",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Salir!'
            })
        }
    }

    const handleChange = (event) => {
        if (event.target.name == "publico") {
            if (vehiculo1.publico == true) {
                setVehiculo1({ ...vehiculo1, [event.target.name]: false });
            } else {
                setVehiculo1({ ...vehiculo1, [event.target.name]: true });
            }
        } else {
            if (event.target.name == "usuario") {
                setDueno({ ...dueno, dateFinish: anio + "-" + mes + "-" + dia });
                setDueno2({ ...dueno2, usuario: event.target.value })
                setUpdate(true);
            }
            if (event.target.name == "kilometraje") {
                setDueno({ ...dueno, kmFinish: event.target.value });
                setDueno2({ ...dueno2, kmStart: event.target.value });
                setUpdate(true);
            }
            if (event.target.name == "ciudadPromTransi") {
                setDueno({ ...dueno, dateFinish: anio + "-" + mes + "-" + dia });
                setDueno2({ ...dueno2, ciudadPromTransi: event.target.value });
                setUpdate(true);
            } else {
                setVehiculo1({ ...vehiculo1, [event.target.name]: event.target.value });
            }
        }
    }

    const updateVehiculo = async (e) => {
        if (file != undefined) {
            const form = new FormData();
            form.set('file', file);
            const vehiculoString = JSON.stringify(vehiculo)
            form.set('vehiculo', vehiculoString);
            form.set('token', token);
            const res = await fetch('/api/uploadVehiculo', {
                method: "POST",
                body: form
            })
            const data = await res.json()
            if (res.ok) {
                window.location.href = "/loged/vehiculoPrivado"
            }
        }
        if (vehiculo != vehiculo1 || update) {
            if (vehiculo.usuario != vehiculo1.usuario) {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "No podrás revertir esto",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'CAMBIAR!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "Sí, cambiarlo!"
                        Swal.fire(
                            'Cambiado!',
                            'El cambio de usuario ha sido confirmado.',
                            'success'
                        ).then(() => {
                            if (vehiculo1.kilometraje >= vehiculo.kilometraje) {
                                DuenoCambio();
                            } else {
                                Swal.fire({
                                    title: 'ERROR',
                                    text: "El kilometraje final es menor a inicial...",
                                    icon: 'warning',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'okey!'
                                })
                            }
                        })
                    } else {
                        // El usuario hizo clic en "Cancelar"
                        Swal.fire(
                            'Cancelado',
                            'La eliminacion sido cancelada.',
                            'error'
                        );
                    }
                });
            } else {
                if (vehiculo1.kilometraje >= vehiculo.kilometraje) {
                    if (dueno.ciudadPromTransi == dueno2.ciudadPromTransi) {
                        Cambiar();
                    } else {
                        DuenoCambio();
                    }
                } else {
                    Swal.fire({
                        title: 'ERROR',
                        text: "El kilometraje final es menor a inicial...",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'okey!'
                    })
                }
            }
        } else {
            closecomponent();
        }
    }

    const deleteVehiculo = async (e) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ELIMINAR!'
        }).then((result) => {
            if (vehiculo.duenos.length > 1) {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "Sí, cambiarlo!"
                    Swal.fire(
                        'Cancelado',
                        'Hay mas de un Dueno registrado con este Vehiculo',
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

    async function Eliminar() {
        try {
            const DeleteVehiculo_API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculo/delete/${vehiculo.numSerie}`
            const response = await fetch(DeleteVehiculo_API_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const deleteV = await response.json();
            window.location.href = "/loged/vehiculoPrivado"
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'ERROR',
                text: "Ha sucedido un error al eliminar...",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'okey!'
            })
        }
    }

    async function Cambiar() {
        try {
            const DeleteVehiculo_API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculo/edit`
            const response = await fetch(DeleteVehiculo_API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(vehiculo1)
            });
            const deleteV = await response.json();
            window.location.href = "/loged/vehiculoPrivado"
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'ERROR',
                text: "Ha sucedido un error al hacer el cambio...",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'okey!'
            })
        }
    }

    async function DuenoCambio() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/duenos/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dueno)
            });
            const deleteV = await response.json();
            try {
                const response2 = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/duenos/new`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(dueno2)
                });
                const deleteV = await response2.json();
                Cambiar();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'ERROR',
                    text: "Ha sucedido un error al hacer el cambio...",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'okey!'
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'ERROR',
                text: "Ha sucedido un error al hacer el cambio...",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'okey!'
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
                                    {editar ? (
                                        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[70%] w-[90%] bg-amber-400 rounded-2xl pb-1  ">
                                            <div className="md:flex justify-center items-center">
                                                <div className="flex flex-col justify-center items-center">
                                                    <div className="rounded-full">
                                                        <Image className="p-3 object-cover" src={foto} width={200} height={200} alt="Foto" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <input name="file" type="file" onChange={(e) => { setFile(e.target.files[0]) }}></input>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="p-5 flex flex-col items-center justify-center">
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Numero de serie:</div>
                                                            <input name="numSerie" value={vehiculo1.numSerie} disabled id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Placa:</div>
                                                            <input name="placa" value={vehiculo1.placa} onChange={(e) => handleChange(e)} id="placa" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Marca:</div>
                                                            <input name="marca" value={vehiculo1.marca} onChange={(e) => handleChange(e)} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Modelo:</div>
                                                            <input name="modelo" value={vehiculo1.modelo} disabled id="modelo" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Referencia:</div>
                                                            <input name="referencia" value={vehiculo1.referencia} onChange={(e) => handleChange(e)} id="referencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Serie:</div>
                                                            <input name="serie" value={vehiculo1.serie} onChange={(e) => handleChange(e)} id="serie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Color:</div>
                                                            <input name="color" value={vehiculo1.color} onChange={(e) => handleChange(e)} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Kilometraje:</div>
                                                            <input name="kilometraje" value={vehiculo1.kilometraje} onChange={(e) => handleChange(e)} id="kilometraje" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Publico:</div>
                                                            <input name="publico" checked={vehiculo1.publico} value={vehiculo1.publico} onChange={(e) => handleChange(e)} id="publico" type="checkbox" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pt-1" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Ciudad promedio Transitada:</div>
                                                            <input name="ciudadPromTransi" value={dueno2.ciudadPromTransi} onChange={(e) => handleChange(e)} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Fecha de compra:</div>
                                                            <input name="dateStart" value={vehiculo1.duenos[0].dateStart} disabled id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Usuario:</div>
                                                            <input title="Al cambiar este parametro, el vehiculo cambiara su propietario" name="usuario" value={vehiculo1.usuario} onChange={(e) => handleChange(e)} id="usuario" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Descripcion:</div>
                                                            <textarea name="descripcion" value={vehiculo1.descripcion} onChange={(e) => handleChange(e)} id="descripcion" type="text" className="bg-black bg-opacity-10 rounded-2xl text-center w-[80%] pl-2" placeholder="" ></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={deleteVehiculo}>
                                                    <Icon icon="material-symbols:delete-outline" />
                                                    Eliminar
                                                </button>
                                                <div className="w-[20%] "></div>
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={updateVehiculo}>
                                                    <Icon icon="ri:save-line" />
                                                    Guardar
                                                </button>
                                                <div className="w-[20%] "></div>
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => setEditar(!editar)}>
                                                    <Icon icon="line-md:cancel-twotone" />
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-amber-400 rounded-2xl pb-1  ">
                                            <div className="md:flex  w-full">
                                                <div className="flex flex-col justify-center items-center">
                                                    <div className="pt-3 overflow-hidden">
                                                        <Image className="object-cover object-center " src={foto} width={200} height={200} alt="Foto" objectFit="cover" />
                                                    </div>
                                                    <div className="flex-col justify-center w-full flex items-center ">
                                                        <div className="text-left w-full pl-5">Descripcion:</div>
                                                        <textarea name="descripcion" disabled value={vehiculo.descripcion} id="descripcion" type="text" className="bg-black bg-opacity-10 rounded-2xl text-center w-[80%] pl-2" placeholder="" ></textarea>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="pt-5 pb-5 flex flex-col items-center justify-center">
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Numero de serie:</div>
                                                            <input name="numSerie" disabled value={vehiculo.numSerie} id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Placa:</div>
                                                            <input name="placa" disabled value={vehiculo.placa} id="placa" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Marca:</div>
                                                            <input name="marca" disabled value={vehiculo.marca} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Modelo:</div>
                                                            <input name="modelo" disabled value={vehiculo.modelo} id="modelo" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Referencia:</div>
                                                            <input name="referencia" disabled value={vehiculo.referencia} id="referencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Serie:</div>
                                                            <input name="serie" disabled value={vehiculo.serie} id="serie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Color:</div>
                                                            <input name="color" disabled value={vehiculo.color} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Kilometraje:</div>
                                                            <input name="kilometraje" disabled value={vehiculo.kilometraje} id="kilometraje" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Publico:</div>
                                                            <input name="publico" disabled checked={vehiculo.publico} value={vehiculo.publico} id="publico" type="checkbox" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pt-1" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Ciudad de procedencia:</div>
                                                            <input name="ciudadProcedencia" disabled value={vehiculo.ciudadProcedencia} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Ciudad promedio Transitada:</div>
                                                            <input name="ciudadPromTransi" value={dueno.ciudadPromTransi} disabled id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Fecha de compra:</div>
                                                            <input name="dateStart" disabled value={vehiculo.duenos[0].dateStart} id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5">Usuario:</div>
                                                            <input name="" value={vehiculo.usuario} id="usuario" disabled type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col space-y-8 p-4">
                                                    <div>
                                                        <h2 className="text-xl font-bold mb-4">Dueños</h2>
                                                        <table className="min-w-full border border-gray-300">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="py-2 px-4 border-b">ID</th>
                                                                    <th className="py-2 px-4 border-b">Nombre</th>
                                                                    <th className="py-2 px-4 border-b">Vehículo</th>
                                                                    <th className="py-2 px-4 border-b">Año</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                Aquí van los resultados de los dueños
                                                                <td className="py-2 px-4 border-b">hola :p</td>
                                                                <td className="py-2 px-4 border-b">hola </td>
                                                                <input name="" value={vehiculo.usuario} id="usuario" disabled type="text" className="py-2 px-4 border-b" ></input>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-bold mb-4">Historiales</h2>
                                                        <table className="min-w-full border border-gray-300">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="py-2 px-4 border-b">ID</th>
                                                                    <th className="py-2 px-4 border-b">Tipo</th>
                                                                    <th className="py-2 px-4 border-b">Fecha</th>
                                                                    <th className="py-2 px-4 border-b">Estado</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                Aquí van los resultados de los historiales
                                                                <td className="py-2 px-4 border-b">hola :p</td>
                                                                <td className="py-2 px-4 border-b">hola </td>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="flex-row justify-center w-full flex items-center pt-2 ">
                                                <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleEditar} >
                                                    <Icon icon="lucide:edit" />
                                                    Editar
                                                </button>
                                                <div className="w-[20%] "></div>
                                                <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={closecomponent}>
                                                    <Icon icon="material-symbols:close" />
                                                    Salir
                                                </button>
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