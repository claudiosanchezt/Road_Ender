"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("../../services/payment.service");
class PaymentController {
    static async list(req, res) {
        const items = await payment_service_1.PaymentService.list();
        res.json({ data: { methods: items } });
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: 'Invalid id' });
        const item = await payment_service_1.PaymentService.get(id);
        if (!item)
            return res.status(404).json({ error: 'Payment not found' });
        res.json({ data: { method: item } });
    }
    static async create(req, res) {
        try {
            const created = await payment_service_1.PaymentService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: 'Invalid id' });
        const updated = await payment_service_1.PaymentService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ error: 'Payment not found' });
        res.json({ data: { method: updated } });
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: 'Invalid id' });
        const ok = await payment_service_1.PaymentService.remove(id);
        if (!ok)
            return res.status(404).json({ error: 'Payment not found' });
        res.status(204).send();
    }
}
exports.PaymentController = PaymentController;
