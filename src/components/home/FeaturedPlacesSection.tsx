// Sección de lugares destacados con carrusel interactivo
// Muestra sitios populares con imágenes, valoraciones y detalles

'use client';

import React, { useState } from 'react';
import { FeaturedPlace } from '@/types/home-types';
import { ImageService } from '@/services/image-service';

interface FeaturedPlacesSectionProps {
  places: FeaturedPlace[];
  isLoading: boolean;
  title?: string;
  subtitle?: string;
}

const FeaturedPlacesSection: React.FC<FeaturedPlacesSectionProps> = ({
  places,
  isLoading,
  title = "Destinos Destacados",
  subtitle = "Los lugares más populares y mejor valorados"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<FeaturedPlace | null>(null);

  // Configuración del carrusel
  const itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const totalSlides = Math.ceil(places.length / itemsPerSlide.desktop);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getDifficultyColor = (difficulty: number): string => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800';
    if (difficulty <= 4) return 'bg-yellow-100 text-yellow-800';
    if (difficulty <= 6) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyText = (difficulty: number): string => {
    if (difficulty <= 2) return '😊 Fácil';
    if (difficulty <= 4) return '🚶 Moderado';
    if (difficulty <= 6) return '🏔️ Difícil';
    return '⚡ Extremo';
  };

  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">☆</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">☆</span>);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl mb-12">
        <div className="text-6xl mb-4">🏞️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No hay destinos destacados disponibles
        </h3>
        <p className="text-gray-500">
          Intenta ajustar tus filtros o vuelve más tarde
        </p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-lg">{subtitle}</p>
        <div className="text-sm text-gray-500 mt-2">
          📊 {places.length} destino{places.length !== 1 ? 's' : ''} disponible{places.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative">
        {/* Controles del carrusel */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
              aria-label="Destinos anteriores"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
              aria-label="Destinos siguientes"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Grid de lugares */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div 
                key={slideIndex} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full flex-shrink-0"
              >
                {places
                  .slice(
                    slideIndex * itemsPerSlide.desktop, 
                    (slideIndex + 1) * itemsPerSlide.desktop
                  )
                  .map((place) => (
                    <div
                      key={place.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                      onClick={() => setSelectedPlace(place)}
                    >
                      {/* Imagen */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={ImageService.generateImageUrl('place', place.id, place.images?.main || 'default', 'medium', 'jpg')}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = ImageService.getDefaultImage('place');
                          }}
                        />
                        
                        {/* Overlay con información rápida */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center">
                              <div className="text-sm font-semibold mb-1">Ver detalles</div>
                              <div className="text-xs">👁️ Explorar destino</div>
                            </div>
                          </div>
                        </div>

                        {/* Badge de destacado */}
                        {place.isFeatured && (
                          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                            ⭐ Destacado
                          </div>
                        )}

                        {/* Badge de país */}
                        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <span>{place.country.flag}</span>
                          <span>{place.country.code}</span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-5">
                        {/* Título y ubicación */}
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                            {place.name}
                          </h3>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <span>📍</span>
                            <span>{place.zone.name}, {place.country.name}</span>
                          </div>
                        </div>

                        {/* Descripción */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {place.description}
                        </p>

                        {/* Métricas */}
                        <div className="flex items-center justify-between mb-4">
                          {/* Rating */}
                          {place.analytics?.rating && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {renderStars(place.analytics.rating)}
                              </div>
                              <span className="text-sm font-semibold text-gray-700">
                                {formatRating(place.analytics.rating)}
                              </span>
                            </div>
                          )}

                          {/* Dificultad */}
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(place.zone.complexity)}`}>
                            {getDifficultyText(place.zone.complexity)}
                          </div>
                        </div>

                        {/* Estadísticas adicionales */}
                        {place.analytics && (
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <span>👥</span>
                              <span>{place.analytics.visits.toLocaleString()} visitas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>📅</span>
                              <span>{place.analytics.bookings} reservas</span>
                            </div>
                          </div>
                        )}

                        {/* Categoría */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span>🏷️</span>
                            <span>{place.zone.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores del carrusel */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-blue-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a la página ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="relative h-64">
              <img
                src={ImageService.generateImageUrl('place', selectedPlace.id, selectedPlace.images?.main || 'default', 'full', 'jpg')}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = ImageService.getDefaultImage('place');
                }}
              />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedPlace.name}
                  </h2>
                  <div className="text-gray-600 flex items-center gap-2">
                    <span>{selectedPlace.country.flag}</span>
                    <span>{selectedPlace.zone.name}, {selectedPlace.country.name}</span>
                  </div>
                </div>

                {selectedPlace.analytics?.rating && (
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedPlace.analytics.rating)}
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {formatRating(selectedPlace.analytics.rating)}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">
                {selectedPlace.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Categoría</div>
                  <div className="font-semibold">{selectedPlace.zone.category}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Dificultad</div>
                  <div className="font-semibold">{getDifficultyText(selectedPlace.zone.complexity)}</div>
                </div>
              </div>

              {selectedPlace.analytics && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedPlace.analytics.visits.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600">Visitas</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedPlace.analytics.bookings}
                    </div>
                    <div className="text-sm text-green-600">Reservas</div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  🎯 Ver detalles completos
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  ❤️ Agregar a favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedPlacesSection;
