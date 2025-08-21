"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
const country_model_1 = require("../models/country.model");
class CountryService {
    static async list() {
        return country_model_1.CountryModelRepository.findAll();
    }
    static async get(id) {
        return country_model_1.CountryModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.name)
            throw new Error('name is required');
        return country_model_1.CountryModelRepository.create(payload);
    }
    static async update(id, payload) {
        return country_model_1.CountryModelRepository.update(id, payload);
    }
    static async remove(id) {
        return country_model_1.CountryModelRepository.delete(id);
    }
}
exports.CountryService = CountryService;
