"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinentModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class ContinentModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM continents ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM continents WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO continents (name) VALUES ($1) RETURNING *', [payload.name]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE continents SET name = COALESCE($1, name) WHERE id = $2 RETURNING *', [payload.name, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM continents WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.ContinentModelRepository = ContinentModelRepository;
