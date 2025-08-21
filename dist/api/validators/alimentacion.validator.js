"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlimentacionSchema = exports.CreateAlimentacionSchema = void 0;
const zod_1 = require("zod");
exports.CreateAlimentacionSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'type is required'),
    price: zod_1.z.number().optional(),
    notes: zod_1.z.string().optional()
});
exports.UpdateAlimentacionSchema = exports.CreateAlimentacionSchema.partial();
