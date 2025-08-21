import { Router } from 'express';
import HospedajeController from '../controllers/hospedaje.controller';

const router = Router();

router.get('/', HospedajeController.list);
router.get('/:id', HospedajeController.get);
router.post('/', HospedajeController.create);
router.put('/:id', HospedajeController.update);
router.delete('/:id', HospedajeController.remove);

export default router;
