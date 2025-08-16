import { UserModel, IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';

export class UserService {
  static async getAll(): Promise<IUser[]> {
    return UserModel.find();
  }
  static async getById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }
  static async create(data: Partial<IUser>): Promise<IUser> {
    const hash = await bcrypt.hash(data.password!, 10);
    return UserModel.create({ ...data, password: hash });
  }
  static async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
  static async delete(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id);
  }
}
