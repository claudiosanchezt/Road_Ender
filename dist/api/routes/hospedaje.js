"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospedaje_controller_1 = __importDefault(require("../controllers/hospedaje.controller"));
const router = (0, express_1.Router)();
router.get('/', hospedaje_controller_1.default.list);
router.get('/:id', hospedaje_controller_1.default.get);
router.post('/', hospedaje_controller_1.default.create);
router.put('/:id', hospedaje_controller_1.default.update);
router.delete('/:id', hospedaje_controller_1.default.remove);
exports.default = router;
