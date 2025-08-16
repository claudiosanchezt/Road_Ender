// 🌐 Cliente API Centralizado - Tourist Guides Frontend
// Configuración robusta con interceptors y manejo de errores

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { APP_CONFIG } from '../utils'
import type { ApiResponse } from '../../types/frontend'

// ===================================
// CONFIGURACIÓN BASE
// ===================================

class ApiClient {
  private api: AxiosInstance
  private static instance: ApiClient

  constructor() {
    this.api = axios.create({
      baseURL: APP_CONFIG.api.baseUrl,
      timeout: APP_CONFIG.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    this.setupInterceptors()
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private setupInterceptors() {
    // Request interceptor - Agregar token automáticamente
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor - Manejo centralizado de errores
    this.api.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response
      },
      (error: AxiosError<ApiResponse>) => {
        // Manejo de errores 401 - Token expirado
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        
        // Manejo de errores de red
        if (!error.response) {
          throw new Error('Error de conexión. Verifica tu internet.')
        }

        // Extraer mensaje de error del backend
        const message = error.response.data?.message || 'Error inesperado'
        throw new Error(message)
      }
    )
  }

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(APP_CONFIG.storage.tokenKey)
  }

  private handleUnauthorized() {
    if (typeof window === 'undefined') return
    
    // Limpiar almacenamiento local
    localStorage.removeItem(APP_CONFIG.storage.tokenKey)
    localStorage.removeItem(APP_CONFIG.storage.userKey)
    
    // Redirigir a login
    window.location.href = '/login'
  }

  // ===================================
  // MÉTODOS PÚBLICOS
  // ===================================

  public setToken(token: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem(APP_CONFIG.storage.tokenKey, token)
  }

  public clearToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(APP_CONFIG.storage.tokenKey)
    localStorage.removeItem(APP_CONFIG.storage.userKey)
  }

  public async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(url, { params })
    return response.data
  }

  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data)
    return response.data
  }

  public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data)
    return response.data
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url)
    return response.data
  }
}

// Singleton instance
export const apiClient = ApiClient.getInstance()

// ===================================
// SERVICIOS ESPECÍFICOS
// ===================================

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/api/auth/login', credentials),
  
  register: (userData: any) =>
    apiClient.post('/api/auth/register', userData),
  
  profile: () =>
    apiClient.get('/api/auth/profile'),
  
  refreshToken: () =>
    apiClient.post('/api/auth/refresh'),
}

export const guidesApi = {
  search: (filters?: any) =>
    apiClient.get('/api/guides/search', filters),
  
  getById: (id: string) =>
    apiClient.get(`/api/guides/${id}`),
  
  getAvailability: (id: string, date?: string) =>
    apiClient.get(`/api/guides/${id}/availability`, { date }),
  
  getReviews: (id: string) =>
    apiClient.get(`/api/guides/${id}/reviews`),
}

export const geographyApi = {
  getContinents: () =>
    apiClient.get('/api/geography/continents'),
  
  getCountries: (continent?: string) =>
    apiClient.get('/api/geography/countries', { continent }),
  
  getStates: (country?: string) =>
    apiClient.get('/api/geography/states', { country }),
  
  getZones: (filters?: any) =>
    apiClient.get('/api/geography/zones', filters),
}

export const toursApi = {
  search: (filters?: any) =>
    apiClient.get('/api/tours', filters),
  
  getById: (id: string) =>
    apiClient.get(`/api/tours/${id}`),
  
  getByZone: (zoneId: string) =>
    apiClient.get(`/api/tours/zone/${zoneId}`),
  
  getByCategory: (categoryId: string) =>
    apiClient.get(`/api/tours/category/${categoryId}`),
  
  book: (tourId: string, bookingData: any) =>
    apiClient.post(`/api/tours/${tourId}/book`, bookingData),
}

export const pricingApi = {
  calculate: (params: any) =>
    apiClient.get('/api/pricing/calculate', params),
  
  getGuidePrice: (guideId: string) =>
    apiClient.get(`/api/pricing/guide/${guideId}`),
}

export const bookingsApi = {
  getMyBookings: () =>
    apiClient.get('/api/bookings/my'),
  
  getById: (id: string) =>
    apiClient.get(`/api/bookings/${id}`),
  
  cancel: (id: string, reason?: string) =>
    apiClient.put(`/api/bookings/${id}/cancel`, { reason }),
}

export const reviewsApi = {
  create: (reviewData: any) =>
    apiClient.post('/api/reviews', reviewData),
  
  getByTour: (tourId: string) =>
    apiClient.get(`/api/reviews/tour/${tourId}`),
  
  getByGuide: (guideId: string) =>
    apiClient.get(`/api/reviews/guide/${guideId}`),
}
