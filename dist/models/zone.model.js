"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class ZoneModelRepository {
    static async findAll() {
        try {
            const res = await postgres_1.pgPool.query('SELECT * FROM zones ORDER BY id');
            return res.rows;
        }
        catch (err) {
            console.error('ZoneModelRepository.findAll error:', err);
            // On DB errors return empty list to avoid crashing callers; controller can decide how to handle
            return [];
        }
    }
    static async findById(id) {
        try {
            const res = await postgres_1.pgPool.query('SELECT * FROM zones WHERE id = $1', [id]);
            return res.rows[0] || null;
        }
        catch (err) {
            console.error('ZoneModelRepository.findById error:', err);
            return null;
        }
    }
    static async create(payload) {
        try {
            const res = await postgres_1.pgPool.query('INSERT INTO zones (name, region) VALUES ($1, $2) RETURNING *', [payload.name, payload.region || null]);
            return res.rows[0];
        }
        catch (err) {
            console.error('ZoneModelRepository.create error:', err);
            throw new Error('DB error');
        }
    }
    static async update(id, payload) {
        try {
            const res = await postgres_1.pgPool.query('UPDATE zones SET name = COALESCE($1, name), region = COALESCE($2, region) WHERE id = $3 RETURNING *', [payload.name, payload.region, id]);
            return res.rows[0] || null;
        }
        catch (err) {
            console.error('ZoneModelRepository.update error:', err);
            return null;
        }
    }
    static async delete(id) {
        try {
            const res = await postgres_1.pgPool.query('DELETE FROM zones WHERE id = $1', [id]);
            return (res?.rowCount || 0) > 0;
        }
        catch (err) {
            console.error('ZoneModelRepository.delete error:', err);
            return false;
        }
    }
}
exports.ZoneModelRepository = ZoneModelRepository;
