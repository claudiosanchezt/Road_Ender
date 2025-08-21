"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospedajeModel = void 0;
const postgres_1 = require("../database/postgres");
exports.HospedajeModel = {
    async list() {
        const res = await postgres_1.pgPool.query('SELECT * FROM hospedajes ORDER BY id');
        return res.rows;
    },
    async get(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM hospedajes WHERE id = $1', [id]);
        return res.rows[0] || null;
    },
    async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO hospedajes (name, description, zone_id, guide_id, price) VALUES ($1,$2,$3,$4,$5) RETURNING *', [payload.name, payload.description || null, payload.zone_id || null, payload.guide_id || null, payload.price || 0]);
        return res.rows[0];
    },
    async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE hospedajes SET name = COALESCE($1, name), description = COALESCE($2, description), zone_id = COALESCE($3, zone_id), guide_id = COALESCE($4, guide_id), price = COALESCE($5, price) WHERE id = $6 RETURNING *', [payload.name || null, payload.description || null, payload.zone_id || null, payload.guide_id || null, payload.price || null, id]);
        return res.rows[0] || null;
    },
    async remove(id) {
        await postgres_1.pgPool.query('DELETE FROM hospedajes WHERE id = $1', [id]);
    }
};
