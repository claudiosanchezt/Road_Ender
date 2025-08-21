"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class PaymentModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM payments ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM payments WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO payments (booking_id, amount, currency, status) VALUES ($1,$2,$3,$4) RETURNING *', [payload.booking_id, payload.amount, payload.currency, payload.status]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE payments SET booking_id = COALESCE($1, booking_id), amount = COALESCE($2, amount), currency = COALESCE($3, currency), status = COALESCE($4, status) WHERE id = $5 RETURNING *', [payload.booking_id, payload.amount, payload.currency, payload.status, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM payments WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.PaymentModelRepository = PaymentModelRepository;
