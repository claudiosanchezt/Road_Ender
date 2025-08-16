import { pgPool } from '../database/postgres';

export interface FavoriteZone {
  id: number;
  user_id: string; // Mongo user id
  zone_id: number;
}

export class FavoriteModelRepository {
  static async findAll(): Promise<FavoriteZone[]> {
    const res = await pgPool.query('SELECT * FROM favorite_zones ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<FavoriteZone | null> {
    const res = await pgPool.query('SELECT * FROM favorite_zones WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<FavoriteZone>): Promise<FavoriteZone> {
    const res = await pgPool.query('INSERT INTO favorite_zones (user_id, zone_id) VALUES ($1,$2) RETURNING *', [payload.user_id, payload.zone_id]);
    return res.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM favorite_zones WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
