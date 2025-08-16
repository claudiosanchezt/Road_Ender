import { BookingModelRepository as BookingRepository } from '../models/booking.model';

export class BookingService {
  static async list() {
    return BookingRepository.findAll();
  }

  static async get(id: number) {
    return BookingRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.client_id || !payload.guide_id) throw new Error('client_id and guide_id are required');
    return BookingRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return BookingRepository.update(id, payload);
  }

  static async remove(id: number) {
    return BookingRepository.delete(id);
  }
}
