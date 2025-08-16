// Utilidades para el proyecto Tourist Guides App

// Función para formatear precios
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// Función para formatear fechas
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('es-PE', options || defaultOptions).format(date);
};

// Función para calcular distancia entre dos puntos geográficos
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Función para obtener el color según la complejidad
export const getComplexityColor = (complexity: string): string => {
  switch (complexity.toLowerCase()) {
    case 'baja':
      return 'success';
    case 'media':
      return 'warning';
    case 'alta':
      return 'danger';
    case 'muy alta':
      return 'dark';
    default:
      return 'secondary';
  }
};

// Función para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar teléfono
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Función para generar slug de URL
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Función para calcular score de guía
export const calculateGuideScore = (
  ratings: number,
  responseRate: number,
  experience: number,
  punctuality: number
): number => {
  const weights = {
    ratings: 0.4,
    responseRate: 0.2,
    experience: 0.25,
    punctuality: 0.15,
  };

  return Math.round(
    ratings * weights.ratings +
    responseRate * weights.responseRate +
    experience * weights.experience +
    punctuality * weights.punctuality
  );
};

// Función para truncar texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Función para debounce (útil para búsquedas)
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Constantes del proyecto
export const CONSTANTS = {
  MAX_GUIDE_IMAGES: 5,
  MIN_TOUR_DURATION: 1, // horas
  MAX_TOUR_DURATION: 12, // horas
  DEFAULT_SEARCH_RADIUS: 50, // km
  PAGINATION_LIMIT: 12,
  RATING_SCALE: 5,
  CURRENCIES: ['USD', 'PEN', 'EUR'],
  LANGUAGES: ['Español', 'Inglés', 'Francés', 'Portugués', 'Quechua', 'Alemán'],
  SPECIALTIES: [
    'Montañismo',
    'Trekking',
    'Cultura',
    'Gastronomía',
    'Historia',
    'Aventura',
    'Biodiversidad',
    'Fotografía',
    'Arqueología',
    'Supervivencia',
    'Navegación',
    'Arquitectura'
  ],
  ZONES: [
    'Cusco - Machu Picchu',
    'Lima Centro',
    'Amazonas',
    'Arequipa',
    'Iquitos',
    'Huacachina',
    'Paracas',
    'Chachapoyas',
    'Trujillo',
    'Piura'
  ]
};

// Función para obtener la zona más cercana
export const getClosestZone = (lat: number, lon: number): string => {
  // Coordenadas de las principales zonas turísticas
  const zoneCoordinates: Record<string, [number, number]> = {
    'Cusco - Machu Picchu': [-72.544963, -13.163141],
    'Lima Centro': [-77.042793, -12.046374],
    'Amazonas': [-77.869722, -6.230833],
    'Arequipa': [-71.537451, -16.409047],
    'Iquitos': [-73.243797, -3.749912],
  };

  let closestZone = 'Lima Centro';
  let minDistance = Infinity;

  Object.entries(zoneCoordinates).forEach(([zone, [zoneLon, zoneLat]]: [string, [number, number]]) => {
    const distance = calculateDistance(lat, lon, zoneLat, zoneLon);
    if (distance < minDistance) {
      minDistance = distance;
      closestZone = zone;
    }
  });

  return closestZone;
};
