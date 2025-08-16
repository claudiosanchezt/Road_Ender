// API para obtener filtros y categorías disponibles
// GET /api/home/filters

import { NextRequest, NextResponse } from 'next/server';
import { getDatamartService } from '@/services/datamart-service';

export async function GET(request: NextRequest) {
  try {
    const datamartService = getDatamartService();
    
    // Obtener datos para filtros
    const [categories, quickStats] = await Promise.all([
      datamartService.getAvailableCategories(),
      datamartService.getQuickStatsByCountry()
    ]);

    // Definir tipos de lugares disponibles
    const placeTypes = [
      { type: 'attraction', name: 'Atracción', icon: '🎯' },
      { type: 'monument', name: 'Monumento', icon: '🏛️' },
      { type: 'viewpoint', name: 'Mirador', icon: '🔭' },
      { type: 'trail', name: 'Sendero', icon: '🥾' }
    ];

    // Formatear categorías con iconos y descripciones
  const formattedCategories = categories.map((cat: any) => ({
      category: cat.category,
      name: getCategoryName(cat.category),
      icon: getCategoryIcon(cat.category),
      count: cat.count,
      description: getCategoryDescription(cat.category)
    }));

    // Rangos de dificultad
    const difficultyRanges = [
      { min: 1, max: 2, name: 'Muy Fácil', color: '#4ade80', description: 'Accesible para todos' },
      { min: 3, max: 4, name: 'Fácil', color: '#22d3ee', description: 'Requiere condición básica' },
      { min: 5, max: 6, name: 'Intermedio', color: '#fbbf24', description: 'Experiencia recomendada' },
      { min: 7, max: 8, name: 'Difícil', color: '#fb7185', description: 'Solo experimentados' },
      { min: 9, max: 10, name: 'Extremo', color: '#ef4444', description: 'Profesionales únicamente' }
    ];

    // Rangos de duración
    const durationRanges = [
      { min: 0, max: 120, name: 'Corta', description: 'Hasta 2 horas' },
      { min: 121, max: 360, name: 'Media', description: '2-6 horas' },
      { min: 361, max: 720, name: 'Larga', description: '6-12 horas' },
      { min: 721, max: 1440, name: 'Día completo', description: 'Más de 12 horas' }
    ];

    const response = {
      success: true,
      data: {
        // Países disponibles
  countries: quickStats.map((country: any) => ({    
          code: country.countryCode,
          name: country.countryName,
          flag: getCountryFlag(country.countryCode),
          totalPlaces: country.totalPlaces,
          avgDifficulty: country.avgDifficulty,
          mostPopularCategory: country.mostPopularCategory
        })),

        // Categorías de zonas
        categories: formattedCategories,

        // Tipos de lugares
        placeTypes,

        // Rangos de dificultad
        difficultyRanges,

        // Rangos de duración
        durationRanges,

        // Opciones adicionales
        additionalFilters: [
          {
            key: 'requiresGuide',
            name: 'Requiere Guía',
            type: 'boolean',
            description: 'Lugares que necesitan guía obligatorio'
          },
          {
            key: 'requiresEquipment',
            name: 'Requiere Equipo',
            type: 'boolean',
            description: 'Lugares que necesitan equipo especializado'
          },
          {
            key: 'isFeatured',
            name: 'Destacados',
            type: 'boolean',
            description: 'Lugares recomendados por expertos'
          }
        ],

        // Estadísticas de filtros
        filterStats: {
          totalCategories: formattedCategories.length,
          totalCountries: quickStats.length,
          totalPlaceTypes: placeTypes.length,
          difficultyRange: { min: 1, max: 10 },
          durationRange: { min: 30, max: 1440 }
        }
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200' // Cache 10 min
      }
    });

  } catch (error) {
    console.error('Error en /api/home/filters:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error obteniendo filtros disponibles',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Helper functions para formatear categorías
function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    'mountain': 'Montaña',
    'urban': 'Urbano',
    'beach': 'Playa',
    'desert': 'Desierto',
    'forest': 'Bosque',
    'lake': 'Lago',
    'volcano': 'Volcán',
    'historical': 'Histórico',
    'cultural': 'Cultural',
    'adventure': 'Aventura'
  };
  return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'mountain': '🏔️',
    'urban': '🏙️',
    'beach': '🏖️',
    'desert': '🏜️',
    'forest': '🌲',
    'lake': '🏞️',
    'volcano': '🌋',
    'historical': '🏛️',
    'cultural': '🎭',
    'adventure': '🧗'
  };
  return icons[category] || '📍';
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'mountain': 'Experiencias en alta montaña y cumbres',
    'urban': 'Sitios urbanos y arquitectónicos',
    'beach': 'Costas, playas y actividades marítimas',
    'desert': 'Paisajes desérticos únicos',
    'forest': 'Bosques y selvas naturales',
    'lake': 'Lagos y cuerpos de agua dulce',
    'volcano': 'Volcanes activos e inactivos',
    'historical': 'Sitios de valor histórico',
    'cultural': 'Patrimonio cultural y tradiciones',
    'adventure': 'Deportes extremos y aventura'
  };
  return descriptions[category] || 'Categoría especializada';
}

function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'CL': '🇨🇱',
    'AR': '🇦🇷', 
    'BO': '🇧🇴',
    'PE': '🇵🇪'
  };
  return flags[countryCode] || '🌍';
}
