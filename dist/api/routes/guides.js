"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const guidesRouter = (0, express_1.Router)();
// Simulación de datos en memoria
let guides = [
    { id: 1, name: 'Juan Pérez', specialties: [1], languages: [1], userId: 2 },
    { id: 2, name: 'Ana Torres', specialties: [2], languages: [2], userId: 1 }
];
// Listar guías (protegido)
guidesRouter.get('/', auth_1.authenticateJWT, (req, res) => res.json({ data: { guides } }));
// Obtener guía por ID (protegido)
guidesRouter.get('/:id', auth_1.authenticateJWT, (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id));
    if (!guide)
        return res.status(404).json({ error: 'No encontrado' });
    res.json({ data: { guide } });
});
// Crear guía (protegido)
guidesRouter.post('/', auth_1.authenticateJWT, (req, res) => {
    const { name, specialties, languages, userId } = req.body;
    const newGuide = { id: guides.length + 1, name, specialties, languages, userId };
    guides.push(newGuide);
    res.status(201).json({ data: { guide: newGuide } });
});
// Actualizar guía (protegido)
guidesRouter.put('/:id', auth_1.authenticateJWT, (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id));
    if (!guide)
        return res.status(404).json({ error: 'No encontrado' });
    Object.assign(guide, req.body);
    res.json({ data: { guide } });
});
// Eliminar guía (protegido)
guidesRouter.delete('/:id', auth_1.authenticateJWT, (req, res) => {
    guides = guides.filter(g => g.id !== parseInt(req.params.id));
    res.status(204).send();
});
// Relaciones
guidesRouter.get('/:id/specialties', auth_1.authenticateJWT, (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id));
    res.json(guide ? guide.specialties : []);
});
guidesRouter.get('/:id/languages', auth_1.authenticateJWT, (req, res) => {
    const guide = guides.find(g => g.id === parseInt(req.params.id));
    res.json(guide ? guide.languages : []);
});
exports.default = guidesRouter;
