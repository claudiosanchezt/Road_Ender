"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAlertService = void 0;
const weather_alert_model_1 = require("../models/weather-alert.model");
class WeatherAlertService {
    static async list() {
        return weather_alert_model_1.WeatherAlertModelRepository.findAll();
    }
    static async get(id) {
        return weather_alert_model_1.WeatherAlertModelRepository.findById(id);
    }
    static async create(payload) {
        if (!payload || !payload.zone_id || !payload.message)
            throw new Error('zone_id and message required');
        return weather_alert_model_1.WeatherAlertModelRepository.create(payload);
    }
    static async update(id, payload) {
        return weather_alert_model_1.WeatherAlertModelRepository.update(id, payload);
    }
    static async remove(id) {
        return weather_alert_model_1.WeatherAlertModelRepository.delete(id);
    }
}
exports.WeatherAlertService = WeatherAlertService;
