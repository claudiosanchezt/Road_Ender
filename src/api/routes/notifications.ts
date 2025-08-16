import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { NotificationController } from '../controllers/notification.controller';

const notificationsRouter = Router();

notificationsRouter.get('/', authenticateJWT, NotificationController.list);
notificationsRouter.get('/:id', authenticateJWT, NotificationController.get);
notificationsRouter.post('/', authenticateJWT, NotificationController.create);
notificationsRouter.put('/:id', authenticateJWT, NotificationController.update);
notificationsRouter.delete('/:id', authenticateJWT, NotificationController.remove);

export default notificationsRouter;
