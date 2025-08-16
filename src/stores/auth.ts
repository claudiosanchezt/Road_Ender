// 🔐 Store de Autenticación - Zustand
// Gestión global del estado de autenticación

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authApi, apiClient } from '../lib/api/client'
import { APP_CONFIG } from '../lib/utils'
import type { AuthUser, LoginForm, RegisterForm } from '../types/frontend'

interface AuthState {
  // Estado
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Acciones
  login: (credentials: LoginForm) => Promise<void>
  register: (userData: RegisterForm) => Promise<void>
  logout: () => void
  clearError: () => void
  refreshProfile: () => Promise<void>
  
  // Utilidades
  isGuide: () => boolean
  isClient: () => boolean
  isAdmin: () => boolean
  getFullName: () => string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (credentials: LoginForm) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await authApi.login(credentials)
          
          if (response.success && response.data) {
            const { user, token } = response.data as any
            
            // Agregar computed properties
            const authUser: AuthUser = {
              ...user,
              fullName: `${user.firstName} ${user.lastName}`
            }
            
            // Guardar token en API client
            apiClient.setToken(token)
            
            set({
              user: authUser,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
          } else {
            throw new Error(response.message || 'Error en el login')
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Error inesperado'
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: message
          })
          throw error
        }
      },

      // Registro
      register: async (userData: RegisterForm) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await authApi.register(userData)
          
          if (response.success && response.data) {
            const { user, token } = response.data as any
            
            // Agregar computed properties
            const authUser: AuthUser = {
              ...user,
              fullName: `${user.firstName} ${user.lastName}`
            }
            
            // Guardar token en API client
            apiClient.setToken(token)
            
            set({
              user: authUser,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
          } else {
            throw new Error(response.message || 'Error en el registro')
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Error inesperado'
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: message
          })
          throw error
        }
      },

      // Logout
      logout: () => {
        apiClient.clearToken()
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      },

      // Limpiar error
      clearError: () => {
        set({ error: null })
      },

      // Actualizar perfil
      refreshProfile: async () => {
        try {
          const response = await authApi.profile()
          
          if (response.success && response.data) {
            const user = response.data as any
            const authUser: AuthUser = {
              ...user,
              fullName: `${user.firstName} ${user.lastName}`
            }
            
            set({ user: authUser, isAuthenticated: true })
          }
        } catch (error) {
          // Si falla, probablemente el token expiró
          get().logout()
        }
      },

      // Utilidades
      isGuide: () => {
        const { user } = get()
        return user?.userType === 'guide'
      },

      isClient: () => {
        const { user } = get()
        return user?.userType === 'client'
      },

      isAdmin: () => {
        const { user } = get()
        return user?.userType === 'admin'
      },

      getFullName: () => {
        const { user } = get()
        return user?.fullName || ''
      }
    }),
    {
      name: APP_CONFIG.storage.userKey,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
