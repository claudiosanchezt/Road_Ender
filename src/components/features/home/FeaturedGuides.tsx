'use client'

import { useState } from 'react'
import { Star, MapPin, Languages, Award, MessageCircle, ArrowRight, Calendar, Camera, Heart } from 'lucide-react'
import Link from 'next/link'

const featuredGuides = [
  {
    id: 'carlos-hernandez',
    firstName: 'Carlos',
    lastName: 'Hernández',
    profilePicture: '/images/guides/carlos.jpg',
    specialties: ['Historia Colonial', 'Arquitectura', 'Gastronomía Caribeña'],
    location: 'Cartagena, Bolívar',
    rating: 4.9,
    reviewCount: 147,
    languages: ['Español', 'Inglés', 'Francés'],
    experience: 8,
    description: 'Historiador especializado en el período colonial de Cartagena. Apasionado por compartir las historias ocultas de la ciudad amurallada.',
    verified: true,
    responseRate: 98,
    completedTours: 312,
    priceFrom: 65,
    gradient: 'from-orange-400 to-red-500',
    badge: 'Experto Local'
  },
  {
    id: 'maria-gonzalez',
    firstName: 'María',
    lastName: 'González',
    profilePicture: '/images/guides/maria.jpg',
    specialties: ['Ecoturismo', 'Aventura Extrema', 'Fotografía Natural'],
    location: 'Medellín, Antioquia',
    rating: 4.8,
    reviewCount: 89,
    languages: ['Español', 'Inglés'],
    experience: 5,
    description: 'Bióloga y guía certificada en deportes de aventura. Especialista en avistamiento de aves y conservación ambiental.',
    verified: true,
    responseRate: 95,
    completedTours: 198,
    priceFrom: 55,
    gradient: 'from-green-400 to-emerald-500',
    badge: 'Eco Experta'
  },
  {
    id: 'luis-rodriguez',
    firstName: 'Luis',
    lastName: 'Rodríguez',
    profilePicture: '/images/guides/luis.jpg',
    specialties: ['Cultura Cafetera', 'Senderismo', 'Tradiciones Paisas'],
    location: 'Armenia, Quindío',
    rating: 4.9,
    reviewCount: 203,
    languages: ['Español', 'Inglés', 'Italiano'],
    experience: 12,
    description: 'Caficultor de tercera generación y sommelier de café. Experto en el proceso completo desde la siembra hasta la taza.',
    verified: true,
    responseRate: 100,
    completedTours: 456,
    priceFrom: 70,
    gradient: 'from-amber-400 to-orange-500',
    badge: 'Maestro Cafetero'
  },
  {
    id: 'ana-ramirez',
    firstName: 'Ana',
    lastName: 'Ramírez',
    profilePicture: '/images/guides/ana.jpg',
    specialties: ['Arte Contemporáneo', 'Cultura Urbana', 'Gastronomía Fusión'],
    location: 'Bogotá, Cundinamarca',
    rating: 4.7,
    reviewCount: 156,
    languages: ['Español', 'Inglés', 'Portugués'],
    experience: 7,
    description: 'Curadora de arte y chef especializada en cocina de autor. Conoce los rincones más cool y auténticos de la capital.',
    verified: true,
    responseRate: 92,
    completedTours: 287,
    priceFrom: 60,
    gradient: 'from-purple-400 to-pink-500',
    badge: 'Artista Culinaria'
  }
]

export function FeaturedGuides() {
  const [hoveredGuide, setHoveredGuide] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Guías Certificados
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Conoce a Nuestros
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent"> Expertos</span>
            <br />Locales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Guías profesionales, apasionados y certificados que harán de tu experiencia 
            algo único e inolvidable en cada destino
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredGuides.map((guide, index) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="group block"
              onMouseEnter={() => setHoveredGuide(guide.id)}
              onMouseLeave={() => setHoveredGuide(null)}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-3">
                {/* Header with gradient */}
                <div className={`h-32 bg-gradient-to-br ${guide.gradient} relative overflow-hidden`}>
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-16 h-16 border border-white/30 rounded-full" />
                  <div className="absolute -bottom-2 -left-2 w-20 h-20 border border-white/30 rounded-full" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 px-2 py-1 rounded-full">
                    {guide.badge}
                  </div>

                  {/* Verification badge */}
                  {guide.verified && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {guide.firstName[0]}{guide.lastName[0]}
                    </span>
                  </div>
                  
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-1/2 translate-x-8 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  {/* Name and Location */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                      {guide.firstName} {guide.lastName}
                    </h3>
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {guide.location}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{guide.rating}</span>
                      <span className="text-xs text-gray-500">({guide.reviewCount})</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {guide.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center justify-center text-xs text-gray-600 mb-4">
                    <Languages className="w-3 h-3 mr-1" />
                    <span>{guide.languages.slice(0, 2).join(', ')}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center text-xs mb-4">
                    <div>
                      <div className="font-bold text-gray-900">{guide.experience} años</div>
                      <div className="text-gray-500">Experiencia</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{guide.completedTours}</div>
                      <div className="text-gray-500">Tours</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 text-center mb-4 line-clamp-2 leading-relaxed">
                    {guide.description}
                  </p>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Desde</span>
                      <span className="font-bold text-gray-900">${guide.priceFrom}/día</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-purple-50 text-purple-600 py-2 px-3 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors flex items-center justify-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        Contactar
                      </button>
                      <button className="bg-purple-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
                        <Calendar className="w-3 h-3" />
                      </button>
                      <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Link
            href="/guides"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Award className="w-5 h-5" />
            Ver Todos los Guías
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
