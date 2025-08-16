// Calculadora de Tarifas para Guías Turísticos
// Sistema dinámico basado en múltiples factores

export interface TariffFactors {
  experienceYears: number
  averageRating: number
  totalTours: number
  specialtyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master'
  zoneKnowledge: 'basic' | 'intermediate' | 'advanced' | 'expert'
  certifications: string[]
  specialties: string[]
}

export interface TariffBreakdown {
  baseRate: number
  experienceBonus: number
  ratingBonus: number
  specialtyBonus: number
  certificationBonus: number
  totalRate: number
}

export class TariffCalculator {
  private static readonly BASE_RATE = 25 // Tarifa base en USD por hora
  
  private static readonly EXPERIENCE_MULTIPLIERS = {
    0: 0,      // Menos de 1 año
    1: 1,      // 1-2 años
    3: 2,      // 3-4 años
    5: 4,      // 5-7 años
    8: 6,      // 8-10 años
    11: 8,     // 11-14 años
    15: 12     // 15+ años
  }

  private static readonly RATING_MULTIPLIERS = {
    4.0: 0,
    4.2: 1,
    4.4: 2,
    4.6: 3,
    4.8: 5,
    4.9: 6,
    5.0: 8
  }

  private static readonly SPECIALTY_MULTIPLIERS = {
    beginner: 0,
    intermediate: 1,
    advanced: 3,
    expert: 5,
    master: 8
  }

  private static readonly ZONE_KNOWLEDGE_MULTIPLIERS = {
    basic: 0,
    intermediate: 1,
    advanced: 2,
    expert: 4
  }

  private static readonly HIGH_VALUE_SPECIALTIES = [
    'montañismo',
    'astroturismo', 
    'ecoturismo',
    'patrimonio',
    'vinos',
    'aventura extrema',
    'fotografía profesional'
  ]

  private static readonly PREMIUM_CERTIFICATIONS = [
    'Guía de Montaña Certificado',
    'Sommelier Certificado',
    'Astroturismo Profesional',
    'Ecoturismo Profesional',
    'Patrimonio UNESCO',
    'Primeros Auxilios Avanzado'
  ]

  /**
   * Calcula la tarifa por hora de un guía basada en sus factores
   */
  static calculateHourlyRate(factors: TariffFactors): TariffBreakdown {
    const baseRate = this.BASE_RATE

    // Bonus por experiencia
    const experienceBonus = this.calculateExperienceBonus(factors.experienceYears)
    
    // Bonus por calificación
    const ratingBonus = this.calculateRatingBonus(factors.averageRating)
    
    // Bonus por nivel de especialidad y especialidades premium
    const specialtyBonus = this.calculateSpecialtyBonus(factors.specialtyLevel, factors.specialties)
    
    // Bonus por certificaciones
    const certificationBonus = this.calculateCertificationBonus(factors.certifications)

    const totalRate = Math.round(baseRate + experienceBonus + ratingBonus + specialtyBonus + certificationBonus)

    return {
      baseRate,
      experienceBonus,
      ratingBonus,
      specialtyBonus,
      certificationBonus,
      totalRate
    }
  }

  private static calculateExperienceBonus(years: number): number {
    const ranges = Object.keys(this.EXPERIENCE_MULTIPLIERS).map(Number).sort((a, b) => b - a)
    
    for (const range of ranges) {
      if (years >= range) {
        return this.EXPERIENCE_MULTIPLIERS[range as keyof typeof this.EXPERIENCE_MULTIPLIERS]
      }
    }
    
    return 0
  }

  private static calculateRatingBonus(rating: number): number {
    const ranges = Object.keys(this.RATING_MULTIPLIERS).map(Number).sort((a, b) => b - a)
    
    for (const range of ranges) {
      if (rating >= range) {
        return this.RATING_MULTIPLIERS[range as keyof typeof this.RATING_MULTIPLIERS]
      }
    }
    
    return 0
  }

  private static calculateSpecialtyBonus(level: TariffFactors['specialtyLevel'], specialties: string[]): number {
    const levelBonus = this.SPECIALTY_MULTIPLIERS[level]
    
    // Bonus adicional por especialidades de alto valor
    const premiumSpecialties = specialties.filter(s => 
      this.HIGH_VALUE_SPECIALTIES.some(hs => s.toLowerCase().includes(hs.toLowerCase()))
    )
    
    const premiumBonus = premiumSpecialties.length * 2
    
    return levelBonus + premiumBonus
  }

  private static calculateCertificationBonus(certifications: string[]): number {
    const premiumCerts = certifications.filter(cert =>
      this.PREMIUM_CERTIFICATIONS.some(pc => cert.includes(pc))
    )
    
    return premiumCerts.length * 2
  }

  /**
   * Actualiza las tarifas de todos los guías en la base de datos
   */
  static updateGuideTariffs(guides: any[]): any[] {
    return guides.map(guide => {
      const factors: TariffFactors = {
        experienceYears: guide.experienceYears || 0,
        averageRating: guide.averageRating || 0,
        totalTours: guide.totalTours || 0,
        specialtyLevel: guide.specialtyLevel || 'beginner',
        zoneKnowledge: guide.zoneKnowledge || 'basic',
        certifications: guide.certifications || [],
        specialties: guide.specialties || []
      }

      const tariffBreakdown = this.calculateHourlyRate(factors)
      
      return {
        ...guide,
        hourlyRate: tariffBreakdown.totalRate,
        baseTariff: tariffBreakdown
      }
    })
  }

  /**
   * Genera un reporte de factores de tarifa para un guía
   */
  static generateTariffReport(factors: TariffFactors): string {
    const breakdown = this.calculateHourlyRate(factors)
    
    return `
Reporte de Tarifa:
- Tarifa Base: $${breakdown.baseRate}/hora
- Bonus Experiencia (${factors.experienceYears} años): +$${breakdown.experienceBonus}
- Bonus Calificación (${factors.averageRating}★): +$${breakdown.ratingBonus}
- Bonus Especialidad (${factors.specialtyLevel}): +$${breakdown.specialtyBonus}
- Bonus Certificaciones: +$${breakdown.certificationBonus}
- Total: $${breakdown.totalRate}/hora
    `.trim()
  }
}
