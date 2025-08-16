import { pgPool } from '../database/postgres';

export interface Country {
  id: number;
  name: string;
  continent_id?: number | null;
}

export class CountryModelRepository {
  static async findAll(): Promise<Country[]> {
    const res = await pgPool.query('SELECT * FROM countries ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Country | null> {
    const res = await pgPool.query('SELECT * FROM countries WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Country>): Promise<Country> {
    const res = await pgPool.query('INSERT INTO countries (name, continent_id) VALUES ($1,$2) RETURNING *', [payload.name, payload.continent_id || null]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Country>): Promise<Country | null> {
    const res = await pgPool.query('UPDATE countries SET name = COALESCE($1, name), continent_id = COALESCE($2, continent_id) WHERE id = $3 RETURNING *', [payload.name, payload.continent_id, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM countries WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
