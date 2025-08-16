import { TouristPlaceModelRepository as TouristPlaceRepository } from '../models/tourist-place.model';

export class TouristPlaceService {
  static async list() {
    return TouristPlaceRepository.findAll();
  }

  static async get(id: number) {
    return TouristPlaceRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.name) throw new Error('name is required');
    return TouristPlaceRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return TouristPlaceRepository.update(id, payload);
  }

  static async remove(id: number) {
    return TouristPlaceRepository.delete(id);
  }
}
