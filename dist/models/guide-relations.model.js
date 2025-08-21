"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideRelationsModelRepository = void 0;
const postgres_1 = require("../database/postgres");
class GuideRelationsModelRepository {
    static async specialtiesForGuide(guideId) {
        const res = await postgres_1.pgPool.query(`SELECT s.* FROM specialties s JOIN guide_specialties gs ON s.id = gs.specialty_id WHERE gs.guide_id = $1`, [guideId]);
        return res.rows;
    }
    static async languagesForGuide(guideId) {
        const res = await postgres_1.pgPool.query(`SELECT l.* FROM languages l JOIN guide_languages gl ON l.id = gl.language_id WHERE gl.guide_id = $1`, [guideId]);
        return res.rows;
    }
    static async zonesForGuide(guideId) {
        const res = await postgres_1.pgPool.query(`SELECT z.* FROM zones z JOIN guide_zones gz ON z.id = gz.zone_id WHERE gz.guide_id = $1`, [guideId]);
        return res.rows;
    }
    static async touristPlacesForGuide(guideId) {
        const res = await postgres_1.pgPool.query(`SELECT t.* FROM tourist_places t JOIN guide_tourist_places gtp ON t.id = gtp.tourist_place_id WHERE gtp.guide_id = $1`, [guideId]);
        return res.rows;
    }
}
exports.GuideRelationsModelRepository = GuideRelationsModelRepository;
