"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const payment_model_1 = require("../models/payment.model");
class PaymentService {
    static async list() {
        return payment_model_1.PaymentModelRepository.findAll();
    }
    static async get(id) {
        return payment_model_1.PaymentModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.booking_id || !payload.amount)
            throw new Error('booking_id and amount required');
        return payment_model_1.PaymentModelRepository.create(payload);
    }
    static async update(id, payload) {
        return payment_model_1.PaymentModelRepository.update(id, payload);
    }
    static async remove(id) {
        return payment_model_1.PaymentModelRepository.delete(id);
    }
}
exports.PaymentService = PaymentService;
