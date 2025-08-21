import React from 'react';

export default function HomeHero() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Explora experiencias únicas en Chile</h1>
          <p className="mt-4 text-lg opacity-90">Encuentra guías locales, hospedajes y actividades diseñadas para viajeros curiosos.</p>
          <div className="mt-6 flex gap-3">
            <a href="/zones" className="bg-white text-sky-700 px-4 py-2 rounded-md font-semibold">Buscar zonas</a>
            <a href="/guides" className="border border-white px-4 py-2 rounded-md">Encontrar guías</a>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {/* placeholder image */}
          <div className="h-48 md:h-64 bg-white/10 rounded-md flex items-center justify-center"> 
            <img src="/images/hero/hero-1.jpg" alt="hero" className="object-cover h-full w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
