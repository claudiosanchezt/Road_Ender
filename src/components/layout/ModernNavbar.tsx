// Navbar moderno con efectos glassmorphism y gradientes premium
// Diseño profesional con animaciones fluidas y microtransiciones

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{
    label: string;
    href: string;
    icon: string;
    description: string;
  }>;
}

const ModernNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'destinations',
      label: 'Destinos',
      href: '/destinations',
      icon: '🌍',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Explorar Zonas', href: '/zones', icon: '🏔️', description: 'Descubre zonas únicas' },
        { label: 'Tours Destacados', href: '/tours', icon: '🎯', description: 'Experiencias premium' },
        { label: 'Cerca de Ti', href: '/nearby', icon: '📍', description: 'Lugares cercanos' },
      ]
    },
    {
      id: 'guides',
      label: 'Guías',
      href: '/guides',
      icon: '👨‍🏫',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Guías Destacados', href: '/guides/featured', icon: '⭐', description: 'Los mejores expertos' },
        { label: 'Por Especialidad', href: '/guides/specialty', icon: '🎓', description: 'Encuentra tu experto' },
        { label: 'Verificados', href: '/guides/verified', icon: '✅', description: 'Guías certificados' },
      ]
    },
    {
      id: 'experiences',
      label: 'Experiencias',
      href: '/experiences',
      icon: '✨',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Aventuras', href: '/experiences/adventure', icon: '🏃‍♂️', description: 'Adrenalina pura' },
        { label: 'Culturales', href: '/experiences/cultural', icon: '🏛️', description: 'Inmersión cultural' },
        { label: 'Gastronómicas', href: '/experiences/food', icon: '🍽️', description: 'Sabores auténticos' },
      ]
    },
    { id: 'reviews', label: 'Reseñas', href: '/reviews', icon: '💬' },
    { id: 'about', label: 'Nosotros', href: '/about', icon: '🤝' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <>
      {/* Navbar Principal */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-2xl border-b border-white/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Premium */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-2xl font-bold text-white">🌍</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RoadEnder
                </h1>
                <p className="text-xs text-gray-500 font-medium">Explora con Expertos</p>
              </div>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => item.hasDropdown ? handleDropdownToggle(item.id) : undefined}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeDropdown === item.id || isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                        : 'text-white hover:text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <motion.span
                        animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm"
                      >
                        ▼
                      </motion.span>
                    )}
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.dropdownItems?.map((dropItem, index) => (
                            <Link
                              key={dropItem.href}
                              href={dropItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                            >
                              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                {dropItem.icon}
                              </span>
                              <div>
                                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">
                                  {dropItem.label}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                  {dropItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white hover:text-blue-200 hover:bg-white/10'
                }`}
              >
                Iniciar Sesión
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ser Guía
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <span className="text-2xl">✕</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 w-80 h-[calc(100vh-5rem)] bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/20 z-40 lg:hidden"
          >
            <div className="p-6">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="font-medium text-gray-700 group-hover:text-blue-600">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <button className="w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                    Iniciar Sesión
                  </button>
                  <button className="w-full p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Ser Guía
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para cerrar mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavbar;
