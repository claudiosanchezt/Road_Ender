# Tourist Guides App

Aplicación móvil multiplataforma para conectar turistas con guías locales especializados.

## 🏗️ Arquitectura del Sistema

### Frontend
- **Web Panel**: Next.js + TypeScript + Bootstrap (Panel administrativo)
- **Móvil**: React Native (Android/iOS)

### Backend
- **API Gateway**: Express.js con microservicios
- **Bases de Datos**:
  - MongoDB: DataMart para analytics y valoraciones
  - PostgreSQL: Base transaccional para operaciones diarias

### DevOps
- **Containerización**: Docker para compatibilidad multi-nube
- **Despliegue**: Compatible con AWS, Azure, GCP

## 🚀 Funcionalidades Principales

### Para Turistas
- Búsqueda de guías por especialidad y zona
- Sistema de valoraciones y reviews
- Contacto directo con guías
- **🌤️ Clima en tiempo real con geolocalización**
- Medición de complejidad climática por zona
- Información de presión atmosférica

### Para Guías
- Perfil profesional con especialidades
- Gestión de disponibilidad por zonas
- Sistema de score dinámico basado en valoraciones
- Panel de estadísticas y earnings

### Administración
- Dashboard con métricas en tiempo real
- Gestión de usuarios (turistas y guías)
- Analytics de zonas más demandadas
- Reportes de clima y condiciones por zona

## 📱 Estructura del Proyecto

```
tourist-guides-app/
├── web-panel/          # Next.js Web Application
├── mobile-app/         # React Native Mobile App
├── backend-api/        # Express.js Microservices
├── database/           # Database schemas and migrations
├── docker/             # Docker configurations
├── docs/               # Architecture and API documentation
└── infrastructure/     # Cloud deployment configs
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- Docker & Docker Compose
- MongoDB
- PostgreSQL

### Configuración Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Levantar bases de datos con Docker
docker-compose up -d mongodb postgres

# Ejecutar en modo desarrollo
npm run dev
```

### Docker (Recomendado)

```bash
# Construir imagen
npm run docker:build

# Ejecutar contenedor
npm run docker:run
```

## 🗂️ Base de Datos

### MongoDB (DataMart)
- Perfiles de guías con especialidades
- Historial de valoraciones y reviews
- Analytics de zonas turísticas
- Datos climáticos históricos

### PostgreSQL (Transaccional)
- Usuarios y autenticación
- Reservas y pagos
- Logs de actividad
- Configuraciones del sistema

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/refresh` - Renovar token

### Guías
- `GET /api/guides` - Listar guías disponibles
- `GET /api/guides/:id` - Detalle de guía
- `POST /api/guides/:id/contact` - Contactar guía
- `POST /api/guides/:id/review` - Valorar guía

### Zonas
- `GET /api/zones` - Listar zonas turísticas
- `GET /api/zones/:id/weather` - Información climática
- `GET /api/zones/:id/complexity` - Nivel de complejidad

## 🌤️ Sistema de Clima en Tiempo Real

### Funcionalidades
- **Geolocalización automática** del usuario
- **Clima actual** usando OpenWeatherMap API
- **Datos locales** con temperatura, humedad, presión, viento
- **Fallback inteligente** con datos de demostración
- **Cache automático** para optimizar llamadas a la API

### Configuración de la API de Clima

1. **Registrarse en OpenWeatherMap**:
   - Ve a [https://openweathermap.org/api](https://openweathermap.org/api)
   - Crea una cuenta gratuita (1000 llamadas/día)
   - Obtén tu API key

2. **Configurar la aplicación**:
   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env.local
   
   # Edita .env.local y agrega tu API key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui
   ```

3. **Reiniciar el servidor**:
   ```bash
   npm run dev
   ```

### Permisos de Geolocalización
- La app solicitará permisos de ubicación automáticamente
- Si se deniegan, mostrará clima de Santiago como fallback
- Los usuarios pueden otorgar permisos posteriormente

### Datos Mostrados
- 🌡️ **Temperatura** en Celsius
- 💧 **Humedad** relativa
- 🌬️ **Velocidad del viento** en km/h
- 📊 **Presión atmosférica** en hPa
- 👁️ **Visibilidad** en kilómetros
- 📍 **Ubicación** de la ciudad detectada

## 📊 Métricas y Scoring

### Score de Guías
- Valoraciones de clientes (40%)
- Tasa de respuesta (20%)
- Experiencia y especialización (25%)
- Disponibilidad y puntualidad (15%)

### Complejidad de Zonas
- Dificultad del terreno
- Condiciones climáticas
- Presión atmosférica
- Accesibilidad

## 🔧 Tecnologías Utilizadas

- **Frontend Web**: Next.js, TypeScript, Bootstrap, React Bootstrap
- **Mobile**: React Native, Expo
- **Backend**: Node.js, Express.js, TypeScript
- **Databases**: MongoDB, PostgreSQL
- **Authentication**: JWT, bcrypt
- **DevOps**: Docker, Docker Compose
- **Testing**: Jest, React Testing Library
- **Documentation**: Swagger/OpenAPI

## 📈 Roadmap

### Fase 1 (Actual)
- [x] Configuración inicial del proyecto
- [ ] Estructura de bases de datos
- [ ] API básica de autenticación
- [ ] Panel web administrativo

### Fase 2
- [ ] App móvil React Native
- [ ] Sistema de valoraciones
- [ ] Integración con APIs de clima

### Fase 3
- [ ] Despliegue en la nube
- [ ] Sistema de pagos
- [ ] Analytics avanzados
- [ ] Notificaciones push

## 🤝 Contribución

Este proyecto sigue el estándar C01 para desarrollo colaborativo.

## 📄 Licencia

MIT License
