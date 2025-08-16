import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { SpecialtyController } from '../controllers/specialty.controller';

const specialtiesRouter = Router();

specialtiesRouter.get('/', authenticateJWT, SpecialtyController.list);
specialtiesRouter.get('/:id', authenticateJWT, SpecialtyController.get);
specialtiesRouter.post('/', authenticateJWT, SpecialtyController.create);
specialtiesRouter.put('/:id', authenticateJWT, SpecialtyController.update);
specialtiesRouter.delete('/:id', authenticateJWT, SpecialtyController.remove);

export default specialtiesRouter;
