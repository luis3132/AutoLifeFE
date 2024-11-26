import Cookies from 'js-cookie';
import CryptoJS from "crypto-js";

interface Roles {
    id: number;
    rol: string;
}

interface Fotos {
    id: number;
    path: string;
    vehiculo: string;
    servicio: number;
    accidentes: number;
    usuarios: string;
    legislacion: number;
    piezas: string;
    partes: string;
}

interface Usuario {
    dni: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    roles: Roles;
    contrasena: string;
    email: string;
    nombreUsuario: string;
    fotos: Fotos[];
}

const Comprobar = () => {

    var usuario: Usuario | null = null;
    var token: string | undefined = Cookies.get("authToken")

    const cryp: string | null = sessionStorage.getItem("usuario");

    if (cryp) {
        const usuariosStringBytes = CryptoJS.AES.decrypt(cryp, process.env.NEXT_PUBLIC_SECRETKEY as string);

        const usuarioString: string = usuariosStringBytes.toString(CryptoJS.enc.Utf8);

        usuario = JSON.parse(usuarioString);
    }


    return ({ token, usuario });
}

export default Comprobar;