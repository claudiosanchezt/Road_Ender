import axios from 'axios';

// Usar NEXT_PUBLIC_API_URL para sobreescribir en producción o pruebas.
// En el navegador usamos la ruta relativa '/api' para evitar CORS y
// para dejar que Next haga el proxy/rewrite hacia el backend en :4000.
const isBrowser = typeof window !== 'undefined';
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? (isBrowser ? '/api' : 'http://localhost:4000');

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export default api;
