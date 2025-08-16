import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

interface GuideCardProps {
  guide: any;
  colorScheme: any;
  isTopGuide: boolean;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, colorScheme, isTopGuide }) => (
  <div className="group relative overflow-visible z-10 hover:z-50">
    {/* ...aquí puedes reutilizar el contenido de la card de guía del layout... */}
    <div className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl ${colorScheme.hover} transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden min-h-[400px] ${
      isTopGuide
        ? 'border-4 border-amber-400 ring-4 ring-amber-200/50 shadow-2xl shadow-amber-500/25 bg-gradient-to-br from-yellow-50 to-amber-50'
        : 'border border-stone-200/50 hover:border-emerald-300/80'
    }`}>
      {/* ...badge, imagen, info, etc... */}
      <div className="relative p-6 pt-2">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:scale-105 group-hover:text-slate-900 transition-all duration-300">
            {guide.name}
          </h3>
          <p className="text-emerald-600 font-medium text-sm mb-3 flex items-center justify-center gap-1">
            <span className="text-base">📍</span> {guide.location}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-sm text-slate-600 leading-relaxed text-center group-hover:text-slate-700 transition-colors duration-300">
            {guide.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

interface GuidesVerticalCarouselProps {
  guides: any[];
}

export const GuidesVerticalCarousel: React.FC<GuidesVerticalCarouselProps> = ({ guides }) => {
  // Paleta de colores épica
  const epicColorSchemes = [
    { primary: 'from-emerald-600 to-teal-700', secondary: 'from-emerald-500 to-teal-600', accent: 'emerald-500', hover: 'hover:shadow-emerald-500/25', badge: 'from-emerald-500 to-teal-600' },
    { primary: 'from-amber-600 to-orange-700', secondary: 'from-amber-500 to-orange-600', accent: 'amber-500', hover: 'hover:shadow-amber-500/25', badge: 'from-amber-500 to-orange-600' },
    { primary: 'from-sky-600 to-blue-700', secondary: 'from-sky-500 to-blue-600', accent: 'sky-500', hover: 'hover:shadow-sky-500/25', badge: 'from-sky-500 to-blue-600' },
    { primary: 'from-purple-600 to-indigo-700', secondary: 'from-purple-500 to-indigo-600', accent: 'purple-500', hover: 'hover:shadow-purple-500/25', badge: 'from-purple-500 to-indigo-600' }
  ];
  return (
    <Swiper
      direction="vertical"
      slidesPerView={4}
      spaceBetween={32}
      mousewheel
      pagination={{ clickable: true }}
      navigation
      modules={[Navigation, Pagination, Mousewheel]}
      className="h-[900px] w-full"
      style={{ paddingBottom: 40 }}
    >
  {guides.map((guide: any, idx: number) => (
        <SwiperSlide key={guide.id || guide.guideId}>
          <GuideCard guide={guide} colorScheme={epicColorSchemes[idx % epicColorSchemes.length]} isTopGuide={idx < 4} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
