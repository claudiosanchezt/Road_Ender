// API Routes para el Home Dinámico
// Endpoints optimizados que consumen el DataMart MongoDB

import { NextRequest, NextResponse } from 'next/server';
import { getDatamartService } from '@/services/datamart-service';

// ===== 1. ESTADÍSTICAS GENERALES DEL HOME =====
export async function GET(request: NextRequest) {
  try {
    const datamartService = getDatamartService();
    
    // Obtener estadísticas pre-calculadas
    const homeStats = await datamartService.getHomeStats();
    
    if (!homeStats) {
      return NextResponse.json(
        { error: 'No se encontraron estadísticas del home' },
        { status: 404 }
      );
    }

    // Enriquecer con datos adicionales
    const quickStats = await datamartService.getQuickStatsByCountry();
    const categories = await datamartService.getAvailableCategories();

    const response = {
      success: true,
      data: {
        // Estadísticas principales
        totals: homeStats.totals,
        countries: homeStats.countries.map((country: any) => ({
          ...country,
          flag: getCountryFlag(country._id),
          avgDifficultyFormatted: `${country.avgDifficulty.toFixed(1)}/10`
        })),
        
        // Sitios destacados para carrusel
  featuredPlaces: homeStats.featuredPlaces.slice(0, 8).map((place: any) => ({
          id: place.placeId,
          name: place.placeName,
          description: place.description,
          country: place.location.country,
          zone: place.location.zone,
          difficulty: place.tourDetails.difficultyLevel,
          duration: place.tourDetails.estimatedDuration,
          capacity: place.tourDetails.capacity,
          coordinates: place.coordinates,
          requiresGuide: place.tourDetails.requiresGuide,
          type: place.type
        })),
        
        // Estadísticas rápidas
        quickStats,
        
        // Categorías disponibles
        categories,
        
        // Metadatos
        lastUpdated: homeStats.lastUpdated
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' // Cache 5 min
      }
    });

  } catch (error) {
    console.error('Error en /api/home/stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Helper function para flags de países
function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'CL': '🇨🇱',
    'AR': '🇦🇷', 
    'BO': '🇧🇴',
    'PE': '🇵🇪'
  };
  return flags[countryCode] || '🌍';
}
