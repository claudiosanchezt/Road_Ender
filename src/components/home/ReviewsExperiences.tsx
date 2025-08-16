// Sección de reseñas y experiencias con testimoniales premium
// Diseño inmersivo con efectos de parallax y transiciones fluidas

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ImageService from '@/services/imageService';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userLocation: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  tourName: string;
  guideName: string;
  date: string;
  verified: boolean;
  helpful: number;
  category: 'adventure' | 'cultural' | 'food' | 'nature';
}

interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  price: number;
  duration: string;
  highlights: string[];
}

interface ReviewsExperiencesProps {
  reviews?: Review[];
  experiences?: Experience[];
  isLoading?: boolean;
}

const ReviewsExperiences: React.FC<ReviewsExperiencesProps> = ({
  reviews = [],
  experiences = [],
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'experiences'>('reviews');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Reviews de ejemplo premium
  const defaultReviews: Review[] = [
    {
      id: '1',
      userName: 'María González',
      userAvatar: 'user-maria.jpg',
      userLocation: 'Madrid, España',
      rating: 5,
      title: 'Una experiencia que cambió mi vida',
      content: 'Carlos nos llevó por senderos secretos de la Patagonia que jamás hubiera imaginado. Su conocimiento del glaciar y la forma de explicar la historia geológica fue fascinante. Las fotos que tomamos son increíbles, pero la experiencia vivida no tiene precio.',
      images: ['review-1a.jpg', 'review-1b.jpg'],
      tourName: 'Expedición Glaciar Perito Moreno',
      guideName: 'Carlos Mendoza',
      date: '15 Mar 2024',
      verified: true,
      helpful: 24,
      category: 'adventure'
    },
    {
      id: '2',
      userName: 'James Thompson',
      userAvatar: 'user-james.jpg',
      userLocation: 'Toronto, Canadá',
      rating: 5,
      title: 'Authentic Inca experience beyond expectations',
      content: 'Ana made Machu Picchu come alive with stories passed down through generations. Her ancestral knowledge and spiritual connection to the place gave us insights no guidebook could provide. Truly magical.',
      images: ['review-2a.jpg'],
      tourName: 'Camino Inca Espiritual',
      guideName: 'Ana Quispe',
      date: '8 Feb 2024',
      verified: true,
      helpful: 31,
      category: 'cultural'
    },
    {
      id: '3',
      userName: 'Sophie Laurent',
      userAvatar: 'user-sophie.jpg',
      userLocation: 'Lyon, Francia',
      rating: 5,
      title: 'Les étoiles du désert - Inoubliable!',
      content: 'Roberto transformó una noche en el desierto en una clase magistral de astronomía. Ver las estrellas con esa claridad mientras él explicaba constelaciones andinas fue extraordinario. El amanecer en los géiseres fue el broche de oro.',
      images: ['review-3a.jpg', 'review-3b.jpg', 'review-3c.jpg'],
      tourName: 'Observación Astronómica Atacama',
      guideName: 'Roberto Silva',
      date: '22 Jan 2024',
      verified: true,
      helpful: 18,
      category: 'nature'
    }
  ];

  // Experiencias de ejemplo premium
  const defaultExperiences: Experience[] = [
    {
      id: '1',
      title: 'Expedición Patagonia Extrema',
      description: 'Trekking de 7 días por los circuitos más salvajes de Torres del Paine con guías especializados',
      image: 'exp-patagonia.jpg',
      category: 'Aventura Extrema',
      rating: 4.9,
      reviewsCount: 127,
      price: 850,
      duration: '7 días',
      highlights: ['Campamentos base', 'Fotografía profesional', 'Equipo incluido']
    },
    {
      id: '2',
      title: 'Inmersión Cultural Andina',
      description: 'Convive con comunidades quechuas y aprende técnicas ancestrales de tejido y agricultura',
      image: 'exp-cultural.jpg',
      category: 'Cultural',
      rating: 4.8,
      reviewsCount: 89,
      price: 320,
      duration: '3 días',
      highlights: ['Familia anfitriona', 'Clases de quechua', 'Ceremonia ancestral']
    },
    {
      id: '3',
      title: 'Safari Fotográfico Amazonas',
      description: 'Captura la biodiversidad amazónica con fotógrafos profesionales y guías naturistas',
      image: 'exp-amazon.jpg',
      category: 'Naturaleza',
      rating: 4.9,
      reviewsCount: 156,
      price: 680,
      duration: '5 días',
      highlights: ['Equipo profesional', 'Especies endémicas', 'Lodge ecológico']
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;
  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % displayReviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [displayReviews.length]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'adventure': 'from-red-500 to-orange-500',
      'cultural': 'from-purple-500 to-indigo-500',
      'food': 'from-yellow-500 to-orange-500',
      'nature': 'from-green-500 to-teal-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </motion.span>
    ));
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%'
          }}
        />
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full mb-6"
          >
            <span className="text-2xl">💬</span>
            <span className="font-semibold">Testimonios Reales</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Historias que Inspiran
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cada viaje es una historia única. Descubre cómo nuestros viajeros 
            han vivido experiencias que transformaron su perspectiva del mundo
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {[
              { key: 'reviews', label: 'Reseñas', icon: '💬', count: displayReviews.length },
              { key: 'experiences', label: 'Experiencias', icon: '✨', count: displayExperiences.length }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className="bg-gray-500/20 text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'reviews' ? (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured Review Carousel */}
              <div className="mb-16">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReviewIndex}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.6 }}
                      className="max-w-4xl mx-auto"
                    >
                      {displayReviews[currentReviewIndex] && (
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                          <div className="text-center mb-8">
                            <div className="flex justify-center space-x-1 mb-4">
                              {renderStars(displayReviews[currentReviewIndex].rating)}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                              "{displayReviews[currentReviewIndex].title}"
                            </h3>
                            <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                              {displayReviews[currentReviewIndex].content}
                            </p>
                          </div>

                          <div className="flex items-center justify-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30">
                              <img
                                src={ImageService.getImageWithFallback('guide', displayReviews[currentReviewIndex].id, displayReviews[currentReviewIndex].userAvatar, 'thumb')}
                                alt={displayReviews[currentReviewIndex].userName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = ImageService.getDefaultImage('guide');
                                }}
                              />
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-white flex items-center space-x-2">
                                <span>{displayReviews[currentReviewIndex].userName}</span>
                                {displayReviews[currentReviewIndex].verified && (
                                  <span className="text-blue-400">✓</span>
                                )}
                              </div>
                              <div className="text-gray-300 text-sm">
                                {displayReviews[currentReviewIndex].userLocation}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {displayReviews[currentReviewIndex].tourName} • {displayReviews[currentReviewIndex].date}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <div className="flex justify-center mt-8 space-x-3">
                    {displayReviews.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentReviewIndex(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === currentReviewIndex 
                            ? 'bg-white shadow-lg' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedReview(review)}
                  >
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                        <img
                          src={ImageService.getImageWithFallback('guide', review.id, review.userAvatar, 'thumb')}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = ImageService.getDefaultImage('guide');
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{review.userName}</h4>
                          {review.verified && <span className="text-blue-400 text-sm">✓</span>}
                        </div>
                        <div className="text-gray-400 text-sm">{review.userLocation}</div>
                      </div>
                    </div>

                    <div className="flex space-x-1 mb-3">
                      {renderStars(review.rating)}
                    </div>

                    <h5 className="font-semibold text-white mb-2">{review.title}</h5>
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {review.content}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{review.tourName}</span>
                      <span>{review.helpful} útiles</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="experiences"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Experiences Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayExperiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl group cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={ImageService.getImageWithFallback('place', experience.id, experience.image, 'full')}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = ImageService.getDefaultImage('place');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      <div className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(experience.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {experience.category}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {experience.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-200">
                          <div className="flex space-x-1">
                            {renderStars(experience.rating)}
                          </div>
                          <span className="text-sm">({experience.reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-200 mb-4 line-clamp-2">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/10 text-gray-200 rounded-full text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            ${experience.price}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {experience.duration}
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Reservar
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ReviewsExperiences;
