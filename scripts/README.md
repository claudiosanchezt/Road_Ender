Restart backend script

Uso:

1. Asegúrate de tener Docker corriendo.
2. Desde la raíz del repo ejecuta:

   npm run restart:backend

Esto levantará Mongo/Postgres/Redis/Adminer (si no están arriba), arrancará el servidor API local con `tsx` y ejecutará un smoke-test HTTP. Los logs se escriben en `server.out.log` y `server.err.log` en la raíz del repositorio.

Notas:
- El script está pensado para desarrollo local en Windows PowerShell.
- Si quieres integrarlo en CI, adapta la lógica de arranque a tu entorno de contenedores.
