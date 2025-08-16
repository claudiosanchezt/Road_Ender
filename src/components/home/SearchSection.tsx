// Sección de búsqueda avanzada para el home
// Incluye búsqueda por texto, ubicación y filtros rápidos

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { SearchFilters } from '@/types/home-types';

interface SearchSectionProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading: boolean;
  resultsCount?: number;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  isLoading,
  resultsCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const handleInputChange = useCallback((value: string) => {
    onFiltersChange({ ...filters, search: value });
    
    // Auto-search after 500ms of no typing
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch();
    }, 500);
  }, [filters, onFiltersChange, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleLocationSearch = async () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    setShowLocationSearch(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onFiltersChange({
          ...filters,
          location: {
            lat: latitude,
            lng: longitude,
            radius: filters.location?.radius || 50
          }
        });
        setShowLocationSearch(false);
        onSearch();
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        setShowLocationSearch(false);
        alert('No se pudo obtener tu ubicación. Intenta nuevamente.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      country: null,
      difficulty: null,
      minRating: null,
      location: null,
      sortBy: 'popularity'
    });
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const quickFilters = [
    { id: 'popular', label: '🔥 Populares', action: () => onFiltersChange({ ...filters, sortBy: 'popularity' }) },
    { id: 'rating', label: '⭐ Mejor valorados', action: () => onFiltersChange({ ...filters, minRating: 4.5 }) },
    { id: 'easy', label: '😊 Fácil acceso', action: () => onFiltersChange({ ...filters, difficulty: 'Fácil' }) },
    { id: 'adventure', label: '🏔️ Aventura', action: () => onFiltersChange({ ...filters, difficulty: 'Difícil' }) }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          ¿Qué aventura buscas hoy?
        </h2>
        <p className="text-gray-600">
          Descubre destinos únicos y experiencias inolvidables
        </p>
      </div>

      {/* Main search bar */}
      <div className="relative mb-6">
        <div className="flex gap-3">
          {/* Search input */}
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar destinos, ciudades, actividades..."
              value={filters.search || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-lg placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Location button */}
          <button
            onClick={handleLocationSearch}
            disabled={showLocationSearch}
            className={`h-14 px-6 rounded-xl font-semibold transition-all ${
              filters.location
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${showLocationSearch ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Buscar cerca de mi ubicación"
          >
            {showLocationSearch ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden md:inline">Ubicando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                📍
                <span className="hidden md:inline">
                  {filters.location ? 'Cerca de ti' : 'Mi ubicación'}
                </span>
              </div>
            )}
          </button>

          {/* Search button */}
          <button
            onClick={onSearch}
            disabled={isLoading}
            className="h-14 px-8 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden md:inline">Buscando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                🔍
                <span className="hidden md:inline">Buscar</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Quick filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={filter.action}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-all hover:scale-105"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced filters toggle */}
      <div className="text-center mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-2 mx-auto transition-colors"
        >
          {isExpanded ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Advanced filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Difficulty filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dificultad
              </label>
              <select
                value={filters.difficulty || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  difficulty: e.target.value || null 
                })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas</option>
                <option value="Fácil">😊 Fácil</option>
                <option value="Moderado">🚶 Moderado</option>
                <option value="Difícil">🏔️ Difícil</option>
                <option value="Extremo">⚡ Extremo</option>
              </select>
            </div>

            {/* Rating filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valoración mínima
              </label>
              <select
                value={filters.minRating || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  minRating: e.target.value ? parseFloat(e.target.value) : null 
                })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Cualquiera</option>
                <option value="4.5">⭐⭐⭐⭐⭐ 4.5+</option>
                <option value="4.0">⭐⭐⭐⭐ 4.0+</option>
                <option value="3.5">⭐⭐⭐ 3.5+</option>
                <option value="3.0">⭐⭐ 3.0+</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sortBy || 'popularity'}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  sortBy: e.target.value as SearchFilters['sortBy']
                })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">🔥 Popularidad</option>
                <option value="rating">⭐ Valoración</option>
                <option value="name">📝 Nombre</option>
                <option value="difficulty">🎯 Dificultad</option>
                <option value="distance">📍 Distancia</option>
              </select>
            </div>
          </div>

          {/* Location radius */}
          {filters.location && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Radio de búsqueda: {filters.location.radius} km
              </label>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={filters.location.radius}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  location: {
                    ...filters.location!,
                    radius: parseInt(e.target.value)
                  }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 km</span>
                <span>200 km</span>
              </div>
            </div>
          )}

          {/* Clear filters */}
          <div className="text-center">
            <button
              onClick={clearFilters}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              🗑️ Limpiar todos los filtros
            </button>
          </div>
        </div>
      )}

      {/* Results summary */}
      {resultsCount !== undefined && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
          <div className="text-sm text-blue-800">
            {resultsCount === 0 ? (
              <span>No se encontraron resultados. Intenta con otros filtros.</span>
            ) : (
              <span>
                📊 Encontrados <strong>{resultsCount}</strong> destino{resultsCount !== 1 ? 's' : ''}
                {filters.search && ` para "${filters.search}"`}
                {filters.location && ' cerca de tu ubicación'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
