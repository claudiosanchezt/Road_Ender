// Tipos para el Home Dinámico
// Interfaces compartidas entre componentes y APIs

export interface HomeStats {
  totals: {
    countries: number;
    places: number;
    zones: number;
  };
  countries: CountryStats[];
  featuredPlaces: FeaturedPlace[];
  quickStats: QuickCountryStats[];
  categories: CategoryInfo[];
  lastUpdated: string;
}

export interface CountryStats {
  _id: string;
  countryName: string;
  totalPlaces: number;
  avgDifficulty: number;
  avgDifficultyFormatted: string;
  totalCapacity: number;
  categories: string[];
  flag: string;
}

export interface QuickCountryStats {
  countryCode: string;
  countryName: string;
  totalPlaces: number;
  avgDifficulty: number;
  mostPopularCategory: string;
}

export interface FeaturedPlace {
  id: string;
  name: string;
  description: string;
  country: {
    name: string;
    code: string;
    flag?: string;
  };
  zone: {
    id: string;
    name: string;
    category: string;
    complexity: number;
  };
  difficulty: number;
  duration: number;
  capacity: number;
  coordinates: [number, number]; // [lng, lat]
  requiresGuide: boolean;
  type: string;
  images?: {
    main: string;
    gallery: string[];
    thumbnail: string;
  };
  analytics?: {
    rating: number;
    visits: number;
    bookings: number;
  };
  isFeatured?: boolean;
}

export interface CategoryInfo {
  category: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export interface SearchFilters {
  search?: string;
  countryCode?: string;
  country?: string | null;
  category?: string;
  difficulty?: string | null;
  minDifficulty?: number;
  maxDifficulty?: number;
  minRating?: number | null;
  requiresGuide?: boolean;
  placeType?: string;
  location?: {
    lat: number;
    lng: number;
    radius: number;
  } | null;
  sortBy?: 'popularity' | 'rating' | 'name' | 'difficulty' | 'distance';
  limit?: number;
}

export interface SearchResult {
  query: string;
  total: number;
  results: FeaturedPlace[];
  resultsByCountry: {
    country: {
      name: string;
      code: string;
      flag: string;
    };
    places: FeaturedPlace[];
  }[];
  searchSummary: {
    totalResults: number;
    countries: number;
    mostRelevant: FeaturedPlace | null;
    searchTime: string;
  };
  suggestions: string[];
}

export interface NearbyResult {
  searchCenter: { lat: number; lng: number };
  radiusKm: number;
  places: (FeaturedPlace & {
    distance: {
      km: number;
      text: string;
    };
  })[];
  total: number;
  nearestPlace: FeaturedPlace | null;
  searchSummary: {
    totalFound: number;
    nearestDistance: number | null;
    averageDistance: number | null;
  };
}

export interface FilterOptions {
  countries: {
    code: string;
    name: string;
    flag: string;
    totalPlaces: number;
    avgDifficulty: number;
    mostPopularCategory: string;
  }[];
  categories: CategoryInfo[];
  placeTypes: {
    type: string;
    name: string;
    icon: string;
  }[];
  difficultyRanges: {
    min: number;
    max: number;
    name: string;
    color: string;
    description: string;
  }[];
  durationRanges: {
    min: number;
    max: number;
    name: string;
    description: string;
  }[];
  additionalFilters: {
    key: string;
    name: string;
    type: string;
    description: string;
  }[];
}
