import { Usuario } from "@/lib/types/types";
import { FC, useEffect, useState } from "react";
import SeeUsuario from "./seeTaller";

interface ListUsuarioProps {
    taller: Usuario;
    token: string | undefined;
    usuario: Usuario | null;
}

const ListUsuario: FC<ListUsuarioProps> = ({ taller, token, usuario }) => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png");

    useEffect(() => {
        if (taller) {
            if (taller.fotos.length > 0) {
                setFoto(taller.fotos[taller.fotos.length - 1].path);
            }
        }
    }, []);

    return (
        <>
            <div className="max-sm:w-full max-lg:w-1/2 w-[30%] bg-gray-100 rounded-lg shadow-lg mx-2 p-5 h-min mb-5">
                <div className="w-full">
                    <p className="text-xl text-center font-semibold">{taller.nombre}</p>
                </div>
                <div className="w-full flex justify-center p-3">
                    <div className="w-1/2 rounded-2xl overflow-hidden shadow-xl">
                        <img src={foto} height={500} width={500} alt={`Foto de ${taller.nombre}`} />
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-xl text-center font-semibold">{taller.direccion}</p>
                    <p className="text-xl text-center font-semibold">Telefono: {taller.telefono}</p>
                </div>
                <div className="w-full flex justify-center pt-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-md:w-full py-2 px-4 rounded-lg"
                        onClick={() => setShowEdit(true)}
                    >
                        Ver Detalles
                    </button>
                </div>
                {showEdit && (
                    <SeeUsuario key={1} usuario={usuario} taller={taller} token={token} closeComponent={() => setShowEdit(false)} />
                )}
            </div>
        </>
    );
};

export default ListUsuario;