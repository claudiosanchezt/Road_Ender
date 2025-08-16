import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { FavoriteController } from '../controllers/favorite.controller';

const favoritesRouter = Router();

favoritesRouter.get('/', authenticateJWT, FavoriteController.list);
favoritesRouter.get('/:id', authenticateJWT, FavoriteController.get);
favoritesRouter.post('/', authenticateJWT, FavoriteController.create);
favoritesRouter.delete('/:id', authenticateJWT, FavoriteController.remove);

export default favoritesRouter;
