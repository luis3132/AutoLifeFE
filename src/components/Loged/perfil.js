import { useEffect, useState } from "react"
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import Image from "next/image";

export default function VerPerfil({ usuario, token }) {
  const [foto, setFoto] = useState("/imagenes/logo/logoSL.png");

  const [file, setFile] = useState(null);
  const [editar, setEditar] = useState(false);
  const [vehiculo, setVehiculo] = useState(null);
  const [usuario1, setUsuario1] = useState({
    dni: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    nombreUsuario: "",
    email: "",
  })

  useEffect(() => {
    if (usuario) {
      setUsuario1(usuario)
      if (usuario.fotos.length > 0){
        setFoto(usuario.fotos[usuario.fotos.length - 1].foto)
      }
    }
  }, [usuario])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Vehiculos_API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/vehiculo/list/usuario/${usuario?.dni}`;
        const response = await fetch(Vehiculos_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const vehiculos = await response.json();
        setVehiculo(vehiculos)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [usuario1])

  const handleChange = (event) => {
    setUsuario1({ ...usuario1, [event.target.name]: event.target.value });
  }

  const updateUsuario = async (e) => {
    if (file != undefined) {
      const form = new FormData();
      form.set('file', file);
      const usuarioString = JSON.stringify(usuario)
      form.set('usuario', usuarioString);
      form.set('token', token);
      const res = await fetch('/api/uploadUser', {
        method: "POST",
        body: form
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = "/loged"
      }
    }
    if (usuario != usuario1) {
      Swal.fire(
        'Editado!',
        'La edición ha sido confirmada.',
        'success'
      ).then(() => {
        Cambiar();
      });

    }
  }
  const deleteUsuario = async (e) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ELIMINAR!'
    }).then((result) => {
      if (vehiculo.length >= 1) {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Sí, cambiarlo!"
          Swal.fire(
            'Cancelado',
            'Hay uno o mas vehiculos registrados con este usuario',
            'error'
          );
        } else {
          // El usuario hizo clic en "Cancelar"
          Swal.fire(
            'Cancelado',
            'La eliminacion ha sido cancelada.',
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuarios/delete/${usuario?.dni}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const deleteV = await response.json();
      window.location.href = "/";
      document.cookie = "authToken =; path=/;"
      sessionStorage.clear();

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuarios/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(usuario1)
      });
      const deleteV = await response.json();
      window.location.href = "/loged"
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
      {editar ? (
        <div className="w-full">
          <div className="w-full justify-center items-center flex">
            <Image className="p-3 object-cover" src={foto} width={200} height={200} alt="Foto" />
          </div>
          <div className="flex justify-center items-center ">
            <input name="file" type="file" onChange={(e) => { setFile(e.target.files[0]) }}></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">DNI:</div>
            <input name="dni" disable value={usuario1.dni} id="dni" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Nombre:</div>
            <input name="nombre" value={usuario1.nombre} id="nombre" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Apellidos:</div>
            <input name="apellidos" value={usuario1.apellidos || ""} id="apellidos" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Telefono:</div>
            <input name="telefono" value={usuario1.telefono || ""} id="telefono" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Dirección:</div>
            <input name="direccion" value={usuario1.direccion || ""} id="direccion" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Nombre usuario:</div>
            <input name="nombre_usuario" value={usuario1.nombreUsuario || ""} id="nombre_usuario" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Email:</div>
            <input name="email" value={usuario1.email || ""} id="email" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={handleChange} ></input>
          </div>
          <div className="flex-row justify-center w-full flex items-center pt-2 pl-4 pr-4 pb-2">
            <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={deleteUsuario}>
              <Icon icon="material-symbols:delete-outline" />
              Eliminar
            </button>
            <div className="w-[50%] "></div>
            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={updateUsuario} >
              <Icon icon="ri:save-line" />
              Guardar
            </button>
            <div className="w-[50%] "></div>
            <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => setEditar(!editar)}>
              <Icon icon="line-md:cancel-twotone" />
              Cancelar
            </button>
          </div>
        </div>) : (
        <div className="w-full">
          <div className="w-full justify-center items-center flex">
            <Image className="p-3 object-cover" src={foto} width={200} height={200} alt="Foto" />
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">DNI:</div>
            <input name="dni" disabled value={usuario1.dni} id="dni" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Nombre:</div>
            <input name="nombre" disabled value={usuario1.nombre} id="nombre" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Apellidos:</div>
            <input name="apellidos" disabled value={usuario1.apellidos || ""} id="apellidos" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Telefono:</div>
            <input name="telefono" disabled value={usuario1.telefono || ""} id="telefono" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Dirección:</div>
            <input name="direccion" disabled value={usuario1.direccion || ""} id="direccion" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Nombre usuario:</div>
            <input name="nombre_usuario" disabled value={usuario1.nombreUsuario || ""} id="nombre_usuario" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-col justify-center w-full flex items-center ">
            <div className="text-left w-full pl-5">Email:</div>
            <input name="email" disabled value={usuario1.email || ""} id="email" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
          </div>
          <div className="flex-row justify-center w-full flex items-center pt-2 pb-2">
            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={() => { setEditar(!editar) }} >
              <Icon icon="lucide:edit" />
              Editar
            </button>
          </div>
        </div>

      )}
    </>
  )
}