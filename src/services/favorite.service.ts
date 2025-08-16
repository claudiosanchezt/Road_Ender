import { FavoriteModelRepository as FavoriteRepository } from '../models/favorite.model';

export class FavoriteService {
  static async list() {
    return FavoriteRepository.findAll();
  }

  static async get(id: number) {
    return FavoriteRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.user_id || !payload.zone_id) throw new Error('user_id and zone_id required');
    return FavoriteRepository.create(payload);
  }

  static async remove(id: number) {
    return FavoriteRepository.delete(id);
  }
}
