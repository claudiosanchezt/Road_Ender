import { pgPool } from '../database/postgres';

export interface Zone {
  id: number;
  name: string;
  region?: string | null;
  created_at?: string;
}

export class ZoneModelRepository {
  static async findAll(): Promise<Zone[]> {
    try {
      const res = await pgPool.query('SELECT * FROM zones ORDER BY id');
      return res.rows;
    } catch (err) {
      console.error('ZoneModelRepository.findAll error:', err);
      // On DB errors return empty list to avoid crashing callers; controller can decide how to handle
      return [];
    }
  }

  static async findById(id: number): Promise<Zone | null> {
    try {
      const res = await pgPool.query('SELECT * FROM zones WHERE id = $1', [id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error('ZoneModelRepository.findById error:', err);
      return null;
    }
  }

  static async create(payload: Partial<Zone>): Promise<Zone> {
    try {
      const res = await pgPool.query(
        'INSERT INTO zones (name, region) VALUES ($1, $2) RETURNING *',
        [payload.name, payload.region || null]
      );
      return res.rows[0];
    } catch (err) {
      console.error('ZoneModelRepository.create error:', err);
      throw new Error('DB error');
    }
  }

  static async update(id: number, payload: Partial<Zone>): Promise<Zone | null> {
    try {
      const res = await pgPool.query(
        'UPDATE zones SET name = COALESCE($1, name), region = COALESCE($2, region) WHERE id = $3 RETURNING *',
        [payload.name, payload.region, id]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.error('ZoneModelRepository.update error:', err);
      return null;
    }
  }

  static async delete(id: number): Promise<boolean> {
  try {
    const res = await pgPool.query('DELETE FROM zones WHERE id = $1', [id]);
    return (res?.rowCount || 0) > 0;
  } catch (err) {
    console.error('ZoneModelRepository.delete error:', err);
    return false;
  }
  }
}
