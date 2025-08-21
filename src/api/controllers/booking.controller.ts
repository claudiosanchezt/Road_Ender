import { Request, Response } from 'express';
import { BookingService } from '../../services/booking.service';

export class BookingController {
  static async list(req: Request, res: Response) {
  const items = await BookingService.list();
  res.json({ data: { bookings: items } });
  }

  static async get(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const item = await BookingService.get(id);
    if (!item) return res.status(404).json({ error: 'Booking not found' });
  res.json({ data: { booking: item } });
  }

  static async create(req: Request, res: Response) {
    try {
  // If client id is not provided, try to get from authenticated user (JWT)
  const body = { ...req.body };
  try {
    const authHeader = req.headers.authorization;
    if ((!body.client_id || body.client_id === '') && authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded: any = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'supersecret');
      body.client_id = body.client_id || decoded.id;
    }
  } catch (_) {
    // ignore decoding errors here; service will validate presence if required
  }
  const created = await BookingService.create(body);
  res.status(201).json({ data: { booking: created } });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Bad request' });
    }
  }

  static async myBookings(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No autorizado' });
      const token = authHeader.split(' ')[1];
      const decoded: any = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'supersecret');
      const items = await BookingService.listByClient(decoded.id);
      res.json({ data: { bookings: items || [] } });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Bad request' });
    }
  }

  static async update(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const updated = await BookingService.update(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Booking not found' });
  res.json({ data: { booking: updated } });
  }

  static async remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const ok = await BookingService.remove(id);
  if (!ok) return res.status(404).json({ error: 'Booking not found' });
  res.status(204).send();
  }
}
