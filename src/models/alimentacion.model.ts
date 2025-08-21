import { pgPool } from '../database/postgres';

export interface Alimentacion {
  id?: number;
  hospedaje_id: number;
  type: string;
  price?: number;
  notes?: string;
}

export const AlimentacionModel = {
  async listByHospedaje(hospedajeId: number): Promise<Alimentacion[]> {
    const res = await pgPool.query('SELECT * FROM alimentacion_options WHERE hospedaje_id = $1 ORDER BY id', [hospedajeId]);
    return res.rows;
  },
  async get(id: number): Promise<Alimentacion | null> {
    const res = await pgPool.query('SELECT * FROM alimentacion_options WHERE id = $1', [id]);
    return res.rows[0] || null;
  },
  async create(payload: Alimentacion): Promise<Alimentacion> {
    const res = await pgPool.query('INSERT INTO alimentacion_options (hospedaje_id, type, price, notes) VALUES ($1,$2,$3,$4) RETURNING *', [payload.hospedaje_id, payload.type, payload.price || 0, payload.notes || null]);
    return res.rows[0];
  },
  async update(id: number, payload: Partial<Alimentacion>): Promise<Alimentacion | null> {
    const res = await pgPool.query('UPDATE alimentacion_options SET type = COALESCE($1, type), price = COALESCE($2, price), notes = COALESCE($3, notes) WHERE id = $4 RETURNING *', [payload.type || null, payload.price || null, payload.notes || null, id]);
    return res.rows[0] || null;
  },
  async remove(id: number): Promise<void> {
    await pgPool.query('DELETE FROM alimentacion_options WHERE id = $1', [id]);
  }
};
