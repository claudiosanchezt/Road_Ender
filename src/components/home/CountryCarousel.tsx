// Carrusel interactivo de países para navegación
// Muestra países con estadísticas y selección activa

'use client';

import React, { useState, useEffect } from 'react';
import { CountryStats } from '@/types/home-types';
import { ImageService } from '@/services/image-service';

interface CountryCarouselProps {
  countries: CountryStats[];
  selectedCountry: string | null;
  onCountrySelect: (countryId: string | null) => void;
}

const CountryCarousel: React.FC<CountryCarouselProps> = ({
  countries,
  selectedCountry,
  onCountrySelect
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % countries.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [countries.length, isAutoPlaying]);

  const handleCountryClick = (country: CountryStats) => {
    setIsAutoPlaying(false);
    onCountrySelect(selectedCountry === country._id ? null : country._id);
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + countries.length) % countries.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % countries.length);
  };

  if (countries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">No hay países disponibles</div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Header del carrusel */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Explora por País
          </h2>
          <p className="text-gray-600 mt-1">
            Descubre destinos únicos en cada región
          </p>
        </div>

        {/* Controles del carrusel */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="País anterior"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="País siguiente"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${
              isAutoPlaying ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            aria-label={isAutoPlaying ? 'Pausar auto-play' : 'Activar auto-play'}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Carrusel principal */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {countries.map((country, index) => (
            <div key={country._id} className="w-full flex-shrink-0">
              <div
                className={`relative h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl cursor-pointer transform transition-all duration-300 ${
                  selectedCountry === country._id 
                    ? 'ring-4 ring-yellow-400 shadow-2xl' 
                    : 'hover:shadow-xl hover:scale-[1.02]'
                }`}
                onClick={() => handleCountryClick(country)}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[url('/api/placeholder/800/400')] bg-cover bg-center rounded-xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-6xl mb-3">{country.flag}</div>
                      <h3 className="text-3xl font-bold mb-2">{country.countryName}</h3>
                      <p className="text-xl opacity-90">
                        {country.totalPlaces} destinos únicos
                      </p>
                    </div>

                    {selectedCountry === country._id && (
                      <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                        ✓ Seleccionado
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{country.totalPlaces}</div>
                      <div className="text-sm opacity-80">Sitios</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{country.totalCapacity.toLocaleString()}</div>
                      <div className="text-sm opacity-80">Capacidad</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{country.avgDifficultyFormatted}</div>
                      <div className="text-sm opacity-80">Dificultad</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-6 space-x-2">
        {countries.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-blue-500 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir al país ${index + 1}`}
          />
        ))}
      </div>

      {/* Mostrar todos los países */}
      <div className="mt-8">
        <button
          onClick={() => onCountrySelect(null)}
          className={`w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-200 ${
            selectedCountry === null
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {selectedCountry === null ? '🌍 Mostrando todos los países' : '🌍 Ver todos los países'}
        </button>
      </div>

      {/* Resumen de selección actual */}
      {selectedCountry && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const selected = countries.find(c => c._id === selectedCountry);
                return selected ? (
                  <>
                    <span className="text-2xl">{selected.flag}</span>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Filtrando por {selected.countryName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selected.totalPlaces} sitios disponibles
                      </div>
                    </div>
                  </>
                ) : null;
              })()}
            </div>
            <button
              onClick={() => onCountrySelect(null)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Limpiar filtro"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCarousel;
