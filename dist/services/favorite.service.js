"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const favorite_model_1 = require("../models/favorite.model");
class FavoriteService {
    static async list() {
        return favorite_model_1.FavoriteModelRepository.findAll();
    }
    static async get(id) {
        return favorite_model_1.FavoriteModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.user_id || !payload.zone_id)
            throw new Error('user_id and zone_id required');
        return favorite_model_1.FavoriteModelRepository.create(payload);
    }
    static async remove(id) {
        return favorite_model_1.FavoriteModelRepository.delete(id);
    }
}
exports.FavoriteService = FavoriteService;
