// Carrusel de zonas destacadas con efectos 3D premium
// Experiencia inmersiva con glassmorphism y animaciones fluidas

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ImageService from '@/services/imageService';

interface Zone {
  id: string;
  name: string;
  country: string;
  flag: string;
  category: string;
  difficulty: string;
  rating: number;
  totalPlaces: number;
  description: string;
  images: string[];
  highlights: string[];
  bestTime: string;
  averagePrice: number;
}

interface ZonesCarouselProps {
  zones?: Zone[];
  isLoading?: boolean;
}

const ZonesCarousel: React.FC<ZonesCarouselProps> = ({ 
  zones = [], 
  isLoading = false 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Datos de ejemplo premium si no se proporcionan
  const defaultZones: Zone[] = [
    {
      id: '1',
      name: 'Patagonia Mística',
      country: 'Chile',
      flag: '🇨🇱',
      category: 'Aventura Extrema',
      difficulty: 'Difícil',
      rating: 4.9,
      totalPlaces: 15,
      description: 'Glaciares milenarios, montañas imponentes y paisajes que desafían la imaginación',
      images: ['patagonia-1.jpg', 'patagonia-2.jpg'],
      highlights: ['Glaciar Perito Moreno', 'Torres del Paine', 'Fitz Roy'],
      bestTime: 'Dic - Mar',
      averagePrice: 250
    },
    {
      id: '2',
      name: 'Amazonía Secreta',
      country: 'Perú',
      flag: '🇵🇪',
      category: 'Biodiversidad',
      difficulty: 'Moderado',
      rating: 4.8,
      totalPlaces: 22,
      description: 'El pulmón del mundo te espera con sus secretos ancestrales y vida exuberante',
      images: ['amazon-1.jpg', 'amazon-2.jpg'],
      highlights: ['Río Amazonas', 'Comunidades Nativas', 'Fauna Única'],
      bestTime: 'May - Sep',
      averagePrice: 180
    },
    {
      id: '3',
      name: 'Altiplano Andino',
      country: 'Bolivia',
      flag: '🇧🇴',
      category: 'Cultural',
      difficulty: 'Moderado',
      rating: 4.7,
      totalPlaces: 18,
      description: 'Tradiciones milenarias en paisajes que tocan el cielo',
      images: ['altiplano-1.jpg', 'altiplano-2.jpg'],
      highlights: ['Salar de Uyuni', 'Lago Titicaca', 'La Paz'],
      bestTime: 'Abr - Oct',
      averagePrice: 120
    },
    {
      id: '4',
      name: 'Desierto de Atacama',
      country: 'Chile',
      flag: '🇨🇱',
      category: 'Astronómico',
      difficulty: 'Fácil',
      rating: 4.9,
      totalPlaces: 12,
      description: 'El lugar más seco del mundo ofrece los cielos más puros para contemplar el universo',
      images: ['atacama-1.jpg', 'atacama-2.jpg'],
      highlights: ['Valle de la Luna', 'Geysers del Tatio', 'Observatorios'],
      bestTime: 'Mar - May',
      averagePrice: 200
    }
  ];

  const displayZones = zones.length > 0 ? zones : defaultZones;

  // Auto-carousel
  useEffect(() => {
    if (!isAutoPlaying || hoveredZone) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayZones.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, hoveredZone, displayZones.length]);

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Fácil': 'from-green-400 to-emerald-500',
      'Moderado': 'from-yellow-400 to-orange-500',
      'Difícil': 'from-red-400 to-pink-500',
      'Extremo': 'from-purple-500 to-indigo-600'
    };
    return colors[difficulty as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </motion.span>
    ));
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full mb-6"
          >
            <span className="text-2xl">🏔️</span>
            <span className="font-semibold">Zonas Destacadas</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Destinos Extraordinarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explora territorios únicos donde cada paisaje cuenta una historia milenaria 
            y cada experiencia transforma tu perspectiva del mundo
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + displayZones.length) % displayZones.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center hover:bg-white transition-all duration-300 group"
          >
            <motion.span 
              whileHover={{ x: -2 }}
              className="text-2xl text-gray-700 group-hover:text-blue-600"
            >
              ←
            </motion.span>
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % displayZones.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center hover:bg-white transition-all duration-300 group"
          >
            <motion.span 
              whileHover={{ x: 2 }}
              className="text-2xl text-gray-700 group-hover:text-blue-600"
            >
              →
            </motion.span>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {displayZones.map((zone, index) => (
                <div key={zone.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    onHoverStart={() => setHoveredZone(zone.id)}
                    onHoverEnd={() => setHoveredZone(null)}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
                  >
                    {/* Background Image */}
                    <div className="relative h-96 overflow-hidden">
                      <motion.img
                        src={ImageService.getImageWithFallback('zone', zone.id, zone.images[0] || 'default', 'full')}
                        alt={zone.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = ImageService.getDefaultImage('zone');
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* Country Badge */}
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                        <span className="text-2xl">{zone.flag}</span>
                        <span className="font-semibold text-gray-800">{zone.country}</span>
                      </div>

                      {/* Difficulty Badge */}
                      <div className={`absolute top-6 left-6 bg-gradient-to-r ${getDifficultyColor(zone.difficulty)} text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg`}>
                        {zone.difficulty}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {zone.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-blue-600 font-medium">
                            <span className="text-lg">🏷️</span>
                            <span>{zone.category}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {renderStars(zone.rating)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {zone.rating}/5.0
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {zone.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="text-lg mr-2">✨</span>
                          Destacados
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {zone.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{zone.totalPlaces}</div>
                          <div className="text-sm text-gray-500">Lugares</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">${zone.averagePrice}</div>
                          <div className="text-sm text-gray-500">Promedio</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{zone.bestTime}</div>
                          <div className="text-sm text-gray-500">Mejor época</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>Explorar Zona</span>
                        <span className="text-xl">🚀</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {displayZones.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isAutoPlaying 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>{isAutoPlaying ? '⏸️' : '▶️'}</span>
            <span>{isAutoPlaying ? 'Pausar' : 'Reproducir'}</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ZonesCarousel;
