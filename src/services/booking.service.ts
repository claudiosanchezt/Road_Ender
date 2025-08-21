import { BookingModelRepository as BookingRepository } from '../models/booking.model';

export class BookingService {
  static async list() {
    return BookingRepository.findAll();
  }

  static async get(id: number) {
    return BookingRepository.findById(id);
  }

  static async create(payload: any) {
  if (!payload) throw new Error('payload required');
  // Support both snake_case and camelCase from tests
  const guide_id = payload.guide_id || payload.guideId || payload.guide;
  const client_id = payload.client_id || payload.clientId || payload.client;
  const zone_id = payload.zone_id || payload.zoneId || payload.zone;
  if (!guide_id) throw new Error('guide_id required');
  // Build repository payload
  const repoPayload: any = { ...payload, guide_id, client_id, zone_id };
  return BookingRepository.create(repoPayload);
  }

  static async update(id: number, payload: any) {
    return BookingRepository.update(id, payload);
  }

  static async remove(id: number) {
    return BookingRepository.delete(id);
  }

  static async listByClient(clientId: string) {
    return BookingRepository.findByClient(clientId);
  }
}
