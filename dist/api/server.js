"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("../database/mongo");
const postgres_1 = require("../database/postgres");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// En desarrollo queremos que el backend escuche en 3000 por defecto
// y en producción en 4000, salvo que se pase la variable de entorno PORT.
const PORT = Number(process.env.PORT ?? (process.env.NODE_ENV === 'production' ? 4000 : 3000));
const repoRoot = path_1.default.resolve(__dirname, '..', '..');
const readyFile = path_1.default.join(repoRoot, 'server.ready');
// remove stale ready sentinel if exists
try {
    if (fs_1.default.existsSync(readyFile)) {
        fs_1.default.unlinkSync(readyFile);
    }
}
catch (e) { /* ignore */ }
// Helpers: verificar que Postgres responde ejecutando un simple SELECT 1
async function waitForPostgres(retries = 5, intervalMs = 2000) {
    const pool = postgres_1.pgPool;
    if (!pool)
        throw new Error('pgPool not initialized');
    for (let i = 0; i < retries; i++) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const res = await pool.query('SELECT 1');
            console.log('Postgres is available');
            return;
        }
        catch (err) {
            console.warn(`Postgres check failed (attempt ${i + 1}/${retries}):`, err && err.message ? err.message : err);
            if (i < retries - 1)
                await new Promise((r) => setTimeout(r, intervalMs));
        }
    }
    throw new Error('Postgres did not become available in time');
}
(async () => {
    try {
        const retries = Number(process.env.DB_HEALTH_RETRIES ?? 8);
        const intervalMs = Number(process.env.DB_HEALTH_INTERVAL_MS ?? 3000);
        await waitForPostgres(retries, intervalMs);
        await (0, mongo_1.connectMongo)();
        // Escuchar en todas las interfaces para evitar problemas con ::1 vs 127.0.0.1
        app_1.default.listen(PORT, '0.0.0.0', () => {
            console.log(`API server running on port ${PORT}`);
            try {
                fs_1.default.writeFileSync(readyFile, `ready ${new Date().toISOString()}`);
                console.log(`Wrote ready sentinel: ${readyFile}`);
            }
            catch (e) {
                console.error('Failed to write ready sentinel', e);
            }
        });
    }
    catch (err) {
        console.error('Startup failed:', err && err.message ? err.message : err);
        process.exit(1);
    }
})();
