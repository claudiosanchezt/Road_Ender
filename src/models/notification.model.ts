import { pgPool } from '../database/postgres';

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  body: string;
  read?: boolean;
}

export class NotificationModelRepository {
  static async findAll(): Promise<Notification[]> {
    const res = await pgPool.query('SELECT * FROM notifications ORDER BY id');
    return res.rows;
  }

  static async findById(id: number): Promise<Notification | null> {
    const res = await pgPool.query('SELECT * FROM notifications WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(payload: Partial<Notification>): Promise<Notification> {
    const res = await pgPool.query('INSERT INTO notifications (user_id, title, body, read) VALUES ($1,$2,$3,$4) RETURNING *', [payload.user_id, payload.title, payload.body, payload.read || false]);
    return res.rows[0];
  }

  static async update(id: number, payload: Partial<Notification>): Promise<Notification | null> {
    const res = await pgPool.query('UPDATE notifications SET title = COALESCE($1, title), body = COALESCE($2, body), read = COALESCE($3, read) WHERE id = $4 RETURNING *', [payload.title, payload.body, payload.read, id]);
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pgPool.query('DELETE FROM notifications WHERE id = $1', [id]);
  return (res?.rowCount || 0) > 0;
  }
}
