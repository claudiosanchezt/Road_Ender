import { PaymentModelRepository as PaymentRepository } from '../models/payment.model';

export class PaymentService {
  static async list() {
    return PaymentRepository.findAll();
  }

  static async get(id: number) {
    return PaymentRepository.findById(id);
  }

  static async create(payload: any) {
    if (!payload || !payload.booking_id || !payload.amount) throw new Error('booking_id and amount required');
    return PaymentRepository.create(payload);
  }

  static async update(id: number, payload: any) {
    return PaymentRepository.update(id, payload);
  }

  static async remove(id: number) {
    return PaymentRepository.delete(id);
  }
}
