import type { Metadata } from "next";
import "./globals.css";
import MainNavbar from "@/components/navbar/mainNavbar";

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
  constraseña: string;
  email: string;
  nombreUsuario: string;
  fotos: Fotos[];
}

export const metadata: Metadata = {
  title: "AutoLife",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo/logoSLSF.png" />
      </head>
      <body className={` antialiased`}>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
