import { pgPool } from '../database/postgres';

export interface SpecialtyCategory {
  id: number;
  name: string;
}

export class SpecialtyCategoryModelRepository {
  static async findAll(): Promise<SpecialtyCategory[]> {
    const res = await pgPool.query('SELECT * FROM specialty_categories ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<SpecialtyCategory | null> {
    const res = await pgPool.query('SELECT * FROM specialty_categories WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<SpecialtyCategory>): Promise<SpecialtyCategory> {
    const res = await pgPool.query('INSERT INTO specialty_categories (name) VALUES ($1) RETURNING *', [payload.name]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<SpecialtyCategory>): Promise<SpecialtyCategory | null> {
    const res = await pgPool.query('UPDATE specialty_categories SET name = COALESCE($1, name) WHERE id = $2 RETURNING *', [payload.name, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM specialty_categories WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
