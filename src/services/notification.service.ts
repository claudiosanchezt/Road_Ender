import { NotificationModelRepository as NotificationRepository } from '../models/notification.model';

export class NotificationService {
  static async list() {
    return NotificationRepository.findAll();
  }

  static async get(id: number) {
    return NotificationRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.user_id || !payload.title) throw new Error('user_id and title required');
    return NotificationRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return NotificationRepository.update(id, payload);
  }

  static async remove(id: number) {
    return NotificationRepository.delete(id);
  }
}
