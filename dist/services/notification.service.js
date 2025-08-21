"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_model_1 = require("../models/notification.model");
class NotificationService {
    static async list() {
        return notification_model_1.NotificationModelRepository.findAll();
    }
    static async get(id) {
        return notification_model_1.NotificationModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.user_id || !payload.title)
            throw new Error('user_id and title required');
        return notification_model_1.NotificationModelRepository.create(payload);
    }
    static async update(id, payload) {
        return notification_model_1.NotificationModelRepository.update(id, payload);
    }
    static async remove(id) {
        return notification_model_1.NotificationModelRepository.delete(id);
    }
}
exports.NotificationService = NotificationService;
