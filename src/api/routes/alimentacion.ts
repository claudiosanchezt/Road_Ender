import { Router } from 'express';
import AlimentacionController from '../controllers/alimentacion.controller';

const router = Router({ mergeParams: true });

router.get('/', AlimentacionController.list);
router.get('/:id', AlimentacionController.get);
router.post('/', AlimentacionController.create);
router.put('/:id', AlimentacionController.update);
router.delete('/:id', AlimentacionController.remove);

export default router;
