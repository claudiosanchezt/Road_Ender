"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datamart_service_1 = require("../../services/datamart-service");
const router = (0, express_1.Router)();
// Nuevo endpoint: /api/home/stats -> devuelve métricas resumidas (zones, guides, places, online)
router.get('/stats', async (req, res) => {
    try {
        const datamart = (0, datamart_service_1.getDatamartService)();
        const homeStats = await datamart.getHomeStats();
        return res.json({ success: true, data: homeStats });
    }
    catch (error) {
        console.error('Error in /api/home/stats', error);
        return res.status(500).json({ success: false, error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? String(error) : undefined });
    }
});
exports.default = router;
