"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyService = void 0;
const specialty_model_1 = require("../models/specialty.model");
class SpecialtyService {
    static async list() {
        return specialty_model_1.SpecialtyModelRepository.findAll();
    }
    static async get(id) {
        return specialty_model_1.SpecialtyModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.name)
            throw new Error('name is required');
        return specialty_model_1.SpecialtyModelRepository.create(payload);
    }
    static async update(id, payload) {
        return specialty_model_1.SpecialtyModelRepository.update(id, payload);
    }
    static async remove(id) {
        return specialty_model_1.SpecialtyModelRepository.delete(id);
    }
}
exports.SpecialtyService = SpecialtyService;
