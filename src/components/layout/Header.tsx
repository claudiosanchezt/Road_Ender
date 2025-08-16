'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Bell, Globe, User, Heart, Calendar, Settings, LogOut } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">RG</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Road Guides
              </span>
              <div className="text-xs text-gray-500 font-medium">Colombia Auténtica</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { href: '/tours', label: 'Experiencias', icon: '🗺️' },
              { href: '/guides', label: 'Guías', icon: '👥' },
              { href: '/zones', label: 'Destinos', icon: '📍' },
              { href: '/about', label: 'Nosotros', icon: '💫' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden md:flex p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>

            {/* Language */}
            <button className="hidden md:flex items-center space-x-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">ES</span>
            </button>

            {/* Notifications */}
            <button className="hidden md:flex p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">Mi Cuenta</div>
                  <div className="text-xs text-gray-500">Perfil & Configuración</div>
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">Cuenta de Invitado</div>
                    <div className="text-xs text-gray-500">Inicia sesión para más funciones</div>
                  </div>
                  
                  {[
                    { icon: User, label: 'Mi Perfil', href: '/profile' },
                    { icon: Calendar, label: 'Mis Reservas', href: '/bookings' },
                    { icon: Heart, label: 'Favoritos', href: '/favorites' },
                    { icon: Settings, label: 'Configuración', href: '/settings' }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 font-medium transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Registrarse Gratis
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <nav className="space-y-4">
              {[
                { href: '/tours', label: 'Experiencias', icon: '🗺️', desc: 'Tours únicos' },
                { href: '/guides', label: 'Guías', icon: '👥', desc: 'Expertos locales' },
                { href: '/zones', label: 'Destinos', icon: '📍', desc: 'Lugares increíbles' },
                { href: '/about', label: 'Nosotros', icon: '💫', desc: 'Nuestra historia' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </nav>
            
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="block w-full text-center bg-purple-50 text-purple-600 py-3 rounded-lg font-medium hover:bg-purple-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrarse Gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
