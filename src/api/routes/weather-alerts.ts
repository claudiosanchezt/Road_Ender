import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { WeatherAlertController } from '../controllers/weather-alert.controller';

const weatherAlertsRouter = Router();

weatherAlertsRouter.get('/', authenticateJWT, WeatherAlertController.list);
weatherAlertsRouter.get('/:id', authenticateJWT, WeatherAlertController.get);
weatherAlertsRouter.post('/', authenticateJWT, WeatherAlertController.create);
weatherAlertsRouter.put('/:id', authenticateJWT, WeatherAlertController.update);
weatherAlertsRouter.delete('/:id', authenticateJWT, WeatherAlertController.remove);

export default weatherAlertsRouter;
