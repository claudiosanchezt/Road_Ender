"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristPlaceController = void 0;
const tourist_place_service_1 = require("../../services/tourist-place.service");
class TouristPlaceController {
    static async list(req, res) {
        const items = await tourist_place_service_1.TouristPlaceService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await tourist_place_service_1.TouristPlaceService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Tourist place not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await tourist_place_service_1.TouristPlaceService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await tourist_place_service_1.TouristPlaceService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Tourist place not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await tourist_place_service_1.TouristPlaceService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Tourist place not found' });
        res.status(204).send();
    }
}
exports.TouristPlaceController = TouristPlaceController;
