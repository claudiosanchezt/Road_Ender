"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alimentacion_model_1 = require("../../models/alimentacion.model");
const alimentacion_validator_1 = require("../validators/alimentacion.validator");
exports.default = {
    async list(req, res) {
        const hospedajeId = Number(req.params.hospedajeId);
        const data = await alimentacion_model_1.AlimentacionModel.listByHospedaje(hospedajeId);
        res.json({ data });
    },
    async get(req, res) {
        const id = Number(req.params.id);
        const data = await alimentacion_model_1.AlimentacionModel.get(id);
        if (!data)
            return res.status(404).json({ error: 'Not found' });
        res.json({ data });
    },
    async create(req, res) {
        const hospedajeId = Number(req.params.hospedajeId);
        try {
            const body = alimentacion_validator_1.CreateAlimentacionSchema.parse(req.body);
            const payload = { ...body, hospedaje_id: hospedajeId };
            const created = await alimentacion_model_1.AlimentacionModel.create(payload);
            res.status(201).json({ data: created });
        }
        catch (e) {
            return res.status(400).json({ error: 'validation', details: e.errors || String(e) });
        }
    },
    async update(req, res) {
        const id = Number(req.params.id);
        try {
            const payload = alimentacion_validator_1.UpdateAlimentacionSchema.parse(req.body);
            const updated = await alimentacion_model_1.AlimentacionModel.update(id, payload);
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
        await alimentacion_model_1.AlimentacionModel.remove(id);
        res.status(204).send();
    }
};
