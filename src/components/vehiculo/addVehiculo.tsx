import { TipoVehiculo, VehiculoNewOUpdate } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface addVehiculoProps {
    closeComponent: () => void;
    token: string | undefined;
    usuario: string | undefined;
    reload: () => void;
}

const AddVehiculo: FC<addVehiculoProps> = ({ closeComponent, token, usuario, reload }) => {
    const [tipoVehiculos, setTipoVehiculos] = useState<TipoVehiculo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [vehiculo, setVehiculo] = useState<VehiculoNewOUpdate>({
        numSerie: "",
        placa: "",
        tipoVehiculo: 0,
        marca: "",
        modelo: "",
        referencia: "",
        serie: "",
        color: "",
        usuario: usuario ? usuario : "",
        kilometraje: 0,
        ciudadProcedencia: "",
        publico: false,
        descripcion: "",
        fechaCompra: "",
        ciudadPromTransi: ""
    });

    useEffect(() => {
        const fetchTipoVehiculo = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/tipovehiculo/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            const data: TipoVehiculo[] = await response.json();
            setTipoVehiculos(data);
        }
        fetchTipoVehiculo();
    }, []);

    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            setVehiculo({ ...vehiculo, publico: e.target.checked });
        } else {
            setVehiculo({
                ...vehiculo,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (vehiculo.numSerie === "" || vehiculo.placa === "" || vehiculo.tipoVehiculo === 0 || vehiculo.modelo === "" || vehiculo.referencia === "" || vehiculo.color === "" || vehiculo.kilometraje === 0 || vehiculo.ciudadProcedencia === "") {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                confirmButtonText: "Ok"
            });
        } else {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "¿Deseas agregar este vehiculo?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    addVehiculo();
                }
            });
        }
    }

    const addVehiculo = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculos/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(vehiculo)
        })
        setLoading(false);
        reload();
        if (response.ok) {
            Swal.fire({
                title: "Vehiculo agregado",
                text: "El vehiculo ha sido agregado correctamente",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                reload();
                closeComponent();
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al agregar el vehiculo",
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
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[30%] max-md:w-[80%] bg-white rounded-lg pb-1 `}>
                                        <button title="close" className=" float-right pr-1 pt-3" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <div className="text-2xl pt-3 pl-10 font-bold" >Añadir Vehiculo</div>
                                        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Numero de Serie:</div>
                                                <input name="numSerie" value={vehiculo.numSerie} id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Placa:</div>
                                                <input name="placa" value={vehiculo.placa} id="placa" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Tipo de Vehiculo:</div>
                                                <select name="tipoVehiculo" value={vehiculo.tipoVehiculo} id="tipoVehiculo" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} >
                                                    <option value={0}>Selecciona un tipo de vehiculo</option>
                                                    {tipoVehiculos.map((tipoVehiculo, index) => (
                                                        <option key={index} value={tipoVehiculo.id} title={tipoVehiculo.descripcion} >{tipoVehiculo.nombre}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Marca:</div>
                                                <input name="marca" value={vehiculo.marca} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Modelo:</div>
                                                <input name="modelo" value={vehiculo.modelo} id="modelo" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Referencia:</div>
                                                <input name="referencia" value={vehiculo.referencia} id="referencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Serie:</div>
                                                <input name="serie" value={vehiculo.serie} id="serie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Color:</div>
                                                <input name="color" value={vehiculo.color} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Usuario:</div>
                                                <input name="color" disabled value={vehiculo.usuario} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Kilometraje:</div>
                                                <input name="kilometraje" value={vehiculo.kilometraje} id="kilometraje" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Ciudad de Procedencia:</div>
                                                <input name="ciudadProcedencia" value={vehiculo.ciudadProcedencia} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Publico:</div>
                                                <input name="publico" checked={vehiculo.publico} id="publico" type="checkbox" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Fecha de Compra del Vehiculo:</div>
                                                <input name="fechaCompra" value={vehiculo.fechaCompra} id="fechaCompra" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Ciudad promedio transitada:</div>
                                                <input name="ciudadPromTransi" value={vehiculo.ciudadPromTransi} id="ciudadPromTransi" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                            </div>
                                            <div className="flex-col justify-center w-full flex items-center ">
                                                <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                <textarea name="descripcion" value={vehiculo.descripcion} id="descripcion" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></textarea>
                                            </div>
                                            <div className="justify-around w-full flex items-center pt-3 pb-2">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg" type="submit" >Agregar Vehiculo</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg" onClick={closeComponent} >Cancelar</button>
                                            </div>
                                        </form>
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

export default AddVehiculo;