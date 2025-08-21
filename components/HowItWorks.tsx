import React from 'react';

export default function HowItWorks(){
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold">Cómo funciona</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4">
          <h4 className="font-semibold">1. Encuentra</h4>
          <p className="text-sm text-gray-600 mt-1">Busca zonas, guías y alojamientos según tus intereses.</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold">2. Reserva</h4>
          <p className="text-sm text-gray-600 mt-1">Reserva actividades y servicios de forma segura.</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold">3. Disfruta</h4>
          <p className="text-sm text-gray-600 mt-1">Vive experiencias locales guiadas por expertos.</p>
        </div>
      </div>
    </div>
  );
}
