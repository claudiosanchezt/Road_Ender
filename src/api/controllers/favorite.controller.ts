import { Request, Response } from 'express';
import { FavoriteService } from '../../services/favorite.service';

export class FavoriteController {
  static async list(req: Request, res: Response) {
    const items = await FavoriteService.list();
    res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await FavoriteService.get(id);
    if (!item) return res.status(404).json({ message: 'Favorite not found' });
    res.json(item);
  }

  static async create(req: Request, res: Response) {
    try {
      const created = await FavoriteService.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Bad request' });
    }
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await FavoriteService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Favorite not found' });
    res.status(204).send();
  }
}
