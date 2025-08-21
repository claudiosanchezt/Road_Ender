"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyCategoryService = void 0;
const specialty_category_model_1 = require("../models/specialty-category.model");
class SpecialtyCategoryService {
    static async list() {
        return specialty_category_model_1.SpecialtyCategoryModelRepository.findAll();
    }
    static async get(id) {
        return specialty_category_model_1.SpecialtyCategoryModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.name)
            throw new Error('name is required');
        return specialty_category_model_1.SpecialtyCategoryModelRepository.create(payload);
    }
    static async update(id, payload) {
        return specialty_category_model_1.SpecialtyCategoryModelRepository.update(id, payload);
    }
    static async remove(id) {
        return specialty_category_model_1.SpecialtyCategoryModelRepository.delete(id);
    }
}
exports.SpecialtyCategoryService = SpecialtyCategoryService;
