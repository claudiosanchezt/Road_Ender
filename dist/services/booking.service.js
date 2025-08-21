"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_model_1 = require("../models/booking.model");
class BookingService {
    static async list() {
        return booking_model_1.BookingModelRepository.findAll();
    }
    static async get(id) {
        return booking_model_1.BookingModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload)
            throw new Error('payload required');
        // Support both snake_case and camelCase from tests
        const guide_id = payload.guide_id || payload.guideId || payload.guide;
        const client_id = payload.client_id || payload.clientId || payload.client;
        const zone_id = payload.zone_id || payload.zoneId || payload.zone;
        if (!guide_id)
            throw new Error('guide_id required');
        // Build repository payload
        const repoPayload = { ...payload, guide_id, client_id, zone_id };
        return booking_model_1.BookingModelRepository.create(repoPayload);
    }
    static async update(id, payload) {
        return booking_model_1.BookingModelRepository.update(id, payload);
    }
    static async remove(id) {
        return booking_model_1.BookingModelRepository.delete(id);
    }
    static async listByClient(clientId) {
        return booking_model_1.BookingModelRepository.findByClient(clientId);
    }
}
exports.BookingService = BookingService;
