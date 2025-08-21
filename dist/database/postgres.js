"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgPool = void 0;
const pg_1 = require("pg");
// Support multiple env var names and sensible defaults (match docker-compose)
const CONNECTION_ENV = process.env.POSTGRES_URL || process.env.POSTGRES_URI || process.env.POSTGRES_CONNECTION || 'postgresql://postgres:password@localhost:5432/tourist_guides_db';
function maskConnectionString(conn) {
    try {
        // Basic mask: replace password between ':' and '@'
        return conn.replace(/:\w+@/, ':*****@');
    }
    catch (e) {
        return conn;
    }
}
let pool = null;
function createPool() {
    try {
        console.log('Postgres connecting to', maskConnectionString(CONNECTION_ENV));
        const p = new pg_1.Pool({ connectionString: CONNECTION_ENV });
        p.on('connect', () => console.log('PostgreSQL conectado'));
        p.on('error', (err) => console.error('Error en PostgreSQL pool:', err));
        return p;
    }
    catch (err) {
        console.error('Failed to create Postgres pool:', err);
        return null;
    }
}
// Lazy create pool so app can start even if DB credentials are wrong; callers should handle empty pool
try {
    pool = createPool();
}
catch (err) {
    console.error('Postgres pool init error:', err);
}
// Exportar con cast para evitar checks de null en lugares que asumen pool presente
exports.pgPool = pool;
