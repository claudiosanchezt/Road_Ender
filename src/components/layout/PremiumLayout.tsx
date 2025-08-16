// Layout principal con diseño premium y componentes integrados
// Experiencia visual completa con navegación fluida y efectos avanzados

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '@/components/layout/ModernNavbar';
import PremiumHero from '@/components/home/PremiumHero';
import ZonesCarousel from '@/components/home/ZonesCarousel';
import FeaturedGuides from '@/components/home/FeaturedGuides';
import LiveStatistics from '@/components/home/LiveStatistics';
import PartnersSection from '@/components/home/PartnersSection';
import ReviewsExperiences from '@/components/home/ReviewsExperiences';

interface PremiumLayoutProps {
  children?: React.ReactNode;
}

const PremiumLayout: React.FC<PremiumLayoutProps> = ({ children }) => {
  const handleExploreClick = () => {
    // Scroll suave a la sección de zonas
    const zonesSection = document.getElementById('zones-section');
    if (zonesSection) {
      zonesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Premium */}
      <ModernNavbar />

      {/* Hero Section Premium */}
      <PremiumHero onExploreClick={handleExploreClick} />

      {/* Zonas Destacadas */}
      <div id="zones-section">
        <ZonesCarousel />
      </div>

      {/* Guías Destacados */}
      <FeaturedGuides />

      {/* Estadísticas en Tiempo Real */}
      <LiveStatistics />

      {/* Partners y Certificaciones */}
      <PartnersSection />

      {/* Reseñas y Experiencias */}
      <ReviewsExperiences />

      {/* Contenido adicional */}
      {children}

      {/* Footer Premium */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo y descripción */}
            <div className="col-span-1 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">🌍</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">RoadEnder</h3>
                  <p className="text-gray-300 text-sm">Explora con Expertos</p>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-300 leading-relaxed mb-6 max-w-md"
              >
                Conectamos viajeros apasionados con guías locales expertos para crear 
                experiencias auténticas que van más allá del turismo tradicional.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex space-x-4"
              >
                {['🌟', '🎯', '🚀', '💯'].map((emoji, index) => (
                  <motion.div
                    key={emoji}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <span className="text-xl">{emoji}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Enlaces rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-6">Explora</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Destinos', icon: '🌍' },
                  { label: 'Guías Expertos', icon: '👨‍🏫' },
                  { label: 'Experiencias', icon: '✨' },
                  { label: 'Reseñas', icon: '💬' }
                ].map((item, index) => (
                  <motion.li
                    key={item.label}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-bold text-lg mb-6">Conecta</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Ser Guía', icon: '🎓' },
                  { label: 'Soporte', icon: '🛟' },
                  { label: 'Blog', icon: '📝' },
                  { label: 'Comunidad', icon: '👥' }
                ].map((item, index) => (
                  <motion.li
                    key={item.label}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href="#" 
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4">
                🚀 Descubre Aventuras Épicas
              </h4>
              <p className="text-gray-300 mb-8">
                Recibe destinos secretos y experiencias exclusivas directamente en tu inbox
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu email para aventuras..."
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ¡Únete! 🎯
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/20 text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 RoadEnder. Creando memorias extraordinarias desde el corazón de Sudamérica.
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <motion.a
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Privacidad
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Términos
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Cookies
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl font-bold hover:rotate-12 transition-transform duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </motion.button>
      </motion.div>

      {/* Loading Overlay - Se puede usar para transiciones de página */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 z-50 flex items-center justify-center pointer-events-none"
        style={{ display: 'none' }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
          className="text-8xl"
        >
          🌍
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PremiumLayout;
