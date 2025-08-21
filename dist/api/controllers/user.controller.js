"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../../services/user.service");
class UserController {
    static async getAll(req, res) {
        const users = await user_service_1.UserService.getAll();
        res.json(users);
    }
    static async getById(req, res) {
        const user = await user_service_1.UserService.getById(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'No encontrado' });
        res.json(user);
    }
    static async create(req, res) {
        const user = await user_service_1.UserService.create(req.body);
        res.status(201).json(user);
    }
    static async update(req, res) {
        const user = await user_service_1.UserService.update(req.params.id, req.body);
        if (!user)
            return res.status(404).json({ error: 'No encontrado' });
        res.json(user);
    }
    static async delete(req, res) {
        const user = await user_service_1.UserService.delete(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'No encontrado' });
        res.status(204).send();
    }
}
exports.UserController = UserController;
