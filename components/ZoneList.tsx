"use client";
import React from 'react';
import { api, setAuthToken } from '../src/lib/apiClient';
import ZoneCard from './ZoneCard';
import FeaturedZoneCard from './FeaturedZoneCard';
import type { Zone } from './types';

const fetchZones = async (): Promise<Zone[]> => {
  const res = await api.get<Zone[]>('/api/zones');
  return res.data;
};

export default function ZoneList({
  search,
  region,
  variant,
}: {
  search?: string;
  region?: string;
  variant?: 'featured' | 'default';
}) {
  // try to pick a dev token from localStorage (developer convenience)
  React.useEffect(() => {
    try {
      const t = typeof window !== 'undefined' ? localStorage.getItem('dev_token') : null;
      if (t) setAuthToken(t);
    } catch (e) {
      // ignore
    }
  }, []);

  const pageSize = variant === 'featured' ? 6 : 12;

  const [page, setPage] = React.useState(1);
  const [pagesData, setPagesData] = React.useState<Zone[][]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchPage = async (p: number) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const params: Record<string, string> = { page: String(p), limit: String(pageSize) };
      if (search) params.q = search;
      if (region) params.region = region;
      const query = new URLSearchParams(params).toString();
      const url = `/api/zones?${query}`;
      const res = await api.get<{ data: Zone[]; nextPage?: number | null }>(url);
      const data = res.data.data ?? res.data;
      if (p === 1) setPagesData([data]);
      else setPagesData((prev) => [...prev, data]);
      setIsLoading(false);
      setError(null);
    } catch (e: any) {
      setIsError(true);
      setError(e instanceof Error ? e : new Error(String(e)));
      setIsLoading(false);
    }
  };

  // reset when filters change
  React.useEffect(() => {
    setPage(1);
    setPagesData([]);
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, region, variant]);

  // load more when page increments >1
  React.useEffect(() => {
    if (page === 1) return;
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const zones = pagesData.flatMap((p) => p);

  if (isLoading) {
    const cols = variant === 'featured' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    return (
      <div className={`grid ${cols} gap-4 p-4`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`zone-card card-gradient p-4 rounded-lg animate-pulse ${variant === 'featured' ? 'h-64' : ''}`}>
            <div className="h-40 bg-gray-200 rounded-md mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) return <div className="p-4 text-red-600">Error: {error?.message}</div>;
  if (!zones || zones.length === 0) return <div className="p-4">No hay zonas disponibles</div>;

  const cols = variant === 'featured' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <>
      <div className={`grid ${cols} gap-4 p-4`}>
        {zones.map((z: Zone) => (variant === 'featured' ? <FeaturedZoneCard key={z.id} zone={z} /> : <ZoneCard key={z.id} zone={z} />))}
      </div>

      <div className="p-4 flex justify-center">
        {/* simple heuristic: if last page length === pageSize, allow loading more */}
        {zones.length > 0 && pagesData[pagesData.length - 1]?.length === pageSize ? (
          <button onClick={() => setPage((s) => s + 1)} disabled={isLoading} className="btn btn-outline-secondary">
            {isLoading ? 'Cargando...' : 'Cargar más'}
          </button>
        ) : (
          <span className="text-sm text-gray-500">No hay más zonas</span>
        )}
      </div>
    </>
  );
}
