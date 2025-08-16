import { Pool } from 'pg';
import { pgPool } from '../database/postgres';

export interface Guide {
  id: number;
  name: string;
  specialties: number[];
  languages: number[];
  userId: number;
}

export class GuideModelRepository {
  static async findAll(): Promise<Guide[]> {
    const res = await pgPool.query('SELECT * FROM guides');
    return res.rows;
  }
  static async findById(id: number): Promise<Guide | null> {
    const res = await pgPool.query('SELECT * FROM guides WHERE id = $1', [id]);
    return res.rows[0] || null;
  }
  // Métodos adicionales para create, update, delete...
}
