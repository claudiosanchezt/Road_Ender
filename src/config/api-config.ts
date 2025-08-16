// Configuración para APIs externas
export const API_CONFIG = {
  // Base URL del backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  
  // OpenWeatherMap API (Gratuita - 1000 llamadas/día)
  // Registrarse en: https://openweathermap.org/api
  WEATHER: {
    API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '8f3b0c5a2d1e9f4a7b2c8d9e1f3a6b8c',
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    UNITS: 'metric', // Celsius
    LANG: 'es' // Español
  },
  
  // Configuración de geolocalización
  GEOLOCATION: {
    enableHighAccuracy: true,
    timeout: 10000, // 10 segundos
    maximumAge: 300000 // 5 minutos de cache
  },
  
  // Cache settings
  CACHE: {
    WEATHER_DURATION: 15 * 60 * 1000, // 15 minutos
    LOCATION_DURATION: 30 * 60 * 1000 // 30 minutos
  }
}

// Función para validar si tenemos la API key configurada
export function validateWeatherConfig(): boolean {
  return !!API_CONFIG.WEATHER.API_KEY && API_CONFIG.WEATHER.API_KEY !== '8f3b0c5a2d1e9f4a7b2c8d9e1f3a6b8c'
}

// Obtener una API key gratuita de OpenWeatherMap
export const SETUP_INSTRUCTIONS = `
Para configurar el clima real:

1. Ve a https://openweathermap.org/api
2. Crea una cuenta gratuita (1000 llamadas/día)
3. Obtén tu API key
4. Crea un archivo .env.local en la raíz del proyecto:
   NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui
5. Reinicia el servidor de desarrollo

La API key actual es de demostración y puede no funcionar.
`
