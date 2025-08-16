import { Pool } from 'pg';
import { MongoClient, Db } from 'mongodb';
import { 
  User, 
  Guide, 
  Booking, 
  Review, 
  Language, 
  Specialty,
  SpecialtyCategory,
  Zone, 
  Continent,
  Country,
  State,
  TouristPlace,
  Infrastructure,
  ZoneStatistics
} from '../types';

// 🗃️ Base Repository Class
export abstract class BaseRepository {
  constructor(
    protected pgPool: Pool,
    protected mongoDb: Db
  ) {}

  protected async executeQuery(query: string, params: any[] = []) {
    const client = await this.pgPool.connect();
    try {
      const result = await client.query(query, params);
      return result;
    } finally {
      client.release();
    }
  }
}

// 🌍 GEOGRAPHIC REPOSITORIES

export class ContinentRepository extends BaseRepository {
  async findAll(): Promise<Continent[]> {
    const query = `
      SELECT c.*, 
             COUNT(co.id) as countries_count
      FROM continents c
      LEFT JOIN countries co ON c.id = co.continent_id
      WHERE c.is_active = true
      GROUP BY c.id
      ORDER BY c.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      code: row.code,
      timezone: row.timezone,
      countriesCount: parseInt(row.countries_count),
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findById(id: string): Promise<Continent | null> {
    const query = `
      SELECT c.*
      FROM continents c
      WHERE c.id = $1 AND c.is_active = true
    `;
    const result = await this.executeQuery(query, [id]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      code: row.code,
      timezone: row.timezone,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async create(continent: Omit<Continent, 'id' | 'createdAt' | 'updatedAt'>): Promise<Continent> {
    const query = `
      INSERT INTO continents (name, code, timezone, is_active)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.executeQuery(query, [
      continent.name,
      continent.code,
      continent.timezone,
      continent.isActive ?? true
    ]);
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      code: row.code,
      timezone: row.timezone,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export class CountryRepository extends BaseRepository {
  async findAll(): Promise<Country[]> {
    const query = `
      SELECT c.*, co.name as continent_name,
             COUNT(s.id) as states_count
      FROM countries c
      JOIN continents co ON c.continent_id = co.id
      LEFT JOIN states s ON c.id = s.country_id
      WHERE c.is_active = true
      GROUP BY c.id, co.name
      ORDER BY c.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      continentId: row.continent_id,
      name: row.name,
      code: row.code,
      currency: row.currency,
      language: row.language,
      timezone: row.timezone,
      phoneCode: row.phone_code,
      coordinates: row.coordinates,
      statesCount: parseInt(row.states_count),
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findByContinent(continentId: string): Promise<Country[]> {
    const query = `
      SELECT c.*
      FROM countries c
      WHERE c.continent_id = $1 AND c.is_active = true
      ORDER BY c.name
    `;
    const result = await this.executeQuery(query, [continentId]);
    return result.rows.map(row => ({
      id: row.id,
      continentId: row.continent_id,
      name: row.name,
      code: row.code,
      currency: row.currency,
      language: row.language,
      timezone: row.timezone,
      phoneCode: row.phone_code,
      coordinates: row.coordinates,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findById(id: string): Promise<Country | null> {
    const query = `
      SELECT c.*
      FROM countries c
      WHERE c.id = $1 AND c.is_active = true
    `;
    const result = await this.executeQuery(query, [id]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      continentId: row.continent_id,
      name: row.name,
      code: row.code,
      currency: row.currency,
      language: row.language,
      timezone: row.timezone,
      phoneCode: row.phone_code,
      coordinates: row.coordinates,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async create(country: Omit<Country, 'id' | 'createdAt' | 'updatedAt'>): Promise<Country> {
    const query = `
      INSERT INTO countries (continent_id, name, code, currency, language, timezone, phone_code, coordinates, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const result = await this.executeQuery(query, [
      country.continentId,
      country.name,
      country.code,
      country.currency,
      country.language,
      country.timezone,
      country.phoneCode,
      JSON.stringify(country.coordinates),
      country.isActive ?? true
    ]);
    
    const row = result.rows[0];
    return {
      id: row.id,
      continentId: row.continent_id,
      name: row.name,
      code: row.code,
      currency: row.currency,
      language: row.language,
      timezone: row.timezone,
      phoneCode: row.phone_code,
      coordinates: row.coordinates,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export class StateRepository extends BaseRepository {
  async findAll(): Promise<State[]> {
    const query = `
      SELECT s.*, 
             c.name as country_name,
             COUNT(z.id) as zones_count
      FROM states s
      JOIN countries c ON s.country_id = c.id
      LEFT JOIN zones z ON s.id = z.state_id
      WHERE s.is_active = true
      GROUP BY s.id, c.name
      ORDER BY c.name, s.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      countryId: row.country_id,
      name: row.name,
      code: row.code,
      type: row.type as 'state' | 'region' | 'province' | 'department',
      capital: row.capital,
      coordinates: row.coordinates,
      zonesCount: parseInt(row.zones_count),
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findByCountry(countryId: string): Promise<State[]> {
    const query = `
      SELECT s.*
      FROM states s
      WHERE s.country_id = $1 AND s.is_active = true
      ORDER BY s.name
    `;
    const result = await this.executeQuery(query, [countryId]);
    return result.rows.map(row => ({
      id: row.id,
      countryId: row.country_id,
      name: row.name,
      code: row.code,
      type: row.type as 'state' | 'region' | 'province' | 'department',
      capital: row.capital,
      coordinates: row.coordinates,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findById(id: string): Promise<State | null> {
    const query = `
      SELECT s.*
      FROM states s
      WHERE s.id = $1 AND s.is_active = true
    `;
    const result = await this.executeQuery(query, [id]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      countryId: row.country_id,
      name: row.name,
      code: row.code,
      type: row.type as 'state' | 'region' | 'province' | 'department',
      capital: row.capital,
      coordinates: row.coordinates,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export class TouristPlaceRepository extends BaseRepository {
  async findAll(): Promise<TouristPlace[]> {
    const query = `
      SELECT tp.*, 
             z.name as zone_name,
             s.name as state_name,
             c.name as country_name
      FROM tourist_places tp
      JOIN zones z ON tp.zone_id = z.id
      JOIN states s ON z.state_id = s.id
      JOIN countries c ON s.country_id = c.id
      WHERE tp.is_active = true
      ORDER BY c.name, s.name, z.name, tp.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      zoneId: row.zone_id,
      name: row.name,
      description: row.description,
      type: row.type as TouristPlace['type'],
      coordinates: row.coordinates,
      difficultyLevel: row.difficulty_level,
      estimatedDuration: row.estimated_duration,
      capacity: row.capacity,
      requiresGuide: row.requires_guide,
      requiresEquipment: row.requires_equipment,
      equipment: row.equipment,
      openingHours: row.opening_hours,
      seasonality: row.seasonality,
      fees: row.fees,
      restrictions: row.restrictions,
      images: row.images,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findByZone(zoneId: string): Promise<TouristPlace[]> {
    const query = `
      SELECT tp.*
      FROM tourist_places tp
      WHERE tp.zone_id = $1 AND tp.is_active = true
      ORDER BY tp.difficulty_level, tp.name
    `;
    const result = await this.executeQuery(query, [zoneId]);
    return result.rows.map(row => ({
      id: row.id,
      zoneId: row.zone_id,
      name: row.name,
      description: row.description,
      type: row.type as TouristPlace['type'],
      coordinates: row.coordinates,
      difficultyLevel: row.difficulty_level,
      estimatedDuration: row.estimated_duration,
      capacity: row.capacity,
      requiresGuide: row.requires_guide,
      requiresEquipment: row.requires_equipment,
      equipment: row.equipment,
      openingHours: row.opening_hours,
      seasonality: row.seasonality,
      fees: row.fees,
      restrictions: row.restrictions,
      images: row.images,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findById(id: string): Promise<TouristPlace | null> {
    const query = `
      SELECT tp.*
      FROM tourist_places tp
      WHERE tp.id = $1 AND tp.is_active = true
    `;
    const result = await this.executeQuery(query, [id]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      zoneId: row.zone_id,
      name: row.name,
      description: row.description,
      type: row.type as TouristPlace['type'],
      coordinates: row.coordinates,
      difficultyLevel: row.difficulty_level,
      estimatedDuration: row.estimated_duration,
      capacity: row.capacity,
      requiresGuide: row.requires_guide,
      requiresEquipment: row.requires_equipment,
      equipment: row.equipment,
      openingHours: row.opening_hours,
      seasonality: row.seasonality,
      fees: row.fees,
      restrictions: row.restrictions,
      images: row.images,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async searchByName(searchTerm: string): Promise<TouristPlace[]> {
    const query = `
      SELECT tp.*, 
             z.name as zone_name,
             s.name as state_name,
             c.name as country_name
      FROM tourist_places tp
      JOIN zones z ON tp.zone_id = z.id
      JOIN states s ON z.state_id = s.id
      JOIN countries c ON s.country_id = c.id
      WHERE tp.is_active = true 
        AND (tp.name ILIKE $1 OR tp.description ILIKE $1)
      ORDER BY tp.name
      LIMIT 50
    `;
    const result = await this.executeQuery(query, [`%${searchTerm}%`]);
    return result.rows.map(row => ({
      id: row.id,
      zoneId: row.zone_id,
      name: row.name,
      description: row.description,
      type: row.type as TouristPlace['type'],
      coordinates: row.coordinates,
      difficultyLevel: row.difficulty_level,
      estimatedDuration: row.estimated_duration,
      capacity: row.capacity,
      requiresGuide: row.requires_guide,
      requiresEquipment: row.requires_equipment,
      equipment: row.equipment,
      openingHours: row.opening_hours,
      seasonality: row.seasonality,
      fees: row.fees,
      restrictions: row.restrictions,
      images: row.images,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async create(place: Omit<TouristPlace, 'id' | 'createdAt' | 'updatedAt'>): Promise<TouristPlace> {
    const query = `
      INSERT INTO tourist_places (
        zone_id, name, description, type, coordinates, difficulty_level,
        estimated_duration, capacity, requires_guide, requires_equipment,
        equipment, opening_hours, seasonality, fees, restrictions, images, is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *
    `;
    const result = await this.executeQuery(query, [
      place.zoneId,
      place.name,
      place.description,
      place.type,
      JSON.stringify(place.coordinates),
      place.difficultyLevel,
      place.estimatedDuration,
      place.capacity,
      place.requiresGuide,
      place.requiresEquipment,
      place.equipment,
      JSON.stringify(place.openingHours),
      JSON.stringify(place.seasonality),
      JSON.stringify(place.fees),
      place.restrictions,
      place.images,
      place.isActive ?? true
    ]);
    
    const row = result.rows[0];
    return {
      id: row.id,
      zoneId: row.zone_id,
      name: row.name,
      description: row.description,
      type: row.type as TouristPlace['type'],
      coordinates: row.coordinates,
      difficultyLevel: row.difficulty_level,
      estimatedDuration: row.estimated_duration,
      capacity: row.capacity,
      requiresGuide: row.requires_guide,
      requiresEquipment: row.requires_equipment,
      equipment: row.equipment,
      openingHours: row.opening_hours,
      seasonality: row.seasonality,
      fees: row.fees,
      restrictions: row.restrictions,
      images: row.images,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

// 🎯 SPECIALTY REPOSITORIES

export class SpecialtyCategoryRepository extends BaseRepository {
  async findAll(): Promise<SpecialtyCategory[]> {
    const query = `
      SELECT sc.*,
             COUNT(s.id) as specialties_count
      FROM specialty_categories sc
      LEFT JOIN specialties s ON sc.id = s.category_id
      WHERE sc.is_active = true
      GROUP BY sc.id
      ORDER BY sc.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      icon: row.icon,
      color: row.color,
      specialtiesCount: parseInt(row.specialties_count),
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findById(id: string): Promise<SpecialtyCategory | null> {
    const query = `
      SELECT sc.*
      FROM specialty_categories sc
      WHERE sc.id = $1 AND sc.is_active = true
    `;
    const result = await this.executeQuery(query, [id]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      icon: row.icon,
      color: row.color,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async create(category: Omit<SpecialtyCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<SpecialtyCategory> {
    const query = `
      INSERT INTO specialty_categories (name, description, icon, color, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await this.executeQuery(query, [
      category.name,
      category.description,
      category.icon,
      category.color,
      category.isActive ?? true
    ]);
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      icon: row.icon,
      color: row.color,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

// 🌟 ENHANCED ZONE REPOSITORY
export class ZoneRepositoryV2 extends BaseRepository {
  async findAll(): Promise<Zone[]> {
    const query = `
      SELECT z.*, 
             s.name as state_name,
             c.name as country_name,
             co.name as continent_name,
             COUNT(tp.id) as tourist_places_count,
             COUNT(DISTINCT g.id) as guides_count,
             AVG(r.rating) as average_rating
      FROM zones z
      JOIN states s ON z.state_id = s.id
      JOIN countries c ON s.country_id = c.id
      JOIN continents co ON c.continent_id = co.id
      LEFT JOIN tourist_places tp ON z.id = tp.zone_id AND tp.is_active = true
      LEFT JOIN guide_zones gz ON z.id = gz.zone_id
      LEFT JOIN guides g ON gz.guide_id = g.id AND g.is_active = true
      LEFT JOIN bookings b ON z.id = b.zone_id AND b.status = 'completed'
      LEFT JOIN reviews r ON b.id = r.booking_id
      WHERE z.is_active = true
      GROUP BY z.id, s.name, c.name, co.name
      ORDER BY co.name, c.name, s.name, z.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      stateId: row.state_id,
      name: row.name,
      description: row.description,
      category: row.category as Zone['category'],
      coordinates: row.coordinates,
      complexity: row.complexity,
      maxAltitude: row.max_altitude,
      accessibility: row.accessibility,
      entranceFee: parseFloat(row.entrance_fee),
      bestSeasons: row.best_seasons,
      averageTemperature: {
        min: row.average_temperature_min,
        max: row.average_temperature_max
      },
      infrastructure: row.infrastructure as Infrastructure,
      fees: row.fees,
      statistics: ({
        touristPlacesCount: parseInt(row.tourist_places_count) || 0,
        guidesCount: parseInt(row.guides_count) || 0,
        averageRating: parseFloat(row.average_rating) || 0,
        totalBookings: 0,
        completedBookings: 0
      } as unknown) as ZoneStatistics,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findByState(stateId: string): Promise<Zone[]> {
    const query = `
      SELECT z.*,
             COUNT(tp.id) as tourist_places_count
      FROM zones z
      LEFT JOIN tourist_places tp ON z.id = tp.zone_id AND tp.is_active = true
      WHERE z.state_id = $1 AND z.is_active = true
      GROUP BY z.id
      ORDER BY z.complexity, z.name
    `;
    const result = await this.executeQuery(query, [stateId]);
    return result.rows.map(row => ({
      id: row.id,
      stateId: row.state_id,
      name: row.name,
      description: row.description,
      category: row.category as Zone['category'],
      coordinates: row.coordinates,
      complexity: row.complexity,
      maxAltitude: row.max_altitude,
      accessibility: row.accessibility,
      entranceFee: parseFloat(row.entrance_fee),
      bestSeasons: row.best_seasons,
      averageTemperature: {
        min: row.average_temperature_min,
        max: row.average_temperature_max
      },
      infrastructure: row.infrastructure as Infrastructure,
      fees: row.fees,
      statistics: ({
        touristPlacesCount: parseInt(row.tourist_places_count) || 0,
        guidesCount: 0,
        averageRating: 0,
        totalBookings: 0,
        completedBookings: 0
      } as unknown) as ZoneStatistics,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findWithStatistics(zoneId: string): Promise<Zone | null> {
    const query = `
      SELECT z.*,
             COUNT(DISTINCT tp.id) as tourist_places_count,
             COUNT(DISTINCT g.id) as guides_count,
             COUNT(DISTINCT b.id) as total_bookings,
             COUNT(DISTINCT CASE WHEN b.status = 'completed' THEN b.id END) as completed_bookings,
             AVG(r.rating) as average_rating
      FROM zones z
      LEFT JOIN tourist_places tp ON z.id = tp.zone_id AND tp.is_active = true
      LEFT JOIN guide_zones gz ON z.id = gz.zone_id
      LEFT JOIN guides g ON gz.guide_id = g.id AND g.is_active = true
      LEFT JOIN bookings b ON z.id = b.zone_id
      LEFT JOIN reviews r ON b.id = r.booking_id
      WHERE z.id = $1 AND z.is_active = true
      GROUP BY z.id
    `;
    const result = await this.executeQuery(query, [zoneId]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      stateId: row.state_id,
      name: row.name,
      description: row.description,
      category: row.category as Zone['category'],
      coordinates: row.coordinates,
      complexity: row.complexity,
      maxAltitude: row.max_altitude,
      accessibility: row.accessibility,
      entranceFee: parseFloat(row.entrance_fee),
      bestSeasons: row.best_seasons,
      averageTemperature: {
        min: row.average_temperature_min,
        max: row.average_temperature_max
      },
      infrastructure: row.infrastructure as Infrastructure,
      fees: row.fees,
      statistics: ({
        touristPlacesCount: parseInt(row.tourist_places_count) || 0,
        guidesCount: parseInt(row.guides_count) || 0,
        averageRating: parseFloat(row.average_rating) || 0,
        totalBookings: parseInt(row.total_bookings) || 0,
        completedBookings: parseInt(row.completed_bookings) || 0
      } as unknown) as ZoneStatistics,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async searchWithHierarchy(searchParams: {
    continent?: string;
    country?: string;
    state?: string;
    category?: Zone['category'];
    complexity?: number;
    name?: string;
  }): Promise<Zone[]> {
    let whereConditions = ['z.is_active = true'];
    let queryParams: any[] = [];
    let paramCounter = 1;

    if (searchParams.continent) {
      whereConditions.push(`co.name ILIKE $${paramCounter}`);
      queryParams.push(`%${searchParams.continent}%`);
      paramCounter++;
    }

    if (searchParams.country) {
      whereConditions.push(`c.name ILIKE $${paramCounter}`);
      queryParams.push(`%${searchParams.country}%`);
      paramCounter++;
    }

    if (searchParams.state) {
      whereConditions.push(`s.name ILIKE $${paramCounter}`);
      queryParams.push(`%${searchParams.state}%`);
      paramCounter++;
    }

    if (searchParams.category) {
      whereConditions.push(`z.category = $${paramCounter}`);
      queryParams.push(searchParams.category);
      paramCounter++;
    }

    if (searchParams.complexity) {
      whereConditions.push(`z.complexity <= $${paramCounter}`);
      queryParams.push(searchParams.complexity);
      paramCounter++;
    }

    if (searchParams.name) {
      whereConditions.push(`z.name ILIKE $${paramCounter}`);
      queryParams.push(`%${searchParams.name}%`);
      paramCounter++;
    }

    const query = `
      SELECT z.*, 
             s.name as state_name,
             c.name as country_name,
             co.name as continent_name,
             COUNT(tp.id) as tourist_places_count
      FROM zones z
      JOIN states s ON z.state_id = s.id
      JOIN countries c ON s.country_id = c.id
      JOIN continents co ON c.continent_id = co.id
      LEFT JOIN tourist_places tp ON z.id = tp.zone_id AND tp.is_active = true
      WHERE ${whereConditions.join(' AND ')}
      GROUP BY z.id, s.name, c.name, co.name
      ORDER BY co.name, c.name, s.name, z.complexity, z.name
      LIMIT 100
    `;

    const result = await this.executeQuery(query, queryParams);
    return result.rows.map(row => ({
      id: row.id,
      stateId: row.state_id,
      name: row.name,
      description: row.description,
      category: row.category as Zone['category'],
      coordinates: row.coordinates,
      complexity: row.complexity,
      maxAltitude: row.max_altitude,
      accessibility: row.accessibility,
      entranceFee: parseFloat(row.entrance_fee),
      bestSeasons: row.best_seasons,
      averageTemperature: {
        min: row.average_temperature_min,
        max: row.average_temperature_max
      },
      infrastructure: row.infrastructure as Infrastructure,
      fees: row.fees,
      statistics: ({
        touristPlacesCount: parseInt(row.tourist_places_count) || 0,
        guidesCount: 0,
        averageRating: 0,
        totalBookings: 0,
        completedBookings: 0
      } as unknown) as ZoneStatistics,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
}

// 📊 ENHANCED SPECIALTY REPOSITORY
export class SpecialtyRepositoryV2 extends BaseRepository {
  async findAll(): Promise<Specialty[]> {
    const query = `
      SELECT s.*, 
             sc.name as category_name,
             sc.icon as category_icon,
             sc.color as category_color,
             COUNT(gs.guide_id) as guides_count
      FROM specialties s
      JOIN specialty_categories sc ON s.category_id = sc.id
      LEFT JOIN guide_specialties gs ON s.id = gs.specialty_id
      WHERE s.is_active = true
      GROUP BY s.id, sc.name, sc.icon, sc.color
      ORDER BY sc.name, s.difficulty_level, s.name
    `;
    const result = await this.executeQuery(query);
    return result.rows.map(row => ({
      id: row.id,
      categoryId: row.category_id,
      name: row.name,
      description: row.description,
      difficultyLevel: row.difficulty_level,
      requiredExperience: row.required_experience,
      certificationRequired: row.certification_required,
      equipment: row.equipment,
      risks: row.risks,
      seasonality: row.seasonality,
      relatedZoneTypes: row.related_zone_types,
      guidesCount: parseInt(row.guides_count) || 0,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findByCategory(categoryId: string): Promise<Specialty[]> {
    const query = `
      SELECT s.*,
             COUNT(gs.guide_id) as guides_count
      FROM specialties s
      LEFT JOIN guide_specialties gs ON s.id = gs.specialty_id
      WHERE s.category_id = $1 AND s.is_active = true
      GROUP BY s.id
      ORDER BY s.difficulty_level, s.name
    `;
    const result = await this.executeQuery(query, [categoryId]);
    return result.rows.map(row => ({
      id: row.id,
      categoryId: row.category_id,
      name: row.name,
      description: row.description,
      difficultyLevel: row.difficulty_level,
      requiredExperience: row.required_experience,
      certificationRequired: row.certification_required,
      equipment: row.equipment,
      risks: row.risks,
      seasonality: row.seasonality,
      relatedZoneTypes: row.related_zone_types,
      guidesCount: parseInt(row.guides_count) || 0,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async findById(id: string): Promise<Specialty | null> {
    const query = `
      SELECT s.*
      FROM specialties s
      WHERE s.id = $1 AND s.is_active = true
    `;
    const result = await this.executeQuery(query, [id]);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      categoryId: row.category_id,
      name: row.name,
      description: row.description,
      difficultyLevel: row.difficulty_level,
      requiredExperience: row.required_experience,
      certificationRequired: row.certification_required,
      equipment: row.equipment,
      risks: row.risks,
      seasonality: row.seasonality,
      relatedZoneTypes: row.related_zone_types,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

// Export all repositories
// Note: individual repositories are exported via their declarations above.
// The previous aggregated export list was redundant and caused redeclaration errors.
