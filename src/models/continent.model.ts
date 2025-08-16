import { pgPool } from '../database/postgres';

export interface Continent {
  id: number;
  name: string;
}

export class ContinentModelRepository {
  static async findAll(): Promise<Continent[]> {
    const res = await pgPool.query('SELECT * FROM continents ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Continent | null> {
    const res = await pgPool.query('SELECT * FROM continents WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Continent>): Promise<Continent> {
    const res = await pgPool.query('INSERT INTO continents (name) VALUES ($1) RETURNING *', [payload.name]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Continent>): Promise<Continent | null> {
    const res = await pgPool.query('UPDATE continents SET name = COALESCE($1, name) WHERE id = $2 RETURNING *', [payload.name, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
  const res = await pgPool.query('DELETE FROM continents WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
