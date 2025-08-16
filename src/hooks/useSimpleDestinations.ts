// Hook simple para destinos del componente SimplePremiumLayout
import { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api-config';

export interface SimpleDestination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  guides: number;
  gradient?: string;
  emoji?: string;
  difficulty?: string;
  features?: string[];
}

export interface UseSimpleDestinationsResult {
  destinations: SimpleDestination[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSimpleDestinations = (filters?: {
  country?: string;
  limit?: number;
}): UseSimpleDestinationsResult => {
  const [destinations, setDestinations] = useState<SimpleDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construir query params
      const params = new URLSearchParams();
      
      if (filters?.country) {
        params.append('country', filters.country);
      }
      
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }

      const url = `${API_CONFIG.BASE_URL}/api/geography/countries?${params.toString()}`;
      console.log('🌍 Fetching destinations from:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Error obteniendo destinos');
      }

      // Transformar datos del backend al formato del frontend
      const transformedDestinations: SimpleDestination[] = result.data.map((item: any, index: number) => ({
        id: item.id || index + 1,
        name: item.name || 'Destino Desconocido',
        country: item.country || 'Chile',
        description: item.description || 'Destino turístico increíble',
        image: item.imageUrl || item.image || `https://images.unsplash.com/photo-${Math.random().toString().slice(2, 15)}?w=400&h=300&fit=crop`,
        rating: item.averageRating || item.rating || 4.5,
        guides: item.guidesCount || item.totalGuides || item.guides || Math.floor(Math.random() * 15) + 3,
        gradient: getGradientForDestination(item.name || ''),
        emoji: getEmojiForDestination(item.name || ''),
        difficulty: item.difficulty || 'Intermedio',
        features: item.features || item.activities || ['Turismo', 'Aventura', 'Naturaleza']
      }));

      setDestinations(transformedDestinations);
      console.log(`✅ Cargados ${transformedDestinations.length} destinos`);

    } catch (err) {
      console.error('❌ Error cargando destinos:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      
      // Fallback a datos mock si falla la API
      setDestinations([
        {
          id: 1,
          name: "Torres del Paine",
          country: "Chile",
          description: "Parque Nacional con impresionantes formaciones rocosas y glaciares en la Patagonia",
          image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=400&h=300&fit=crop",
          rating: 4.8,
          guides: 12,
          gradient: "from-sky-600 to-indigo-700",
          emoji: "🏔️",
          difficulty: "Experto",
          features: ['Trekking', 'Fotografía', 'Glaciares', 'Fauna']
        },
        {
          id: 2,
          name: "Desierto de Atacama",
          country: "Chile", 
          description: "El desierto más árido del mundo con paisajes únicos y cielos estrellados",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
          rating: 4.7,
          guides: 8,
          gradient: "from-orange-600 to-red-700",
          emoji: "🏜️",
          difficulty: "Intermedio",
          features: ['Astronomía', 'Geisers', 'Lagunas', 'Cultura']
        },
        {
          id: 3,
          name: "Valparaíso",
          country: "Chile",
          description: "Puerto histórico con coloridos cerros, arte urbano y patrimonio UNESCO",
          image: "https://images.unsplash.com/photo-1544737151681-6e4c999de2a2?w=400&h=300&fit=crop",
          rating: 4.6,
          guides: 15,
          gradient: "from-cyan-600 to-blue-700",
          emoji: "🎨",
          difficulty: "Fácil",
          features: ['Arte Urbano', 'Historia', 'Cultura', 'Gastronomía']
        },
        {
          id: 4,
          name: "Isla de Chiloé",
          country: "Chile",
          description: "Isla mágica con mitología única, palafitos coloridos e iglesias patrimoniales",
          image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=400&h=300&fit=crop",
          rating: 4.5,
          guides: 7,
          gradient: "from-emerald-600 to-teal-700",
          emoji: "🏘️",
          difficulty: "Fácil",
          features: ['Mitología', 'Arquitectura', 'Gastronomía', 'Tradiciones']
        },
        {
          id: 5,
          name: "Valle del Elqui",
          country: "Chile",
          description: "Valle místico famoso por sus observatorios astronómicos y producción de pisco",
          image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop",
          rating: 4.6,
          guides: 5,
          gradient: "from-purple-600 to-indigo-700",
          emoji: "🔭",
          difficulty: "Fácil",
          features: ['Astronomía', 'Pisco', 'Relax', 'Espiritualidad']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [filters?.country, filters?.limit]);

  return {
    destinations,
    loading,
    error,
    refetch: fetchDestinations
  };
};

// Función auxiliar para asignar gradientes basados en el nombre del destino
function getGradientForDestination(name: string): string {
  const gradients = {
    'torres': 'from-sky-600 to-indigo-700',
    'atacama': 'from-orange-600 to-red-700',
    'valparaiso': 'from-cyan-600 to-blue-700',
    'chiloe': 'from-emerald-600 to-teal-700',
    'elqui': 'from-purple-600 to-indigo-700',
    'paine': 'from-sky-600 to-indigo-700',
    'desert': 'from-orange-600 to-red-700',
    'patagonia': 'from-slate-600 to-gray-700'
  };

  const lowercaseName = name.toLowerCase();
  for (const [key, gradient] of Object.entries(gradients)) {
    if (lowercaseName.includes(key)) {
      return gradient;
    }
  }
  
  return 'from-emerald-600 to-teal-700'; // Default gradient
}

// Función auxiliar para asignar emojis basados en el nombre del destino
function getEmojiForDestination(name: string): string {
  const emojis = {
    'torres': '🏔️',
    'atacama': '🏜️',
    'valparaiso': '🎨',
    'chiloe': '🏘️',
    'elqui': '🔭',
    'paine': '🏔️',
    'desert': '🏜️',
    'patagonia': '🏔️',
    'volcano': '🌋',
    'lake': '🏞️'
  };

  const lowercaseName = name.toLowerCase();
  for (const [key, emoji] of Object.entries(emojis)) {
    if (lowercaseName.includes(key)) {
      return emoji;
    }
  }
  
  return '🏔️'; // Default emoji
}

export default useSimpleDestinations;
