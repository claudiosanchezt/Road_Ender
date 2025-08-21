"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideRelationsController = void 0;
const guide_relations_service_1 = require("../../services/guide-relations.service");
class GuideRelationsController {
    static async specialties(req, res) {
        const guideId = Number(req.params.id);
        const items = await guide_relations_service_1.GuideRelationsService.specialties(guideId);
        res.json(items);
    }
    static async languages(req, res) {
        const guideId = Number(req.params.id);
        const items = await guide_relations_service_1.GuideRelationsService.languages(guideId);
        res.json(items);
    }
    static async zones(req, res) {
        const guideId = Number(req.params.id);
        const items = await guide_relations_service_1.GuideRelationsService.zones(guideId);
        res.json(items);
    }
    static async touristPlaces(req, res) {
        const guideId = Number(req.params.id);
        const items = await guide_relations_service_1.GuideRelationsService.touristPlaces(guideId);
        res.json(items);
    }
}
exports.GuideRelationsController = GuideRelationsController;
