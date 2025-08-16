// Sección de filtros avanzados para explorar destinos
// Filtros por categoría, dificultad, valoración y más

'use client';

import React, { useState } from 'react';
import { SearchFilters, CategoryInfo } from '@/types/home-types';

interface FilterSectionProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  categories: CategoryInfo[];
  isLoading: boolean;
  onApplyFilters: () => void;
  activeFiltersCount: number;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
  categories,
  isLoading,
  onApplyFilters,
  activeFiltersCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const difficulties = [
    { value: 'Fácil', label: '😊 Fácil', color: 'bg-green-100 text-green-800', description: 'Accesible para todos' },
    { value: 'Moderado', label: '🚶 Moderado', color: 'bg-yellow-100 text-yellow-800', description: 'Requiere condición básica' },
    { value: 'Difícil', label: '🏔️ Difícil', color: 'bg-orange-100 text-orange-800', description: 'Para aventureros' },
    { value: 'Extremo', label: '⚡ Extremo', color: 'bg-red-100 text-red-800', description: 'Solo expertos' }
  ];

  const ratings = [
    { value: 4.5, label: '⭐⭐⭐⭐⭐', description: '4.5+ Excelente' },
    { value: 4.0, label: '⭐⭐⭐⭐', description: '4.0+ Muy bueno' },
    { value: 3.5, label: '⭐⭐⭐', description: '3.5+ Bueno' },
    { value: 3.0, label: '⭐⭐', description: '3.0+ Regular' }
  ];

  const sortOptions = [
    { value: 'popularity', label: '🔥 Popularidad', description: 'Más visitados primero' },
    { value: 'rating', label: '⭐ Valoración', description: 'Mejor calificados' },
    { value: 'name', label: '📝 Nombre', description: 'Orden alfabético' },
    { value: 'difficulty', label: '🎯 Dificultad', description: 'De fácil a difícil' },
    { value: 'distance', label: '📍 Distancia', description: 'Más cercanos primero' }
  ];

  const handleCategoryToggle = (categoryName: string) => {
    const isSelected = filters.category === categoryName;
    onFiltersChange({
      ...filters,
      category: isSelected ? undefined : categoryName
    });
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const isSelected = filters.difficulty === difficulty;
    onFiltersChange({
      ...filters,
      difficulty: isSelected ? null : difficulty
    });
  };

  const handleRatingToggle = (rating: number) => {
    const isSelected = filters.minRating === rating;
    onFiltersChange({
      ...filters,
      minRating: isSelected ? null : rating
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: filters.search,
      country: filters.country,
      sortBy: 'popularity',
      limit: filters.limit
    });
  };

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8">
      {/* Header del filtro */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Filtros y Exploración
            </h3>
            <p className="text-gray-600 text-sm">
              Personaliza tu búsqueda de destinos únicos
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Contador de filtros activos */}
            {hasActiveFilters && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
              </div>
            )}

            {/* Botón de expandir/contraer */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
            >
              <span>{isExpanded ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
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
        </div>
      </div>

      {/* Filtros rápidos - siempre visibles */}
      <div className="p-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Filtro de dificultad rápido */}
          {difficulties.slice(0, 2).map((diff) => (
            <button
              key={diff.value}
              onClick={() => handleDifficultyToggle(diff.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                filters.difficulty === diff.value
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {diff.label}
            </button>
          ))}

          {/* Filtro de rating rápido */}
          <button
            onClick={() => handleRatingToggle(4.0)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
              filters.minRating === 4.0
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            ⭐ 4.0+ Mejor valorados
          </button>

          {/* Filtro de categorías populares */}
          {categories.slice(0, 2).map((category) => (
            <button
              key={category.category}
              onClick={() => handleCategoryToggle(category.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                filters.category === category.category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros avanzados - expandibles */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="space-y-6 mt-6">
            {/* Categorías completas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">
                  🏷️ Categorías de Destinos
                </h4>
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  {showCategories ? 'Ocultar' : `Ver todas (${categories.length})`}
                </button>
              </div>

              <div className={`overflow-hidden transition-all duration-300 ${showCategories ? 'max-h-96' : 'max-h-20'}`}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => handleCategoryToggle(category.category)}
                      className={`p-3 rounded-lg text-left transition-all hover:scale-105 ${
                        filters.category === category.category
                          ? 'bg-blue-50 border-2 border-blue-500 text-blue-800'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.count} destinos
                      </div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {category.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Nivel de dificultad */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                🎯 Nivel de Dificultad
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    onClick={() => handleDifficultyToggle(diff.value)}
                    className={`p-4 rounded-lg text-left transition-all hover:scale-105 ${
                      filters.difficulty === diff.value
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${diff.color}`}>
                      {diff.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {diff.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Valoración mínima */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                ⭐ Valoración Mínima
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ratings.map((rating) => (
                  <button
                    key={rating.value}
                    onClick={() => handleRatingToggle(rating.value)}
                    className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${
                      filters.minRating === rating.value
                        ? 'bg-yellow-50 border-2 border-yellow-400'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{rating.label}</div>
                    <div className="text-xs text-gray-600">
                      {rating.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenamiento */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                📊 Ordenar Resultados
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onFiltersChange({ ...filters, sortBy: option.value as SearchFilters['sortBy'] })}
                    className={`p-3 rounded-lg text-left transition-all hover:scale-105 ${
                      filters.sortBy === option.value
                        ? 'bg-green-50 border-2 border-green-500 text-green-800'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controles de acción */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
              >
                🗑️ Limpiar filtros
              </button>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  {hasActiveFilters ? 
                    `${activeFiltersCount} filtro${activeFiltersCount !== 1 ? 's' : ''} aplicado${activeFiltersCount !== 1 ? 's' : ''}` : 
                    'Sin filtros aplicados'
                  }
                </div>
                
                <button
                  onClick={onApplyFilters}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Aplicando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>🔍</span>
                      <span>Aplicar filtros</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resumen de filtros activos */}
      {hasActiveFilters && (
        <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-blue-800">Filtros activos:</span>
            
            {filters.category && (
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                📂 {categories.find(c => c.category === filters.category)?.name || filters.category}
              </span>
            )}
            
            {filters.difficulty && (
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                🎯 {filters.difficulty}
              </span>
            )}
            
            {filters.minRating && (
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                ⭐ {filters.minRating}+
              </span>
            )}
            
            {filters.country && (
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                🌍 {filters.country}
              </span>
            )}
            
            {filters.location && (
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                📍 Radio {filters.location.radius}km
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
