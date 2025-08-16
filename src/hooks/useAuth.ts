// Hook para manejar autenticación - Tourist Guides App
import { useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'client' | 'guide'
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isAuthenticated: boolean
  isDemo: boolean
  loading: boolean
}

export interface AuthActions {
  login: (userData: User) => void
  logout: () => void
  getDisplayName: () => string
  canContactGuides: () => boolean
  canWriteReviews: () => boolean
}

export function useAuth(): AuthState & AuthActions {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isAuthenticated: false,
    isDemo: false,
    loading: true
  })

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Verificar si estamos en el cliente
        if (typeof window === 'undefined') {
          setAuthState({
            user: null,
            isLoggedIn: false,
            isAuthenticated: false,
            isDemo: false,
            loading: false
          })
          return
        }

        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')

        if (token && userData) {
          const user = JSON.parse(userData)
          setAuthState({
            user,
            isLoggedIn: true,
            isAuthenticated: true,
            isDemo: false,
            loading: false
          })
        } else {
          // Usuario demo por defecto
          const demoUser = {
            id: 'user-2',
            email: 'demo@example.com',
            firstName: 'Ana',
            lastName: 'Martínez',
            userType: 'client' as const
          }
          setAuthState({
            user: demoUser,
            isLoggedIn: true,
            isAuthenticated: false,
            isDemo: true,
            loading: false
          })
        }
      } catch (error) {
        console.error('Error al verificar estado de autenticación:', error)
        setAuthState({
          user: null,
          isLoggedIn: false,
          isAuthenticated: false,
          isDemo: false,
          loading: false
        })
      }
    }

    checkAuthStatus()

    // Escuchar cambios en localStorage (para múltiples pestañas)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkAuthStatus)
      return () => window.removeEventListener('storage', checkAuthStatus)
    }
  }, [])

  const login = (userData: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(userData))
      localStorage.setItem('auth_token', 'demo_token_' + Date.now())
    }
    setAuthState({
      user: userData,
      isLoggedIn: true,
      isAuthenticated: true,
      isDemo: false,
      loading: false
    })
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data')
      localStorage.removeItem('auth_token')
    }
    // Volver al usuario demo
    const demoUser = {
      id: 'user-2',
      email: 'demo@example.com',
      firstName: 'Ana',
      lastName: 'Martínez',
      userType: 'client' as const
    }
    setAuthState({
      user: demoUser,
      isLoggedIn: true,
      isAuthenticated: false,
      isDemo: true,
      loading: false
    })
  }

  const getDisplayName = (): string => {
    if (authState.user) {
      const name = `${authState.user.firstName} ${authState.user.lastName}`.trim()
      return authState.isDemo ? `${name} (Demo)` : name
    }
    return 'Usuario'
  }

  const canContactGuides = (): boolean => {
    return authState.isAuthenticated && !authState.isDemo
  }

  const canWriteReviews = (): boolean => {
    return authState.isAuthenticated && !authState.isDemo
  }

  return {
    ...authState,
    login,
    logout,
    getDisplayName,
    canContactGuides,
    canWriteReviews
  }
}

export default useAuth
