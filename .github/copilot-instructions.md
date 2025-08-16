<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions - Tourist Guides App

## Contexto del Proyecto
Esta es una aplicación móvil multiplataforma para conectar turistas con guías locales especializados, desarrollada siguiendo el estándar C01.

## Arquitectura
- **Frontend Web**: Next.js + TypeScript + Bootstrap para panel administrativo
- **Mobile**: React Native para Android/iOS
- **Backend**: Node.js/Express con arquitectura de microservicios
- **Bases de Datos**: MongoDB (datamart) + PostgreSQL (transaccional)
- **Containerización**: Docker para compatibilidad multi-nube

## Reglas de Desarrollo

### Estructura de Código
- Usar TypeScript en todo el proyecto
- Seguir patrones de Clean Architecture
- Implementar principios SOLID
- Usar async/await para operaciones asíncronas
- Aplicar naming conventions claras y descriptivas

### Base de Datos
- MongoDB para datos de analytics, perfiles de guías, valoraciones
- PostgreSQL para datos transaccionales, usuarios, reservas
- Usar schemas y validaciones estrictas
- Implementar índices apropiados para consultas frecuentes

### API Design
- Seguir estándares RESTful
- Usar middlewares para autenticación JWT
- Implementar rate limiting y validación de entrada
- Documentar endpoints con OpenAPI/Swagger
- Manejar errores de forma consistente

### Móvil (React Native)
- Usar TypeScript para type safety
- Implementar navegación con React Navigation
- Usar AsyncStorage para persistencia local
- Integrar con APIs nativas para geolocalización y clima
- Optimizar rendimiento con FlatList para listas grandes

### Seguridad
- Hashear contraseñas con bcrypt
- Usar JWT para autenticación
- Validar y sanitizar todas las entradas
- Implementar CORS apropiado
- No exponer información sensible en logs

### DevOps
- Crear Dockerfiles optimizados para producción
- Usar multi-stage builds para imágenes ligeras
- Configurar health checks en contenedores
- Implementar variables de entorno para configuración

### Funcionalidades Específicas

#### Sistema de Scoring de Guías
- Calcular score basado en: valoraciones (40%), tasa de respuesta (20%), experiencia (25%), puntualidad (15%)
- Actualizar scores en tiempo real con eventos
- Usar agregaciones MongoDB para cálculos eficientes

#### Medición Climática
- Integrar con APIs meteorológicas (OpenWeatherMap, etc.)
- Almacenar datos históricos para análisis de tendencias
- Calcular índices de complejidad por zona
- Considerar presión atmosférica para actividades de montaña

#### Geolocalización
- Usar servicios de mapas (Google Maps, Mapbox)
- Implementar búsqueda por proximidad
- Calcular rutas y tiempos de traslado
- Considerar accesibilidad de zonas

## Patrones a Seguir
- Repository Pattern para acceso a datos
- Service Layer para lógica de negocio
- DTO (Data Transfer Objects) para APIs
- Factory Pattern para creación de objetos complejos
- Observer Pattern para notificaciones en tiempo real

## Testing
- Unit tests con Jest
- Integration tests para APIs
- E2E tests para flujos críticos
- Mocking de servicios externos
- Coverage mínimo del 80%

## Convenciones de Naming
- **Archivos**: kebab-case (user-service.ts)
- **Clases**: PascalCase (UserService)
- **Variables/Funciones**: camelCase (getUserProfile)
- **Constantes**: UPPER_SNAKE_CASE (MAX_GUIDES_PER_ZONE)
- **Interfaces**: I prefix (IUserRepository)

Cuando generes código, siempre considera estas reglas y la arquitectura general del proyecto.
