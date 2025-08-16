// API para búsqueda geográfica por proximidad
// GET /api/home/nearby?lat=-33.4569&lng=-70.6483&radius=50

import { NextRequest, NextResponse } from 'next/server';
import { getDatamartService } from '@/services/datamart-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datamartService = getDatamartService();
    
    // Extraer coordenadas y radio
    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lng');
    const radiusKm = searchParams.get('radius') 
      ? parseInt(searchParams.get('radius')!) : 100;
    const limit = searchParams.get('limit') 
      ? parseInt(searchParams.get('limit')!) : 20;

    // Validar parámetros requeridos
    if (!latitude || !longitude) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Se requieren parámetros lat y lng para búsqueda geográfica',
          example: '/api/home/nearby?lat=-33.4569&lng=-70.6483&radius=50'
        },
        { status: 400 }
      );
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Validar rangos de coordenadas
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Coordenadas inválidas. Lat: -90 a 90, Lng: -180 a 180'
        },
        { status: 400 }
      );
    }

    // Buscar sitios cercanos
    const nearbyPlaces = await datamartService.findPlacesByLocation(
      lng, lat, radiusKm, limit
    );

    // Formatear respuesta con cálculo de distancias
  const placesWithDistance = nearbyPlaces.map((place: any) => {
      const distance = calculateDistance(
        lat, lng,
        place.coordinates[1], place.coordinates[0]
      );

      return {
        id: place.placeId,
        name: place.placeName,
        description: place.description,
        type: place.type,
        coordinates: {
          lat: place.coordinates[1],
          lng: place.coordinates[0]
        },
        distance: {
          km: Math.round(distance * 10) / 10,
          text: distance < 1 ? `${Math.round(distance * 1000)}m` : `${Math.round(distance * 10) / 10}km`
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
          visits: place.analytics.totalVisits
        }
      };
    });

    const response = {
      success: true,
      data: {
        searchCenter: { lat, lng },
        radiusKm,
        places: placesWithDistance,
        total: placesWithDistance.length,
        nearestPlace: placesWithDistance[0] || null,
        searchSummary: {
          totalFound: placesWithDistance.length,
          nearestDistance: placesWithDistance[0]?.distance.km || null,
          averageDistance: placesWithDistance.length > 0 
            ? Math.round((placesWithDistance.reduce((sum: number, p: any) => sum + p.distance.km, 0) / placesWithDistance.length) * 10) / 10
            : null
        }
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=240' // Cache 2 min
      }
    });

  } catch (error) {
    console.error('Error en /api/home/nearby:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error en búsqueda geográfica',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Calcular distancia usando fórmula de Haversine
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
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
