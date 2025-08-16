import { pgPool } from '../database/postgres';

export interface Specialty {
  id: number;
  name: string;
  category_id?: number | null;
}

export class SpecialtyModelRepository {
  static async findAll(): Promise<Specialty[]> {
    const res = await pgPool.query('SELECT * FROM specialties ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Specialty | null> {
    const res = await pgPool.query('SELECT * FROM specialties WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Specialty>): Promise<Specialty> {
    const res = await pgPool.query('INSERT INTO specialties (name, category_id) VALUES ($1,$2) RETURNING *', [payload.name, payload.category_id || null]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Specialty>): Promise<Specialty | null> {
    const res = await pgPool.query('UPDATE specialties SET name = COALESCE($1, name), category_id = COALESCE($2, category_id) WHERE id = $3 RETURNING *', [payload.name, payload.category_id, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM specialties WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
