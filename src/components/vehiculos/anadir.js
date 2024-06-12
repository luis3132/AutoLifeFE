import { Icon } from '@iconify/react';
import { useState } from 'react';
import Tipovehiculo from './tipovehiculo';

export default function Anadir({ tipovehiculo, token, dni, showAnadir }) {
    const [check, setCheck] = useState(false);
    const [idT, setIdT] = useState({
        id: "",
    })
    const [dueno, setDueno] = useState({
        usuario: dni,
        vehiculo: "",
        kmStart: 0,
        kmFinish: 0,
        dateStart: "",
        dateFinish: "",
        ciudadPromTransi: ""
    })
    const [vehiculo, setVehiculo] = useState({
        numSerie: "",
        placa: "",
        marca: "",
        modelo: "",
        referencia: "",
        serie: "",
        color: "",
        kilometraje: "",
        publico: "false",
        descripcion: "",
        ciudadProcedencia: "",
        usuario: dni
    })
    const handleChangedate = (event) => {
        if (event.target.name == "kilometraje") {
            setDueno({ ...dueno, kmFinish: event.target.value });
        } else {
            setDueno({ ...dueno, [event.target.name]: event.target.value });
        }
    }
    const handleChangeID = (event) => {
        setIdT({ ...idT, [event.target.name]: event.target.value });
    }
    const handleChange = (event) => {
        if (event.target.name == "publico") {
            setCheck(!check);
        }
        setVehiculo({ ...vehiculo, [event.target.name]: event.target.value });
        setDueno({ ...dueno, vehiculo: vehiculo.numSerie })
    }
    const saveVehiculo = async (e) => {
        var tipoVehiculoSeleccionado = null;
        tipovehiculo.map((tipo) => {
            if (idT.id == tipo.id) {
                tipoVehiculoSeleccionado = tipo
            }
        })
        const nuevoVehiculo = {
            ...vehiculo,
            tipovehiculo: {
                id: tipoVehiculoSeleccionado.id,
                nombre: tipoVehiculoSeleccionado.nombre,
                descripcion: tipoVehiculoSeleccionado.descripcion
            }
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculo/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(nuevoVehiculo)
        });
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/duenos/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dueno)
        });
        if (!response.ok && !response2.ok) {
            alert("Error al crear el Vehiculo");
        } else {
            const _Vehiculo = await response;
            const _Dueno = await response2;
            alert("Vehiculo Creado");
            window.location.href = "/loged/vehiculoPrivado"
        }
    }

    return (
        <>
            <div className="md:w-full bg-gray-200 rounded-2xl">
                <div className="flex text-2xl pt-3 justify-center w-full items-center" >Anadir Vehiculo</div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Numero de serie:</div>
                    <input name="numSerie" value={vehiculo.numSerie} onChange={(e) => handleChange(e)} maxLength={200} id="numSerie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Placa:</div>
                    <input name="placa" value={vehiculo.placa} onChange={(e) => handleChange(e)} maxLength={10} id="placa" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Marca:</div>
                    <input name="marca" value={vehiculo.marca} onChange={(e) => handleChange(e)} maxLength={50} id="marca" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Modelo:</div>
                    <input name="modelo" value={vehiculo.modelo} onChange={(e) => handleChange(e)} maxLength={50} id="modelo" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Referencia:</div>
                    <input name="referencia" value={vehiculo.referencia} onChange={(e) => handleChange(e)} maxLength={50} id="referencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Serie:</div>
                    <input name="serie" value={vehiculo.serie} onChange={(e) => handleChange(e)} maxLength={50} id="serie" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Color:</div>
                    <input name="color" value={vehiculo.color} onChange={(e) => handleChange(e)} maxLength={15} id="color" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Kilometraje:</div>
                    <input name="kilometraje" value={vehiculo.kilometraje} onChange={(e) => { handleChange(e); handleChangedate(e) }} id="kilometraje" type="number" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Publico:</div>
                    <input name="publico" checked={check} value={check} onChange={(e) => handleChange(e)} id="publico" type="checkbox" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pt-1" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Ciudad de procedencia:</div>
                    <input name="ciudadProcedencia" value={vehiculo.ciudadProcedencia} onChange={(e) => handleChange(e)} maxLength={50} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Ciudad promedio Transitada:</div>
                    <input name="ciudadPromTransi" value={dueno.ciudadPromTransi} onChange={(e) => handleChangedate(e)} maxLength={50} id="ciudadProcedencia" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Fecha de compra:</div>
                    <input name="dateStart" value={dueno.dateStart} onChange={(e) => handleChangedate(e)} id="dateStart" type="date" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Usuario:</div>
                    <input name="" value={vehiculo.usuario} id="usuario" disabled type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Descripcion:</div>
                    <textarea name="descripcion" value={vehiculo.descripcion} onChange={(e) => handleChange(e)} maxLength={1000} id="descripcion" type="text" className="bg-black bg-opacity-10 rounded-2xl text-center w-[80%] pl-2" placeholder="" ></textarea>
                </div>
                <div className="flex-col justify-center w-full flex items-center ">
                    <div className="text-left w-full pl-5">Tipo de vehiculo:</div>
                    <select name="id" onChange={(e) => handleChangeID(e)} id="id" type="id" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2">
                        <option selected> Seleccione </option>
                        {tipovehiculo?.map((tipo) => (
                            <Tipovehiculo tipovehiculo={tipo} key={tipo.id} />
                        ))}
                    </select>
                </div>
                <div className="flex-row justify-center w-full flex items-center pt-2 pb-1 ">
                    <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-full" onClick={saveVehiculo}>
                        <Icon icon="gg:add" />
                        Anadir
                    </button>
                    <div className="w-[10%] "></div>
                    <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-full" onClick={showAnadir}>
                        <Icon icon="line-md:cancel-twotone" />
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )
}