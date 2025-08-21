"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristPlaceService = void 0;
const tourist_place_model_1 = require("../models/tourist-place.model");
class TouristPlaceService {
    static async list() {
        return tourist_place_model_1.TouristPlaceModelRepository.findAll();
    }
    static async get(id) {
        return tourist_place_model_1.TouristPlaceModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.name)
            throw new Error('name is required');
        return tourist_place_model_1.TouristPlaceModelRepository.create(payload);
    }
    static async update(id, payload) {
        return tourist_place_model_1.TouristPlaceModelRepository.update(id, payload);
    }
    static async remove(id) {
        return tourist_place_model_1.TouristPlaceModelRepository.delete(id);
    }
}
exports.TouristPlaceService = TouristPlaceService;
