import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';

let swaggerDocument: any = null;
try {
	const swaggerPath = path.join(__dirname, '..', '..', 'docs', 'swagger.json');
	if (fs.existsSync(swaggerPath)) {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		swaggerDocument = require(swaggerPath);
	} else {
		console.warn(`docs/swagger.json no encontrado en: ${swaggerPath}, /api-docs no estará disponible`);
	}
} catch (err) {
	console.warn('Error cargando docs/swagger.json, /api-docs no estará disponible', err);
}
import { errorHandler } from './middlewares/error-handler';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);
if (swaggerDocument) {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(errorHandler);

export default app;
