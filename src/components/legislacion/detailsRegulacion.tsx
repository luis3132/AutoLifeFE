import { Legislacion, LegislacionNew, Vehiculo } from "@/lib/types/types";
import { Dialog, Transition, TransitionChild } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react"
import Swal from "sweetalert2";

interface DetailsRegulacionProps {
    closeComponent: () => void;
    vehiculo: Vehiculo;
    tipoRegulacion: string;
    reload: () => void;
    token: string | undefined;
}

const DetailsRegulacion: FC<DetailsRegulacionProps> = ({ closeComponent, reload, tipoRegulacion, vehiculo, token }) => {
    let idTipoLegislacion: number = 0;
    switch (tipoRegulacion) {
        case "SOAT":
            idTipoLegislacion = 1;
            break;
        case "Seguro":
            idTipoLegislacion = 2;
            break;
        case "Tecnico Mecanica":
            idTipoLegislacion = 3;
            break;
        default:
            break;
    }
    const [isOpen, setIsOpen] = useState(true);
    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");
    const hoy: Date = new Date();
    const [vigente, setVigente] = useState<Legislacion[]>([]);
    const [pasadas, setPasadas] = useState<Legislacion[]>([]);
    const [agregar, setAgregar] = useState<boolean>(false);

    const [legislacion, setLegislacion] = useState<LegislacionNew>({
        fechaInicio: "",
        fechaFin: "",
        tipoLegislacion: idTipoLegislacion,
        vehiculo: vehiculo.numSerie,
        descripcion: "",
        kilometraje: vehiculo.kilometraje
    });

    const handleagregar = () => {
        setAgregar(!agregar);
    }

    useEffect(() => {
        if (vehiculo) {
            if (vehiculo.fotos.length > 0) {
                setFoto(vehiculo.fotos[vehiculo.fotos.length - 1].path);
            }
        }
    }, []);

    useEffect(() => {
        setVigente(vehiculo.legislacion.filter((l) => l.tipoLegislacion.legislacion === tipoRegulacion && new Date(l.fechaFin).getTime() > hoy.getTime()));
        setPasadas(vehiculo.legislacion.filter((l) => l.tipoLegislacion.legislacion === tipoRegulacion && new Date(l.fechaFin).getTime() <= hoy.getTime()));
    }, [vehiculo]);

    useEffect(() => {

    }, [vigente, pasadas])

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setLegislacion({
            ...legislacion,
            [e.target.name]: e.target.value
        });
    }

    const handleSave = () => {
        const inicio: number = new Date(legislacion.fechaInicio).getTime();
        const fin: number = new Date(legislacion.fechaFin).getTime();
        const diferencia: number = (fin - inicio)/(1000 * 60 * 60 * 24);
        if (legislacion.fechaInicio !== "" && legislacion.fechaFin !== "" && legislacion.descripcion !== "" && diferencia >= 30) {
            Swal.fire({
                title: "¿Está seguro?",
                text: "Asegurese de que el kilometraje este actualizado, si no lo esta, actualicelo antes de continuar",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarLegislacion();
                }
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Por favor, llene todos los campos y asegurese de que la fecha de finalización sea mayor a 30 días de la fecha de inicio",
                icon: "error"
            });
        }
    }

    const agregarLegislacion = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/legislacion/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify([legislacion])
            });
            const data: Legislacion = await response.json();
            if (data) {
                Swal.fire({
                    title: "Agregado",
                    text: "La legislación ha sido agregada correctamente",
                    icon: "success"
                });
                reload();
                closeModal();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error al agregar la legislación",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Ha ocurrido un error al agregar la legislación: ${error}`,
                icon: "error"
            });
        }
    }

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
                                        <button title="close" className=" float-right pr-1 pt-3 " onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        {agregar ? (
                                            <>
                                                <h1 className="text-center text-4xl font-bold pt-5">Agregar {tipoRegulacion}</h1>
                                                <div className="w-full px-5 pb-5 md:flex">
                                                    <div className="w-1/3 justify-center items-center flex flex-col">
                                                        <div className="w-fit rounded-2xl overflow-hidden m-5 shadow-2xl">
                                                            <Image className="object-cover" src={foto} width={200} height={200} alt="Foto" />
                                                        </div>
                                                        <div className="w-full justify-center items-center flex">
                                                            <input type="file" />
                                                        </div>
                                                    </div>
                                                    <div className="w-2/3">
                                                        <div className="flex-col justify-center w-full flex items-center pt-3">
                                                            <div className="text-left w-full pl-5 font-bold">Fecha Inicio:</div>
                                                            <input name="fechaInicio" value={legislacion.fechaInicio} id="fechaInicio" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5 font-bold">Fecha Fin:</div>
                                                            <input name="fechaFin" value={legislacion.fechaFin} id="fechaFin" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
                                                        </div>
                                                        <div className="flex-col justify-center w-full flex items-center ">
                                                            <div className="text-left w-full pl-5 font-bold">Descripcion:</div>
                                                            <textarea name="descripcion" value={legislacion.descripcion} id="descripcion" className="bg-black bg-opacity-10 rounded-lg text-center w-[80%] pl-2" onChange={handleChange} ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-around">
                                                    <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-lg flex items-center" onClick={handleSave}>
                                                        <Icon className="mr-1" icon="gg:add" />
                                                        agregar
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center" onClick={handleagregar}>
                                                        <Icon className="mr-1" icon="line-md:cancel-twotone" />
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h1 className="text-center text-4xl font-bold pt-5">{tipoRegulacion}</h1>
                                                <div className="w-full px-5 pb-5 md:flex">
                                                    <div className="w-1/3 justify-center items-center flex">
                                                        <div className="w-fit rounded-2xl overflow-hidden m-5 shadow-2xl">
                                                            <Image className="object-cover" src={foto} width={200} height={200} alt="Foto" />
                                                        </div>
                                                    </div>
                                                    <div className="w-2/3">
                                                        <div>
                                                            <h2 className="text-center text-2xl font-bold">vigentes:</h2>
                                                            {vigente.length === 0 ? (
                                                                <h2 className="text-center text-2xl text-red-500 font-bold">No hay {tipoRegulacion}s vigentes</h2>
                                                            ) : (
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <th>Fecha Inicio</th>
                                                                        <th>Fecha Final</th>
                                                                        <th>Acciones</th>
                                                                    </thead>
                                                                    <tbody>
                                                                        {vigente.map((l) => (
                                                                            <tr key={l.id}>
                                                                                <td>{new Date(l.fechaInicio).getFullYear() + "-" + (new Date(l.fechaInicio).getMonth()+1) + "-" + new Date(l.fechaInicio).getDate()}</td>
                                                                                <td>{new Date(l.fechaFin).getFullYear() + "-" + (new Date(l.fechaFin).getMonth()+1) + "-" + new Date(l.fechaFin).getDate()}</td>
                                                                                <td>
                                                                                    <button title="Eliminar" onClick={() => { }}><Icon icon="akar-icons:trash-can" width={30} height={30} /></button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </div>
                                                        <div className="pt-5">
                                                            <h2 className="text-center text-2xl font-bold">Pasadas:</h2>
                                                            {pasadas.length === 0 ? (
                                                                <h2 className="text-center text-2xl text-red-500 font-bold">No hay historial</h2>
                                                            ) : (
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <th>Fecha Inicio</th>
                                                                        <th>Fecha Final</th>
                                                                        <th>Acciones</th>
                                                                    </thead>
                                                                    <tbody>
                                                                        {pasadas.map((l) => (
                                                                            <tr key={l.id}>
                                                                                <td>{new Date(l.fechaInicio).getFullYear() + "-" + (new Date(l.fechaInicio).getMonth()+1) + "-" + new Date(l.fechaInicio).getDate()}</td>
                                                                                <td>{new Date(l.fechaFin).getFullYear() + "-" + (new Date(l.fechaFin).getMonth()+1) + "-" + new Date(l.fechaFin).getDate()}</td>
                                                                                <td>
                                                                                    <button title="Eliminar" onClick={() => { }}><Icon icon="akar-icons:trash-can" width={30} height={30} /></button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-around">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center" onClick={handleagregar}>
                                                        <Icon className="mr-1" icon="gg:add" />
                                                        Agregar
                                                    </button>
                                                </div>
                                            </>
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

export default DetailsRegulacion;