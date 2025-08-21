// En el servidor dentro del contenedor Docker queremos resolver el API
// hacia el servicio `api` en la red Docker. En el navegador seguiremos
// respetando NEXT_PUBLIC_API_URL o el proxy relativo.
const isBrowser = typeof window !== 'undefined';
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || (isBrowser ? '/api' : 'http://api:4000');

type Hospedaje = {
  id: number;
  name: string;
  address?: string;
  price?: number;
  description?: string;
  images?: string[];
};

type Zone = {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  hero_image?: string;
};

async function fetchJson(path: string, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  const payload = await res.json();
  // soportar forma { data: [...] } o un array directo
  if (payload && typeof payload === 'object' && 'data' in payload) return payload.data;
  return payload;
  } finally {
    clearTimeout(id);
  }
}

export async function listFeaturedHospedajes(): Promise<Hospedaje[]> {
  try {
  const data = await fetchJson('/api/hospedajes');
  return Array.isArray(data) ? data : Array.isArray((data as any)?.data) ? (data as any).data : [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('listFeaturedHospedajes failed:', err);
    return [];
  }
}

export async function getHospedaje(id: number): Promise<Hospedaje | null> {
  try {
    return await fetchJson(`/api/hospedajes/${id}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('getHospedaje failed:', err);
    return null;
  }
}

export async function listZones(): Promise<Zone[]> {
  try {
  const data = await fetchJson('/api/zones');
  return Array.isArray(data) ? data : Array.isArray((data as any)?.data) ? (data as any).data : [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('listZones failed:', err);
    return [];
  }
}

export type { Hospedaje, Zone };
