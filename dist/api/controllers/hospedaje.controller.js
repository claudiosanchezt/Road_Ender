"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hospedaje_model_1 = require("../../models/hospedaje.model");
const hospedaje_validator_1 = require("../validators/hospedaje.validator");
exports.default = {
    async list(_req, res) {
        const data = await hospedaje_model_1.HospedajeModel.list();
        res.json({ data });
    },
    async get(req, res) {
        const id = Number(req.params.id);
        const data = await hospedaje_model_1.HospedajeModel.get(id);
        if (!data)
            return res.status(404).json({ error: 'Not found' });
        res.json({ data });
    },
    async create(req, res) {
        try {
            const payload = hospedaje_validator_1.CreateHospedajeSchema.parse(req.body);
            const created = await hospedaje_model_1.HospedajeModel.create(payload);
            res.status(201).json({ data: created });
        }
        catch (e) {
            return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
        }
    },
    async update(req, res) {
        const id = Number(req.params.id);
        try {
            const payload = hospedaje_validator_1.UpdateHospedajeSchema.parse(req.body);
            const updated = await hospedaje_model_1.HospedajeModel.update(id, payload);
            if (!updated)
                return res.status(404).json({ error: 'Not found' });
            res.json({ data: updated });
        }
        catch (e) {
            return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
        }
    },
    async remove(req, res) {
        const id = Number(req.params.id);
        await hospedaje_model_1.HospedajeModel.remove(id);
        res.status(204).send();
    }
};
