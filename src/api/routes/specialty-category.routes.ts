import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { SpecialtyCategoryController } from '../controllers/specialty-category.controller';

const router = Router();

router.get('/', authenticateJWT, SpecialtyCategoryController.list);
router.get('/:id', authenticateJWT, SpecialtyCategoryController.get);
router.post('/', authenticateJWT, SpecialtyCategoryController.create);
router.put('/:id', authenticateJWT, SpecialtyCategoryController.update);
router.delete('/:id', authenticateJWT, SpecialtyCategoryController.remove);

export default router;
