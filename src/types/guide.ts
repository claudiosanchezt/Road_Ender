export interface Guide {
  id: number;
  name?: string;
  description?: string;
  zone?: string;
  specialties?: any[];
  languages?: any[];
  rating?: number;
  totalReviews?: number;
  pricePerDay?: number;
  availability?: boolean;
  avatar?: string;
}
