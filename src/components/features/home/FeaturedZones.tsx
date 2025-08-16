'use client'

import { useState } from 'react'
import { MapPin, Star, Users, Thermometer, Camera, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const featuredZones = [
  {
    id: 'cartagena',
    name: 'Cartagena de Indias',
    description: 'Ciudad amurallada patrimonio de la humanidad con arquitectura colonial y cultura caribeña vibrante',
    image: '/images/zones/cartagena.jpg',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    averageRating: 4.9,
    totalGuides: 25,
    averageTemp: 28,
    highlights: ['Centro Histórico', 'Islas del Rosario', 'Murallas', 'Getsemaní'],
    tours: 34,
    popularActivity: 'Tours históricos'
  },
  {
    id: 'medellin',
    name: 'Medellín',
    description: 'La ciudad de la eterna primavera, innovación urbana y transformación social que inspira al mundo',
    image: '/images/zones/medellin.jpg',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    averageRating: 4.8,
    totalGuides: 32,
    averageTemp: 24,
    highlights: ['Comuna 13', 'Guatapé', 'Metro Cable', 'Centro'],
    tours: 28,
    popularActivity: 'Tours urbanos'
  },
  {
    id: 'eje-cafetero',
    name: 'Eje Cafetero',
    description: 'Paisajes culturales cafeteros declarados patrimonio mundial, tradición paisa y naturaleza exuberante',
    image: '/images/zones/eje-cafetero.jpg',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    averageRating: 4.9,
    totalGuides: 18,
    averageTemp: 22,
    highlights: ['Valle de Cocora', 'Fincas Cafeteras', 'Salento', 'Termales'],
    tours: 22,
    popularActivity: 'Tours cafeteros'
  },
  {
    id: 'bogota',
    name: 'Bogotá',
    description: 'Capital cultural de Colombia, centro histórico colonial, gastronomía de clase mundial y vida nocturna',
    image: '/images/zones/bogota.jpg',
    gradient: 'from-blue-500 via-indigo-600 to-purple-700',
    averageRating: 4.7,
    totalGuides: 45,
    averageTemp: 18,
    highlights: ['La Candelaria', 'Monserrate', 'Zona Rosa', 'Museos'],
    tours: 41,
    popularActivity: 'Tours culturales'
  },
  {
    id: 'santa-marta',
    name: 'Santa Marta & Tayrona',
    description: 'Punto de encuentro entre mar Caribe, Sierra Nevada y selva tropical. Biodiversidad única en el mundo',
    image: '/images/zones/santa-marta.jpg',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    averageRating: 4.8,
    totalGuides: 22,
    averageTemp: 30,
    highlights: ['Parque Tayrona', 'Ciudad Perdida', 'Cabo San Juan', 'Minca'],
    tours: 26,
    popularActivity: 'Ecoturismo'
  },
  {
    id: 'san-andres',
    name: 'San Andrés',
    description: 'Isla paradisíaca con mar de siete colores, cultura raizal auténtica y deportes acuáticos de ensueño',
    image: '/images/zones/san-andres.jpg',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    averageRating: 4.6,
    totalGuides: 12,
    averageTemp: 27,
    highlights: ['Johnny Cay', 'Acuario', 'Hoyo Soplador', 'West View'],
    tours: 18,
    popularActivity: 'Tours acuáticos'
  }
]

export function FeaturedZones() {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Destinos Destacados
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Explora los 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Tesoros</span>
            <br />de Colombia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre paisajes únicos, culturas vibrantes y experiencias inolvidables 
            de la mano de guías locales expertos en cada destino
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredZones.map((zone, index) => (
            <Link
              key={zone.id}
              href={`/zones/${zone.id}`}
              className="group block"
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                {/* Image with gradient overlay */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${zone.gradient} relative`}>
                    {/* Geometric pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full" />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <h3 className="text-2xl font-bold mb-2">{zone.name}</h3>
                        <p className="text-sm opacity-90">{zone.tours} experiencias disponibles</p>
                      </div>
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{zone.averageRating}</span>
                  </div>

                  {/* Favorite button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {zone.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">{zone.popularActivity}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1 mb-1">
                        <Thermometer className="w-4 h-4" />
                        {zone.averageTemp}°C
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {zone.totalGuides} guías
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {zone.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {zone.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {zone.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          +{zone.highlights.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Desde <span className="font-semibold text-gray-900">$89</span>/persona
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                      <span className="text-sm">Explorar</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            href="/zones"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MapPin className="w-5 h-5" />
            Explorar Todos los Destinos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
