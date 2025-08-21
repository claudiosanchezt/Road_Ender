import { NextRequest, NextResponse } from 'next/server';
import { getDatamartService } from '@/services/datamart-service';

export async function GET(req: NextRequest) {
  try {
    const datamartService = getDatamartService();
    const [homeStats, quick, categories] = await Promise.all([
      datamartService.getHomeStats(),
      datamartService.getQuickStatsByCountry(),
      datamartService.getAvailableCategories()
    ]);

    // Fallbacks si el datamart está en modo stub
    const totals = (homeStats && homeStats.totals) ? {
      zones: homeStats.totals.zones ?? 0,
      guides: homeStats.totals.guides ?? 0,
      places: homeStats.totals.places ?? 0,
    } : { zones: 0, guides: 0, places: 0 };

    // Métricas adicionales: top categories + quick stats
    const topCategories = Array.isArray(categories)
       ? categories.slice(0, 6).map((c: any) => ({ id: c.id ?? c._id ?? null, name: c.name ?? c.label ?? String(c) }))
       : [];

  const quickStats = Array.isArray(quick) ? quick : [];

    // Ejemplo de métrica dinámica adicional (placeholder si no existe)
    const guidesOnline = homeStats.totals.onlineGuides ?? homeStats.totals.online_guides ?? 0;

    const response = {
      success: true,
      data: {
        totals,
        guidesOnline,
        topCategories,
                quickStats,
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json(response, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
    });

  } catch (error) {
    console.error('Error en /api/home/meta', error);
    return NextResponse.json({ success: false, error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? String(error) : undefined }, { status: 500 });
  }
}
