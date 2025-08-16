// Hook para obtener guías desde el backend
import { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api-config';

export interface Guide {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  image: string;
  description: string;
  badge: string;
  price?: number;
  currency?: string;
  zone?: string;
  isTopGuide?: boolean;
}


export interface UseGuidesResult {
  guides: Guide[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export interface UseGuidesFilters {
  zones?: string[];
  country?: string;
  limit?: number;
  minRating?: number;
}

const useGuides = (filters?: UseGuidesFilters): UseGuidesResult => {
  const [allGuides, setAllGuides] = useState<Guide[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 8;
  const totalPages = Math.ceil(allGuides.length / pageSize) || 1;

  const fetchGuides = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construir query params
      const params = new URLSearchParams();
      if (filters?.zones && filters.zones.length > 0) {
        params.append('zones', filters.zones.join(','));
      }
      if (filters?.country) {
        params.append('country', filters.country);
      }
      if (filters?.minRating) {
        params.append('minRating', filters.minRating.toString());
      }
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }

      const url = `${API_CONFIG.BASE_URL}/api/guides/search?${params.toString()}`;
      console.log('🔍 Fetching guides from:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Error obteniendo guías');
      }

      // Mapeo real de los datos del backend
      const transformedGuides: Guide[] = result.data.guides.map((guide: any, index: number) => ({
        id: guide.guideId || index + 1,
        name: guide.fullName || 'Guía Anónimo',
        location: guide.workingZones && guide.workingZones[0]?.zoneName ? guide.workingZones[0].zoneName : 'Ubicación no especificada',
        rating: guide.statistics?.averageRating || guide.score?.total || 4.5,
        reviews: guide.statistics?.totalTours || 0,
        specialties: Array.isArray(guide.specialties) ? guide.specialties.map((s: any) => s.name || s) : [],
        image: guide.profileData?.profileImage || guide.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(guide.fullName || 'Guía')}`,
        description: guide.profileData?.bio || 'Guía profesional especializado en turismo',
        badge: guide.badge || '⭐ Guía Certificado',
        price: guide.pricing?.dynamicPricing?.finalRate || guide.pricing?.baseHourlyRate || 0,
        currency: guide.pricing?.currency || 'CLP',
        zone: guide.workingZones && guide.workingZones[0]?.zoneName ? guide.workingZones[0].zoneName : '',
        isTopGuide: (guide.score?.total || 0) >= 90,
        languages: Array.isArray(guide.languages) ? guide.languages.map((l: any) => l.name) : []
      }));

      // Si hay menos de 8 guías, rellenar con placeholders para que el carrusel siempre muestre 8
      let guidesToShow = transformedGuides;
      if (guidesToShow.length < 8) {
        const placeholders = Array.from({ length: 8 - guidesToShow.length }, (_, i) => ({
          id: 10000 + i, // id numérico fuera del rango real
          name: 'Próximamente',
          location: '',
          rating: 0,
          reviews: 0,
          specialties: [],
          image: 'https://ui-avatars.com/api/?name=Guía',
          description: 'Nuevo guía próximamente',
          badge: '',
          price: 0,
          currency: '',
          zone: '',
          isTopGuide: false,
          languages: []
        }));
        guidesToShow = [...guidesToShow, ...placeholders];
      }
      setAllGuides(guidesToShow);
      setPage(0);
      // Mostrar la primera página
      setGuides(guidesToShow.slice(0, pageSize));
      console.log(`✅ Cargados ${guidesToShow.length} guías (incluyendo placeholders si aplica)`);
    } catch (err) {
      console.error('❌ Error cargando guías:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.zones?.join(','), filters?.country, filters?.limit, filters?.minRating]);

  // Actualizar guides al cambiar de página
  useEffect(() => {
    setGuides(allGuides.slice(page * pageSize, (page + 1) * pageSize));
  }, [allGuides, page]);

  const nextPage = () => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  const prevPage = () => setPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));

  return {
    guides,
    loading,
    error,
    refetch: fetchGuides,
    page,
    totalPages,
    nextPage,
    prevPage
  };
};

export default useGuides;
