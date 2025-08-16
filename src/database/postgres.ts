import { Pool } from 'pg';

const POSTGRES_URI = process.env.POSTGRES_URI || 'postgresql://postgres:postgres@localhost:5432/tourist_guides';

export const pgPool = new Pool({
  connectionString: POSTGRES_URI,
});

pgPool.on('connect', () => {
  console.log('PostgreSQL conectado');
});

pgPool.on('error', (err) => {
  console.error('Error en PostgreSQL:', err);
});
