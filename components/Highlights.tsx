"use client";
import React, { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SAMPLE_ZONES } from '../src/lib/fake-data';
import guidesData from '../data/chile-guides-data.json';

type Highlight = {
  id: number;
  title: string;
  image: string;
  subtitle?: string;
};

const SAMPLE_HIGHLIGHTS: Highlight[] = SAMPLE_ZONES.map((z) => ({
  id: z.id,
  title: z.name,
  image: z.hero_image || '',
  subtitle: z.description,
}));

export default function Highlights({ items = SAMPLE_HIGHLIGHTS }: { items?: Highlight[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: 'trimSnaps', align: 'start', loop: true }, [Autoplay({ delay: 4000 })]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Build a quick map: zone name -> guides[] from the JSON data
  const zoneGuidesMap: Record<string, any[]> = {};
  try {
    if (guidesData && Array.isArray(guidesData.chilean_destinations)) {
      guidesData.chilean_destinations.forEach((dest: any) => {
        zoneGuidesMap[dest.name] = dest.guides || [];
      });
    }
  } catch (err) {
    // ignore if JSON shape unexpected
  }

  // Parallax per slide: use embla snaps to compute per-slide offset
  useEffect(() => {
    if (!emblaApi) return;
    const snaps = emblaApi.scrollSnapList();
    const onScroll = () => {
      const progress = emblaApi.scrollProgress();
      const slideNodes = emblaApi.slideNodes();
      slideNodes.forEach((node: HTMLElement, i: number) => {
        const par = node.querySelector('.parallax') as HTMLElement | null;
        if (!par) return;
        // less pronounced parallax: smaller multiplier
        const offset = (progress - (snaps[i] ?? 0)) * 48; // pixels
        const clamped = Math.max(-24, Math.min(24, offset));
        par.style.transform = `translateX(${clamped}px)`;
      });
    };
    emblaApi.on('scroll', onScroll);
    // also run once to position
    onScroll();
    return () => emblaApi.off('scroll', onScroll);
  }, [emblaApi]);

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Lo más solicitado por zona</h2>
          <a href="/zones" className="text-sm text-sky-600 hover:underline">Ver todas las zonas</a>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4" role="list">
              {items.map((it, idx) => (
                <article key={it.id} className="min-w-[320px] flex-shrink-0 bg-white rounded-xl overflow-hidden shadow card-hover group transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="parallax absolute inset-0 transition-transform will-change-transform">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.image} alt={it.title} className="w-full h-48 object-cover" />
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/40 text-white px-3 py-1 rounded-md text-sm">{it.title}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{it.title}</h3>
                    {it.subtitle && <p className="text-sm text-gray-600 mt-2">{it.subtitle}</p>}

                    {/* Mini-perfiles de guías (tomas las primeras 3 si existen) */}
                    <div className="mt-4 flex items-center gap-3">
                      {(zoneGuidesMap[it.title] || []).slice(0, 3).map((g: any) => (
                        <div key={g.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                          {g.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={g.avatar} alt={g.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center text-sm font-semibold text-sky-800">
                              {g.name.split(' ').map((n: string) => n[0]).slice(0,2).join('')}
                            </div>
                          )}
                          <div className="text-xs">
                            <div className="font-medium">{g.name}</div>
                            <div className="text-gray-500">{g.rating} ★ · {g.reviews}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button className="text-sm px-3 py-2 bg-sky-600 text-white rounded-md">Ver tours</button>
                      <button className="text-sm px-3 py-2 border rounded-md">Ver guías</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button onClick={scrollPrev} aria-label="Anterior" className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">‹</button>
          <button onClick={scrollNext} aria-label="Siguiente" className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">›</button>
        </div>
      </div>
    </section>
  );
}
