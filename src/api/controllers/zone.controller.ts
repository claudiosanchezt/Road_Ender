import { Request, Response } from 'express';
import { ZoneService } from '../../services/zone.service';

export class ZoneController {
  static async list(req: Request, res: Response) {
  const items = await ZoneService.list();
  res.json({ data: { zones: items } });
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await ZoneService.get(id);
    if (!item) return res.status(404).json({ message: 'Zone not found' });
  res.json({ data: { zone: item } });
  }

  static async create(req: Request, res: Response) {
    try {
      const created = await ZoneService.create(req.body);
  res.status(201).json({ data: { zone: created } });
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Bad request' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await ZoneService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Zone not found' });
  res.json({ data: { zone: updated } });
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await ZoneService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Zone not found' });
    res.status(204).send();
  }
}
