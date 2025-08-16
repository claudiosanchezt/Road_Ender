import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { TouristPlaceController } from '../controllers/tourist-place.controller';

const touristPlacesRouter = Router();

touristPlacesRouter.get('/', authenticateJWT, TouristPlaceController.list);
touristPlacesRouter.get('/:id', authenticateJWT, TouristPlaceController.get);
touristPlacesRouter.post('/', authenticateJWT, TouristPlaceController.create);
touristPlacesRouter.put('/:id', authenticateJWT, TouristPlaceController.update);
touristPlacesRouter.delete('/:id', authenticateJWT, TouristPlaceController.remove);

export default touristPlacesRouter;
