import { SpecialtyCategoryModelRepository as SpecialtyCategoryRepository } from '../models/specialty-category.model';

export class SpecialtyCategoryService {
  static async list() {
    return SpecialtyCategoryRepository.findAll();
  }

  static async get(id: number) {
    return SpecialtyCategoryRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.name) throw new Error('name is required');
    return SpecialtyCategoryRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return SpecialtyCategoryRepository.update(id, payload);
  }

  static async remove(id: number) {
    return SpecialtyCategoryRepository.delete(id);
  }
}
