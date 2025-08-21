"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = exports.MONGO_URI = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Preferir MONGODB_URI (usada en docker-compose) y luego MONGO_URI por compatibilidad
exports.MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017';
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(exports.MONGO_URI);
        console.log('MongoDB conectado');
    }
    catch (err) {
        console.error('Error conectando a MongoDB:', err);
        // No forzar exit en build-time; en runtime la app puede manejar fallos.
    }
};
exports.connectMongo = connectMongo;
