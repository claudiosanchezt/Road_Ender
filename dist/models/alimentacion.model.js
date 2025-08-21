"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlimentacionModel = void 0;
const postgres_1 = require("../database/postgres");
exports.AlimentacionModel = {
    async listByHospedaje(hospedajeId) {
        const res = await postgres_1.pgPool.query('SELECT * FROM alimentacion_options WHERE hospedaje_id = $1 ORDER BY id', [hospedajeId]);
        return res.rows;
    },
    async get(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM alimentacion_options WHERE id = $1', [id]);
        return res.rows[0] || null;
    },
    async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO alimentacion_options (hospedaje_id, type, price, notes) VALUES ($1,$2,$3,$4) RETURNING *', [payload.hospedaje_id, payload.type, payload.price || 0, payload.notes || null]);
        return res.rows[0];
    },
    async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE alimentacion_options SET type = COALESCE($1, type), price = COALESCE($2, price), notes = COALESCE($3, notes) WHERE id = $4 RETURNING *', [payload.type || null, payload.price || null, payload.notes || null, id]);
        return res.rows[0] || null;
    },
    async remove(id) {
        await postgres_1.pgPool.query('DELETE FROM alimentacion_options WHERE id = $1', [id]);
    }
};
