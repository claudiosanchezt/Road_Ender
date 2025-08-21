import { Request, Response } from 'express';
import { AlimentacionModel } from '../../models/alimentacion.model';
import { CreateAlimentacionSchema, UpdateAlimentacionSchema } from '../validators/alimentacion.validator';

export default {
  async list(req: Request, res: Response) {
    const hospedajeId = Number(req.params.hospedajeId);
    const data = await AlimentacionModel.listByHospedaje(hospedajeId);
    res.json({ data });
  },
  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await AlimentacionModel.get(id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json({ data });
  },
  async create(req: Request, res: Response) {
    const hospedajeId = Number(req.params.hospedajeId);
    try {
      const body = CreateAlimentacionSchema.parse(req.body);
      const payload = { ...body, hospedaje_id: hospedajeId };
      const created = await AlimentacionModel.create(payload as any);
      res.status(201).json({ data: created });
    } catch (e: any) {
      return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
    }
  },
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const payload = UpdateAlimentacionSchema.parse(req.body);
      const updated = await AlimentacionModel.update(id, payload as any);
      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json({ data: updated });
    } catch (e: any) {
      return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
    }
  },
  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await AlimentacionModel.remove(id);
    res.status(204).send();
  }
};
