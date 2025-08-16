import { LanguageModelRepository as LanguageRepository } from '../models/language.model';

export class LanguageService {
  static async list() {
    return LanguageRepository.findAll();
  }

  static async get(id: number) {
    return LanguageRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.name) throw new Error('name is required');
    return LanguageRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return LanguageRepository.update(id, payload);
  }

  static async remove(id: number) {
    return LanguageRepository.delete(id);
  }
}
