import exp from "constants";

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
    estado: string;
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
    estado: string;
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

interface TipoVehiculo {
    id: number;
    nombre: string;
    descripcion: string;
}

interface TipoLegislacion {
    id: number;
    legislacion: string;
}

interface TipoServicio {
    id: number;
    servicio: string;
}

interface Duenospk {
    vehiculo: string;
    usuario: string;
}

export interface Duenos {
    duenosPK: Duenospk;
    kmStart: number;
    kmFinish: number;
    dateStart: Date;
    dateFinish: Date;
    ciudadPromTansi: string;
    vehiculo: Vehiculo;
    usuario: Usuario;
}

export interface ServiciosUpdate {
    id: number;
    fecha: Date;
    fechaProximo: Date;
    tipoServicio: number;
    costoServicio: number;
    descripcion: string;
    kilometraje: number;
    vehiculo: string;
    mecanico: string;
    estado: string;
}

export interface Servicios {
    id: number;
    fecha: Date;
    fechaProximo: Date;
    tipoServicio: TipoServicio;
    costoServicio: number;
    descripcion: string;
    kilometraje: number;
    vehiculo: Vehiculo;
    mecanico: Usuario;
    estado: string;
}

export interface Legislacion {
    id: number;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    vehiculo: Vehiculo;
    kilometraje: number;
    tipoLegislacion: TipoLegislacion;
    fotos: Fotos[];
}

export interface LegislacionNew {
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    vehiculo: string;
    kilometraje: number;
    tipoLegislacion: number;
}

export interface Vehiculo {
    numSerie: string;
    placa: string;
    tipoVehiculo: TipoVehiculo;
    marca: string;
    modelo: string;
    referencia: string;
    serie: string;
    color: string;
    usuario: string;
    kilometraje: number;
    ciudadProcedencia: string;
    publico: boolean;
    descripcion: string;
    ciudadPromTransi: string;
    fechaCompra: string;
    fotos: Fotos[];
    legislacion: Legislacion[];
    servicios: Servicios[];
    duenos: Duenos[];
}

export interface VehiculoNewOUpdate {
    numSerie: string;
    placa: string;
    tipoVehiculo: number;
    marca: string;
    modelo: string;
    referencia: string;
    serie: string;
    color: string;
    usuario: string;
    kilometraje: number;
    ciudadProcedencia: string;
    publico: boolean;
    descripcion: string;
    fechaCompra: string;
    ciudadPromTransi: string;
}

export interface Notificacion {
    id: number;
    texto: string;
    estado: string;
    usuario: string;
    vehiculo: Vehiculo;
    servicio: Servicios;
    fecha: Date;
    taller: string;
}

export interface NotificacionUpdate {
    id: number;
    texto: string;
    estado: string;
    usuario: string;
    vehiculo: string;
    servicio: number;
    fecha: Date;
    taller: string;
}

export interface DuenosNuevo {
    kmStart: number;
    kmFinish: number;
    dateStart: Date;
    dateFinish: Date;
    ciudadPromTansi: string;
    vehiculo: string;
    usuario: string;
}