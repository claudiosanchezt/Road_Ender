"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristPlaceModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class TouristPlaceModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM tourist_places ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM tourist_places WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO tourist_places (name, zone_id, description) VALUES ($1, $2, $3) RETURNING *', [payload.name, payload.zone_id || null, payload.description || null]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE tourist_places SET name = COALESCE($1, name), zone_id = COALESCE($2, zone_id), description = COALESCE($3, description) WHERE id = $4 RETURNING *', [payload.name, payload.zone_id, payload.description, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM tourist_places WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.TouristPlaceModelRepository = TouristPlaceModelRepository;
