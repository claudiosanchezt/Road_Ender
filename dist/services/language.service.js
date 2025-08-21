"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const language_model_1 = require("../models/language.model");
class LanguageService {
    static async list() {
        return language_model_1.LanguageModelRepository.findAll();
    }
    static async get(id) {
        return language_model_1.LanguageModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.name)
            throw new Error('name is required');
        return language_model_1.LanguageModelRepository.create(payload);
    }
    static async update(id, payload) {
        return language_model_1.LanguageModelRepository.update(id, payload);
    }
    static async remove(id) {
        return language_model_1.LanguageModelRepository.delete(id);
    }
}
exports.LanguageService = LanguageService;
