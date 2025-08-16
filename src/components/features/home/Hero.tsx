'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, MapPin, Users, Star } from 'lucide-react'
import { geographyApi, guidesApi, toursApi } from '@/lib/api/client'
import type { Zone } from '@/types/frontend'

export function Hero() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZone, setSelectedZone] = useState('')

  // Obtener zonas para el selector
  const { data: zones } = useQuery({
    queryKey: ['zones'],
    queryFn: () => geographyApi.getZones()
  })

  // Obtener estadísticas para mostrar en el hero
  const { data: stats } = useQuery({
    queryKey: ['homepage-stats'],
    queryFn: async () => {
      const [guides, tours, zones] = await Promise.all([
        guidesApi.search(),
        toursApi.search(),
        geographyApi.getZones()
      ])
      return {
        totalGuides: Array.isArray(guides.data) ? guides.data.length : 0,
        totalTours: Array.isArray(tours.data) ? tours.data.length : 0,
        totalZones: Array.isArray(zones.data) ? zones.data.length : 0,
        averageRating: 4.8
      }
    }
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedZone) params.set('zone', selectedZone)
    
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <section 
      className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.8), rgba(30, 64, 175, 0.8)), url('/images/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Descubre Colombia con
            <span className="block text-yellow-400">Guías Locales Expertos</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Conectamos turistas con guías especializados para experiencias auténticas 
            e inolvidables en los destinos más hermosos de Colombia
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-2 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="¿Qué te gustaría explorar?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:w-64 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border-0 focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Todos los destinos</option>
                  {/* Temporalmente sin zonas hasta resolver tipado */}
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold">{stats.totalGuides}+</div>
              <div className="text-blue-200">Guías Certificados</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <MapPin className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold">{stats.totalTours}+</div>
              <div className="text-blue-200">Tours Disponibles</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <MapPin className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold">{stats.totalZones}+</div>
              <div className="text-blue-200">Destinos</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold">{stats.averageRating}</div>
              <div className="text-blue-200">Calificación Promedio</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
