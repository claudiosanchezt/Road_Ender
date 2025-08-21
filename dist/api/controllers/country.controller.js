"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const country_service_1 = require("../../services/country.service");
class CountryController {
    static async list(req, res) {
        const items = await country_service_1.CountryService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await country_service_1.CountryService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Country not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await country_service_1.CountryService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await country_service_1.CountryService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Country not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await country_service_1.CountryService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Country not found' });
        res.status(204).send();
    }
}
exports.CountryController = CountryController;
