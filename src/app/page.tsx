import Image from "next/image";
import React from "react";

export default function Home() {
  return (
   <div className="h-[89dvh] overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12 px-4 py-8 lg:px-24">
   
        <header className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-[1.01]">
          <h1 className="text-5xl font-bold mb-4 text-[#3B6BC0] tracking-tight">AutoLife</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una plataforma innovadora para gestionar y controlar toda la información de tu vehículo, simplificando el seguimiento y mantenimiento de tu automóvil.
          </p>
        </header>

      
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "¿Qué es AutoLife?",
              description: "Una plataforma intuitiva para gestionar y mantener un registro completo de tus vehículos.",
              bgColor: "bg-gradient-to-br from-green-100 to-green-200",
              textColor: "text-green-700"
            },
            {
              title: "¿Qué ofrecemos?",
              description: "Almacenamiento de información crucial: placas, ubicación, historial de mantenimiento y más.",
              bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
              textColor: "text-blue-700"
            },
            {
              title: "Características Innovadoras",
              description: "Plataforma fácil de usar para registrar modificaciones, inspecciones, historial de propietarios y servicios.",
              bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
              textColor: "text-purple-700"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 text-center`}
            >
              <h2 className={`text-2xl font-semibold mb-3 ${feature.textColor}`}>{feature.title}</h2>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#3B6BC0]">Testimonios</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "AutoLife ha revolucionado la forma en que manejo el mantenimiento de mi coche. ¡Altamente recomendado!", author: "Juan Pérez" },
              { text: "Las alertas automáticas me han ahorrado mucho dinero en reparaciones inesperadas.", author: "María López" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-6 italic relative">
                <p className="mb-4 text-gray-700">"{testimonial.text}"</p>
                <div className="text-right font-semibold text-[#3B6BC0]">- {testimonial.author}</div>
              </div>
            ))}
          </div>
        </section>


      <section className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#3B6BC0]">Videos</h2>
          <div className="flex justify-center">
            <video width="520" height="340" controls className="rounded-xl shadow-lg">
              <source src="/path-to-your-video.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#3B6BC0]">Contacto</h2>
          <p className="text-gray-700 mb-4">
            ¿Tienes preguntas o necesitas ayuda?
          </p>
          <a 
            href="mailto:contacto@autolife.com" 
            className="bg-[#3B6BC0] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Contáctanos
          </a>
        </section>
      </div>
    </div>
  );
}

