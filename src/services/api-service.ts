import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const API_BASE = (() => {
	if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
	if (isBrowser) {
		// runtime in browser: if NEXT_PUBLIC_API_URL not set, assume host:4000
		try { return `${window.location.protocol}//${window.location.hostname}:4000`; } catch { return '/api'; }
	}
	return 'http://api:4000';
})();

export const apiService = axios.create({ baseURL: API_BASE });

// Attach convenience methods to the axios instance for compatibility with components
(apiService as any).addReview = async (guideId: any, payload: any) => {
	return apiService.post(`/api/guides/${guideId}/reviews`, payload);
};

export default apiService;

// named export for backwards compatibility
export const addReview = (guideId: any, payload: any) => (apiService as any).addReview(guideId, payload);

