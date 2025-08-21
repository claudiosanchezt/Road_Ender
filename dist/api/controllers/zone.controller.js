"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneController = void 0;
const zone_service_1 = require("../../services/zone.service");
class ZoneController {
    static async list(req, res) {
        const items = await zone_service_1.ZoneService.list();
        res.json({ data: { zones: items } });
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await zone_service_1.ZoneService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Zone not found' });
        res.json({ data: { zone: item } });
    }
    static async create(req, res) {
        try {
            const created = await zone_service_1.ZoneService.create(req.body);
            res.status(201).json({ data: { zone: created } });
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await zone_service_1.ZoneService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Zone not found' });
        res.json({ data: { zone: updated } });
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await zone_service_1.ZoneService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Zone not found' });
        res.status(204).send();
    }
}
exports.ZoneController = ZoneController;
