import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { UserController } from '../controllers/user.controller';

const usersRouter = Router();

usersRouter.get('/', authenticateJWT, UserController.getAll);
usersRouter.get('/:id', authenticateJWT, UserController.getById);
usersRouter.post('/', authenticateJWT, UserController.create);
usersRouter.put('/:id', authenticateJWT, UserController.update);
usersRouter.delete('/:id', authenticateJWT, UserController.delete);

export default usersRouter;
