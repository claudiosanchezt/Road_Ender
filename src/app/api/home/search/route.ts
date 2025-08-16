// API para búsqueda de texto completo
// GET /api/home/search?q=machu%20picchu

import { NextRequest, NextResponse } from 'next/server';
import { getDatamartService } from '@/services/datamart-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datamartService = getDatamartService();
    
    // Extraer término de búsqueda
    const query = searchParams.get('q');
    const limit = searchParams.get('limit') 
      ? parseInt(searchParams.get('limit')!) : 15;

    // Validar parámetro requerido
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Se requiere parámetro de búsqueda "q"',
          example: '/api/home/search?q=salar+de+uyuni'
        },
        { status: 400 }
      );
    }

    // Validar longitud mínima
    if (query.trim().length < 2) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'El término de búsqueda debe tener al menos 2 caracteres'
        },
        { status: 400 }
      );
    }

    const searchTerm = query.trim();
    
    // Realizar búsqueda
    const searchResults = await datamartService.searchPlaces(searchTerm, limit);

    // Formatear resultados con relevancia
  const formattedResults = searchResults.map((place: any, index: number) => {
      // Calcular relevancia simple basada en coincidencias
      const relevanceScore = calculateRelevance(searchTerm, place);
      
      return {
        id: place.placeId,
        name: place.placeName,
        description: place.description,
        type: place.type,
        coordinates: {
          lat: place.coordinates[1],
          lng: place.coordinates[0]
        },
        location: {
          country: {
            ...place.location.country,
            flag: getCountryFlag(place.location.country.code)
          },
          state: place.location.state,
          zone: place.location.zone
        },
        details: {
          difficulty: place.tourDetails.difficultyLevel,
          difficultyText: getDifficultyText(place.tourDetails.difficultyLevel),
          duration: place.tourDetails.estimatedDuration,
          durationText: getDurationText(place.tourDetails.estimatedDuration),
          capacity: place.tourDetails.capacity,
          requiresGuide: place.tourDetails.requiresGuide,
          requiresEquipment: place.tourDetails.requiresEquipment
        },
        analytics: {
          rating: place.analytics.averageRating,
          visits: place.analytics.totalVisits,
          bookings: place.analytics.totalBookings
        },
        relevance: {
          score: relevanceScore,
          matchedFields: getMatchedFields(searchTerm, place)
        },
        isFeatured: place.isFeatured
      };
    });

    // Ordenar por relevancia
  const sortedResults = formattedResults.sort((a: any, b: any) => b.relevance.score - a.relevance.score);

    // Agrupar resultados por país para mejor UX
    const resultsByCountry = sortedResults.reduce((acc, place) => {
      const countryCode = place.location.country.code;
      if (!acc[countryCode]) {
        acc[countryCode] = {
          country: place.location.country,
          places: []
        };
      }
      acc[countryCode].places.push(place);
      return acc;
    }, {} as Record<string, any>);

    const response = {
      success: true,
      data: {
        query: searchTerm,
        total: sortedResults.length,
        results: sortedResults,
        resultsByCountry: Object.values(resultsByCountry),
        searchSummary: {
          totalResults: sortedResults.length,
          countries: Object.keys(resultsByCountry).length,
          mostRelevant: sortedResults[0] || null,
          searchTime: new Date().toISOString()
        },
        suggestions: generateSearchSuggestions(searchTerm, sortedResults)
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' // Cache 1 min
      }
    });

  } catch (error) {
    console.error('Error en /api/home/search:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error en búsqueda de texto',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Calcular relevancia de búsqueda
function calculateRelevance(searchTerm: string, place: any): number {
  const term = searchTerm.toLowerCase();
  let score = 0;

  // Coincidencia exacta en nombre (peso alto)
  if (place.placeName.toLowerCase().includes(term)) {
    score += 100;
  }

  // Coincidencia en descripción
  if (place.description.toLowerCase().includes(term)) {
    score += 50;
  }

  // Coincidencia en zona
  if (place.location.zone.name.toLowerCase().includes(term)) {
    score += 30;
  }

  // Coincidencia en estado/región
  if (place.location.state.name.toLowerCase().includes(term)) {
    score += 20;
  }

  // Coincidencia en país
  if (place.location.country.name.toLowerCase().includes(term)) {
    score += 10;
  }

  // Bonificación por estar destacado
  if (place.isFeatured) {
    score += 25;
  }

  // Bonificación por rating alto
  score += place.analytics.averageRating * 5;

  return score;
}

// Identificar campos que coinciden
function getMatchedFields(searchTerm: string, place: any): string[] {
  const term = searchTerm.toLowerCase();
  const matches: string[] = [];

  if (place.placeName.toLowerCase().includes(term)) matches.push('name');
  if (place.description.toLowerCase().includes(term)) matches.push('description');
  if (place.location.zone.name.toLowerCase().includes(term)) matches.push('zone');
  if (place.location.state.name.toLowerCase().includes(term)) matches.push('state');
  if (place.location.country.name.toLowerCase().includes(term)) matches.push('country');

  return matches;
}

// Generar sugerencias de búsqueda
function generateSearchSuggestions(searchTerm: string, results: any[]): string[] {
  const suggestions: Set<string> = new Set();
  
  results.slice(0, 5).forEach(place => {
    // Sugerir zonas relacionadas
    suggestions.add(place.location.zone.name);
    
    // Sugerir países si no está en el término original
    if (!searchTerm.toLowerCase().includes(place.location.country.name.toLowerCase())) {
      suggestions.add(`${searchTerm} ${place.location.country.name}`);
    }
    
    // Sugerir tipos relacionados
    if (place.type && !searchTerm.toLowerCase().includes(place.type)) {
      suggestions.add(`${place.type} ${place.location.country.name}`);
    }
  });

  return Array.from(suggestions).slice(0, 5);
}

// Helper functions (reutilizadas)
function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'CL': '🇨🇱',
    'AR': '🇦🇷', 
    'BO': '🇧🇴',
    'PE': '🇵🇪'
  };
  return flags[countryCode] || '🌍';
}

function getDifficultyText(level: number): string {
  if (level <= 2) return 'Muy Fácil';
  if (level <= 4) return 'Fácil';
  if (level <= 6) return 'Intermedio';
  if (level <= 8) return 'Difícil';
  return 'Extremo';
}

function getDurationText(minutes: number): string {
  if (minutes < 60) return `${minutes} minutos`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
  return `${hours}h ${mins}m`;
}
