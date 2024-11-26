export interface Roles {
    id: number;
    rol: string;
}

export interface Fotos {
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

export interface Usuario {
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

export interface UsuarioNewOUpdate {
    dni: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    roles: number;
    contrasena: string;
    email: string;
    nombreUsuario: string;
}

export interface Token {
    token: string;
}

export interface Registro {
    nombreUsuario: string;
    contrasena: string;
}

export interface Confirmar {
    confirmar: string;
}

export interface Notificacion {
    id: number;
    texto: string;
    estado: string;
    usuario: string;
    vehiculo: string;
}