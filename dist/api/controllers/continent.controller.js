"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinentController = void 0;
const continent_service_1 = require("../../services/continent.service");
class ContinentController {
    static async list(req, res) {
        const items = await continent_service_1.ContinentService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await continent_service_1.ContinentService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Continent not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await continent_service_1.ContinentService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await continent_service_1.ContinentService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Continent not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await continent_service_1.ContinentService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Continent not found' });
        res.status(204).send();
    }
}
exports.ContinentController = ContinentController;
