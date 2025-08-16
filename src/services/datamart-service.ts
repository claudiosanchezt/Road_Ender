export function getDatamartService() {
	return {
		async getFilteredPlaces(_opts: any) {
			// placeholder: return empty array in dev
			return [] as any[];
		},
			async searchPlaces(_q: string, _limit?: number) {
				return [] as any[];
		}
			,
			async getAvailableCategories() {
				return [] as any[];
			},
			async getQuickStatsByCountry() {
				return [] as any[];
			}
				,
				async findPlacesByLocation(_lng: number, _lat: number, _radiusKm: number, _limit: number) {
					return [] as any[];
				}
					,
					async getHomeStats() {
						return {
							totals: {},
							countries: [],
							featuredPlaces: [],
							lastUpdated: new Date().toISOString()
						} as any;
					}
	};
}

export default getDatamartService;

