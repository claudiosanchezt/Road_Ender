import { ContinentModelRepository as ContinentRepository } from '../models/continent.model';

export class ContinentService {
  static async list() {
    return ContinentRepository.findAll();
  }

  static async get(id: number) {
    return ContinentRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.name) throw new Error('name is required');
    return ContinentRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return ContinentRepository.update(id, payload);
  }

  static async remove(id: number) {
    return ContinentRepository.delete(id);
  }
}
