import { DuenosNuevo, Vehiculo, VehiculoNewOUpdate } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import ListLegislacion from "./legislacion/listLegislacion";
import Swal from "sweetalert2";

interface SeeVehiculo {
    closeComponent: () => void;
    vehiculo: Vehiculo;
    token: string | undefined;
    reload: () => void;
    publico: boolean;
}

const SeeVehiculo: FC<SeeVehiculo> = ({ closeComponent, vehiculo, token, reload, publico }) => {
    const [vehiculoEdit, setVehiculoEdit] = useState<VehiculoNewOUpdate>({
        numSerie: vehiculo.numSerie,
        placa: vehiculo.placa,
        tipoVehiculo: vehiculo.tipoVehiculo.id,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        referencia: vehiculo.referencia,
        serie: vehiculo.serie,
        color: vehiculo.color,
        usuario: vehiculo.usuario,
        kilometraje: vehiculo.kilometraje,
        ciudadProcedencia: vehiculo.ciudadProcedencia,
        publico: vehiculo.publico,
        descripcion: vehiculo.descripcion,
        fechaCompra: vehiculo.fechaCompra,
        ciudadPromTransi: vehiculo.ciudadPromTransi
    });
    const [dueno, setDueno] = useState<DuenosNuevo>({
        kmStart: vehiculo.duenos[vehiculo.duenos.length - 1].kmStart,
        kmFinish: vehiculo.kilometraje,
        dateStart: vehiculo.duenos[vehiculo.duenos.length - 1].dateStart,
        dateFinish: new Date(),
        ciudadPromTansi: vehiculo.ciudadPromTransi,
        vehiculo: vehiculo.numSerie,
        usuario: vehiculo.usuario
    });

    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const [showEdit, setShowEdit] = useState<boolean>(false);

    useEffect(() => {
        if (vehiculo) {
            if (vehiculo.fotos.length > 0) {
                setFoto(vehiculo.fotos[vehiculo.fotos.length - 1].path);
            }
        }
    }, [vehiculo]);

    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        reload();
        setIsOpen(false);
        closeComponent();
    };

    const seguro = vehiculo.legislacion.filter((legislacion) => legislacion.tipoLegislacion.legislacion === "Seguro");
    const SOAT = vehiculo.legislacion.filter((legislacion) => legislacion.tipoLegislacion.legislacion === "SOAT");
    const TecnicoMecanica = vehiculo.legislacion.filter((legislacion) => legislacion.tipoLegislacion.legislacion === "Tecnico Mecanica");

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            setVehiculoEdit({ ...vehiculoEdit, publico: e.target.checked });
        } else {
            setVehiculoEdit({
                ...vehiculoEdit,
                [e.target.name]: e.target.value
            });
            if (e.target.name === "kilometraje") {
                setDueno({
                    ...dueno,
                    kmFinish: parseInt(e.target.value)
                });
            }
            if (e.target.name === "ciudadPromTransi") {
                setDueno({
                    ...dueno,
                    ciudadPromTansi: e.target.value
                });
            }
            if (e.target.name === "usuario") {
                setDueno({
                    ...dueno,
                    usuario: e.target.value
                });
            }
        }
    }

    const handleDelete = () => {
        if (vehiculo.duenos.length > 1 || vehiculo.legislacion.length > 0 || vehiculo.servicios.length > 0) {
            Swal.fire({
                title: "No se puede eliminar",
                text: "El vehiculo tiene historial",
                icon: "error",
                confirmButtonText: "Ok"
            });
        } else {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "¿Deseas eliminar este vehiculo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    reload();
                    deleteVehiculo();
                }
            });
        }
    }

    const deleteVehiculo = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/delete/${vehiculo.numSerie}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            Swal.fire({
                title: "Vehiculo Eliminado",
                text: "El vehiculo ha sido",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                reload();
                closeModal();
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se ha podido eliminar el vehiculo",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    const handleSumit = () => {
        if (vehiculo.color !== vehiculoEdit.color || vehiculo.usuario !== vehiculoEdit.usuario || vehiculo.kilometraje < vehiculoEdit.kilometraje || vehiculo.publico !== vehiculoEdit.publico || vehiculo.descripcion !== vehiculoEdit.descripcion) {
            if (vehiculo.usuario !== vehiculoEdit.usuario) {
                Swal.fire({
                    title: "¿Estas seguro?",
                    text: "¿Deseas cambiar el dueño de este vehiculo? Este cambio no se puede deshacer",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result.isConfirmed) {
                        reload();
                        updateDueno();
                    }
                });
            } else {
                Swal.fire({
                    title: "¿Estas seguro?",
                    text: "¿Deseas guardar los cambios?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result.isConfirmed) {
                        reload();
                        updateVehiculo();
                    }
                });
            }
        } else {
            Swal.fire({
                title: "No hay cambios",
                text: "No se han realizado cambios o no son validos",
                icon: "info",
                confirmButtonText: "Ok"
            });
        }
    }

    const updateVehiculo = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(vehiculoEdit)
        });
        if (response.ok) {
            Swal.fire({
                title: "Vehiculo actualizado",
                text: "El vehiculo ha sido actualizado",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                reload();
                closeModal();
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se ha podido actualizar el vehiculo",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    const updateDueno = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/update/cambiodueno`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                dueno: dueno,
                vehiculo: vehiculoEdit
            })
        });
        if (response.ok) {
            Swal.fire({
                title: "Dueño actualizado",
                text: "El vehiculo ha cambiado de dueño",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                reload();
                closeModal();
            });
        } if (response.status === 404) {
            Swal.fire({
                title: "Error",
                text: "No se ha podido cambiar el dueño del vehiculo, el usuario no existe",
                icon: "error",
                confirmButtonText: "Ok"
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se ha podido cambiar el dueño del vehiculo",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

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
                                        {showEdit ? (
                                            <div className="w-full">
                                                <div className="text-4xl pt-3 pl-10 font-bold" >Vehiculo</div>
                                                <div className="w-full lg:flex h-inherit">
                                                    <div className="lg:w-[30%] w-full h-inherit flex flex-col justify-center pl-5 items-center">
                                                        <div className="w-60 rounded-2xl overflow-hidden shadow-xl">
                                                            <img src={foto} height={500} width={500}></img>
                                                        </div>
                                                        <div className="w-full flex justify-center pt-3">
                                                            <input type="file" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" />
                                                        </div>
                                                    </div>
                                                    <div className="lg:w-[70%] w-full">
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Numero de Serie:</div>
                                                                <input value={vehiculo.numSerie} id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Placa:</div>
                                                                <input value={vehiculo.placa} id="placa" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Tipo de Vehiculo:</div>
                                                                <input value={vehiculo.tipoVehiculo.nombre} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Marca:</div>
                                                                <input value={vehiculo.marca} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Modelo:</div>
                                                                <input value={vehiculo.modelo} id="modelo" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Referencia:</div>
                                                                <input value={vehiculo.referencia} id="referencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Serie:</div>
                                                                <input value={vehiculo.serie} id="serie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Color:</div>
                                                                <input name="color" value={vehiculoEdit.color} id="color" type="text" className="bg-black bg-opacity-25 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Usuario:</div>
                                                                <input name="usuario" value={vehiculoEdit.usuario} id="usuario" type="text" className="bg-black bg-opacity-25 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Kilometraje:</div>
                                                                <input name="kilometraje" value={vehiculoEdit.kilometraje} id="kilometraje" type="number" className="bg-black bg-opacity-25 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Fecha de compra:</div>
                                                                <input name="fechaCompra" value={vehiculo.fechaCompra} id="fechaCompra" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Ciudad promedio transitada:</div>
                                                                <input name="ciudadPromTransi" value={vehiculoEdit.ciudadPromTransi} id="ciudadPromTransi" type="text" className="bg-black bg-opacity-25 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Ciudad de Procedencia:</div>
                                                                <input value={vehiculo.ciudadProcedencia} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Publico:</div>
                                                                <input name="publico" checked={vehiculoEdit.publico} id="publico" type="checkbox" className="bg-black bg-opacity-25 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                            </div>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                            <textarea name="descripcion" value={vehiculoEdit.descripcion} id="descripcion" className="bg-black bg-opacity-25 rounded-xl text-center w-[80%] pl-2" onChange={handleChange} ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full sm:flex pt-3">
                                                    <div className="flex justify-around w-full sm:w-2/3">
                                                        <button className="bg-red-500 hover:bg-red-700 flex items-center text-white font-bold w-min py-2 px-4 rounded-lg" onClick={handleDelete}>
                                                            <Icon className="mr-1" icon="material-symbols:delete-outline" />
                                                            Eliminar
                                                        </button>
                                                        <button className="bg-green-500 hover:bg-green-700 flex items-center text-white font-bold w-min py-2 px-4 rounded-lg" onClick={handleSumit}>
                                                            <Icon className="mr-1" icon="akar-icons:check" />
                                                            Guardar
                                                        </button>
                                                    </div>
                                                    <div className="flex w-full justify-around sm:w-1/3 max-sm:pt-2">
                                                        <button className="bg-amber-500 hover:bg-amber-700 flex items-center text-white font-bold w-min py-2 px-4 rounded-lg" onClick={() => setShowEdit(!showEdit)}>
                                                            <Icon className="mr-1" icon="line-md:cancel-twotone" />
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <div className="text-4xl pt-3 pl-10 font-bold" >Vehiculo</div>
                                                <div className="w-full md:flex h-inherit">
                                                    <div className="md:w-1/4 w-full h-inherit flex justify-center pl-5 items-center">
                                                        <div className="w-60 rounded-2xl overflow-hidden shadow-xl">
                                                            <img src={foto} height={500} width={500}></img>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-3/4 w-full">
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Numero de Serie:</div>
                                                                <input value={vehiculo.numSerie} id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Placa:</div>
                                                                <input value={vehiculo.placa} id="placa" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Tipo de Vehiculo:</div>
                                                                <input value={vehiculo.tipoVehiculo.nombre} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Marca:</div>
                                                                <input value={vehiculo.marca} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Modelo:</div>
                                                                <input value={vehiculo.modelo} id="modelo" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Referencia:</div>
                                                                <input value={vehiculo.referencia} id="referencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Serie:</div>
                                                                <input value={vehiculo.serie} id="serie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Color:</div>
                                                                <input value={vehiculo.color} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Usuario:</div>
                                                                <input disabled value={vehiculo.usuario} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Kilometraje:</div>
                                                                <input value={vehiculo.kilometraje} id="kilometraje" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Fecha de compra:</div>
                                                                <input value={vehiculo.fechaCompra} id="fechaCompra" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Ciudad promedio transitada:</div>
                                                                <input value={vehiculo.ciudadPromTransi} id="ciudadPromTransi" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="md:flex">
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Ciudad de Procedencia:</div>
                                                                <input value={vehiculo.ciudadProcedencia} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Publico:</div>
                                                                <input checked={vehiculo.publico} id="publico" type="checkbox" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-col justify-center w-full flex items-center ">
                                                    <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                    <textarea value={vehiculo.descripcion} id="descripcion" className="bg-black bg-opacity-10 rounded-xl text-center w-[90%] pl-2" disabled ></textarea>
                                                </div>
                                                <div className={`w-full flex justify-center pt-3 ${publico && "hidden"}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 py-2  rounded-lg" onClick={() => setShowEdit(!showEdit)}>Editar</button>
                                                </div>
                                                <div className="w-full">
                                                    <h1 className="text-center text-2xl font-bold pt-3">Dueños</h1>
                                                    <div className="w-full flex justify-around p-2">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-4 py-2">Cedula</th>
                                                                    <th className="px-4 py-2 max-sm:hidden">Kilometraje Inicio</th>
                                                                    <th className="px-4 py-2 max-sm:hidden">Kilometraje Fin</th>
                                                                    <th className={`px-4 py-2 ${publico && "hidden"}`}>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {vehiculo.duenos.slice(-10).map((dueno, index) => (
                                                                    <tr key={index}>
                                                                        <td className=" px-4 py-2">{dueno.usuario.dni}</td>
                                                                        <td className=" px-4 py-2 max-sm:hidden">{dueno.kmStart}</td>
                                                                        <td className=" px-4 py-2 max-sm:hidden">{dueno.kmFinish ?? "Vigente"}</td>
                                                                        <td className=" px-4 py-2">
                                                                            <button className="bg-blue-500 hover:bg-blue-700 flex items-center text-white font-bold py-2 px-4 rounded-lg">
                                                                                <Icon className="mr-1" icon="mdi:eye-outline" />
                                                                                Ver
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <h1 className="text-center text-2xl font-bold pt-3">Seguro</h1>
                                                    <div className="w-full flex justify-around p-2">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-4 py-2 max-sm:hidden">Fecha Inicio</th>
                                                                    <th className="px-4 py-2">Fecha Final</th>
                                                                    <th className={`px-4 py-2 ${publico && "hidden"}`}>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {seguro.slice(-5).map((seguro, index) => (
                                                                    <ListLegislacion key={index} legislacion={seguro} />
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <h1 className="text-center text-2xl font-bold pt-3">SOAT</h1>
                                                    <div className="w-full flex justify-around p-2">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-4 py-2 max-sm:hidden">Fecha Inicio</th>
                                                                    <th className="px-4 py-2">Fecha Final</th>
                                                                    <th className={`px-4 py-2 ${publico && "hidden"}`}>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {SOAT.slice(-5).map((seguro, index) => (
                                                                    <ListLegislacion key={index} legislacion={seguro} />
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <h1 className="text-center text-2xl font-bold pt-3">Tecnico Mecanica</h1>
                                                    <div className="w-full flex justify-around p-2">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-4 py-2 max-sm:hidden">Fecha Inicio</th>
                                                                    <th className="px-4 py-2">Fecha Final</th>
                                                                    <th className="px-4 py-2 max-sm:hidden">Kilometraje</th>
                                                                    <th className={`px-4 py-2 ${publico && "hidden"}`}>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {TecnicoMecanica.slice(-5).map((seguro, index) => (
                                                                    <ListLegislacion key={index} legislacion={seguro} />
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <h1 className="text-center text-2xl font-bold pt-3">Servicios</h1>
                                                    <div className="w-full flex justify-around p-2">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-4 py-2">Tipo Servicio</th>
                                                                    <th className="px-4 py-2 max-sm:hidden">Mecanico</th>
                                                                    <th className="px-4 py-2 max-sm:hidden">Kilometraje</th>
                                                                    <th className={`px-4 py-2 ${publico && "hidden"}`}>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {vehiculo.servicios.slice(-5).map((servicio, index) => (
                                                                    <tr key={index}>
                                                                        <td className="border px-4 py-2">{servicio.tipoServicio.servicio}</td>
                                                                        <td className="border px-4 py-2 max-sm:hidden">{servicio.mecanico.dni}</td>
                                                                        <td className="border px-4 py-2 max-sm:hidden">{servicio.kilometraje}</td>
                                                                        <td className="border px-4 py-2">
                                                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Ver</button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}

export default SeeVehiculo;