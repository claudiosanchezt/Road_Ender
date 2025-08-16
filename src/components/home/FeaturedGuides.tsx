// Sección de guías destacados con diseño premium y efectos 3D
// Cards interactivas con información detallada y animaciones fluidas

'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ImageService from '@/services/imageService';

interface Guide {
  id: string;
  name: string;
  title: string;
  location: string;
  country: string;
  flag: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  specialties: string[];
  languages: string[];
  price: number;
  availability: 'available' | 'busy' | 'offline';
  description: string;
  verified: boolean;
  badges: string[];
  totalTours: number;
  responseTime: string;
}

interface FeaturedGuidesProps {
  guides?: Guide[];
  isLoading?: boolean;
}

const FeaturedGuides: React.FC<FeaturedGuidesProps> = ({ 
  guides = [], 
  isLoading = false 
}) => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [filter, setFilter] = useState<'all' | 'top-rated' | 'verified' | 'available'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Guías de ejemplo premium
  const defaultGuides: Guide[] = [
    {
      id: '1',
      name: 'Carlos Mendoza',
      title: 'Experto en Patagonia',
      location: 'El Calafate',
      country: 'Argentina',
      flag: '🇦🇷',
      avatar: 'guide-carlos.jpg',
      rating: 4.9,
      reviewsCount: 347,
      experienceYears: 15,
      specialties: ['Trekking', 'Fotografía', 'Glaciares'],
      languages: ['Español', 'Inglés', 'Alemán'],
      price: 85,
      availability: 'available',
      description: 'Nativo de la Patagonia con 15 años guiando expediciones. Especialista en glaciares y fotografía de naturaleza.',
      verified: true,
      badges: ['Top Guide', 'Eco Expert', 'Safety Certified'],
      totalTours: 1200,
      responseTime: '< 1 hora'
    },
    {
      id: '2',
      name: 'Ana Quispe',
      title: 'Guardiana Inca',
      location: 'Cusco',
      country: 'Perú',
      flag: '🇵🇪',
      avatar: 'guide-ana.jpg',
      rating: 4.8,
      reviewsCount: 289,
      experienceYears: 12,
      specialties: ['Historia Inca', 'Arqueología', 'Cultura'],
      languages: ['Español', 'Quechua', 'Inglés'],
      price: 65,
      availability: 'available',
      description: 'Descendiente directa de los Incas. Comparte historias ancestrales y secretos de Machu Picchu.',
      verified: true,
      badges: ['Cultural Expert', 'Heritage Guardian', 'Top Rated'],
      totalTours: 890,
      responseTime: '< 30 min'
    },
    {
      id: '3',
      name: 'Roberto Silva',
      title: 'Maestro del Desierto',
      location: 'San Pedro de Atacama',
      country: 'Chile',
      flag: '🇨🇱',
      avatar: 'guide-roberto.jpg',
      rating: 4.9,
      reviewsCount: 156,
      experienceYears: 20,
      specialties: ['Astronomía', 'Desierto', 'Geología'],
      languages: ['Español', 'Inglés', 'Portugués'],
      price: 95,
      availability: 'busy',
      description: 'Astrónomo y geólogo que revela los secretos del desierto más árido del mundo.',
      verified: true,
      badges: ['Astronomy Expert', 'Desert Master', 'PhD Guide'],
      totalTours: 750,
      responseTime: '< 2 horas'
    }
  ];

  const displayGuides = guides.length > 0 ? guides : defaultGuides;

  const getAvailabilityColor = (status: string) => {
    const colors = {
      'available': 'bg-green-500',
      'busy': 'bg-yellow-500', 
      'offline': 'bg-gray-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  const getAvailabilityText = (status: string) => {
    const texts = {
      'available': 'Disponible',
      'busy': 'Ocupado',
      'offline': 'Sin conexión'
    };
    return texts[status as keyof typeof texts] || 'Desconocido';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </motion.span>
    ));
  };

  const filterGuides = () => {
    switch (filter) {
      case 'top-rated':
        return displayGuides.filter(guide => guide.rating >= 4.8);
      case 'verified':
        return displayGuides.filter(guide => guide.verified);
      case 'available':
        return displayGuides.filter(guide => guide.availability === 'available');
      default:
        return displayGuides;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
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
      className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full mb-6"
          >
            <span className="text-2xl">👨‍🏫</span>
            <span className="font-semibold">Guías Expertos</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Conecta con Locales Apasionados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nuestros guías verificados son más que expertos, son guardianes de historias, 
            cultura y secretos que solo un local conoce
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'Todos', icon: '👥' },
            { key: 'top-rated', label: 'Top Rated', icon: '⭐' },
            { key: 'verified', label: 'Verificados', icon: '✅' },
            { key: 'available', label: 'Disponibles', icon: '🟢' }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.key as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              <span>{filterOption.icon}</span>
              <span>{filterOption.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterGuides().map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden cursor-pointer group"
              onClick={() => setSelectedGuide(guide)}
            >
              {/* Header with Avatar */}
              <div className="relative p-8 text-center">
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(guide.availability)}`}></div>
                  <span className="text-xs font-medium text-gray-600">
                    {getAvailabilityText(guide.availability)}
                  </span>
                </div>

                {/* Country Flag */}
                <div className="absolute top-4 left-4 text-2xl">
                  {guide.flag}
                </div>

                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl"
                  >
                    <img
                      src={ImageService.getImageWithFallback('guide', guide.id, guide.avatar, 'medium')}
                      alt={guide.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = ImageService.getDefaultImage('guide');
                      }}
                    />
                  </motion.div>
                  
                  {/* Verified Badge */}
                  {guide.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>

                {/* Name and Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {guide.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-2">
                  {guide.title}
                </p>
                <p className="text-gray-500 text-sm flex items-center justify-center">
                  <span className="mr-1">📍</span>
                  {guide.location}, {guide.country}
                </p>
              </div>

              {/* Rating and Stats */}
              <div className="px-8 pb-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {renderStars(guide.rating)}
                  </div>
                  <span className="font-bold text-gray-800">{guide.rating}</span>
                  <span className="text-gray-500 text-sm">({guide.reviewsCount})</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-indigo-600">{guide.experienceYears}</div>
                    <div className="text-xs text-gray-500">Años</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">${guide.price}</div>
                    <div className="text-xs text-gray-500">Por hora</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{guide.totalTours}</div>
                    <div className="text-xs text-gray-500">Tours</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {guide.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="flex justify-center space-x-2 mb-6">
                  {guide.languages.slice(0, 3).map((lang, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Contactar Guía</span>
                  <span className="text-lg">💬</span>
                </motion.button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Ver Más Guías</span>
            <span className="text-xl">👥</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGuide(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content would go here */}
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{selectedGuide.name}</h3>
              <p className="text-gray-600 mb-6">{selectedGuide.description}</p>
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedGuides;
