import { getPostgresPool } from '../lib/database';
import mongoose from 'mongoose';

export function getDatamartService() {
	return {
		async getFilteredPlaces(_opts: any) {
			return [] as any[];
		},

		async searchPlaces(_q: string, _limit?: number) {
			return [] as any[];
		},

		async getAvailableCategories() {
			const pool = getPostgresPool();
			const res = await pool.query('SELECT id, name FROM specialties ORDER BY id LIMIT 100');
			return res.rows;
		},

		async getQuickStatsByCountry() {
			// Example aggregation: count guides per country (requires guides.country_id)
			const pool = getPostgresPool();
			const res = await pool.query(`
				SELECT c.id as country_id, c.name as country_name, COUNT(g.id) as guides_count
				FROM countries c
				LEFT JOIN guides g ON g.country_id = c.id
				GROUP BY c.id, c.name
				ORDER BY guides_count DESC
				LIMIT 20
			`);
			return res.rows;
		},

		async findPlacesByLocation(_lng: number, _lat: number, _radiusKm: number, _limit: number) {
			return [] as any[];
		},

		async getHomeStats() {
			const pool = getPostgresPool();
			// counts from Postgres
			const zonesRes = await pool.query('SELECT COUNT(*)::int as cnt FROM zones');
			const guidesRes = await pool.query('SELECT COUNT(*)::int as cnt FROM guides');
			const placesRes = await pool.query('SELECT COUNT(*)::int as cnt FROM tourist_places');

			// example: count online guides could be a boolean column `online`
			const onlineRes = await pool.query("SELECT COUNT(*)::int as cnt FROM guides WHERE online = true").catch(() => ({ rows: [{ cnt: 0 }] }));

			// additional quick stats from Mongo (if needed)
			let mongoInfo: any = {};
			try {
				mongoInfo = { connected: mongoose.connection.readyState === 1 };
			} catch (e) {
				mongoInfo = { connected: false };
			}

			return {
				totals: {
					zones: zonesRes.rows[0]?.cnt ?? 0,
					guides: guidesRes.rows[0]?.cnt ?? 0,
					places: placesRes.rows[0]?.cnt ?? 0,
					onlineGuides: onlineRes.rows[0]?.cnt ?? 0
				},
				mongo: mongoInfo,
				lastUpdated: new Date().toISOString()
			} as any;
		}
	};
}

export default getDatamartService;

