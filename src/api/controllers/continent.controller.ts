import { Request, Response } from 'express';
import { ContinentService } from '../../services/continent.service';

export class ContinentController {
  static async list(req: Request, res: Response) {
    const items = await ContinentService.list();
    res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await ContinentService.get(id);
    if (!item) return res.status(404).json({ message: 'Continent not found' });
    res.json(item);
  }

  static async create(req: Request, res: Response) {
    try {
      const created = await ContinentService.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Bad request' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await ContinentService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Continent not found' });
    res.json(updated);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await ContinentService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Continent not found' });
    res.status(204).send();
  }
}
