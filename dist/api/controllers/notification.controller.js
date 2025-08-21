"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = require("../../services/notification.service");
class NotificationController {
    static async list(req, res) {
        const items = await notification_service_1.NotificationService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await notification_service_1.NotificationService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Notification not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await notification_service_1.NotificationService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await notification_service_1.NotificationService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Notification not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await notification_service_1.NotificationService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Notification not found' });
        res.status(204).send();
    }
}
exports.NotificationController = NotificationController;
