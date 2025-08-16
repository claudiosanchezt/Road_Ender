import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import continentsRouter from './continents';
import countriesRouter from './countries';

const router = Router();

router.use('/continents', continentsRouter);
router.use('/countries', countriesRouter);

export default router;
