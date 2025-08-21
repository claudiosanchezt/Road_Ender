"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class SpecialtyModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM specialties ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM specialties WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO specialties (name, category_id) VALUES ($1,$2) RETURNING *', [payload.name, payload.category_id || null]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE specialties SET name = COALESCE($1, name), category_id = COALESCE($2, category_id) WHERE id = $3 RETURNING *', [payload.name, payload.category_id, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM specialties WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.SpecialtyModelRepository = SpecialtyModelRepository;
