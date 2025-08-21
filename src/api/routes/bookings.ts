import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { BookingController } from '../controllers/booking.controller';

const bookingsRouter = Router();

bookingsRouter.get('/', authenticateJWT, BookingController.list);
bookingsRouter.get('/my', authenticateJWT, BookingController.myBookings);
bookingsRouter.get('/:id', authenticateJWT, BookingController.get);
bookingsRouter.post('/', authenticateJWT, BookingController.create);
bookingsRouter.put('/:id', authenticateJWT, BookingController.update);
bookingsRouter.delete('/:id', authenticateJWT, BookingController.remove);

export default bookingsRouter;
