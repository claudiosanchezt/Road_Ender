// Componente principal del home dinámico
// Consume las APIs del datamart y presenta experiencias personalizadas

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  HomeStats,
  CountryStats,
  FeaturedPlace,
  CategoryInfo,
  SearchFilters,
  SearchResult,
  NearbyResult
} from '@/types/home-types';

// Importar componentes hijos
import LoadingSpinner from './LoadingSpinner';
import StatsOverview from './StatsOverview';
import CountryCarousel from './CountryCarousel';
import SearchSection from './SearchSection';
import FilterSection from './FilterSection';
import FeaturedPlacesSection from './FeaturedPlacesSection';

interface DynamicHomeProps {
  initialData?: {
    stats: HomeStats;
    countries: CountryStats[];
    featuredPlaces: FeaturedPlace[];
    categories: CategoryInfo[];
  };
}

const DynamicHome: React.FC<DynamicHomeProps> = ({ initialData }) => {
  // Estados principales
  const [stats, setStats] = useState<HomeStats | null>(initialData?.stats || null);
  const [countries, setCountries] = useState<CountryStats[]>(initialData?.countries || []);
  const [featuredPlaces, setFeaturedPlaces] = useState<FeaturedPlace[]>(initialData?.featuredPlaces || []);
  const [categories, setCategories] = useState<CategoryInfo[]>(initialData?.categories || []);
  
  // Estados de búsqueda y filtros
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [nearbyResults, setNearbyResults] = useState<NearbyResult | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSearching, setIsSearching] = useState(false);
  
  // Estados de filtros
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    country: null,
    category: undefined,
    difficulty: null,
    minRating: null,
    location: null,
    sortBy: 'popularity',
    limit: 20
  });

  // Cargar datos iniciales
  const loadInitialData = useCallback(async () => {
    if (initialData) return;

    try {
      setIsLoading(true);
      
      // Cargar estadísticas
      const statsResponse = await fetch('/api/home/stats');
      const statsData = await statsResponse.json();
      setStats(statsData.data);
      setCountries(statsData.data.countries);

      // Cargar lugares destacados
      const placesResponse = await fetch('/api/home/featured-places?limit=12');
      const placesData = await placesResponse.json();
      setFeaturedPlaces(placesData.data.places);
      setCategories(placesData.data.categories);

    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialData]);

  // Realizar búsqueda
  const performSearch = useCallback(async () => {
    try {
      setIsSearching(true);

      // Si hay ubicación, buscar lugares cercanos
      if (filters.location) {
        const nearbyResponse = await fetch('/api/home/nearby', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: filters.location.lat,
            lng: filters.location.lng,
            radius: filters.location.radius,
            filters: { ...filters, location: undefined }
          })
        });
        const nearbyData = await nearbyResponse.json();
        setNearbyResults(nearbyData.data);
        setSearchResults(null);
      } else {
        // Búsqueda normal
        const searchResponse = await fetch('/api/home/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters)
        });
        const searchData = await searchResponse.json();
        setSearchResults(searchData.data);
        setNearbyResults(null);
      }

    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setIsSearching(false);
    }
  }, [filters]);

  // Limpiar resultados de búsqueda
  const clearSearch = useCallback(() => {
    setSearchResults(null);
    setNearbyResults(null);
    setFilters(prev => ({
      ...prev,
      search: '',
      country: null,
      category: undefined,
      difficulty: null,
      minRating: null,
      location: null
    }));
  }, []);

  // Manejar selección de país
  const handleCountrySelect = useCallback((countryId: string | null) => {
    if (countryId) {
      const selectedCountry = countries.find(c => c._id === countryId);
      setFilters(prev => ({
        ...prev,
        country: selectedCountry?.countryName || null,
        countryCode: selectedCountry?._id || undefined
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        country: null,
        countryCode: undefined
      }));
    }
  }, [countries]);

  // Contar filtros activos
  const getActiveFiltersCount = useCallback(() => {
    let count = 0;
    if (filters.search && filters.search.trim()) count++;
    if (filters.country) count++;
    if (filters.category) count++;
    if (filters.difficulty) count++;
    if (filters.minRating) count++;
    if (filters.location) count++;
    return count;
  }, [filters]);

  // Obtener datos para mostrar
  const getDisplayData = () => {
    if (nearbyResults) {
      return {
        places: nearbyResults.places,
        title: `Destinos cerca de ti (${nearbyResults.radiusKm}km)`,
        subtitle: `${nearbyResults.total} lugares encontrados en tu área`,
        resultsCount: nearbyResults.total
      };
    }
    
    if (searchResults) {
      return {
        places: searchResults.results,
        title: searchResults.query ? `Resultados para "${searchResults.query}"` : 'Resultados de búsqueda',
        subtitle: `${searchResults.total} destinos encontrados`,
        resultsCount: searchResults.total
      };
    }
    
    return {
      places: featuredPlaces,
      title: 'Destinos Destacados',
      subtitle: 'Los lugares más populares y mejor valorados',
      resultsCount: featuredPlaces.length
    };
  };

  // Efectos
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Auto-search cuando cambian filtros críticos
  useEffect(() => {
    if (filters.country || filters.location) {
      performSearch();
    }
  }, [filters.country, filters.location, performSearch]);

  const displayData = getDisplayData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner message="Cargando experiencias únicas..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section con estadísticas */}
      <section className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌍 Descubre el Mundo
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Conecta con guías locales expertos y vive experiencias auténticas en destinos únicos
          </p>
          
          {stats && (
            <StatsOverview 
              stats={{
                countries: stats.totals.countries,
                places: stats.totals.places,
                zones: stats.totals.zones
              }}
              countries={countries}
            />
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-8 relative z-10">
        {/* Carrusel de países */}
        <section className="mb-12">
          <CountryCarousel
            countries={countries}
            selectedCountry={filters.country ? countries.find(c => c.countryName === filters.country)?._id || null : null}
            onCountrySelect={handleCountrySelect}
          />
        </section>

        {/* Búsqueda */}
        <section className="mb-8">
          <SearchSection
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={performSearch}
            isLoading={isSearching}
            resultsCount={displayData.resultsCount}
          />
        </section>

        {/* Filtros avanzados */}
        <section className="mb-8">
          <FilterSection
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            isLoading={isSearching}
            onApplyFilters={performSearch}
            activeFiltersCount={getActiveFiltersCount()}
          />
        </section>

        {/* Lugares destacados o resultados */}
        <section className="mb-12">
          {(searchResults || nearbyResults || getActiveFiltersCount() > 0) && (
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {nearbyResults && (
                  <span>📍 Mostrando lugares cerca de tu ubicación</span>
                )}
                {searchResults && (
                  <span>🔍 Resultados de búsqueda</span>
                )}
              </div>
              <button
                onClick={clearSearch}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                ✕ Limpiar búsqueda
              </button>
            </div>
          )}

          <FeaturedPlacesSection
            places={displayData.places}
            isLoading={isSearching}
            title={displayData.title}
            subtitle={displayData.subtitle}
          />
        </section>

        {/* Información adicional */}
        {!searchResults && !nearbyResults && (
          <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Experiencias Auténticas</h3>
              <p className="text-gray-600">
                Conecta con guías locales que conocen los secretos mejor guardados de cada destino
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Calidad Certificada</h3>
              <p className="text-gray-600">
                Todos nuestros guías están verificados y cuentan con excelentes valoraciones
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Reserva Instantánea</h3>
              <p className="text-gray-600">
                Planifica tu aventura con confirmación inmediata y soporte 24/7
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DynamicHome;
