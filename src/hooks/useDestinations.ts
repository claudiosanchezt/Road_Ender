// Hook personalizado para manejar destinos épicos con integración backend
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Destination, DestinationsResponse, DestinationFilters, DestinationState } from '@/types/destination.types';

// Configuración del API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useDestinations = (initialFilters: DestinationFilters = {}) => {
  const [state, setState] = useState<DestinationState>({
    destinations: [],
    loading: true,
    error: null,
    filters: initialFilters,
    pagination: {
      page: 1,
      limit: 9,
      total: 0
    }
  });

  // Función para obtener destinos desde el backend
  const fetchDestinations = useCallback(async (
    filters: DestinationFilters = state.filters,
    page: number = state.pagination.page,
    limit: number = state.pagination.limit
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Construir query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters.country && { countries: filters.country.join(',') },
        ...filters.difficulty && { difficulties: filters.difficulty.join(',') },
        ...filters.minRating && { minRating: filters.minRating.toString() },
        ...filters.maxPrice && { maxPrice: filters.maxPrice.toString() },
        ...filters.features && { features: filters.features.join(',') },
        ...filters.region && { region: filters.region },
        ...filters.bestTimeToVisit && { bestTime: filters.bestTimeToVisit }
      });

      const response = await fetch(`${API_BASE_URL}/destinations?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Agregar headers de autenticación si es necesario
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: DestinationsResponse = await response.json();

      setState(prev => ({
        ...prev,
        destinations: data.destinations,
        loading: false,
        pagination: {
          page: data.page,
          limit: data.limit,
          total: data.total
        }
      }));

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cargar destinos';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      
      // En caso de error, usar datos de fallback (desarrollo)
      console.warn('Error conectando con backend, usando datos de fallback:', errorMessage);
      loadFallbackDestinations();
    }
  }, [state.filters, state.pagination.page, state.pagination.limit]);

  // Datos de fallback para desarrollo/offline
  const loadFallbackDestinations = useCallback(() => {
    const fallbackDestinations: Destination[] = [
      {
        id: '1',
        name: 'Patagonia Chilena',
        country: 'Chile',
        countryCode: 'CL',
        difficulty: 'Avanzado',
        rating: 4.9,
        reviewsCount: 127,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
        description: 'Explora las majestuosas torres de granito y glaciares milenarios en uno de los paisajes más dramáticos del planeta',
        tours: 18,
        guides: 12,
        features: ['Glaciares', 'Trekking', 'Fotografía', 'Vida Silvestre'],
        location: {
          latitude: -50.9423,
          longitude: -73.4068,
          region: 'Patagonia'
        },
        pricing: {
          fromPrice: 1200,
          currency: 'USD',
          priceRange: '$1200 - $3500'
        },
        bestTimeToVisit: ['Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo'],
        duration: { min: 3, max: 14, unit: 'days' },
        climate: {
          temperature: { min: 5, max: 18 },
          season: 'Verano austral',
          weatherConditions: ['Viento', 'Sol', 'Lluvia ocasional']
        },
        activities: [],
        tags: ['aventura', 'naturaleza', 'trekking', 'fotografía'],
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Amazonas Peruano',
        country: 'Perú',
        countryCode: 'PE',
        difficulty: 'Intermedio',
        rating: 4.8,
        reviewsCount: 89,
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
        description: 'Sumérgete en la selva tropical más biodiversa del mundo con guías nativos expertos',
        tours: 15,
        guides: 8,
        features: ['Biodiversidad', 'Canopy', 'Comunidades', 'Aventura'],
        location: {
          latitude: -3.7492,
          longitude: -73.2539,
          region: 'Amazonía'
        },
        pricing: {
          fromPrice: 800,
          currency: 'USD',
          priceRange: '$800 - $2200'
        },
        bestTimeToVisit: ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
        duration: { min: 4, max: 10, unit: 'days' },
        climate: {
          temperature: { min: 22, max: 32 },
          season: 'Tropical',
          weatherConditions: ['Húmedo', 'Lluvia', 'Calor']
        },
        activities: [],
        tags: ['selva', 'biodiversidad', 'comunidades', 'naturaleza'],
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Salar de Uyuni',
        country: 'Bolivia',
        countryCode: 'BO',
        difficulty: 'Intermedio',
        rating: 4.7,
        reviewsCount: 156,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
        description: 'Contempla paisajes marcianos y cielos estrellados en el desierto de sal más grande del mundo',
        tours: 12,
        guides: 6,
        features: ['Astronomía', 'Fotografía', 'Paisajes', 'Cultura'],
        location: {
          latitude: -20.1338,
          longitude: -67.4891,
          region: 'Altiplano',
          altitude: 3656
        },
        pricing: {
          fromPrice: 600,
          currency: 'USD',
          priceRange: '$600 - $1800'
        },
        bestTimeToVisit: ['Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
        duration: { min: 2, max: 7, unit: 'days' },
        climate: {
          temperature: { min: -2, max: 15 },
          season: 'Seco',
          weatherConditions: ['Sol', 'Frío nocturno', 'Viento']
        },
        activities: [],
        tags: ['desierto', 'sal', 'astronomía', 'fotografía'],
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setState(prev => ({
      ...prev,
      destinations: fallbackDestinations,
      loading: false,
      error: null,
      pagination: {
        ...prev.pagination,
        total: fallbackDestinations.length
      }
    }));
  }, []);

  // Función para actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<DestinationFilters>) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    setState(prev => ({ ...prev, filters: updatedFilters }));
    fetchDestinations(updatedFilters, 1); // Reset to page 1 when filtering
  }, [state.filters, fetchDestinations]);

  // Función para cambiar página
  const changePage = useCallback((page: number) => {
    setState(prev => ({ 
      ...prev, 
      pagination: { ...prev.pagination, page } 
    }));
    fetchDestinations(state.filters, page);
  }, [state.filters, fetchDestinations]);

  // Función para obtener un destino específico
  const getDestinationById = useCallback(async (id: string): Promise<Destination | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching destination:', error);
      return null;
    }
  }, []);

  // Cargar destinos al montar el componente
  useEffect(() => {
    fetchDestinations();
  }, []); // Solo se ejecuta una vez al montar

  return {
    ...state,
    fetchDestinations,
    updateFilters,
    changePage,
    getDestinationById,
    refresh: () => fetchDestinations(state.filters, state.pagination.page)
  };
};

export default useDestinations;
