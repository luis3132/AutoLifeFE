import { DuenosNuevo, Usuario, UsuarioNewOUpdate } from "@/lib/types/types"; 
import { Dialog, Transition, TransitionChild } from "@headlessui/react"; 
import { Icon } from "@iconify/react/dist/iconify.js"; 
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react"; 
import Swal from "sweetalert2"; 

interface SeeUsuario { 
    closeComponent: () => void; 
    usuario: Usuario; 
    token: string | undefined; 
    reload: () => void; 
} 

const SeeUsuario: FC<SeeUsuario> = ({ closeComponent, usuario, token, reload }) => { 
    const [usuarioEdit, setUsuarioEdit] = useState<UsuarioNewOUpdate>({ 
        dni: usuario.dni, 
        nombre: usuario.nombre, 
        apellidos: usuario.apellidos, 
        telefono: usuario.telefono, 
        direccion: usuario.direccion, 
        roles: usuario.roles.id, 
        contrasena: usuario.contrasena, 
        email: usuario.email, 
        nombreUsuario: usuario.nombreUsuario, 
        estado: usuario.estado,
    }); 

    const [foto, setFoto] = useState<string>("/images/logo/logoSL.png"); 
    const [showEdit, setShowEdit] = useState<boolean>(false); 

    useEffect(() => { 
        if (usuario) { 
            if (usuario.fotos.length > 0) { 
                setFoto(usuario.fotos[usuario.fotos.length - 1].path); 
            } 
        } 
    }, [usuario]); 

    const [isOpen, setIsOpen] = useState(true); 

    const closeModal = () => { 
        reload(); 
        setIsOpen(false); 
        closeComponent(); 
    }; 

  
    
return (  
    <>  
        <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-1">  
            <Transition appear show={isOpen} as={Fragment}>  
                <Dialog as="div" className="relative z-10" onClose={closeModal}>  
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">  
                        <div className="fixed inset-0 bg-black/25" />  
                    </TransitionChild>  
                    <div className="fixed inset-0 overflow-y-auto">  
                        <div className="flex min-h-full items-center justify-center p-4 text-center">  
                            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">  
                                <div className={`absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[60%] max-md:w-[80%] bg-white rounded-lg pb-1`}>  
                                    <button title="close" className="float-right pr-1 pt-3" onClick={closeComponent}>
                                        <Icon icon="material-symbols:close" width={30} height={30} />
                                        
                                    </button>  
                                   
                                
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
export default SeeUsuario;