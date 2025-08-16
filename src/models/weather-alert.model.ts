import { pgPool } from '../database/postgres';

export interface WeatherAlert {
  id: number;
  zone_id: number;
  message: string;
  severity: string;
}

export class WeatherAlertModelRepository {
  static async findAll(): Promise<WeatherAlert[]> {
    const res = await pgPool.query('SELECT * FROM weather_alerts ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<WeatherAlert | null> {
    const res = await pgPool.query('SELECT * FROM weather_alerts WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<WeatherAlert>): Promise<WeatherAlert> {
    const res = await pgPool.query('INSERT INTO weather_alerts (zone_id, message, severity) VALUES ($1,$2,$3) RETURNING *', [payload.zone_id, payload.message, payload.severity]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<WeatherAlert>): Promise<WeatherAlert | null> {
    const res = await pgPool.query('UPDATE weather_alerts SET zone_id = COALESCE($1, zone_id), message = COALESCE($2, message), severity = COALESCE($3, severity) WHERE id = $4 RETURNING *', [payload.zone_id, payload.message, payload.severity, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM weather_alerts WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
