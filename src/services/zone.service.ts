import { ZoneModelRepository as ZoneRepository } from '../models/zone.model';

export class ZoneService {
  static async list() {
    return ZoneRepository.findAll();
  }

  static async get(id: number) {
    return ZoneRepository.findById(id);
  }

  static async create(payload: any) {
    // simple validation
    if (!payload || !payload.name) throw new Error('name is required');
    return ZoneRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return ZoneRepository.update(id, payload);
  }

  static async remove(id: number) {
    return ZoneRepository.delete(id);
  }
}
