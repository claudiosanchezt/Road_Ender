import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { GuideRelationsController } from '../controllers/guide-relations.controller';

const guideRelationsRouter = Router();

guideRelationsRouter.get('/:id/specialties', authenticateJWT, GuideRelationsController.specialties);
guideRelationsRouter.get('/:id/languages', authenticateJWT, GuideRelationsController.languages);
guideRelationsRouter.get('/:id/zones', authenticateJWT, GuideRelationsController.zones);
guideRelationsRouter.get('/:id/tourist-places', authenticateJWT, GuideRelationsController.touristPlaces);

export default guideRelationsRouter;
