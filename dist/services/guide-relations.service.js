"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideRelationsService = void 0;
const guide_relations_model_1 = require("../models/guide-relations.model");
class GuideRelationsService {
    static async specialties(guideId) {
        return guide_relations_model_1.GuideRelationsModelRepository.specialtiesForGuide(guideId);
    }
    static async languages(guideId) {
        return guide_relations_model_1.GuideRelationsModelRepository.languagesForGuide(guideId);
    }
    static async zones(guideId) {
        return guide_relations_model_1.GuideRelationsModelRepository.zonesForGuide(guideId);
    }
    static async touristPlaces(guideId) {
        return guide_relations_model_1.GuideRelationsModelRepository.touristPlacesForGuide(guideId);
    }
}
exports.GuideRelationsService = GuideRelationsService;
