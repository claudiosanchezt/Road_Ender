import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { CountryController } from '../controllers/country.controller';

const router = Router();

router.get('/', authenticateJWT, CountryController.list);
router.get('/:id', authenticateJWT, CountryController.get);
router.post('/', authenticateJWT, CountryController.create);
router.put('/:id', authenticateJWT, CountryController.update);
router.delete('/:id', authenticateJWT, CountryController.remove);

export default router;
