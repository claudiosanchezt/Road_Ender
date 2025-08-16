import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';

const guidesRouter = Router();

// Simulación de datos en memoria
let guides = [
	{ id: 1, name: 'Juan Pérez', specialties: [1], languages: [1], userId: 2 },
	{ id: 2, name: 'Ana Torres', specialties: [2], languages: [2], userId: 1 }
];

// Listar guías (protegido)
guidesRouter.get('/', authenticateJWT, (req, res) => res.json(guides));
// Obtener guía por ID (protegido)
guidesRouter.get('/:id', authenticateJWT, (req, res) => {
	const guide = guides.find(g => g.id === parseInt(req.params.id));
	if (!guide) return res.status(404).json({ error: 'No encontrado' });
	res.json(guide);
});
// Crear guía (protegido)
guidesRouter.post('/', authenticateJWT, (req, res) => {
	const { name, specialties, languages, userId } = req.body;
	const newGuide = { id: guides.length + 1, name, specialties, languages, userId };
	guides.push(newGuide);
	res.status(201).json(newGuide);
});
// Actualizar guía (protegido)
guidesRouter.put('/:id', authenticateJWT, (req, res) => {
	const guide = guides.find(g => g.id === parseInt(req.params.id));
	if (!guide) return res.status(404).json({ error: 'No encontrado' });
	Object.assign(guide, req.body);
	res.json(guide);
});
// Eliminar guía (protegido)
guidesRouter.delete('/:id', authenticateJWT, (req, res) => {
	guides = guides.filter(g => g.id !== parseInt(req.params.id));
	res.status(204).send();
});

// Relaciones
guidesRouter.get('/:id/specialties', authenticateJWT, (req, res) => {
	const guide = guides.find(g => g.id === parseInt(req.params.id));
	res.json(guide ? guide.specialties : []);
});
guidesRouter.get('/:id/languages', authenticateJWT, (req, res) => {
	const guide = guides.find(g => g.id === parseInt(req.params.id));
	res.json(guide ? guide.languages : []);
});

export default guidesRouter;
