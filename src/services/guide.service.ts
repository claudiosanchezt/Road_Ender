import { GuideModelRepository as GuideRepository, Guide } from '../models/guide.model';

export class GuideService {
  static async getAll(): Promise<Guide[]> {
    return GuideRepository.findAll();
  }
  static async getById(id: number): Promise<Guide | null> {
    return GuideRepository.findById(id);
  }
  // Métodos adicionales para create, update, delete...
}
