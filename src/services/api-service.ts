import axios from 'axios';

export const apiService = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000' });

// Attach convenience methods to the axios instance for compatibility with components
(apiService as any).addReview = async (guideId: any, payload: any) => {
	return apiService.post(`/api/guides/${guideId}/reviews`, payload);
};

export default apiService;

// named export for backwards compatibility
export const addReview = (guideId: any, payload: any) => (apiService as any).addReview(guideId, payload);

