
'use server';
import React from 'react';
import HeroMain from '../../components/HeroMain';
import Highlights from '../../components/Highlights';
import HospedajeCard from '../../components/HospedajeCard';
import ZoneCarousel from '../../components/ZoneCarousel';
import { listFeaturedHospedajes, listZones } from '../../src/lib/api';
import { SAMPLE_ZONES } from '../../src/lib/fake-data';

export default async function HomePage() {
  const hospedajes = await listFeaturedHospedajes();
  let zones = await listZones();
  if (!zones || zones.length === 0) zones = SAMPLE_ZONES as any;

  return (
    <main className="container mx-auto px-4 py-8">

  <HeroMain />

  {/* Highlights: carrusel horizontal suave con parallax */}
  <Highlights />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Zonas destacadas</h2>
        <ZoneCarousel items={zones} />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Hospedajes destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hospedajes.slice(0, 6).map((h) => (
            <HospedajeCard key={h.id} item={h} />
          ))}
        </div>
      </section>
    </main>
  );
}
