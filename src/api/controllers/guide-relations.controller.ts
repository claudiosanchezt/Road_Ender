import { Request, Response } from 'express';
import { GuideRelationsService } from '../../services/guide-relations.service';

export class GuideRelationsController {
  static async specialties(req: Request, res: Response) {
    const guideId = Number(req.params.id);
    const items = await GuideRelationsService.specialties(guideId);
    res.json(items);
  }

  static async languages(req: Request, res: Response) {
    const guideId = Number(req.params.id);
    const items = await GuideRelationsService.languages(guideId);
    res.json(items);
  }

  static async zones(req: Request, res: Response) {
    const guideId = Number(req.params.id);
    const items = await GuideRelationsService.zones(guideId);
    res.json(items);
  }

  static async touristPlaces(req: Request, res: Response) {
    const guideId = Number(req.params.id);
    const items = await GuideRelationsService.touristPlaces(guideId);
    res.json(items);
  }
}
