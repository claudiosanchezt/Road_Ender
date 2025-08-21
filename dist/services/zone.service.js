"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneService = void 0;
const zone_model_1 = require("../models/zone.model");
class ZoneService {
    static async list() {
        return zone_model_1.ZoneModelRepository.findAll();
    }
    static async get(id) {
        return zone_model_1.ZoneModelRepository.findById(id);
    }
    static async create(payload) {
        // simple validation
        if (!payload || !payload.name)
            throw new Error('name is required');
        return zone_model_1.ZoneModelRepository.create(payload);
    }
    static async update(id, payload) {
        return zone_model_1.ZoneModelRepository.update(id, payload);
    }
    static async remove(id) {
        return zone_model_1.ZoneModelRepository.delete(id);
    }
}
exports.ZoneService = ZoneService;
