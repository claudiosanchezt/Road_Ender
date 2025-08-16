// Componente de resumen de estadísticas para el hero section
// Muestra métricas principales del home dinámico

'use client';

import React from 'react';
import { CountryStats } from '@/types/home-types';

interface StatsOverviewProps {
  stats: {
    countries: number;
    places: number;
    zones: number;
  };
  countries: CountryStats[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, countries }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {/* Estadística principal: Sitios totales */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          {stats.places}
        </div>
        <div className="text-sm md:text-base opacity-90">
          Sitios Turísticos
        </div>
        <div className="text-xs opacity-70 mt-1">
          🎯 Destinos únicos
        </div>
      </div>

      {/* Países disponibles */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          {stats.countries}
        </div>
        <div className="text-sm md:text-base opacity-90">
          Países
        </div>
        <div className="text-xs opacity-70 mt-1 flex justify-center space-x-1">
          {countries.slice(0, 4).map(country => (
            <span key={country._id}>{country.flag}</span>
          ))}
        </div>
      </div>

      {/* Zonas explorables */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          {stats.zones}
        </div>
        <div className="text-sm md:text-base opacity-90">
          Zonas
        </div>
        <div className="text-xs opacity-70 mt-1">
          🏔️ Regiones activas
        </div>
      </div>

      {/* Capacidad total */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          {countries.reduce((sum, country) => sum + country.totalCapacity, 0).toLocaleString()}
        </div>
        <div className="text-sm md:text-base opacity-90">
          Capacidad
        </div>
        <div className="text-xs opacity-70 mt-1">
          👥 Visitantes/día
        </div>
      </div>

      {/* Estadísticas por país - fila completa */}
      <div className="col-span-2 md:col-span-4 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {countries.map(country => (
            <div
              key={country._id}
              className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-25 transition-all"
            >
              <div className="text-2xl mb-1">{country.flag}</div>
              <div className="font-semibold text-lg">{country.totalPlaces}</div>
              <div className="text-xs opacity-80">{country.countryName}</div>
              <div className="text-xs opacity-70 mt-1">
                Dificultad: {country.avgDifficultyFormatted}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="col-span-2 md:col-span-4 mt-6 text-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <span className="text-green-300">🌟</span>
              <span>Experiencias auténticas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-300">🏔️</span>
              <span>Guías locales expertos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">🎯</span>
              <span>Aventuras personalizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-300">🌊</span>
              <span>Destinos únicos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
