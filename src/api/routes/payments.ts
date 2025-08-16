import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { PaymentController } from '../controllers/payment.controller';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateJWT, PaymentController.list);
paymentsRouter.get('/:id', authenticateJWT, PaymentController.get);
paymentsRouter.post('/', authenticateJWT, PaymentController.create);
paymentsRouter.put('/:id', authenticateJWT, PaymentController.update);
paymentsRouter.delete('/:id', authenticateJWT, PaymentController.remove);

export default paymentsRouter;
