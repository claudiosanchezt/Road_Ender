'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Users, Thermometer } from 'lucide-react'
import { geographyApi, guidesApi } from '@/lib/api/client'

const defaultZones = [
  {
    id: 'cartagena',
    name: 'Cartagena de Indias',
    description: 'Ciudad amurallada llena de historia y color caribeño',
    image: '/images/zones/cartagena.jpg',
    averageRating: 4.9,
    totalGuides: 25,
    averageTemp: 28,
    highlights: ['Centro Histórico', 'Islas del Rosario', 'Murallas']
  },
  {
    id: 'medellin',
    name: 'Medellín',
    description: 'La ciudad de la eterna primavera y la innovación',
    image: '/images/zones/medellin.jpg',
    averageRating: 4.8,
    totalGuides: 32,
    averageTemp: 24,
    highlights: ['Comuna 13', 'Guatapé', 'Centro Histórico']
  },
  {
    id: 'eje-cafetero',
    name: 'Eje Cafetero',
    description: 'Paisajes culturales cafeteros y tradición paisa',
    image: '/images/zones/eje-cafetero.jpg',
    averageRating: 4.9,
    totalGuides: 18,
    averageTemp: 22,
    highlights: ['Valle de Cocora', 'Fincas Cafeteras', 'Salento']
  },
  {
    id: 'bogota',
    name: 'Bogotá',
    description: 'Capital cultural con rica historia y gastronomía',
    image: '/images/zones/bogota.jpg',
    averageRating: 4.7,
    totalGuides: 45,
    averageTemp: 18,
    highlights: ['La Candelaria', 'Monserrate', 'Zona Rosa']
  },
  {
    id: 'santa-marta',
    name: 'Santa Marta y Tayrona',
    description: 'Playas paradisíacas y Sierra Nevada',
    image: '/images/zones/santa-marta.jpg',
    averageRating: 4.8,
    totalGuides: 22,
    averageTemp: 30,
    highlights: ['Parque Tayrona', 'Ciudad Perdida', 'Playa Cristal']
  },
  {
    id: 'san-andres',
    name: 'San Andrés',
    description: 'Isla caribeña con mar de siete colores',
    image: '/images/zones/san-andres.jpg',
    averageRating: 4.6,
    totalGuides: 12,
    averageTemp: 27,
    highlights: ['Johnny Cay', 'Acuario', 'Hoyo Soplador']
  }
]

export function PopularZones() {
  const { data: zonesData, isLoading } = useQuery({
    queryKey: ['popular-zones'],
    queryFn: async () => {
      try {
        const [zones, guides] = await Promise.all([
          geographyApi.getZones(),
          guidesApi.search()
        ])
        return { zones: zones.data, guides: guides.data }
      } catch (error) {
        return null
      }
    },
    gcTime: 15 * 60 * 1000, // Cache por 15 minutos
  })

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Destinos Más Populares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre los lugares más visitados de Colombia con nuestros guías expertos locales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultZones.map((zone) => (
            <Link
              key={zone.id}
              href={`/zones/${zone.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{zone.name}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{zone.averageRating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {zone.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {zone.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{zone.totalGuides} guías</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Thermometer className="w-4 h-4" />
                      <span>{zone.averageTemp}°C</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Destacados:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {zone.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/zones"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explorar Todos los Destinos
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
