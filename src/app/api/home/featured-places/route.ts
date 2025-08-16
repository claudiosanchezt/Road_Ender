// API para sitios destacados con filtros dinámicos
// GET /api/home/featured-places

import { NextRequest, NextResponse } from 'next/server';
import { getDatamartService } from '@/services/datamart-service';
import ImageService from '@/services/imageService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datamartService = getDatamartService();
    
    // Extraer parámetros de consulta
    const countryCode = searchParams.get('country');
    const category = searchParams.get('category');
    const minDifficulty = searchParams.get('minDifficulty') 
      ? parseInt(searchParams.get('minDifficulty')!) : undefined;
    const maxDifficulty = searchParams.get('maxDifficulty') 
      ? parseInt(searchParams.get('maxDifficulty')!) : undefined;
    const requiresGuide = searchParams.get('requiresGuide') === 'true';
    const placeType = searchParams.get('type');
    const limit = searchParams.get('limit') 
      ? parseInt(searchParams.get('limit')!) : 12;

    // Obtener sitios filtrados
    const places = await datamartService.getFilteredPlaces({
      countryCode: countryCode || undefined,
      category: category || undefined,
      minDifficulty,
      maxDifficulty,
      requiresGuide: requiresGuide || undefined,
      placeType: placeType || undefined,
      limit
    });

    // Formatear respuesta para el frontend
  const formattedPlaces = places.map((place: any) => ({
      id: place.placeId,
      name: place.placeName,
      description: place.description,
      type: place.type,
      coordinates: place.coordinates,
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
      images: {
        main: place.images && place.images.length > 0 
          ? `/images/places/${place.placeId}/${place.images[0]}` 
          : ImageService.getDefaultImage('place'),
  gallery: place.images ? place.images.map((img: any) => `/images/places/${place.placeId}/${img}`) : [],
        thumbnail: place.images && place.images.length > 0
          ? `/images/thumbnails/places/${place.placeId}_${place.images[0].split('.')[0]}_thumb.webp`
          : ImageService.getDefaultImage('place')
      },
      analytics: {
        rating: place.analytics.averageRating,
        visits: place.analytics.totalVisits,
        bookings: place.analytics.totalBookings
      },
      isFeatured: place.isFeatured
    }));

    const response = {
      success: true,
      data: {
        places: formattedPlaces,
        total: formattedPlaces.length,
        filters: {
          countryCode,
          category,
          minDifficulty,
          maxDifficulty,
          requiresGuide: requiresGuide || false,
          placeType,
          limit
        }
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=300' // Cache 3 min
      }
    });

  } catch (error) {
    console.error('Error en /api/home/featured-places:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error obteniendo sitios destacados',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Helper functions
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
