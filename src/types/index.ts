// 🏗️ Tipos TypeScript para Tourist Guides App
// Definiciones de tipos centralizadas según la arquitectura de BD

// Tipos de usuario
export type UserType = 'client' | 'guide' | 'admin';

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: UserType;
  isActive?: boolean;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de guía
export interface Guide {
  id: string;
  userId: string;
  licenseNumber?: string;
  experienceYears: number;
  hourlyRate: number;
  maxGroupSize: number;
  bio?: string;
  cancellationPolicy?: string;
  isVerified: boolean;
  isAvailable: boolean;
  rating?: number;
  reviewCount?: number;
  // User data (from JOIN)
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  // UI-friendly aliases (backwards compatibility)
  name?: string;
  availability?: boolean;
  description?: string;
  zone?: string;
  specialties?: any[];
  languages?: any[];
  totalReviews?: number;
  pricePerDay?: number;
  avatar?: string;
  location?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// 🌍 Estructura Geográfica Jerárquica

// Continentes
export interface Continent {
  id: string;
  name: string;
  code: string; // 'SA', 'NA', 'EU', 'AS', 'AF', 'OC', 'AN'
  timezone?: string;
  countries?: Country[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Países
export interface Country {
  id: string;
  continentId: string;
  name: string;
  code: string; // ISO 3166-1 alpha-2 (CL, AR, BR, etc.)
  currency: string;
  language: string;
  timezone: string;
  phoneCode: string;
  coordinates: {
    center: { lat: number; lng: number };
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  states?: State[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Estados/Regiones
export interface State {
  id: string;
  countryId: string;
  name: string;
  code?: string; // Código del estado/región
  type: 'state' | 'region' | 'province' | 'department';
  capital?: string;
  coordinates: {
    center: { lat: number; lng: number };
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  zones?: Zone[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Zonas Turísticas (Parques, Ciudades, Áreas)
export interface Zone {
  id: string;
  stateId: string;
  name: string;
  description: string;
  category: 'mountain' | 'urban' | 'beach' | 'desert' | 'forest' | 'lake' | 'volcano' | 'historical' | 'cultural' | 'adventure';
  coordinates: {
    center: { lat: number; lng: number };
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  complexity: number; // 1-10
  maxAltitude?: number;
  accessibility: string;
  entranceFee?: number;
  bestSeasons: string[]; // ['spring', 'summer', 'autumn', 'winter']
  averageTemperature?: {
    min: number;
    max: number;
  };
  touristPlaces?: TouristPlace[];
  infrastructure?: Infrastructure;
  fees?: ZoneFees;
  statistics?: ZoneStatistics;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Lugares/Sectores Turísticos Específicos
export interface TouristPlace {
  id: string;
  zoneId: string;
  name: string;
  description: string;
  type: 'attraction' | 'viewpoint' | 'trail' | 'camping' | 'lodge' | 'restaurant' | 'activity_center' | 'monument' | 'museum';
  coordinates: {
    lat: number;
    lng: number;
    altitude?: number;
  };
  difficultyLevel: number; // 1-10
  estimatedDuration: number; // en horas
  capacity?: number; // personas máximas
  requiresGuide: boolean;
  requiresEquipment: boolean;
  equipment?: string[];
  openingHours?: {
    open: string;
    close: string;
    days?: string[];
  };
  seasonality?: {
    bestMonths: number[];
    closedMonths?: number[];
  };
  fees?: {
    entrance?: number;
    guide?: number;
    equipment?: number;
  };
  restrictions?: string[];
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 🎯 Especialidades Mejoradas

// Categorías de Especialidades
export interface SpecialtyCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  specialties?: Specialty[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Especialidades
export interface Specialty {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  difficultyLevel: number; // 1-10
  requiredExperience: number; // años mínimos
  certificationRequired: boolean;
  equipment?: string[];
  risks?: string[];
  seasonality?: {
    bestMonths: number[];
    avoidMonths?: number[];
  };
  relatedZoneTypes: string[]; // ['mountain', 'beach', etc.]
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Idiomas
export interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string; // ISO 639-1
  countryCode?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 🍽️ SISTEMA GASTRONÓMICO

// Categorías gastronómicas
export interface FoodCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  orderPriority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Establecimientos gastronómicos
export interface FoodEstablishment {
  id: string;
  zoneId: string;
  touristPlaceId?: string;
  categoryId: string;
  name: string;
  description: string;
  type: 'restaurant' | 'cocina_tradicional' | 'picada' | 'food_truck' | 
        'parrilla' | 'marisqueria' | 'pizzeria' | 'cafeteria' | 
        'bar' | 'pub' | 'cerveceria' | 'vineria' | 'heladeria';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  cuisineType: string[]; // ['chilena', 'italiana', 'asiática']
  specialties: string[]; // ['empanadas', 'cazuela', 'mariscos']
  priceRange: 1 | 2 | 3 | 4; // $ a $$$$
  averageMealPrice?: number;
  capacity?: number;
  hasTakeaway: boolean;
  hasDelivery: boolean;
  acceptsReservations: boolean;
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  seasonalClosure?: {
    months: number[];
    reason?: string;
  };
  amenities?: {
    wifi?: boolean;
    parking?: boolean;
    wheelchairAccessible?: boolean;
    outdoorSeating?: boolean;
    liveMusic?: boolean;
    acceptsCards?: boolean;
  };
  paymentMethods: string[];
  averageRating: number;
  totalReviews: number;
  certifications?: string[];
  awards?: string[];
  images?: string[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Reseñas gastronómicas
export interface FoodReview {
  id: string;
  establishmentId: string;
  userId: string;
  bookingId?: string;
  overallRating: number;
  foodQuality?: number;
  serviceRating?: number;
  ambianceRating?: number;
  priceValueRating?: number;
  title?: string;
  comment?: string;
  visitedDate?: Date;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dishesTried?: string[];
  recommendedDishes?: string[];
  userImages?: string[];
  helpfulVotes: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 🏨 SISTEMA DE HOSPEDAJE

// Categorías de hospedaje
export interface AccommodationCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  orderPriority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Establecimientos de hospedaje
export interface Accommodation {
  id: string;
  zoneId: string;
  touristPlaceId?: string;
  categoryId: string;
  name: string;
  description: string;
  type: 'hotel' | 'apart_hotel' | 'hostal' | 'lodge' | 'cabana' | 
        'camping' | 'glamping' | 'refugio' | 'casa_rural' | 
        'departamento' | 'cabaña_familiar' | 'resort';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };
  starRating?: number; // 1-5 estrellas oficiales
  officialCategory?: string;
  totalUnits: number; // habitaciones, cabañas, sitios
  maxGuests: number;
  unitTypes?: Array<{
    type: string;
    quantity: number;
    maxGuests: number;
    price?: number;
  }>;
  priceRange: 1 | 2 | 3 | 4;
  minPrice?: number;
  maxPrice?: number;
  checkInTime: string;
  checkOutTime: string;
  minStayNights: number;
  cancellationPolicy?: string;
  petPolicy: 'allowed' | 'not_allowed' | 'restricted';
  smokingPolicy: 'allowed' | 'not_allowed' | 'designated_areas';
  amenities?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pool?: boolean;
    gym?: boolean;
    spa?: boolean;
    restaurant?: boolean;
    bar?: boolean;
    airConditioning?: boolean;
    heating?: boolean;
    wheelchairAccessible?: boolean;
  };
  roomAmenities?: {
    airConditioning?: boolean;
    heating?: boolean;
    minibar?: boolean;
    safe?: boolean;
    tv?: boolean;
    privateBathroom?: boolean;
  };
  hasRestaurant: boolean;
  hasBar: boolean;
  breakfastIncluded: boolean;
  mealPlans?: string[];
  sustainabilityCertifications?: string[];
  ecoPractices?: string[];
  averageRating: number;
  totalReviews: number;
  images?: string[];
  isVerified: boolean;
  isActive: boolean;
  operatesYearRound: boolean;
  seasonalClosure?: {
    months: number[];
    reason?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Reseñas de hospedaje
export interface AccommodationReview {
  id: string;
  accommodationId: string;
  userId: string;
  bookingId?: string;
  overallRating: number;
  cleanlinessRating?: number;
  comfortRating?: number;
  locationRating?: number;
  serviceRating?: number;
  valueRating?: number;
  title?: string;
  comment?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  nightsStayed?: number;
  roomType?: string;
  travelType?: 'solo' | 'couple' | 'family' | 'friends' | 'business';
  likedAspects?: string[];
  dislikedAspects?: string[];
  userImages?: string[];
  helpfulVotes: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 📊 Interfaces de Soporte y Estadísticas

export interface ZoneStatistics {
  totalGuides: number;
  averageRating: number;
  totalTours: number;
  totalReviews: number;
  averagePrice: number;
  peakSeason: string[];
  popularActivities: string[];
  visitorCapacity: number;
  lastUpdated: Date;
}

export interface Infrastructure {
  parking: boolean;
  restrooms: boolean;
  emergencyServices: boolean;
  restaurants?: boolean;
  accommodation?: boolean;
  wifi?: boolean;
  accessibility?: boolean;
  fuelStation?: boolean;
  medicalPost?: boolean;
  informationCenter?: boolean;
}

export interface ZoneFees {
  entrance?: number;
  camping?: number;
  parking?: number;
  guide?: number;
  equipment?: number;
}

// Atracción simplificada (para compatibilidad)
export interface Attraction {
  id: string;
  name: string;
  type: string;
  difficultyLevel: number;
  estimatedDuration: number;
}

// Tipos de reserva (actualizado para nueva estructura geográfica)
export interface Booking {
  id: string;
  clientId: string;
  guideId: string;
  zoneId: string;
  touristPlaceId?: string; // Lugar específico dentro de la zona
  tourDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  duration: number; // hours
  groupSize: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  meetingPoint: string;
  specialRequests?: string;
  pickupRequired: boolean;
  statusNotes?: string;
  // Joined data
  clientName?: string;
  guideName?: string;
  zoneName?: string;
  touristPlaceName?: string;
  stateName?: string;
  countryName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de reseña
export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  guideId: string;
  rating: number; // 1-5
  title?: string;
  comment?: string;
  clientName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de pago
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentProvider: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  processedAt?: Date;
  createdAt: Date;
}

// MongoDB Analytics Types
export interface GuideProfile {
  guide_id: string;
  total_tours: number;
  total_earnings: number;
  avg_rating: number;
  response_rate: number;
  completion_rate: number;
  specialties_stats: Record<string, any>;
  monthly_stats: Record<string, any>;
  rating_distribution?: {
    five_stars: number;
    four_stars: number;
    three_stars: number;
    two_stars: number;
    one_star: number;
  };
  created_at: Date;
  updated_at: Date;
}

export interface BookingAnalytics {
  total_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_revenue: number;
}

export interface WeatherData {
  zone_id: string;
  temperature: number;
  humidity: number;
  pressure: number;
  conditions: string;
  wind_speed?: number;
  visibility?: number;
  timestamp: Date;
  // UI fields
  city?: string;
  country?: string;
  icon?: string;
}

// Datos climáticos
export interface ClimateData {
  id: string;
  zoneId: string;
  temperature: number;
  humidity: number;
  pressure: number; // hPa
  conditions: string;
  windSpeed?: number;
  visibility?: number;
  timestamp: Date;
}

// Notificaciones
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  notificationType?: string;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: Date;
}

// Filtros de búsqueda
export interface GuideSearchFilters {
  zone?: string;
  specialty?: string;
  minRating?: number;
  maxPrice?: number;
  availability?: boolean;
  language?: string;
  complexity?: number;
}

export interface ClimateInfo {
  temperature: string;
  humidity: string;
  pressure: string;
  conditions: string;
  windSpeed?: string;
  visibility?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: UserType;
}

export interface AuthToken {
  token: string;
  expiresAt: Date;
  user: User;
}

// JWT Types
export interface JWTPayload {
  userId: string;
  email: string;
  userType: UserType;
  guideId?: string;
  permissions: string[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// Component Props types
export interface GuideCardProps {
  guide: Guide;
  onContact: (guideId: string) => void;
  onViewProfile: (guideId: string) => void;
}

export interface ClimateCardProps {
  climateData: ClimateInfo;
  zone?: string;
}

export interface FiltersPanelProps {
  filters: GuideSearchFilters;
  onFiltersChange: (filters: GuideSearchFilters) => void;
  zones: Zone[];
  specialties: string[];
}

// Utility types
export type GuideComplexityColor = 'success' | 'warning' | 'danger' | 'dark' | 'secondary';

export interface ScoreWeights {
  ratings: number;
  responseRate: number;
  experience: number;
  punctuality: number;
}

export interface GuideScore {
  total: number;
  breakdown: {
    ratings: number;
    responseRate: number;
    experience: number;
    punctuality: number;
  };
  weights: ScoreWeights;
}

// Database connection types
export interface DatabaseConfig {
  mongodb: {
    uri: string;
    database: string;
  };
  postgresql: {
    uri: string;
    database: string;
  };
  redis?: {
    uri: string;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

// Tipos de ubicación
export interface GeoLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}
