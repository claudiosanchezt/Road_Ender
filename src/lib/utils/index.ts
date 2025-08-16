import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function para combinar clases de Tailwind CSS
 * Maneja conflictos automáticamente y optimiza el bundle
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formateadores de datos reutilizables
 */
export const formatters = {
  currency: (amount: number, currency = 'CLP') => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount)
  },

  date: (date: string | Date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  },

  dateTime: (date: string | Date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  },

  phone: (phone: string) => {
    // Formato chileno: +56 9 1234 5678
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/)
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
    }
    return phone
  },

  duration: (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`
    }
    if (hours % 1 === 0) {
      return `${hours}h`
    }
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m}min`
  }
}

/**
 * Validaciones comunes reutilizables
 */
export const validators = {
  email: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  phone: (phone: string) => {
    const phoneRegex = /^\+?[\d\s-()]{8,}$/
    return phoneRegex.test(phone)
  },

  password: (password: string) => {
    // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }
}

/**
 * Constantes de la aplicación
 */
export const APP_CONFIG = {
  name: 'Tourist Guides Chile',
  version: '2.0.0',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000,
  },
  storage: {
    tokenKey: 'tg_auth_token',
    userKey: 'tg_user_data',
  },
  pagination: {
    defaultLimit: 12,
    maxLimit: 50,
  },
  map: {
    defaultCenter: { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile
    defaultZoom: 6,
  }
} as const
