import { pgPool } from '../database/postgres';

export interface Zone {
  id: number;
  name: string;
  region?: string | null;
  created_at?: string;
}

export class ZoneModelRepository {
  static async findAll(): Promise<Zone[]> {
    const res = await pgPool.query('SELECT * FROM zones ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Zone | null> {
    const res = await pgPool.query('SELECT * FROM zones WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Zone>): Promise<Zone> {
    const res = await pgPool.query(
      'INSERT INTO zones (name, region) VALUES ($1, $2) RETURNING *',
      [payload.name, payload.region || null]
    );
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Zone>): Promise<Zone | null> {
    const res = await pgPool.query(
      'UPDATE zones SET name = COALESCE($1, name), region = COALESCE($2, region) WHERE id = $3 RETURNING *',
      [payload.name, payload.region, id]
    );
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
  const res = await pgPool.query('DELETE FROM zones WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
