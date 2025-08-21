"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageController = void 0;
const language_service_1 = require("../../services/language.service");
class LanguageController {
    static async list(req, res) {
        const items = await language_service_1.LanguageService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await language_service_1.LanguageService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Language not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await language_service_1.LanguageService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await language_service_1.LanguageService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Language not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await language_service_1.LanguageService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Language not found' });
        res.status(204).send();
    }
}
exports.LanguageController = LanguageController;
