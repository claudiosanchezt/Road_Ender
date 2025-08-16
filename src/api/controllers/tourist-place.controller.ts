import { Request, Response } from 'express';
import { TouristPlaceService } from '../../services/tourist-place.service';

export class TouristPlaceController {
  static async list(req: Request, res: Response) {
    const items = await TouristPlaceService.list();
    res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await TouristPlaceService.get(id);
    if (!item) return res.status(404).json({ message: 'Tourist place not found' });
    res.json(item);
  }

  static async create(req: Request, res: Response) {
    try {
      const created = await TouristPlaceService.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Bad request' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await TouristPlaceService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Tourist place not found' });
    res.json(updated);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await TouristPlaceService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Tourist place not found' });
    res.status(204).send();
  }
}
