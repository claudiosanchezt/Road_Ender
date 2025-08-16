// Componente de estadísticas animadas en tiempo real
// Muestra métricas clave con animaciones y actualizaciones dinámicas

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StatisticCardProps {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  delay?: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  value,
  label,
  suffix = '',
  prefix = '',
  color,
  trend,
  trendValue,
  delay = 0
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = value / (duration / 50);
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(counter);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '📊';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 20px 40px ${color}40`
      }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center group cursor-pointer hover:bg-white/15 transition-all duration-300"
    >
      {/* Icono animado */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-4xl mb-3"
      >
        {icon}
      </motion.div>

      {/* Valor principal */}
      <div className="space-y-2">
        <motion.div
          key={animatedValue}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-white"
        >
          {prefix}{animatedValue.toLocaleString()}{suffix}
        </motion.div>

        {/* Label */}
        <p className="text-sm text-gray-300 font-medium">
          {label}
        </p>

        {/* Trend indicator */}
        {trend && trendValue && (
          <div className="flex items-center justify-center space-x-2 text-xs">
            <span>{getTrendIcon()}</span>
            <span className={getTrendColor()}>
              {trendValue > 0 ? '+' : ''}{trendValue}%
            </span>
          </div>
        )}
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    </motion.div>
  );
};

const LiveStatistics: React.FC = () => {
  const [stats, setStats] = useState([
    { icon: '🌍', value: 847, label: 'Destinos Únicos', suffix: '+', color: '#3B82F6', trend: 'up' as const, trendValue: 12 },
    { icon: '👨‍🏫', value: 234, label: 'Guías Expertos', suffix: '', color: '#8B5CF6', trend: 'up' as const, trendValue: 8 },
    { icon: '⭐', value: 98, label: 'Satisfacción', suffix: '%', color: '#F59E0B', trend: 'stable' as const, trendValue: 2 },
    { icon: '🎯', value: 15420, label: 'Aventureros', suffix: '+', color: '#10B981', trend: 'up' as const, trendValue: 23 }
  ]);

  // Simulamos actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 3)
        }))
      );
    }, 10000); // Actualizar cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🚀 Impacto en Tiempo Real
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cada aventura cuenta una historia. Mira cómo estamos transformando 
            la forma de explorar Sudamérica minuto a minuto.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatisticCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              color={stat.color}
              trend={stat.trend}
              trendValue={stat.trendValue}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Additional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Metric 1 */}
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">Premio Nacional</h3>
            <p className="text-gray-300">Mejor Plataforma de Turismo Sostenible 2024</p>
          </div>

          {/* Metric 2 */}
          <div className="text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold text-white mb-2">Impacto Positivo</h3>
            <p className="text-gray-300">+850 toneladas de CO₂ compensadas este año</p>
          </div>

          {/* Metric 3 */}
          <div className="text-center">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-white mb-2">Innovación</h3>
            <p className="text-gray-300">IA avanzada para matching perfecto guía-viajero</p>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            🎯 ¡Forma Parte de Esta Historia!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStatistics;
