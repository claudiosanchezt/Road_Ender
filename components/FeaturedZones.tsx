import React from 'react';

const mockZones = [
  { id: 1, name: 'Atacama', description: 'Desiertos y cielos estrellados', img: '/images/zones/atacama.jpg' },
  { id: 2, name: 'Patagonia', description: 'Glaciares y senderos', img: '/images/zones/patagonia.jpg' },
  { id: 3, name: 'Lagos & Volcanes', description: 'Aventura y naturaleza', img: '/images/zones/lakes.jpg' }
];

export default function FeaturedZones() {
  return (
    <div>
      <h3 className="text-2xl font-bold">Zonas destacadas</h3>
      <p className="text-muted mt-2">Explora las regiones más populares y actividades sugeridas</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mockZones.map(z => (
          <a key={z.id} href={`/zones/${z.id}`} className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-40 bg-gray-200">
              <img src={z.img} alt={z.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-semibold">{z.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{z.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
