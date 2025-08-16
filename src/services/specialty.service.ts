import { SpecialtyModelRepository as SpecialtyRepository } from '../models/specialty.model';

export class SpecialtyService {
  static async list() {
    return SpecialtyRepository.findAll();
  }

  static async get(id: number) {
    return SpecialtyRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.name) throw new Error('name is required');
    return SpecialtyRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return SpecialtyRepository.update(id, payload);
  }

  static async remove(id: number) {
    return SpecialtyRepository.delete(id);
  }
}
