"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRelationsRouter = (0, express_1.Router)();
// /users/:id/bookings
userRelationsRouter.get('/:id/bookings', (req, res) => res.json([]));
exports.default = userRelationsRouter;
