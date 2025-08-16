// Tipos para destinos turísticos - Estructura para backend integration
export interface Destination {
  id: string;
  name: string;
  country: string;
  countryCode: string; // Código ISO del país
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[]; // Galería adicional
  description: string;
  longDescription?: string;
  tours: number;
  guides: number;
  features: string[];
  location: {
    latitude: number;
    longitude: number;
    region: string;
    altitude?: number;
  };
  pricing: {
    fromPrice: number;
    currency: string;
    priceRange: string;
  };
  bestTimeToVisit: string[];
  duration: {
    min: number;
    max: number;
    unit: 'days' | 'hours';
  };
  climate: {
    temperature: {
      min: number;
      max: number;
    };
    season: string;
    weatherConditions: string[];
  };
  activities: Activity[];
  nearbyDestinations?: string[]; // IDs de destinos cercanos
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  price: number;
  currency: string;
  maxParticipants: number;
  equipment: string[];
  restrictions: string[];
}

// Respuesta del endpoint de destinos
export interface DestinationsResponse {
  destinations: Destination[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Filtros para búsqueda de destinos
export interface DestinationFilters {
  country?: string[];
  difficulty?: string[];
  minRating?: number;
  maxPrice?: number;
  features?: string[];
  activities?: string[];
  region?: string;
  bestTimeToVisit?: string;
  duration?: {
    min?: number;
    max?: number;
  };
}

// Estado de carga para destinos
export interface DestinationState {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
  filters: DestinationFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
