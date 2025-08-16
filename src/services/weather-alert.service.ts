import { WeatherAlertModelRepository as WeatherAlertRepository } from '../models/weather-alert.model';

export class WeatherAlertService {
  static async list() {
    return WeatherAlertRepository.findAll();
  }

  static async get(id: number) {
    return WeatherAlertRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.zone_id || !payload.message) throw new Error('zone_id and message required');
    return WeatherAlertRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return WeatherAlertRepository.update(id, payload);
  }

  static async remove(id: number) {
    return WeatherAlertRepository.delete(id);
  }
}
