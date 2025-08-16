export interface WeatherData {
  zone_id?: string;
  temperature: number;
  humidity: number;
  pressure: number;
  conditions: string;
  windSpeed?: number;
  visibility?: number;
  timestamp: string | Date;
  city?: string;
  country?: string;
  icon?: string;
}

export const weatherService = {
  async getCurrentWeather(): Promise<WeatherData> {
    // minimal stub: returns a default Santiago-like weather
    return {
      zone_id: 'santiago',
      temperature: 18,
      humidity: 60,
      pressure: 1013,
      conditions: 'Partly Cloudy',
  city: 'Santiago (ubicación por defecto)',
  country: 'Chile',
  icon: '01d',
      windSpeed: 5,
      visibility: 10000,
      timestamp: new Date().toISOString()
    };
  },

  async getCurrentLocation(): Promise<void> {
    // stub: do nothing (in browser this would call geolocation)
    return;
  },

  async getDefaultWeather(): Promise<WeatherData> {
    return this.getCurrentWeather();
  }
}

export default weatherService
