import { useState, useEffect, useCallback } from 'react'
import { weatherService, WeatherData } from '../services/weather-service'

interface UseWeatherReturn {
  weather: WeatherData | null
  loading: boolean
  error: string | null
  refreshWeather: () => Promise<void>
  requestLocation: () => Promise<void>
  useDefaultLocation: () => Promise<void>
  locationPermission: 'granted' | 'denied' | 'prompt' | 'unknown'
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown')

  // Verificar permisos de geolocalización
  const checkLocationPermission = useCallback(async () => {
    if (!navigator.permissions) {
      setLocationPermission('unknown')
      return
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      setLocationPermission(permission.state)
      
      // Escuchar cambios en los permisos
      permission.onchange = () => {
        setLocationPermission(permission.state)
      }
    } catch (error) {
      console.warn('No se pudieron verificar los permisos de geolocalización:', error)
      setLocationPermission('unknown')
    }
  }, [])

  // Cargar datos del clima
  const loadWeather = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const weatherData = await weatherService.getCurrentWeather()
      setWeather(weatherData)
      
      // Guardar en localStorage para cache
      localStorage.setItem('cached_weather', JSON.stringify({
        data: weatherData,
        timestamp: Date.now()
      }))
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      console.error('Error loading weather:', err)
      
      // Intentar cargar desde cache si hay error
      loadFromCache()
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar desde cache (fallback)
  const loadFromCache = useCallback(() => {
    try {
      const cached = localStorage.getItem('cached_weather')
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        
        // Solo usar cache si es menor a 30 minutos
        if (Date.now() - timestamp < 30 * 60 * 1000) {
          setWeather(data)
          return true
        }
      }
    } catch (error) {
      console.warn('Error loading weather from cache:', error)
    }
    return false
  }, [])

  // Refrescar clima manualmente
  const refreshWeather = useCallback(async () => {
    await loadWeather()
  }, [loadWeather])

  // Solicitar permiso de ubicación
  const requestLocation = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Forzar solicitud de ubicación
      await weatherService.getCurrentLocation()
      await loadWeather()
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al solicitar ubicación'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [loadWeather])

  // Usar ubicación por defecto (Santiago, Chile)
  const useDefaultLocation = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const weatherData = await weatherService.getDefaultWeather()
      setWeather(weatherData)
      
      // Guardar en localStorage
      localStorage.setItem('cached_weather', JSON.stringify({
        data: weatherData,
        timestamp: Date.now()
      }))
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener clima por defecto'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Efecto inicial
  useEffect(() => {
    checkLocationPermission()
    
    // Intentar cargar desde cache primero
    const cacheLoaded = loadFromCache()
    
    // Si no hay cache o es muy antiguo, decidir qué hacer
    if (!cacheLoaded) {
      // Si los permisos ya fueron denegados, usar ubicación por defecto
      if (locationPermission === 'denied') {
        useDefaultLocation()
      } else {
        // Intentar cargar con geolocalización, si falla usará fallback automáticamente
        loadWeather()
      }
    }
  }, [checkLocationPermission, loadFromCache, loadWeather, useDefaultLocation, locationPermission])

  // Auto-refresh cada 15 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadWeather()
      }
    }, 15 * 60 * 1000) // 15 minutos

    return () => clearInterval(interval)
  }, [loading, loadWeather])

  return {
    weather,
    loading,
    error,
    refreshWeather,
    requestLocation,
    useDefaultLocation,
    locationPermission
  }
}
