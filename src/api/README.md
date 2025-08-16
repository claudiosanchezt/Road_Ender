# API Backend - Resumen para Frontend

Este archivo resume los endpoints críticos disponibles en el backend y ejemplos de uso para desarrollo frontend (web y mobile).

Base URL (desarrollo):
- http://localhost:4000

Autenticación
- POST /api/auth/login
  - Body: { "username": "admin", "password": "admin123" }
  - Response: { "token": "<jwt>" }
- POST /api/auth/register (mock)

Endpoints prioritarios (para comenzar frontend)
- Users (protegido por JWT)
  - GET /api/users
  - GET /api/users/:id
  - POST /api/users
  - PUT /api/users/:id
  - DELETE /api/users/:id

- Guides (protegido)
  - GET /api/guides
  - GET /api/guides/:id
  - GET /api/guides/:id/specialties
  - GET /api/guides/:id/languages

- Zones (protegido)
  - GET /api/zones
  - GET /api/zones/:id

- Tourist places (protegido)
  - GET /api/tourist-places

- Specialties, Languages, Bookings, Favorites, Payments, Notifications, Weather Alerts
  - Ver `src/api/routes` para la lista completa.

Ejemplo de uso (fetch + token)

1) Obtener token (login):

POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }

2) Usar token en requests protegidos

Headers:
  Authorization: Bearer <token>

Ejemplo curl:

curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'

Luego:

curl http://localhost:4000/api/zones -H "Authorization: Bearer <token>"

Notas importantes
- El endpoint de login actualmente usa un usuario mock (admin/admin123). Para producción/QA conectar a la colección de usuarios en Mongo.
- `server.ready` sentinel se crea en la raíz del repo cuando el servidor está listo (útil para scripts de CI/local).
- Swagger UI disponible en: http://localhost:4000/api-docs

Contacto
- Para dudas sobre contratos JSON o cambios, editar `docs/swagger.json` y avisar al equipo frontend.
