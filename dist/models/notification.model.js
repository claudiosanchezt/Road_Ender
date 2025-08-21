"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class NotificationModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM notifications ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM notifications WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO notifications (user_id, title, body, read) VALUES ($1,$2,$3,$4) RETURNING *', [payload.user_id, payload.title, payload.body, payload.read || false]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE notifications SET title = COALESCE($1, title), body = COALESCE($2, body), read = COALESCE($3, read) WHERE id = $4 RETURNING *', [payload.title, payload.body, payload.read, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM notifications WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.NotificationModelRepository = NotificationModelRepository;
