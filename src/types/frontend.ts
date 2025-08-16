// 🏗️ Tipos TypeScript Centralizados - Frontend
// Mantener sincronizado con backend types

// ===================================
// TIPOS BASE
// ===================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message: string
  errors?: string[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  userType: 'client' | 'guide' | 'admin'
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthUser extends User {
  fullName: string // computed
}

// ===================================
// GEOGRAFÍA
// ===================================

export interface Continent {
  id: string
  name: string
  code: string
  timezone?: string
  countriesCount?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Country {
  id: string
  continentId: string
  name: string
  code: string
  currency: string
  language: string
  timezone: string
  phoneCode: string
  coordinates: {
    lat: number
    lng: number
  }
  statesCount?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface State {
  id: string
  countryId: string
  name: string
  code?: string
  type: 'state' | 'region' | 'province' | 'department'
  capital?: string
  coordinates: {
    lat: number
    lng: number
  }
  zonesCount?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Zone {
  id: string
  stateId: string
  name: string
  description: string
  category: 'mountain' | 'urban' | 'beach' | 'desert' | 'forest' | 'lake' | 'volcano' | 'historical' | 'cultural' | 'adventure'
  coordinates: {
    lat: number
    lng: number
  }
  complexity: number // 1-10
  maxAltitude?: number
  accessibility?: string
  entranceFee: number
  bestSeasons: string[]
  averageTemperature?: {
    min: number
    max: number
  }
  infrastructure?: any
  fees?: any
  touristPlacesCount?: number
  guidesCount?: number
  averageRating?: number
  hierarchy?: {
    continent: string
    country: string
    state: string
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ===================================
// GUÍAS
// ===================================

export interface Guide {
  id: string
  userId: string
  user?: User
  licenseNumber?: string
  experienceYears: number
  hourlyRate: number
  maxGroupSize: number
  bio?: string
  cancellationPolicy?: string
  isVerified: boolean
  isAvailable: boolean
  rating?: number
  totalReviews?: number
  languages?: Language[]
  specialties?: Specialty[]
  workingZones?: Zone[]
  pricing?: GuidePricing
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Language {
  id: string
  name: string
  nativeName: string
  code: string
  countryCode?: string
  isActive: boolean
}

export interface Specialty {
  id: string
  categoryId: string
  name: string
  description?: string
  difficultyLevel: number
  requiredExperience: number
  certificationRequired: boolean
  equipment?: string[]
  risks?: string[]
  seasonality?: any
  relatedZoneTypes?: string[]
  guidesCount?: number
  category?: {
    name: string
    icon?: string
    color?: string
  }
  isActive: boolean
}

export interface GuidePricing {
  id: string
  guideId: string
  baseHourlyRate: number
  baseDailyRate?: number
  baseTourRate?: number
  currency: string
  experienceMultiplier: number
  ratingMultiplier: number
  specialtyMultiplier: number
  minHourlyRate?: number
  maxHourlyRate?: number
  highSeasonMultiplier: number
  lowSeasonMultiplier: number
  groupDiscountThreshold: number
  groupDiscountPercentage: number
  isActive: boolean
  effectiveFrom: string
  effectiveUntil?: string
}

// ===================================
// TOURS
// ===================================

export interface TourCategory {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  orderPriority: number
  toursCount?: number
  isActive: boolean
}

export interface Tour {
  id: string
  zoneId: string
  zone?: Zone
  touristPlaceId?: string
  categoryId: string
  category?: TourCategory
  name: string
  description: string
  shortDescription?: string
  durationHours: number
  difficultyLevel: number
  minParticipants: number
  maxParticipants: number
  minAge: number
  maxAge?: number
  basePrice: number
  currency: string
  priceIncludes: string[]
  priceExcludes: string[]
  itinerary: TourItineraryStep[]
  meetingPoint: {
    name: string
    address: string
    coordinates: { lat: number; lng: number }
    instructions?: string
  }
  endingPoint?: {
    name: string
    address: string
    coordinates: { lat: number; lng: number }
  }
  requirements: string[]
  includes: string[]
  excludes: string[]
  recommendations: string[]
  cancellationPolicy: string
  images?: string[]
  guides?: Guide[]
  averageRating?: number
  totalReviews?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TourItineraryStep {
  step: number
  time: string
  activity: string
  description: string
  location?: string
  duration?: number
}

// ===================================
// RESERVAS
// ===================================

export interface Booking {
  id: string
  clientId: string
  client?: User
  guideId: string
  guide?: Guide
  zoneId: string
  zone?: Zone
  touristPlaceId?: string
  tourId?: string
  tour?: Tour
  tourDate: string
  startTime: string
  duration: number
  groupSize: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  meetingPoint: string
  specialRequests?: string
  pickupRequired: boolean
  statusNotes?: string
  expiresAt: string
  payment?: Payment
  review?: Review
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  currency: string
  paymentMethod: string
  paymentProvider: string
  transactionId?: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  processedAt?: string
  createdAt: string
}

export interface Review {
  id: string
  bookingId: string
  clientId: string
  guideId: string
  rating: number
  title?: string
  comment?: string
  createdAt: string
  updatedAt: string
}

// ===================================
// FORMULARIOS
// ===================================

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
  userType: 'client' | 'guide'
  acceptTerms: boolean
}

export interface SearchFilters {
  zone?: string
  category?: string
  difficulty?: number
  minPrice?: number
  maxPrice?: number
  duration?: number
  date?: string
  groupSize?: number
  specialties?: string[]
  rating?: number
  language?: string[]
}

// ===================================
// ESTADOS DE UI
// ===================================

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

export interface PaginationState {
  page: number
  limit: number
  total: number
  pages: number
}

export type ViewMode = 'grid' | 'list' | 'map'
export type SortOption = 'name' | 'price' | 'rating' | 'distance' | 'newest'
export type SortDirection = 'asc' | 'desc'
