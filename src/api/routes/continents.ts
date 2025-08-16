import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { ContinentController } from '../controllers/continent.controller';

const router = Router();

router.get('/', authenticateJWT, ContinentController.list);
router.get('/:id', authenticateJWT, ContinentController.get);
router.post('/', authenticateJWT, ContinentController.create);
router.put('/:id', authenticateJWT, ContinentController.update);
router.delete('/:id', authenticateJWT, ContinentController.remove);

export default router;
