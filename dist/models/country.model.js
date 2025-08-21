"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class CountryModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM countries ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM countries WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO countries (name, continent_id) VALUES ($1,$2) RETURNING *', [payload.name, payload.continent_id || null]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE countries SET name = COALESCE($1, name), continent_id = COALESCE($2, continent_id) WHERE id = $3 RETURNING *', [payload.name, payload.continent_id, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM countries WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.CountryModelRepository = CountryModelRepository;
