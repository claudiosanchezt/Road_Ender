"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const slides = [
  { title: 'Explora Chile', subtitle: 'Paisajes, cultura y experiencias únicas', img: '/images/hero/hero-1.jpg' },
  { title: 'Aventuras al aire libre', subtitle: 'Rutas, trekking y actividades', img: '/images/hero/hero-2.jpg' },
  { title: 'Conoce guías locales', subtitle: 'Conecta con expertos de la zona', img: '/images/hero/hero-3.jpg' },
];

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4500 })]);

  return (
    <div className="hero-embla">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((s, i) => (
            <div key={i} className="embla__slide relative h-72 sm:h-96 md:h-[520px] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute left-6 bottom-8 text-white">
                <h2 className="text-2xl sm:text-4xl font-bold">{s.title}</h2>
                <p className="mt-2 text-sm sm:text-lg">{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .embla { overflow: hidden; }
        .embla__container { display: flex; gap: 0.5rem; }
        .embla__slide { min-width: 100%; }
      `}</style>
    </div>
  );
}
