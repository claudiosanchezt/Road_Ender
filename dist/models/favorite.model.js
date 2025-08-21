"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class FavoriteModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM favorite_zones ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM favorite_zones WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO favorite_zones (user_id, zone_id) VALUES ($1,$2) RETURNING *', [payload.user_id, payload.zone_id]);
        return res.rows[0];
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM favorite_zones WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.FavoriteModelRepository = FavoriteModelRepository;
