"use client";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="px-4 py-6 lg:px-12">
        <div className="rounded-lg bg-gray-200 p-6 text-center shadow-md mb-12">
          <h1 className="text-3xl font-bold mb-4">AutoLife</h1>
          <p className="text-lg">
            AutoLife es una plataforma innovadora diseñada para que los usuarios de vehículos puedan gestionar y controlar toda la información relacionada con sus automóviles.
            Nuestro sistema permite almacenar datos esenciales como las placas, las ubicaciones habituales y otros detalles importantes, facilitando un seguimiento integral y eficiente.
          </p>
        </div>

        <div className="flex justify-between space-x-4 mb-12">
          <div className="bg-green-200 rounded p-4 flex-1 text-center shadow-md">
            <h2 className="text-2xl font-semibold">¿Qué es AutoLife?</h2>
            <p className="mt-2 text-lg">
              AutoLife es una plataforma diseñada para ayudar a los usuarios a gestionar y mantener un registro de sus vehículos de manera eficiente.
            </p>
          </div>
          <div className="bg-blue-200 rounded p-4 flex-1 text-center shadow-md">
            <h2 className="text-2xl font-semibold">¿Qué ofrecemos?</h2>
            <p className="mt-2 text-lg">
              Ofrecemos servicios como el almacenamiento de información importante de los vehículos, incluyendo placas, ubicación, historial de mantenimiento, y más.
            </p>
          </div>
          <div className="bg-purple-200 rounded p-4 flex-1 text-center shadow-md">
            <h2 className="text-2xl font-semibold">Características Innovadoras</h2>
            <p className="mt-2 text-lg">
              Este sistema ofrece una plataforma intuitiva y fácil de usar donde los propietarios pueden almacenar información relevante, como las modificaciones, inspección técnico mecánica, los dueños que ha tenido el vehículo, el SOAT, y otros servicios relacionados con el mantenimiento del automóvil.
            </p>
          </div>
        </div>

        <div className="space-y-12 text-center">
          <section>
            <h2 className="text-3xl font-bold mb-4">Testimonios</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded shadow-md">
                <p>AutoLife ha revolucionado la forma en que manejo el mantenimiento de mi coche. ¡Altamente recomendado! - Juan Pérez</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow-md">
                <p>Las alertas automáticas me han ahorrado mucho dinero en reparaciones inesperadas. - María López</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Videos</h2>
            <div className="flex justify-center">
              <video width="320" height="240" controls className="rounded shadow-md">
                <source src="/path-to-your-video.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Imágenes</h2>
            <div className="flex justify-center">
              <Image src="/path-to-your-image.jpg" alt="Descripción de la imagen" className="w-full h-auto max-w-md rounded shadow-md" width={100} height={100} />
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contacto</h2>
            <p className="text-lg">
              ¿Tienes preguntas o necesitas ayuda? Contáctanos en <a href="mailto:contacto@autolife.com" className="text-blue-500 underline">contacto@autolife.com</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

