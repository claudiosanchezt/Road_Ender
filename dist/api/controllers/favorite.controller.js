"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const favorite_service_1 = require("../../services/favorite.service");
class FavoriteController {
    static async list(req, res) {
        const items = await favorite_service_1.FavoriteService.list();
        res.json({ data: { favoriteZones: items } });
    }
    static async listGuides(req, res) {
        // For now return empty array or delegate to service when implemented
        res.json({ data: { favoriteGuides: [] } });
    }
    static async listZones(req, res) {
        const items = await favorite_service_1.FavoriteService.list();
        res.json({ data: { favoriteZones: items || [] } });
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: 'Invalid id' });
        const item = await favorite_service_1.FavoriteService.get(id);
        if (!item)
            return res.status(404).json({ error: 'Favorite not found' });
        res.json({ data: { favorite: item } });
    }
    static async create(req, res) {
        try {
            const created = await favorite_service_1.FavoriteService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: 'Invalid id' });
        const ok = await favorite_service_1.FavoriteService.remove(id);
        if (!ok)
            return res.status(404).json({ error: 'Favorite not found' });
        res.status(204).send();
    }
}
exports.FavoriteController = FavoriteController;
