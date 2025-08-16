import { Request, Response } from 'express';
import { UserService } from '../../services/user.service';

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await UserService.getAll();
    res.json(users);
  }
  static async getById(req: Request, res: Response) {
    const user = await UserService.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user);
  }
  static async create(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  }
  static async update(req: Request, res: Response) {
    const user = await UserService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user);
  }
  static async delete(req: Request, res: Response) {
    const user = await UserService.delete(req.params.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  }
}
