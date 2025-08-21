"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHospedajeSchema = exports.CreateHospedajeSchema = void 0;
const zod_1 = require("zod");
exports.CreateHospedajeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'name is required'),
    address: zod_1.z.string().optional(),
    zone_id: zod_1.z.number().nullable().optional(),
    guide_id: zod_1.z.number().nullable().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional()
});
exports.UpdateHospedajeSchema = exports.CreateHospedajeSchema.partial();
