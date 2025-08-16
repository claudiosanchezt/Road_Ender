'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Users, Star, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const heroImages = [
  {
    src: '/images/hero/cartagena-hero.jpg',
    alt: 'Cartagena Centro Histórico',
    title: 'Cartagena de Indias',
    subtitle: 'Ciudad amurallada llena de historia'
  },
  {
    src: '/images/hero/cocora-hero.jpg', 
    alt: 'Valle de Cocora',
    title: 'Eje Cafetero',
    subtitle: 'Paisajes culturales cafeteros'
  },
  {
    src: '/images/hero/tayrona-hero.jpg',
    alt: 'Parque Tayrona',
    title: 'Costa Caribe',
    subtitle: 'Playas paradisíacas y naturaleza'
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZone, setSelectedZone] = useState('')

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedZone) params.set('zone', selectedZone)
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Placeholder gradient instead of actual image */}
            <div 
              className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800"
              style={{
                backgroundImage: `linear-gradient(135deg, 
                  ${index === 0 ? '#f59e0b, #d97706, #92400e' : 
                    index === 1 ? '#10b981, #059669, #047857' : 
                    '#3b82f6, #2563eb, #1d4ed8'})`
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-6xl font-bold opacity-20 mb-2">
                  {image.title}
                </h2>
                <p className="text-xl opacity-30">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Descubre Colombia con
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Guías Locales Expertos
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                Conectamos turistas con guías especializados para experiencias auténticas 
                e inolvidables en los destinos más hermosos de Colombia
              </p>
            </div>

            {/* Advanced Search Bar */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="¿Qué experiencia buscas? (senderismo, cultura, gastronomía...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500"
                    />
                  </div>
                  <div className="lg:w-64 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 appearance-none text-lg"
                    >
                      <option value="">Todos los destinos</option>
                      <option value="cartagena">Cartagena</option>
                      <option value="medellin">Medellín</option>
                      <option value="eje-cafetero">Eje Cafetero</option>
                      <option value="bogota">Bogotá</option>
                      <option value="santa-marta">Santa Marta</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Buscar Experiencias
                  </button>
                </div>
                
                {/* Quick filters */}
                <div className="flex flex-wrap gap-3 mt-6 justify-center">
                  {['Aventura', 'Cultura', 'Gastronomía', 'Naturaleza', 'Fotografía'].map((filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Users, value: '127+', label: 'Guías Certificados', color: 'text-yellow-400' },
                { icon: MapPin, value: '89+', label: 'Tours Únicos', color: 'text-green-400' },
                { icon: Star, value: '4.9', label: 'Calificación', color: 'text-orange-400' },
                { icon: Play, value: '45+', label: 'Destinos', color: 'text-pink-400' }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="mb-3">
                      <Icon className={`w-10 h-10 ${stat.color} mx-auto group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 opacity-75">Explora más</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
