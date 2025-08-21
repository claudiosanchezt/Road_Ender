"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinentService = void 0;
const continent_model_1 = require("../models/continent.model");
class ContinentService {
    static async list() {
        return continent_model_1.ContinentModelRepository.findAll();
    }
    static async get(id) {
        return continent_model_1.ContinentModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.name)
            throw new Error('name is required');
        return continent_model_1.ContinentModelRepository.create(payload);
    }
    static async update(id, payload) {
        return continent_model_1.ContinentModelRepository.update(id, payload);
    }
    static async remove(id) {
        return continent_model_1.ContinentModelRepository.delete(id);
    }
}
exports.ContinentService = ContinentService;
