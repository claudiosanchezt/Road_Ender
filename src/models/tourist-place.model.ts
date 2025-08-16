import { pgPool } from '../database/postgres';

export interface TouristPlace {
  id: number;
  name: string;
  zone_id?: number | null;
  description?: string | null;
  created_at?: string;
}

export class TouristPlaceModelRepository {
  static async findAll(): Promise<TouristPlace[]> {
    const res = await pgPool.query('SELECT * FROM tourist_places ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<TouristPlace | null> {
    const res = await pgPool.query('SELECT * FROM tourist_places WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<TouristPlace>): Promise<TouristPlace> {
    const res = await pgPool.query(
      'INSERT INTO tourist_places (name, zone_id, description) VALUES ($1, $2, $3) RETURNING *',
      [payload.name, payload.zone_id || null, payload.description || null]
    );
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<TouristPlace>): Promise<TouristPlace | null> {
    const res = await pgPool.query(
      'UPDATE tourist_places SET name = COALESCE($1, name), zone_id = COALESCE($2, zone_id), description = COALESCE($3, description) WHERE id = $4 RETURNING *',
      [payload.name, payload.zone_id, payload.description, id]
    );
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM tourist_places WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
