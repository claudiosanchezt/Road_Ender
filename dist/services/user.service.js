"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    static async getAll() {
        return user_model_1.UserModel.find();
    }
    static async getById(id) {
        return user_model_1.UserModel.findById(id);
    }
    static async create(data) {
        const hash = await bcryptjs_1.default.hash(data.password, 10);
        return user_model_1.UserModel.create({ ...data, password: hash });
    }
    static async update(id, data) {
        if (data.password)
            data.password = await bcryptjs_1.default.hash(data.password, 10);
        return user_model_1.UserModel.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return user_model_1.UserModel.findByIdAndDelete(id);
    }
}
exports.UserService = UserService;
