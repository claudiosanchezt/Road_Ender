import { Router } from 'express';
import { getDatamartService } from '../../services/datamart-service';

const router = Router();

// Nuevo endpoint: /api/home/stats -> devuelve métricas resumidas (zones, guides, places, online)
router.get('/stats', async (req, res) => {
  try {
    const datamart = getDatamartService();
    const homeStats = await datamart.getHomeStats();

    return res.json({ success: true, data: homeStats });
  } catch (error) {
    console.error('Error in /api/home/stats', error);
    return res.status(500).json({ success: false, error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? String(error) : undefined });
  }
});

export default router;
