import { pgPool } from '../database/postgres';

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  currency: string;
  status: string;
}

export class PaymentModelRepository {
  static async findAll(): Promise<Payment[]> {
    const res = await pgPool.query('SELECT * FROM payments ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Payment | null> {
    const res = await pgPool.query('SELECT * FROM payments WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Payment>): Promise<Payment> {
    const res = await pgPool.query('INSERT INTO payments (booking_id, amount, currency, status) VALUES ($1,$2,$3,$4) RETURNING *', [payload.booking_id, payload.amount, payload.currency, payload.status]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Payment>): Promise<Payment | null> {
    const res = await pgPool.query('UPDATE payments SET booking_id = COALESCE($1, booking_id), amount = COALESCE($2, amount), currency = COALESCE($3, currency), status = COALESCE($4, status) WHERE id = $5 RETURNING *', [payload.booking_id, payload.amount, payload.currency, payload.status, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM payments WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
