import { Request, Response } from 'express';
import { LanguageService } from '../../services/language.service';

export class LanguageController {
  static async list(req: Request, res: Response) {
    const items = await LanguageService.list();
    res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await LanguageService.get(id);
    if (!item) return res.status(404).json({ message: 'Language not found' });
    res.json(item);
  }

  static async create(req: Request, res: Response) {
    try {
      const created = await LanguageService.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Bad request' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await LanguageService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Language not found' });
    res.json(updated);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await LanguageService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Language not found' });
    res.status(204).send();
  }
}
