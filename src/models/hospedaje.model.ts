import { pgPool } from '../database/postgres';

export interface Hospedaje {
  id?: number;
  name: string;
  description?: string;
  zone_id?: number | null;
  guide_id?: number | null;
  price?: number;
  created_at?: string;
}

export const HospedajeModel = {
  async list(): Promise<Hospedaje[]> {
    const res = await pgPool.query('SELECT * FROM hospedajes ORDER BY id');
    return res.rows;
  },
  async get(id: number): Promise<Hospedaje | null> {
    const res = await pgPool.query('SELECT * FROM hospedajes WHERE id = $1', [id]);
    return res.rows[0] || null;
  },
  async create(payload: Hospedaje): Promise<Hospedaje> {
    const res = await pgPool.query(
      'INSERT INTO hospedajes (name, description, zone_id, guide_id, price) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [payload.name, payload.description || null, payload.zone_id || null, payload.guide_id || null, payload.price || 0]
    );
    return res.rows[0];
  },
  async update(id: number, payload: Partial<Hospedaje>): Promise<Hospedaje | null> {
    const res = await pgPool.query(
      'UPDATE hospedajes SET name = COALESCE($1, name), description = COALESCE($2, description), zone_id = COALESCE($3, zone_id), guide_id = COALESCE($4, guide_id), price = COALESCE($5, price) WHERE id = $6 RETURNING *',
      [payload.name || null, payload.description || null, payload.zone_id || null, payload.guide_id || null, payload.price || null, id]
    );
    return res.rows[0] || null;
  },
  async remove(id: number): Promise<void> {
    await pgPool.query('DELETE FROM hospedajes WHERE id = $1', [id]);
  }
};
