"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAlertController = void 0;
const weather_alert_service_1 = require("../../services/weather-alert.service");
class WeatherAlertController {
    static async list(req, res) {
        const items = await weather_alert_service_1.WeatherAlertService.list();
        res.json(items);
    }
    static async get(req, res) {
        const id = Number(req.params.id);
        const item = await weather_alert_service_1.WeatherAlertService.get(id);
        if (!item)
            return res.status(404).json({ message: 'Weather alert not found' });
        res.json(item);
    }
    static async create(req, res) {
        try {
            const created = await weather_alert_service_1.WeatherAlertService.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message || 'Bad request' });
        }
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const updated = await weather_alert_service_1.WeatherAlertService.update(id, req.body);
        if (!updated)
            return res.status(404).json({ message: 'Weather alert not found' });
        res.json(updated);
    }
    static async remove(req, res) {
        const id = Number(req.params.id);
        const ok = await weather_alert_service_1.WeatherAlertService.remove(id);
        if (!ok)
            return res.status(404).json({ message: 'Weather alert not found' });
        res.status(204).send();
    }
}
exports.WeatherAlertController = WeatherAlertController;
