'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Mountain, Waves, TreePine, Building2, Camera, Utensils, Coffee, Heart } from 'lucide-react'
import { toursApi } from '@/lib/api/client'

const categoryIcons = {
  'montaña': Mountain,
  'playa': Waves,  
  'naturaleza': TreePine,
  'ciudad': Building2,
  'fotografía': Camera,
  'gastronomía': Utensils,
  'café': Coffee,
  'cultura': Heart
}

const defaultCategories = [
  {
    id: 'montana',
    name: 'Montaña y Aventura',
    description: 'Escalada, trekking y deportes extremos',
    icon: 'montaña',
    color: 'from-green-600 to-green-800',
    tourCount: 24
  },
  {
    id: 'playa',
    name: 'Playa y Costa',
    description: 'Surf, buceo y relajación tropical',
    icon: 'playa',
    color: 'from-blue-500 to-blue-700',
    tourCount: 18
  },
  {
    id: 'cultura',
    name: 'Cultura e Historia',
    description: 'Museos, monumentos y tradiciones',
    icon: 'cultura',
    color: 'from-purple-600 to-purple-800',
    tourCount: 32
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía',
    description: 'Tours culinarios y degustaciones',
    icon: 'gastronomía',
    color: 'from-orange-500 to-orange-700',
    tourCount: 15
  },
  {
    id: 'naturaleza',
    name: 'Ecoturismo',
    description: 'Parques naturales y biodiversidad',
    icon: 'naturaleza',
    color: 'from-emerald-600 to-emerald-800',
    tourCount: 21
  },
  {
    id: 'cafe',
    name: 'Ruta del Café',
    description: 'Fincas cafeteras y procesos',
    icon: 'café',
    color: 'from-amber-600 to-amber-800',
    tourCount: 12
  }
]

export function TourCategories() {
  const { data: toursData, isLoading } = useQuery({
    queryKey: ['tour-categories'],
    queryFn: async () => {
      try {
        const response = await toursApi.search()
        return response.data
      } catch (error) {
        return null
      }
    },
    gcTime: 10 * 60 * 1000, // Cache por 10 minutos
  })

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explora por Categorías
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre experiencias únicas organizadas por tus intereses favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultCategories.map((category) => {
            const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons] || Heart
            
            return (
              <Link
                key={category.id}
                href={`/tours?category=${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 font-medium">
                      {category.tourCount} tours disponibles
                    </span>
                    <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Todos los Tours
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
