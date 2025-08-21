"use client";
import React, { useState, useMemo } from 'react';
import ZoneList from './ZoneList';
import { setAuthToken } from '../src/lib/apiClient';

export default function ZonesPageClient() {
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  // store token in localStorage for dev convenience
  const applyToken = () => {
    try {
      if (typeof window !== 'undefined') {
        if (token) {
          localStorage.setItem('dev_token', token);
          setAuthToken(token);
        } else {
          localStorage.removeItem('dev_token');
          setAuthToken(undefined);
        }
      }
    } catch (e) {
      // ignore
    }
  };

  const hints = useMemo(() => ({ search, region }), [search, region]);

  return (
    <div>
      <section className="hero-landing bg-hero-pattern text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Explora Zonas y Experiencias</h1>
          <p className="text-lg text-white/85 mb-6">Encuentra guías locales, lugares y actividades en Chile y Latinoamérica.</p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar zonas, actividades, guías..." className="form-control" />
            <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Región" className="form-control w-48" />
            <button onClick={() => {}} className="btn btn-custom-primary">Buscar</button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto p-4">
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1">
            <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Pegar dev token (opcional)" className="form-control" />
          </div>
          <div>
            <button onClick={applyToken} className="btn btn-custom-primary">Aplicar token</button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-3">Zonas destacadas</h2>
        <ZoneList search={hints.search} region={hints.region} variant="featured" />

        <h2 className="text-2xl font-semibold mt-8 mb-3">Todas las zonas</h2>
        <ZoneList search={hints.search} region={hints.region} />
      </section>
    </div>
  );
}
