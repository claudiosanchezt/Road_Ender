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

// New endpoint: /api/home/featured-places -> returns featured places formatted
router.get('/featured-places', async (req, res) => {
  try {
    const { limit } = req.query;
    const datamart = getDatamartService();
    const places = await datamart.getFilteredPlaces({ limit: limit ? parseInt(limit as string) : 12 });

    const formatted = places.map((place: any) => ({
      id: place.placeId,
      name: place.placeName,
      images: {
        main: place.images && place.images.length > 0 ? `/images/places/${place.placeId}/${place.images[0]}` : '/images/default-place.jpg',
        gallery: place.images ? place.images.map((img: string) => `/images/places/${place.placeId}/${img}`) : [],
        thumbnail: (place.images && place.images.length > 0)
          ? (() => {
              const fs = require('fs');
              const path = require('path');
              const img = place.images[0];
              const base = img.split('.')[0];
              const thumbsRoot = path.join(process.cwd(), 'public', 'images', 'thumbnails', 'places');
              const candidates = [
                `${place.placeId}_${base}_thumb.webp`,
                `${place.placeId}_${base}_thumb.png`,
                `${place.placeId}_${base}_thumb.svg`
              ];
              for (const c of candidates) {
                try {
                  if (fs.existsSync(path.join(thumbsRoot, c))) return `/images/thumbnails/places/${c}`;
                } catch (e) {
                  // ignore
                }
              }
              // final fallback
              return `/images/thumbnails/places/${place.placeId}_${base}_thumb.webp`;
            })()
          : '/images/default-place-thumb.jpg'
      },
      analytics: {
        rating: place.analytics?.averageRating || 0,
        visits: place.analytics?.totalVisits || 0,
        bookings: place.analytics?.totalBookings || 0
      },
      isFeatured: place.isFeatured || false
    }));

    return res.json({ success: true, data: { places: formatted, total: formatted.length } });
  } catch (error) {
    console.error('Error in /api/home/featured-places', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
