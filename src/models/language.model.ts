import { pgPool } from '../database/postgres';

export interface Language {
  id: number;
  name: string;
}

export class LanguageModelRepository {
  static async findAll(): Promise<Language[]> {
    const res = await pgPool.query('SELECT * FROM languages ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Language | null> {
    const res = await pgPool.query('SELECT * FROM languages WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Language>): Promise<Language> {
    const res = await pgPool.query('INSERT INTO languages (name) VALUES ($1) RETURNING *', [payload.name]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Language>): Promise<Language | null> {
    const res = await pgPool.query('UPDATE languages SET name = COALESCE($1, name) WHERE id = $2 RETURNING *', [payload.name, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM languages WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
