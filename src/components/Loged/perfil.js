
export default function VerPerfil(usuario) {
  console.log(usuario)

  return (
    <>
      <div>
        holaa desde ver perfil
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">DNI:</div>
          <input name="dni" disabled value={usuario.dni || ""}  id="dni" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">Nombre:</div>
          <input name="nombre" disabled value={usuario.nombre}  id="nombre" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">Apellidos:</div>
          <input name="apellidos" disabled value={usuario.apellidos || ""}  id="apellidos" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">Telefono:</div>
          <input name="telefono" disabled value={usuario.telefono || ""}  id="telefono" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">Dirección:</div>
          <input name="direccion" disabled value={usuario.direccion || ""}  id="direccion" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">Nombre usuario:</div>
          <input name="nombre_usuario" disabled value={usuario.nombre_usuario || ""}  id="nombre_usuario" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
        <div className="flex-col justify-center w-full flex items-center ">
          <div className="text-left w-full pl-5">Email:</div>
          <input name="email" disabled value={usuario.email || ""}  id="email" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
        </div>
      </div>
    </>
  )
}