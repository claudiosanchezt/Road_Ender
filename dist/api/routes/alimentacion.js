"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alimentacion_controller_1 = __importDefault(require("../controllers/alimentacion.controller"));
const router = (0, express_1.Router)({ mergeParams: true });
router.get('/', alimentacion_controller_1.default.list);
router.get('/:id', alimentacion_controller_1.default.get);
router.post('/', alimentacion_controller_1.default.create);
router.put('/:id', alimentacion_controller_1.default.update);
router.delete('/:id', alimentacion_controller_1.default.remove);
exports.default = router;
