import { pgPool } from '../database/postgres';

export interface Booking {
  id: number;
  client_id: string; // MongoDB user id (string)
  guide_id: number;
  zone_id?: number | null;
  tourist_place_id?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string;
}

export class BookingModelRepository {
  static async findAll(): Promise<Booking[]> {
    const res = await pgPool.query('SELECT * FROM bookings ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Booking | null> {
    const res = await pgPool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Booking>): Promise<Booking> {
    const res = await pgPool.query(
      `INSERT INTO bookings (client_id, guide_id, zone_id, tourist_place_id, start_date, end_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [payload.client_id, payload.guide_id, payload.zone_id || null, payload.tourist_place_id || null, payload.start_date || null, payload.end_date || null]
    );
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Booking>): Promise<Booking | null> {
    const res = await pgPool.query(
      `UPDATE bookings SET client_id = COALESCE($1, client_id), guide_id = COALESCE($2, guide_id), zone_id = COALESCE($3, zone_id), tourist_place_id = COALESCE($4, tourist_place_id), start_date = COALESCE($5, start_date), end_date = COALESCE($6, end_date) WHERE id = $7 RETURNING *`,
      [payload.client_id, payload.guide_id, payload.zone_id, payload.tourist_place_id, payload.start_date, payload.end_date, id]
    );
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM bookings WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
