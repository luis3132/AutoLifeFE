import { Usuario } from "@/lib/types/types";
import { FC, useEffect, useState } from "react";
import SeeUsuario from "./seeTaller";

interface ListUsuarioProps {
    usuarios: Usuario[];  
    token: string | undefined;
    reload: () => void;
}

const ListUsuario: FC<ListUsuarioProps> = ({ usuarios, token, reload }) => {
    const [showEditIndex, setShowEditIndex] = useState<number | null>(null); 

    return (
        <>
            {usuarios.map((usuario, index) => {
                const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");

                useEffect(() => {
                    if (usuario && usuario.fotos.length > 0) {
                        setFoto(usuario.fotos[usuario.fotos.length - 1].path);
                    }
                }, [usuario]);

                return (
                    <div key={usuario.dni} className="max-sm:w-full max-lg:w-1/2 w-[30%] bg-gray-100 rounded-lg shadow-lg mx-2 p-5 h-min mb-5">
                        <div className="flex justify-center">
                            <p className="text-2xl font-bold">{usuario.nombre}</p>
                            <p className="text-2xl font-semibold ml-2">{usuario.telefono}</p>
                            <p className="text-2xl font-semibold ml-2">{usuario.direccion}</p>
                        </div>
                        <div className="w-full flex justify-center p-3">
                            <div className="w-1/2 rounded-2xl overflow-hidden shadow-xl">
                                <img src={foto} height={500} width={500} alt={`Foto de ${usuario.nombre}`} />
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-xl text-center font-semibold">{usuario.nombre}</p>
                            <p className="text-xl text-center font-semibold">Telefono: {usuario.telefono}</p>
                        </div>
                        <div className="w-full flex justify-center pt-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg"
                                onClick={() => setShowEditIndex(index)} 
                            >
                                Ver Detalles
                            </button>
                        </div>

                       
                        {showEditIndex === index && (
                            <SeeUsuario
                                usuario={usuario} 
                                token={token} 
                                closeComponent={() => setShowEditIndex(null)} 
                                reload={reload} 
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default ListUsuario;