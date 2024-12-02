import { Vehiculo, VehiculoNewOUpdate } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, Fragment, useEffect, useState } from "react";

interface SeeVehiculo {
    closeComponent: () => void;
    vehiculo: Vehiculo;
    token: string | undefined;
}

const SeeVehiculo: FC<SeeVehiculo> = ({ closeComponent, vehiculo, token }) => {
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
        descripcion: vehiculo.descripcion
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
        setIsOpen(false);
        closeComponent();
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
                                        {showEdit ? (
                                            <div>
                                                <div className="w-full flex justify-center p-3">
                                                    <div className="w-1/2 rounded-2xl overflow-hidden shadow-xl">
                                                        <img src={foto} height={500} width={500}></img>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <p className="text-xl text-center font-semibold">{vehiculo.placa}</p>
                                                    <p className="text-xl text-center font-semibold">KilometrajeXD: {vehiculo.kilometraje}</p>
                                                </div>
                                                <div className="w-full flex justify-center pt-3">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg" onClick={() => setShowEdit(!showEdit)}>Editar</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <div className="text-2xl pt-3 pl-10 font-bold" >Vehiculo</div>
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
                                                                <input value={vehiculo.numSerie} id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" ></input>
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
                                                                <div className="text-left w-full pl-5 font-bold">Ciudad de Procedencia:</div>
                                                                <input value={vehiculo.ciudadProcedencia} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                            <div className="flex-col justify-center w-full flex items-center ">
                                                                <div className="text-left w-full pl-5 font-bold">Publico:</div>
                                                                <input checked={vehiculo.publico} id="publico" type="checkbox" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></input>
                                                            </div>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                            <textarea value={vehiculo.descripcion} id="descripcion" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" disabled ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-center pt-3">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 py-2  rounded-lg" onClick={() => setShowEdit(!showEdit)}>Editar</button>
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