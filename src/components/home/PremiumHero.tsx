// Hero Section Premium con efectos 3D y gradientes texturizados
// Experiencia visual impactante con animaciones avanzadas

'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroStats {
  countries: number;
  places: number;
  guides: number;
  experiences: number;
}

interface PremiumHeroProps {
  stats?: HeroStats;
  onExploreClick?: () => void;
}

const PremiumHero: React.FC<PremiumHeroProps> = ({ 
  stats = { countries: 12, places: 150, guides: 89, experiences: 1200 },
  onExploreClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const heroSlides = [
    {
      title: "Descubre Mundos Inexplorados",
      subtitle: "Con Guías Locales Expertos",
      description: "Vive experiencias auténticas que van más allá del turismo tradicional",
      backgroundGradient: "from-blue-600 via-purple-600 to-indigo-800",
      emoji: "🌍",
      cta: "Explorar Destinos"
    },
    {
      title: "Aventuras Personalizadas",
      subtitle: "Creadas Solo Para Ti",
      description: "Cada viaje es único, diseñado según tus pasiones y preferencias",
      backgroundGradient: "from-emerald-500 via-teal-600 to-cyan-800",
      emoji: "🎯",
      cta: "Crear Mi Aventura"
    },
    {
      title: "Conecta con Culturas Vivas",
      subtitle: "Más Allá del Turismo",
      description: "Sumérgete en tradiciones auténticas de la mano de locales apasionados",
      backgroundGradient: "from-orange-500 via-red-500 to-pink-600",
      emoji: "🤝",
      cta: "Conocer Guías"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background con textura y gradientes */}
      <motion.div 
        style={{ y: y1, opacity }}
        className={`absolute inset-0 bg-gradient-to-br ${currentHero.backgroundGradient}`}
      >
        {/* Patrón de textura sutil */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%),
                linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%)
              `,
              backgroundSize: '60px 60px, 80px 80px, 20px 20px, 20px 20px'
            }}
          />
        </div>

        {/* Formas geométricas flotantes */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-32 left-16 w-24 h-24 bg-white/5 rounded-lg blur-sm"
        />
      </motion.div>

      {/* Contenido Principal */}
      <motion.div 
        style={{ y: y2 }}
        className="relative z-10 container mx-auto px-4 h-screen flex items-center"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Contenido Textual */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-8"
          >
            {/* Badge Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
            >
              <span className="text-2xl">{currentHero.emoji}</span>
              <span className="text-sm font-semibold">Experiencias Premium</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </motion.div>

            {/* Título Principal */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-4"
              >
                {currentHero.title}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-light opacity-90"
              >
                {currentHero.subtitle}
              </motion.h2>
            </div>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl opacity-80 max-w-lg leading-relaxed"
            >
              {currentHero.description}
            </motion.p>

            {/* CTAs Premium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreClick}
                className="px-8 py-4 bg-white text-gray-800 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>{currentHero.cta}</span>
                <span className="text-xl">🚀</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/50 text-white font-semibold text-lg rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Ver Demo</span>
                <span className="text-xl">▶️</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Estadísticas Premium */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Países', value: stats.countries, icon: '🌍', suffix: '+' },
              { label: 'Destinos', value: stats.places, icon: '📍', suffix: '+' },
              { label: 'Guías Expertos', value: stats.guides, icon: '👨‍🏫', suffix: '+' },
              { label: 'Experiencias', value: stats.experiences, icon: '✨', suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5
                }}
                className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:shadow-white/10 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-3xl font-bold mb-2"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        delay: 1.2 + index * 0.1,
                        duration: 0.5
                      }}
                    >
                      {stat.value}{stat.suffix}
                    </motion.span>
                  </motion.div>
                  <div className="text-sm opacity-80 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Controles de Slides */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium mb-2">Explorar</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PremiumHero;
