"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAlertModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class WeatherAlertModelRepository {
    static async findAll() {
        const res = await postgres_1.pgPool.query('SELECT * FROM weather_alerts ORDER BY id');
        return res.rows;
    }
    static async findById(id) {
        const res = await postgres_1.pgPool.query('SELECT * FROM weather_alerts WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    static async create(payload) {
        const res = await postgres_1.pgPool.query('INSERT INTO weather_alerts (zone_id, message, severity) VALUES ($1,$2,$3) RETURNING *', [payload.zone_id, payload.message, payload.severity]);
        return res.rows[0];
    }
    static async update(id, payload) {
        const res = await postgres_1.pgPool.query('UPDATE weather_alerts SET zone_id = COALESCE($1, zone_id), message = COALESCE($2, message), severity = COALESCE($3, severity) WHERE id = $4 RETURNING *', [payload.zone_id, payload.message, payload.severity, id]);
        return res.rows[0] || null;
    }
    static async delete(id) {
        const res = await postgres_1.pgPool.query('DELETE FROM weather_alerts WHERE id = $1', [id]);
        return (res?.rowCount || 0) > 0;
    }
}
exports.WeatherAlertModelRepository = WeatherAlertModelRepository;
