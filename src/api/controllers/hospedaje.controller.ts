import { Request, Response } from 'express';
import { HospedajeModel } from '../../models/hospedaje.model';
import { CreateHospedajeSchema, UpdateHospedajeSchema } from '../validators/hospedaje.validator';

export default {
  async list(_req: Request, res: Response) {
    const data = await HospedajeModel.list();
    res.json({ data });
  },
  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await HospedajeModel.get(id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json({ data });
  },
  async create(req: Request, res: Response) {
    try {
      const payload = CreateHospedajeSchema.parse(req.body);
      const created = await HospedajeModel.create(payload as any);
      res.status(201).json({ data: created });
    } catch (e: any) {
      return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
    }
  },
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const payload = UpdateHospedajeSchema.parse(req.body);
      const updated = await HospedajeModel.update(id, payload as any);
      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json({ data: updated });
    } catch (e: any) {
      return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
    }
  },
  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await HospedajeModel.remove(id);
    res.status(204).send();
  }
};
