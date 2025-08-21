// Configuración JWT - Tourist Guides App

export interface JwtConfig {
  secret: string
  expiresIn: string
  refreshExpiresIn: string
  issuer: string
  audience: string
}

export interface TokenPayload {
  userId: number
  email: string
  userType: 'client' | 'guide' | 'admin'
  guideId?: number
  permissions: string[]
}

export interface RefreshTokenPayload {
  userId: number
  tokenVersion: number
}

export const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || 'tourist-guides-app-secret-key-2024-production',
  expiresIn: '1h',
  refreshExpiresIn: '7d',
  issuer: 'tourist-guides-app',
  audience: 'tourist-guides-users'
}

export const JWT_CONSTANTS = {
  HEADER_NAME: 'Authorization',
  BEARER_PREFIX: 'Bearer ',
  REFRESH_COOKIE_NAME: 'refreshToken',
  TOKEN_TYPE: 'access',
  REFRESH_TYPE: 'refresh'
} as const

// Permisos por tipo de usuario
export const USER_PERMISSIONS = {
  client: [
    'booking:create',
    'booking:read:own',
    'booking:update:own',
    'booking:cancel:own',
    'review:create',
    'review:read',
    'favorites:manage',
    'profile:read:own',
    'profile:update:own'
  ],
  guide: [
    'booking:read:own',
    'booking:update:own',
    'booking:accept',
    'booking:decline',
    'review:read:own',
    'review:respond',
    'profile:read:own',
    'profile:update:own',
    'guide:update:availability',
    'guide:update:pricing',
    'weather:read',
    'analytics:read:own'
  ],
  admin: [
    'user:read:all',
    'user:update:all',
    'user:delete:all',
    'booking:read:all',
    'booking:update:all',
    'guide:read:all',
    'guide:update:all',
    'zone:manage',
    'specialty:manage',
    'language:manage',
    'analytics:read:all',
    'weather:manage',
    'system:admin'
  ]
} as const

export type UserType = keyof typeof USER_PERMISSIONS
export type Permission = typeof USER_PERMISSIONS[UserType][number]
