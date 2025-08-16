import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { LanguageController } from '../controllers/language.controller';

const languagesRouter = Router();

languagesRouter.get('/', authenticateJWT, LanguageController.list);
languagesRouter.get('/:id', authenticateJWT, LanguageController.get);
languagesRouter.post('/', authenticateJWT, LanguageController.create);
languagesRouter.put('/:id', authenticateJWT, LanguageController.update);
languagesRouter.delete('/:id', authenticateJWT, LanguageController.remove);

export default languagesRouter;
