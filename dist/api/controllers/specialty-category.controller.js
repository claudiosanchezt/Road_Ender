"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyCategoryController = void 0;
const specialty_category_service_1 = require("../../services/specialty-category.service");
class SpecialtyCategoryController {
    static async list(req, res) {
        const items = await specialty_category_service_1.SpecialtyCategoryService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await specialty_category_service_1.SpecialtyCategoryService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Category not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await specialty_category_service_1.SpecialtyCategoryService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await specialty_category_service_1.SpecialtyCategoryService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Category not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await specialty_category_service_1.SpecialtyCategoryService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Category not found' });
        res.status(204).send();
    }
}
exports.SpecialtyCategoryController = SpecialtyCategoryController;
