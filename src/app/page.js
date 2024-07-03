"use client";

export default function Home() {
  return (
    <>
      <div className="pl-[3%] pr-[3%] h-100 col-span-12">
        <div className="pb-3"></div>
        <div className="col-span-8 rounded-full bg-gray-200 p-4">
          <h1 className="text-3xl font-bold text-center">AutoLife</h1>
          <p className="text-center mt-4">
          AutoLife es una plataforma innovadora diseñada para que los usuarios de vehículos puedan gestionar y controlar toda la información relacionada con sus automóviles. 
          Nuestro sistema permite almacenar datos esenciales como las placas, las ubicaciones habituales y otros detalles importantes, facilitando un seguimiento integral y eficiente.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">¿Qué es AutoLife?</h2>
          <p className="mt-2">
            AutoLife es una plataforma diseñada para ayudar a los usuarios a gestionar y mantener un registro de sus vehículos de manera eficiente.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">¿Qué ofrecemos?</h2>
          <p className="mt-2">
            Ofrecemos servicios como el almacenamiento de información importante de los vehículos, incluyendo placas, ubicación, historial de mantenimiento, y más.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Características Innovadoras</h2>
          Este sistema ofrece una plataforma intuitiva y fácil de usar donde los propietarios pueden almacenar información relevante, como las modificaciones, inspección técnico mecánica, los dueños que ha tenido el vehículo, el SOAT, y otros servicios relacionados con el mantenimiento del automóvil.
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Testimonios</h2>
          <div className="mt-2 space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <p>"AutoLife ha revolucionado la forma en que manejo el mantenimiento de mi coche. ¡Altamente recomendado!" - Juan Pérez</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p>"Las alertas automáticas me han ahorrado mucho dinero en reparaciones inesperadas." - María López</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Videos</h2>
          <div className="mt-2">
            <video width="320" height="240" controls>
              <source src="/path-to-your-video.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Imágenes</h2>
          <div className="mt-2">
            <img src="/path-to-your-image.jpg" alt="Descripción de la imagen" className="w-full h-auto" />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Contacto</h2>
          <p className="mt-2">
            ¿Tienes preguntas o necesitas ayuda? Contáctanos en <a href="mailto:contacto@autolife.com" className="text-blue-500">contacto@autolife.com</a>
          </p>
        </div>
      </div>
    </>
  );
}

