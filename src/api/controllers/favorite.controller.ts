import { Request, Response } from 'express';
import { FavoriteService } from '../../services/favorite.service';

export class FavoriteController {
  static async list(req: Request, res: Response) {
  const items = await FavoriteService.list();
  res.json({ data: { favoriteZones: items } });
  }

  static async listGuides(req: Request, res: Response) {
    // For now return empty array or delegate to service when implemented
    res.json({ data: { favoriteGuides: [] } });
  }

  static async listZones(req: Request, res: Response) {
    const items = await FavoriteService.list();
    res.json({ data: { favoriteZones: items || [] } });
  }

  static async get(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const item = await FavoriteService.get(id);
  if (!item) return res.status(404).json({ error: 'Favorite not found' });
  res.json({ data: { favorite: item } });
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
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const ok = await FavoriteService.remove(id);
  if (!ok) return res.status(404).json({ error: 'Favorite not found' });
  res.status(204).send();
  }
}
