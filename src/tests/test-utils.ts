import { execSync } from 'child_process';

export function truncateHospedajeTables() {
  // Ejecuta un TRUNCATE seguro desde el host usando psql dentro del contenedor Postgres
  try {
    execSync('docker exec -i road_ender-postgres-1 psql -U postgres -d tourist_guides_db -c "TRUNCATE TABLE alimentacion_options, hospedajes RESTART IDENTITY CASCADE;"', { stdio: 'inherit' });
  } catch (e) {
    // No fallar los tests si el entorno no tiene docker (ej: CI que arranca el servidor de otra forma)
    console.warn('truncateHospedajeTables: no se pudo truncar tablas (container may be absent)', String(e));
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
