// Inicialización completa de MongoDB - Tourist Guides App (DataMart)
// Script de inicialización con datos de ejemplo

// Conectar a la base de datos
db = db.getSiblingDB('tourist_guides_datamart');

// ====================================
// CONFIGURACIÓN DE COLECCIONES
// ====================================

print("🗃️ Inicializando colecciones de MongoDB...");

// Crear colecciones con validación de esquemas
db.createCollection("guides", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["guideId", "fullName", "specialties", "score", "statistics", "pricing"],
      properties: {
        guideId: { bsonType: "string" },
        fullName: { bsonType: "string" },
        specialties: { bsonType: "array" },
        workingZones: { bsonType: "array" },
        languages: { bsonType: "array" },
        score: {
          bsonType: "object",
          required: ["total", "breakdown"],
          properties: {
            total: { bsonType: "number", minimum: 0, maximum: 100 },
            breakdown: { bsonType: "object" }
          }
        }
      }
    }
  }
});

db.createCollection("zones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["zoneId", "zoneName", "coordinates", "complexityIndex"],
      properties: {
        zoneId: { bsonType: "string" },
        zoneName: { bsonType: "string" },
        coordinates: { bsonType: "object" },
        complexityIndex: { bsonType: "object" }
      }
    }
  }
});

db.createCollection("tour_analytics");
db.createCollection("business_analytics");
db.createCollection("user_favorites");
db.createCollection("pricing_cache");

// ====================================
// DATOS DE EJEMPLO PARA GUÍAS
// ====================================

print("👥 Insertando datos de guías...");

db.guides.insertMany([
  {
    guideId: "guide-1",
    fullName: "Carlos Rodriguez",
    specialties: [
      {
        id: "specialty-1",
        name: "Trekking",
        category: "adventure",
        proficiencyLevel: 9,
        yearsExperience: 8,
        certifications: ["Certificado Montañismo FEACH", "Primeros Auxilios"]
      },
      {
        id: "specialty-2",
        name: "Historia Local",
        category: "culture",
        proficiencyLevel: 7,
        yearsExperience: 5,
        certifications: ["Guía Turístico SERNATUR"]
      }
    ],
    workingZones: [
      {
        zoneId: "zone-1",
        zoneName: "Cordillera de los Andes",
        knowledgeLevel: 10,
        complexityIndex: 8,
        coordinates: { lat: -33.0458, lng: -70.2505 },
        tourCount: 89,
        lastTourDate: new Date("2025-07-20")
      },
      {
        zoneId: "zone-2",
        zoneName: "Valle del Maipo",
        knowledgeLevel: 8,
        complexityIndex: 5,
        coordinates: { lat: -33.7500, lng: -70.5000 },
        tourCount: 45,
        lastTourDate: new Date("2025-07-18")
      }
    ],
    languages: [
      { code: "es", name: "Español", proficiency: "native", isVerified: true },
      { code: "en", name: "English", proficiency: "advanced", isVerified: true },
      { code: "fr", name: "Français", proficiency: "intermediate", isVerified: false }
    ],
    score: {
      total: 87.5,
      breakdown: {
        ratings: 35.2,    // 88% de 40%
        responseRate: 18.0, // 90% de 20%
        experience: 21.25,  // 85% de 25%
        punctuality: 13.05  // 87% de 15%
      }
    },
    statistics: {
      totalTours: 134,
      completedTours: 128,
      cancelledTours: 6,
      averageResponseTime: 45,
      lastActiveDate: new Date("2025-07-24"),
      totalEarnings: 2850000,
      averageRating: 4.4,
      repeatClientRate: 35
    },
    pricing: {
      baseHourlyRate: 25000,
      currency: "CLP",
      dynamicPricing: {
        experienceMultiplier: 1.3,
        ratingBonus: 1.15,
        specialtyPremium: 1.2,
        seasonalAdjustment: 1.1,
        demandMultiplier: 1.25,
        finalRate: 32500
      }
    },
    availability: {
      schedule: {
        monday: { available: true, hours: ["08:00-18:00"] },
        tuesday: { available: true, hours: ["08:00-18:00"] },
        wednesday: { available: true, hours: ["08:00-18:00"] },
        thursday: { available: true, hours: ["08:00-18:00"] },
        friday: { available: true, hours: ["08:00-16:00"] },
        saturday: { available: true, hours: ["09:00-17:00"] },
        sunday: { available: false, hours: [] }
      },
      blockedDates: [
        new Date("2025-08-15"),
        new Date("2025-12-25")
      ],
      vacationPeriods: [
        {
          startDate: new Date("2025-12-20"),
          endDate: new Date("2025-01-05"),
          reason: "Vacaciones de verano"
        }
      ]
    },
    reviews: [
      {
        reviewId: "review-1",
        bookingId: "booking-1",
        clientId: "user-2",
        clientName: "Ana Martinez",
        rating: 5,
        aspects: {
          knowledge: 5,
          communication: 4,
          punctuality: 5,
          safety: 5,
          overallExperience: 5
        },
        comment: "Excelente guía, muy conocedor de la zona y muy profesional.",
        photos: ["/reviews/guide-1-review-1-1.jpg"],
        tourDate: new Date("2025-07-15"),
        createdAt: new Date("2025-07-16"),
        isVerified: true,
        isFeatured: true
      }
    ],
    profileData: {
      bio: "Guía de montaña con más de 8 años de experiencia. Especialista en trekking de alta montaña y cultura local de la Cordillera de los Andes.",
      profileImage: "/profiles/carlos-rodriguez.jpg",
      gallery: [
        "/gallery/carlos-1.jpg",
        "/gallery/carlos-2.jpg",
        "/gallery/carlos-3.jpg"
      ],
      achievements: [
        "Certificado UIAGM Guía de Montaña",
        "+100 tours exitosos",
        "Instructor Primeros Auxilios"
      ],
      insuranceInfo: {
        provider: "Mapfre Seguros",
        policyNumber: "POL-2025-001234",
        coverageAmount: 50000000,
        validUntil: new Date("2025-12-31")
      }
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-07-24")
  },
  {
    guideId: "guide-2",
    fullName: "María Silva",
    specialties: [
      {
        id: "specialty-3",
        name: "Gastronomía Regional",
        category: "gastronomy",
        proficiencyLevel: 10,
        yearsExperience: 12,
        certifications: ["Chef Profesional", "Sommelier Nivel 2"]
      },
      {
        id: "specialty-2",
        name: "Historia Local",
        category: "culture",
        proficiencyLevel: 8,
        yearsExperience: 10,
        certifications: ["Historiadora Universidad de Chile"]
      }
    ],
    workingZones: [
      {
        zoneId: "zone-3",
        zoneName: "Centro Histórico Santiago",
        knowledgeLevel: 10,
        complexityIndex: 3,
        coordinates: { lat: -33.4489, lng: -70.6693 },
        tourCount: 156,
        lastTourDate: new Date("2025-07-23")
      }
    ],
    languages: [
      { code: "es", name: "Español", proficiency: "native", isVerified: true },
      { code: "en", name: "English", proficiency: "advanced", isVerified: true }
    ],
    score: {
      total: 92.3,
      breakdown: {
        ratings: 38.4,
        responseRate: 19.6,
        experience: 23.75,
        punctuality: 14.55
      }
    },
    statistics: {
      totalTours: 156,
      completedTours: 154,
      cancelledTours: 2,
      averageResponseTime: 22,
      lastActiveDate: new Date("2025-07-24"),
      totalEarnings: 4200000,
      averageRating: 4.8,
      repeatClientRate: 42
    },
    pricing: {
      baseHourlyRate: 35000,
      currency: "CLP",
      dynamicPricing: {
        experienceMultiplier: 1.5,
        ratingBonus: 1.25,
        specialtyPremium: 1.4,
        seasonalAdjustment: 1.0,
        demandMultiplier: 1.1,
        finalRate: 40250
      }
    },
    availability: {
      schedule: {
        monday: { available: true, hours: ["10:00-20:00"] },
        tuesday: { available: true, hours: ["10:00-20:00"] },
        wednesday: { available: true, hours: ["10:00-20:00"] },
        thursday: { available: true, hours: ["10:00-20:00"] },
        friday: { available: true, hours: ["10:00-22:00"] },
        saturday: { available: true, hours: ["10:00-22:00"] },
        sunday: { available: true, hours: ["12:00-18:00"] }
      },
      blockedDates: [],
      vacationPeriods: []
    },
    reviews: [],
    profileData: {
      bio: "Chef y guía gastronómica especializada en la cocina tradicional chilena. Más de 12 años mostrando los sabores auténticos de Santiago.",
      profileImage: "/profiles/maria-silva.jpg",
      gallery: ["/gallery/maria-1.jpg", "/gallery/maria-2.jpg"],
      achievements: [
        "Chef del Año 2023",
        "Especialista en Cocina Tradicional",
        "+150 tours gastronómicos"
      ],
      insuranceInfo: {
        provider: "Chilena Consolidada",
        policyNumber: "POL-2025-005678",
        coverageAmount: 30000000,
        validUntil: new Date("2025-11-30")
      }
    },
    createdAt: new Date("2023-08-20"),
    updatedAt: new Date("2025-07-24")
  }
]);

// ====================================
// DATOS DE EJEMPLO PARA ZONAS
// ====================================

print("🏔️ Insertando datos de zonas...");

db.zones.insertMany([
  {
    zoneId: "zone-1",
    zoneName: "Cordillera de los Andes",
    description: "Majestuosa cordillera con picos nevados, glaciares y una rica biodiversidad andina.",
    category: "mountain",
    coordinates: {
      center: { lat: -33.0458, lng: -70.2505 },
      bounds: {
        northeast: { lat: -32.8000, lng: -70.0000 },
        southwest: { lat: -33.3000, lng: -70.5000 }
      },
      polygon: [
        { lat: -32.8000, lng: -70.0000 },
        { lat: -32.8000, lng: -70.5000 },
        { lat: -33.3000, lng: -70.5000 },
        { lat: -33.3000, lng: -70.0000 }
      ]
    },
    climateData: {
      currentWeather: {
        temperature: 8,
        humidity: 45,
        pressure: 850,
        windSpeed: 25,
        windDirection: 270,
        conditions: "Parcialmente nublado",
        visibility: 15,
        uvIndex: 6,
        feelsLike: 5
      },
      forecast: [
        {
          date: new Date("2025-07-25"),
          maxTemp: 12,
          minTemp: 2,
          precipitation: 0,
          conditions: "Soleado",
          windSpeed: 20,
          uvIndex: 7
        }
      ],
      historicalData: [
        {
          month: 7,
          year: 2024,
          avgTemp: 6,
          avgPrecipitation: 15,
          avgPressure: 845,
          avgHumidity: 50,
          extremeWeatherDays: 3
        }
      ],
      weatherAlerts: []
    },
    complexityIndex: {
      terrain: 9,
      accessibility: 4,
      weather: 7,
      altitude: 3500,
      technicalDifficulty: 8,
      physicalDemand: 9,
      overall: 8.2
    },
    statistics: {
      totalGuides: 25,
      activeGuides: 18,
      averageRating: 4.6,
      totalTours: 450,
      monthlyTours: 38,
      popularityScore: 85,
      safetyRecord: {
        incidents: 2,
        accidentRate: 0.4,
        lastIncident: new Date("2024-12-15")
      }
    },
    attractions: [
      {
        attractionId: "attr-1",
        name: "Mirador Los Cóndores",
        type: "natural",
        coordinates: { lat: -33.0458, lng: -70.2505 },
        difficultyLevel: 7,
        estimatedDuration: 180,
        bestVisitingTime: "Mañana temprano",
        photos: ["/attractions/mirador-condores.jpg"]
      }
    ],
    infrastructure: {
      parkingAvailable: true,
      restroomsAvailable: false,
      emergencyServices: {
        policeStation: { distance: 25, contact: "+56-2-2463-2000" },
        hospital: { distance: 35, contact: "+56-2-2354-3000" },
        fireStation: { distance: 20, contact: "132" }
      },
      publicTransport: false,
      accessibility: {
        wheelchairAccessible: false,
        elderlyFriendly: false,
        childFriendly: false
      }
    },
    seasonalInfo: [
      {
        season: "winter",
        bestActivities: ["Esquí", "Snowboard", "Fotografía"],
        restrictions: ["Acceso limitado por nieve"],
        recommendations: ["Ropa térmica obligatoria", "Equipo especializado"],
        averageVisitors: 120
      }
    ],
    updatedAt: new Date("2025-07-24")
  },
  {
    zoneId: "zone-3",
    zoneName: "Centro Histórico Santiago",
    description: "Corazón cultural e histórico de Santiago con arquitectura colonial y republicana.",
    category: "urban",
    coordinates: {
      center: { lat: -33.4489, lng: -70.6693 },
      bounds: {
        northeast: { lat: -33.4200, lng: -70.6400 },
        southwest: { lat: -33.4800, lng: -70.7000 }
      },
      polygon: [
        { lat: -33.4200, lng: -70.6400 },
        { lat: -33.4200, lng: -70.7000 },
        { lat: -33.4800, lng: -70.7000 },
        { lat: -33.4800, lng: -70.6400 }
      ]
    },
    climateData: {
      currentWeather: {
        temperature: 15,
        humidity: 55,
        pressure: 1013,
        windSpeed: 10,
        windDirection: 180,
        conditions: "Soleado",
        visibility: 20,
        uvIndex: 4,
        feelsLike: 16
      },
      forecast: [],
      historicalData: [],
      weatherAlerts: []
    },
    complexityIndex: {
      terrain: 2,
      accessibility: 9,
      weather: 3,
      altitude: 520,
      technicalDifficulty: 1,
      physicalDemand: 2,
      overall: 2.8
    },
    statistics: {
      totalGuides: 45,
      activeGuides: 32,
      averageRating: 4.3,
      totalTours: 1200,
      monthlyTours: 95,
      popularityScore: 92,
      safetyRecord: {
        incidents: 0,
        accidentRate: 0.0,
        lastIncident: null
      }
    },
    attractions: [
      {
        attractionId: "attr-2",
        name: "Plaza de Armas",
        type: "historical",
        coordinates: { lat: -33.4378, lng: -70.6504 },
        difficultyLevel: 1,
        estimatedDuration: 45,
        bestVisitingTime: "Todo el día",
        photos: ["/attractions/plaza-armas.jpg"]
      }
    ],
    infrastructure: {
      parkingAvailable: true,
      restroomsAvailable: true,
      emergencyServices: {
        policeStation: { distance: 2, contact: "+56-2-2927-9000" },
        hospital: { distance: 5, contact: "+56-2-2354-8000" },
        fireStation: { distance: 3, contact: "132" }
      },
      publicTransport: true,
      accessibility: {
        wheelchairAccessible: true,
        elderlyFriendly: true,
        childFriendly: true
      }
    },
    seasonalInfo: [
      {
        season: "summer",
        bestActivities: ["Caminatas urbanas", "Fotografía", "Gastronomía"],
        restrictions: ["Calor intenso mediodía"],
        recommendations: ["Protector solar", "Hidratación constante"],
        averageVisitors: 300
      }
    ],
    updatedAt: new Date("2025-07-24")
  }
]);

// ====================================
// DATOS DE FAVORITOS DE USUARIOS
// ====================================

print("⭐ Insertando favoritos de usuarios...");

db.user_favorites.insertOne({
  userId: "user-2",
  favoriteGuides: [
    {
      guideId: "guide-1",
      guideName: "Carlos Rodriguez",
      addedAt: new Date("2025-07-10"),
      lastBooking: new Date("2025-07-15")
    }
  ],
  favoriteZones: [
    {
      zoneId: "zone-1",
      zoneName: "Cordillera de los Andes",
      addedAt: new Date("2025-07-12"),
      visitCount: 3,
      lastVisit: new Date("2025-07-15")
    }
  ],
  preferences: {
    preferredSpecialties: ["Trekking", "Historia Local"],
    preferredLanguages: ["es", "en"],
    budgetRange: { min: 20000, max: 50000 },
    groupSizePreference: 4,
    difficultyPreference: 6
  },
  searchHistory: [
    {
      query: "guías montaña",
      filters: { specialty: "Trekking", zone: "zone-1" },
      timestamp: new Date("2025-07-20"),
      resultsCount: 5
    }
  ],
  updatedAt: new Date("2025-07-24")
});

// ====================================
// CACHE DE PRECIOS DINÁMICOS
// ====================================

print("💰 Insertando cache de precios...");

db.pricing_cache.insertMany([
  {
    guideId: "guide-1",
    zoneId: "zone-1",
    specialtyId: "specialty-1",
    basePricing: {
      hourlyRate: 25000,
      currency: "CLP"
    },
    dynamicFactors: {
      demandMultiplier: 1.25,
      seasonalMultiplier: 1.1,
      weatherMultiplier: 1.0,
      experienceMultiplier: 1.3,
      ratingMultiplier: 1.15,
      specialtyPremium: 1.2
    },
    calculatedPricing: {
      finalHourlyRate: 32500,
      minimumBooking: 3,
      groupSizeAdjustment: [
        { size: 1, multiplier: 1.0 },
        { size: 2, multiplier: 0.9 },
        { size: 3, multiplier: 0.85 },
        { size: 4, multiplier: 0.8 }
      ],
      cancellationFee: 8125
    },
    validFrom: new Date("2025-07-24"),
    validUntil: new Date("2025-07-31"),
    lastUpdated: new Date("2025-07-24")
  }
]);

// ====================================
// CREAR ÍNDICES
// ====================================

print("📊 Creando índices...");

// Índices para guías
db.guides.createIndex({ "guideId": 1 }, { unique: true });
db.guides.createIndex({ "workingZones.coordinates": "2dsphere" });
db.guides.createIndex({ "specialties.name": 1 });
db.guides.createIndex({ "score.total": -1 });
db.guides.createIndex({ "statistics.averageRating": -1 });
db.guides.createIndex({ "pricing.dynamicPricing.finalRate": 1 });

// Índices para zonas
db.zones.createIndex({ "zoneId": 1 }, { unique: true });
db.zones.createIndex({ "coordinates.center": "2dsphere" });
db.zones.createIndex({ "complexityIndex.overall": -1 });
db.zones.createIndex({ "category": 1 });

// Índices para favoritos
db.user_favorites.createIndex({ "userId": 1 }, { unique: true });
db.user_favorites.createIndex({ "favoriteGuides.guideId": 1 });

// Índices para pricing cache
db.pricing_cache.createIndex({ "guideId": 1, "zoneId": 1, "specialtyId": 1 });
db.pricing_cache.createIndex({ "validUntil": 1 }, { expireAfterSeconds: 0 });

print("✅ Índices creados correctamente");

// ====================================
// ESTADÍSTICAS FINALES
// ====================================

print("📈 Estadísticas de inicialización:");
print("- Guías insertados:", db.guides.countDocuments());
print("- Zonas insertadas:", db.zones.countDocuments());
print("- Perfiles de favoritos:", db.user_favorites.countDocuments());
print("- Entradas de cache de precios:", db.pricing_cache.countDocuments());

print("🎉 Inicialización de MongoDB completada exitosamente!");
