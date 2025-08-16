// Componente de partners y certificaciones premium
// Muestra alianzas estratégicas con animaciones elegantes

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PartnerProps {
  name: string;
  logo: string;
  description: string;
  category: 'tourism' | 'tech' | 'certification' | 'media';
  website?: string;
}

const partners: PartnerProps[] = [
  {
    name: 'National Geographic',
    logo: '🌍',
    description: 'Partner oficial para experiencias auténticas',
    category: 'media'
  },
  {
    name: 'UNESCO',
    logo: '🏛️',
    description: 'Patrimonio Mundial y turismo sostenible',
    category: 'certification'
  },
  {
    name: 'Google Travel',
    logo: '🔍',
    description: 'Integración con Google Travel Partner',
    category: 'tech'
  },
  {
    name: 'IATA',
    logo: '✈️',
    description: 'Asociación Internacional de Transporte Aéreo',
    category: 'tourism'
  },
  {
    name: 'TripAdvisor',
    logo: '📍',
    description: 'Partner verificado con 5 estrellas',
    category: 'tourism'
  },
  {
    name: 'Booking.com',
    logo: '🏨',
    description: 'Integración para alojamientos premium',
    category: 'tourism'
  },
  {
    name: 'Sustainable Tourism',
    logo: '🌱',
    description: 'Certificación en Turismo Sostenible',
    category: 'certification'
  },
  {
    name: 'AWS',
    logo: '☁️',
    description: 'Infraestructura cloud de clase mundial',
    category: 'tech'
  }
];

const getCategoryColor = (category: PartnerProps['category']) => {
  switch (category) {
    case 'tourism': return 'from-blue-500 to-cyan-500';
    case 'tech': return 'from-purple-500 to-pink-500';
    case 'certification': return 'from-green-500 to-emerald-500';
    case 'media': return 'from-orange-500 to-red-500';
  }
};

const getCategoryLabel = (category: PartnerProps['category']) => {
  switch (category) {
    case 'tourism': return 'Turismo';
    case 'tech': return 'Tecnología';
    case 'certification': return 'Certificación';
    case 'media': return 'Media';
  }
};

const PartnerCard: React.FC<{ partner: PartnerProps; index: number }> = ({ partner, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.1,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
    }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100"
  >
    {/* Category badge */}
    <div className="flex justify-between items-start mb-4">
      <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(partner.category)}`}>
        {getCategoryLabel(partner.category)}
      </div>
      
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="text-3xl"
      >
        {partner.logo}
      </motion.div>
    </div>

    {/* Content */}
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        {partner.name}
      </h3>
      
      <p className="text-sm text-gray-600 leading-relaxed">
        {partner.description}
      </p>
    </div>

    {/* Hover effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
  </motion.div>
);

const TrustIndicators: React.FC = () => {
  const certifications = [
    { icon: '🔒', label: 'SSL Verificado', value: '256-bit' },
    { icon: '🛡️', label: 'Datos Seguros', value: 'GDPR' },
    { icon: '📊', label: 'Uptime', value: '99.9%' },
    { icon: '⚡', label: 'Velocidad', value: '<2s' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 mt-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🔐 Confianza y Seguridad
        </h3>
        <p className="text-gray-600">
          Tecnología de vanguardia para proteger tu experiencia
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center p-4 bg-white rounded-xl shadow-sm"
          >
            <div className="text-2xl mb-2">{cert.icon}</div>
            <div className="font-bold text-gray-900 text-sm">{cert.value}</div>
            <div className="text-xs text-gray-600">{cert.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const PartnersSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🤝 Alianzas de Excelencia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trabajamos con los mejores del mundo para ofrecerte experiencias 
            excepcionales respaldadas por estándares internacionales de calidad.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}
        </div>

        {/* Trust indicators */}
        <TrustIndicators />

        {/* Awards section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            🏆 Reconocimientos 2024
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              { award: '🥇 Mejor App Turismo', org: 'Travel Awards' },
              { award: '🌟 Innovación Digital', org: 'Tech Summit' },
              { award: '🌱 Turismo Sostenible', org: 'Green Travel' },
              { award: '👥 Mejor Experiencia', org: 'User Choice' }
            ].map((award, index) => (
              <motion.div
                key={award.award}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="text-center p-4 hover:bg-white hover:shadow-lg rounded-xl transition-all duration-300"
              >
                <div className="text-sm font-bold text-gray-900">{award.award}</div>
                <div className="text-xs text-gray-500">{award.org}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            🚀 Únete a la Red Global
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
