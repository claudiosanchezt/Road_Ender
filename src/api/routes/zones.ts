import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { ZoneController } from '../controllers/zone.controller';

const zonesRouter = Router();

zonesRouter.get('/', authenticateJWT, ZoneController.list);
zonesRouter.get('/:id', authenticateJWT, ZoneController.get);
zonesRouter.post('/', authenticateJWT, ZoneController.create);
zonesRouter.put('/:id', authenticateJWT, ZoneController.update);
zonesRouter.delete('/:id', authenticateJWT, ZoneController.remove);

export default zonesRouter;
