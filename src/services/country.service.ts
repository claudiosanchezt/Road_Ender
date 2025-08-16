import { CountryModelRepository as CountryRepository } from '../models/country.model';

export class CountryService {
  static async list() {
    return CountryRepository.findAll();
  }

  static async get(id: number) {
    return CountryRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.name) throw new Error('name is required');
    return CountryRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return CountryRepository.update(id, payload);
  }

  static async remove(id: number) {
    return CountryRepository.delete(id);
  }
}
