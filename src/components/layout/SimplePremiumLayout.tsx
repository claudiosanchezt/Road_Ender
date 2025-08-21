// Layout principal simplificado - Paleta suave para resaltar imágenes turísticas
// Colores neutros y elegantes que no compiten con las fotografías

'use client';

import React, { useState, useEffect, useRef } from 'react';
// import { GuidesVerticalCarousel } from './GuidesVerticalCarousel';
import useGuides from '@/hooks/useGuides';
import { useSimpleDestinations } from '@/hooks/useSimpleDestinations';
import { useHeroImages } from '@/hooks/useHeroImages';
import { setAuthToken, api } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
// ...existing code...

const SimplePremiumLayout: React.FC = () => {
  // Hooks para obtener datos desde el backend
  const {
    guides: featuredGuides,
    loading: guidesLoading,
    error: guidesError,
    page: guidesPage,
    totalPages: guidesTotalPages,
    nextPage: nextGuidesPage,
    prevPage: prevGuidesPage
  } = useGuides({ country: 'Chile', limit: 50 });
  const { destinations, loading: destinationsLoading, error: destinationsError } = useSimpleDestinations({ country: 'Chile', limit: 10 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [isDestinationsPaused, setIsDestinationsPaused] = useState(false);
  const [isGuidesPaused, setIsGuidesPaused] = useState(false);
  const { images: heroImages, loading: heroLoading, error: heroError } = useHeroImages('Chile');
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);
  useEffect(() => {
    if (isDestinationsPaused) return;
    const interval = setInterval(() => {
      setCurrentDestinationIndex((prevIndex) => prevIndex >= destinations.length - 3 ? 0 : prevIndex + 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [destinations.length, isDestinationsPaused]);
  useEffect(() => {
    if (isGuidesPaused) return;
    if (guidesTotalPages <= 1) return;
    const interval = setInterval(() => {
      nextGuidesPage();
    }, 5000);
    return () => clearInterval(interval);
  }, [isGuidesPaused, guidesTotalPages, nextGuidesPage]);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const [zonesCount, setZonesCount] = useState<number | null>(null);
  const [guidesCount, setGuidesCount] = useState<number | null>(null);

  // Fetch simple counts for hero (best-effort)
  useEffect(() => {
    let mounted = true;
    async function fetchCounts() {
      try {
        const [zonesRes, guidesRes] = await Promise.all([
          api.get('/zones?limit=100'),
          api.get('/guides?limit=100')
        ]);
        if (!mounted) return;
        setZonesCount(Array.isArray(zonesRes.data) ? zonesRes.data.length : null);
        setGuidesCount(Array.isArray(guidesRes.data) ? guidesRes.data.length : null);
      } catch (e) {
        // ignore - counts are decorative
        if (mounted) {
          setZonesCount(null);
          setGuidesCount(null);
        }
      }
    }
    fetchCounts();
    return () => { mounted = false; };
  }, []);

  // Debounced typeahead using existing datamart search API
  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const q = encodeURIComponent(searchTerm.trim());
        const res = await fetch(`/api/home/search?q=${q}&limit=6`);
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data.results)) {
          setSuggestions(json.data.results.slice(0,6));
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (e) {
        setSuggestions([]);
      }
    }, 300);
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* HERO PRINCIPAL - Top */}
      <header className="relative bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                Explora Sudamérica con guías locales expertos
              </h1>
              <p className="text-lg text-slate-600 mb-6 max-w-xl">
                Reserva experiencias auténticas, descubre zonas destacadas y conecta con guías apasionados.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => router.push('/zones')} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:scale-105 transition">Ver Zonas {zonesCount ? `(${zonesCount})` : ''}</button>
                <button onClick={() => router.push('/guides')} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:scale-105 transition">Ver Guías {guidesCount ? `(${guidesCount})` : ''}</button>
                <a href="#destinos" className="px-6 py-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition">Explorar Destinos</a>
              </div>
              <div className="relative w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <input id="site-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} placeholder="Buscar zona, lugar o guía..." className="w-full md:w-80 px-4 py-3 rounded-lg border border-stone-200" />
                  <button onClick={() => router.push(`/zones?q=${encodeURIComponent(searchTerm)}`)} className="px-4 py-3 bg-emerald-600 text-white rounded-lg">Buscar</button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-50 mt-2 w-full md:w-80 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden">
                    {suggestions.map((sug, idx) => (
                      <li key={sug.id || idx} className="px-4 py-3 hover:bg-slate-50 cursor-pointer" onMouseDown={() => { router.push(`/zones?q=${encodeURIComponent(sug.name || sug.placeName || sug.location?.zone?.name || '')}`); }}>
                        <div className="text-sm font-semibold text-slate-800">{sug.name || sug.placeName}</div>
                        <div className="text-xs text-slate-500">{sug.location?.country?.name || sug.location?.zone || ''}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Dev token quick input */}
              <div className="mt-6 flex items-center gap-3">
                <input id="dev-token" placeholder="JWT dev token (opcional)" className="w-full md:w-96 px-3 py-2 rounded-md border border-stone-200" />
                <button
                  onClick={() => {
                    const el = document.getElementById('dev-token') as HTMLInputElement | null;
                    const token = el?.value?.trim();
                    setAuthToken(token || undefined);
                    if (token) localStorage.setItem('dev_token', token);
                    else localStorage.removeItem('dev_token');
                    // small feedback
                    el && (el.placeholder = token ? 'Token aplicado' : 'Token eliminado');
                  }}
                  className="px-4 py-2 bg-sky-600 text-white rounded-md"
                >
                  Aplicar token
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Placeholder hero image */}
              <div className="w-full h-80 rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/hero/road-ender-hero.svg" alt="Hero" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>
  {/* Sección de Destinos */}
      <section className="py-20 bg-gradient-to-b from-white via-stone-25 to-stone-50 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="text-center mb-16 relative">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide bg-gradient-to-r from-slate-900 via-amber-800 to-slate-700 bg-clip-text text-transparent mb-6">
              Destinos Épicos
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Descubre los paisajes más espectaculares de Sudamérica donde cada rincón
              <span className="text-amber-700 font-medium"> cuenta una historia única</span> y
              <span className="text-slate-700 font-medium"> cada fotografía se convierte en un recuerdo eterno</span>
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 overflow-visible"
            onMouseEnter={() => setIsDestinationsPaused(true)}
            onMouseLeave={() => setIsDestinationsPaused(false)}
          >
            {destinations.slice(currentDestinationIndex, currentDestinationIndex + 3).map((destination: any, index: number) => {
              // Paleta de colores premium para cada destino
              const colorSchemes = [
                { 
                  primary: 'from-emerald-600 to-teal-700', 
                  secondary: 'from-emerald-500 to-teal-600',
                  accent: 'emerald-500',
                  hover: 'hover:shadow-emerald-500/25'
                },
                { 
                  primary: 'from-amber-600 to-orange-700', 
                  secondary: 'from-amber-500 to-orange-600',
                  accent: 'amber-500',
                  hover: 'hover:shadow-amber-500/25'
                },
                { 
                  primary: 'from-sky-600 to-blue-700', 
                  secondary: 'from-sky-500 to-blue-600',
                  accent: 'sky-500',
                  hover: 'hover:shadow-sky-500/25'
                }
              ];
              const scheme = colorSchemes[index % colorSchemes.length];
              return (
                <div key={`${destination.name}-${currentDestinationIndex}`} className="group relative overflow-visible z-10 hover:z-50">
                  <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-stone-200/50 hover:border-amber-300/80 cursor-pointer overflow-hidden">
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      <img 
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110 group-hover:contrast-110"
                        onError={(e) => {
                          // Fallback a gradiente si falla la imagen
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'block';
                          }
                        }}
                      />
                      {/* Fallback Gradiente Elegante */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.primary} hidden group-hover:opacity-90 transition-opacity duration-500`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl opacity-80 filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            {destination.emoji || '🌄'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative p-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:scale-102 group-hover:text-slate-900 transition-all duration-300">{destination.name}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{destination.description || `Explora la majestuosa belleza de ${destination.name}, donde la naturaleza se encuentra con la aventura en una experiencia única e inolvidable.`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-6 mb-12">
            <button
              onClick={() => setCurrentDestinationIndex(currentDestinationIndex === 0 ? destinations.length - 3 : Math.max(0, currentDestinationIndex - 3))}
              className="group w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-slate-600 hover:text-amber-600 hover:scale-125 hover:rotate-[-10deg] transition-all duration-500 border border-stone-200 hover:border-amber-300"
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-300">←</span>
            </button>
            <div className="flex gap-3">
              {Array.from({ length: Math.ceil(destinations.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDestinationIndex(index * 3)}
                  className={`transition-all duration-500 hover:scale-125 ${Math.floor(currentDestinationIndex / 3) === index ? 'w-12 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg' : 'w-3 h-3 bg-stone-300 hover:bg-amber-400 rounded-full hover:shadow-md'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentDestinationIndex(currentDestinationIndex >= destinations.length - 3 ? 0 : currentDestinationIndex + 3)}
              className="group w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-slate-600 hover:text-amber-600 hover:scale-125 hover:rotate-[10deg] transition-all duration-500 border border-stone-200 hover:border-amber-300"
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </section>
      {/* Grid épico de guías profesionales */}
      <section className="py-16 bg-gradient-to-b from-stone-50 to-white overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-visible">
          <div className="mb-12 overflow-visible">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-700 bg-clip-text text-transparent mb-6">
              Guías Profesionales
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-4">
              Conecta con expertos locales de máxima calidad, cada uno con años de experiencia y pasión auténtica por mostrar lo mejor de Sudamérica
            </p>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 overflow-visible"
              onMouseEnter={() => setIsGuidesPaused(true)}
              onMouseLeave={() => setIsGuidesPaused(false)}
            >
              {featuredGuides.map((guide, index) => {
                // Paletas de colores épicas similares a destinos
                const epicColorSchemes = [
                  { 
                    primary: 'from-emerald-600 to-teal-700', 
                    secondary: 'from-emerald-500 to-teal-600',
                    accent: 'emerald-500',
                    hover: 'hover:shadow-emerald-500/25',
                    badge: 'from-emerald-500 to-teal-600'
                  },
                  { 
                    primary: 'from-amber-600 to-orange-700', 
                    secondary: 'from-amber-500 to-orange-600',
                    accent: 'amber-500',
                    hover: 'hover:shadow-amber-500/25',
                    badge: 'from-amber-500 to-orange-600'
                  },
                  { 
                    primary: 'from-sky-600 to-blue-700', 
                    secondary: 'from-sky-500 to-blue-600',
                    accent: 'sky-500',
                    hover: 'hover:shadow-sky-500/25',
                    badge: 'from-sky-500 to-blue-600'
                  },
                  { 
                    primary: 'from-purple-600 to-indigo-700', 
                    secondary: 'from-purple-500 to-indigo-600',
                    accent: 'purple-500',
                    hover: 'hover:shadow-purple-500/25',
                    badge: 'from-purple-500 to-indigo-600'
                  }
                ];
                const scheme = epicColorSchemes[index % epicColorSchemes.length];
                const isTopGuide = index < 4;
                return (
                  <div key={guide.id} className="group relative overflow-visible z-10 hover:z-50">
                    <div className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl ${scheme.hover} transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden min-h-[400px] ${
                      isTopGuide 
                        ? 'border-4 border-amber-400 ring-4 ring-amber-200/50 shadow-2xl shadow-amber-500/25 bg-gradient-to-br from-yellow-50 to-amber-50' 
                        : 'border border-stone-200/50 hover:border-emerald-300/80'
                    }`}>
                      {/* Badge Especial para Top 4 Guías */}
                      {isTopGuide && (
                        <div className="absolute -top-3 -right-3 z-20">
                          <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-white group-hover:scale-110 transition-all duration-300">
                            <div className="flex items-center gap-1">
                              <span className="text-lg">👑</span>
                              <span className="font-bold text-sm">TOP</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Background Header con Gradiente Épico */}
                      <div className="relative h-20 overflow-hidden rounded-t-3xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.secondary} opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${
                          isTopGuide ? 'from-amber-500 to-orange-600' : ''
                        }`}></div>
                        {/* Patrón Decorativo */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                          <div className="absolute top-2 right-4 w-6 h-6 bg-white/30 rounded-full"></div>
                          <div className="absolute top-6 right-12 w-4 h-4 bg-white/20 rounded-full"></div>
                          <div className="absolute top-4 right-20 w-3 h-3 bg-white/25 rounded-full"></div>
                        </div>
                        {/* Badge Premium Flotante */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`bg-gradient-to-r ${
                            isTopGuide ? 'from-amber-500 to-orange-600' : scheme.badge
                          } text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg group-hover:scale-105 transition-all duration-300`}>
                            {isTopGuide ? '⭐ DESTACADO' : guide.badge}
                          </span>
                        </div>
                        {/* Efecto de Brillo Superior */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      </div>
                      <div className="relative p-6 pt-2">
                        {/* Avatar Épico con Efectos Avanzados */}
                        <div className="relative mb-6 flex justify-center -mt-10">
                          <div className={`w-20 h-20 bg-gradient-to-br ${scheme.secondary} rounded-full p-1 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 relative z-10`}>
                            <img 
                              src={guide.image} 
                              alt={guide.name}
                              className="w-full h-full rounded-full object-cover group-hover:brightness-110 transition-all duration-500"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.src = `data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\"><rect width=\"80\" height=\"80\" fill=\"%23${scheme.accent.split('-')[0] === 'emerald' ? '10b981' : scheme.accent.split('-')[0] === 'amber' ? 'f59e0b' : scheme.accent.split('-')[0] === 'sky' ? '0ea5e9' : '8b5cf6'}\" rx=\"40\"/><text x=\"40\" y=\"45\" text-anchor=\"middle\" fill=\"white\" font-size=\"25\">👨‍🏫</text></svg>`;
                              }}
                            />
                          </div>
                          {/* Indicador de Estado Online */}
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-3 border-white shadow-lg group-hover:scale-125 group-hover:bg-green-400 transition-all duration-300 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        {/* Información Principal */}
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:scale-105 group-hover:text-slate-900 transition-all duration-300">
                            {guide.name}
                          </h3>
                          <p className="text-emerald-600 font-medium text-sm mb-3 flex items-center justify-center gap-1">
                            <span className="text-base">📍</span> {guide.location}
                          </p>
                          {/* Rating Épico */}
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                              <span className="text-amber-500">⭐</span>
                              <span className="font-bold text-slate-700 text-sm">{guide.rating}</span>
                            </div>
                            <span className="text-slate-500 text-xs">({Array.isArray(guide.reviews) ? guide.reviews.length : guide.reviews} reseñas)</span>
                          </div>
                          {/* Precio por Día */}
                          {guide.price && (
                            <div className="mb-4">
                              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                ${guide.price} USD/día
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Descripción Épica */}
                        <div className="mb-6">
                          <p className="text-sm text-slate-600 leading-relaxed text-center group-hover:text-slate-700 transition-colors duration-300">
                            {guide.description}
                          </p>
                        </div>
                        {/* Especialidades con Diseño Épico */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2 justify-center">
                            {guide.specialties.slice(0, 2).map((specialty: any, idx: number) => (
                              <span key={idx} 
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${scheme.secondary} text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                                {specialty.name}
                              </span>
                            ))}
                            {guide.specialties.length > 2 && (
                              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 group-hover:scale-110 transition-transform duration-300">
                                +{guide.specialties.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Botón de Acción Épico */}
                        <button className={`w-full bg-gradient-to-r ${scheme.primary} text-white py-3 rounded-2xl font-bold text-sm hover:scale-110 hover:translate-y-[-4px] hover:rotate-1 transition-all duration-500 shadow-lg hover:shadow-2xl relative overflow-hidden`}>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Ver Perfil Completo
                            <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                          </span>
                          {/* Efecto de brillo en hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </button>
                      </div>
                      {/* Efecto de Marco Brillante Épico */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className={`absolute inset-0 rounded-3xl border-2 ${
                          isTopGuide 
                            ? 'border-amber-400/70' 
                            : 'border-emerald-400/50'
                        }`}></div>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                      {/* Efectos de Brillo Circular */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                        <div className={`absolute top-4 right-4 w-3 h-3 rounded-full animate-ping ${
                          isTopGuide ? 'bg-amber-400/60' : 'bg-white/40'
                        }`}></div>
                        <div className={`absolute bottom-4 left-4 w-2 h-2 rounded-full animate-pulse ${
                          isTopGuide 
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
                            : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}
export default SimplePremiumLayout;
