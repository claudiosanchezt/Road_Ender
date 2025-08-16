import { Router } from 'express';
import usersRouter from './users';
import guidesRouter from './guides';
import bookingsRouter from './bookings';
import zonesRouter from './zones';
import touristPlacesRouter from './tourist-places';
import specialtiesRouter from './specialties';
import languagesRouter from './languages';
import paymentsRouter from './payments';
import favoritesRouter from './favorites';
import notificationsRouter from './notifications';
import weatherAlertsRouter from './weather-alerts';

import userRelationsRouter from './user-relations';

import guideRelationsRouter from './guide-relations';


import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);
router.use('/users', userRelationsRouter);
router.use('/guides', guidesRouter);
router.use('/guides', guideRelationsRouter);
router.use('/bookings', bookingsRouter);
router.use('/zones', zonesRouter);
router.use('/tourist-places', touristPlacesRouter);
router.use('/specialties', specialtiesRouter);
router.use('/languages', languagesRouter);
router.use('/payments', paymentsRouter);
router.use('/favorites', favoritesRouter);
router.use('/notifications', notificationsRouter);
router.use('/weather-alerts', weatherAlertsRouter);

export default router;
