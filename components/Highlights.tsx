"use client";
import React, { useEffect, useRef, useCallback, useState } from 'react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: 'trimSnaps', align: 'start', loop: true, skipSnaps: false }, [Autoplay({ delay: 4500, stopOnInteraction: false })]);
  const [slides, setSlides] = useState<Highlight[]>(items);

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

  // Fetch featured places (tours) from the API and map to slides
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const apiPath = '/api/home/featured-places?limit=10';
        const isServer = typeof window === 'undefined';
        // Use INTERNAL_API_URL on the server (container) so SSR can reach the api service.
        // Use NEXT_PUBLIC_API_URL on the client if provided, otherwise fallback to host:4000.
        const apiBase = isServer
          ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || '')
          : ((process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== '')
              ? process.env.NEXT_PUBLIC_API_URL
              : `${window.location.protocol}//${window.location.hostname}:4000`);
        const res = await fetch((apiBase ? apiBase : '') + apiPath);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = await res.json();
        const places = json?.data?.places as any[] | undefined;
        if (!places || !Array.isArray(places) || places.length === 0) return;

        // Order by popularity: bookings desc, then visits
        places.sort((a: any, b: any) => {
          const ab = a?.analytics?.bookings ?? 0;
          const bb = b?.analytics?.bookings ?? 0;
          if (bb !== ab) return bb - ab;
          const av = a?.analytics?.visits ?? 0;
          const bv = b?.analytics?.visits ?? 0;
          return bv - av;
        });

        // Map to our Highlight type: use images.main when available
        const mapped: Highlight[] = places.map((p: any, i: number) => ({
          id: p.id ?? i,
          title: p.name,
          image: p.images?.main || p.images?.gallery?.[0] || '',
          subtitle: p.description || ''
        }));

        if (mounted && mapped.length) setSlides(mapped);
      } catch (err) {
        // keep fallback slides
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Tours más solicitados</h2>
          <a href="/tours" className="text-sm text-sky-600 hover:underline">Ver todos los tours</a>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4" role="list">
              {slides.map((it, idx) => (
                <article key={it.id} className="min-w-full flex-shrink-0 rounded-lg overflow-hidden relative">
                  <div className="relative h-72 sm:h-96 bg-gray-900 overflow-hidden">
                    {/* imagen principal */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt={it.title} className="w-full h-full object-cover" />

                    {/* overlay degradado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                    {/* título centrado abajo */}
                    <div className="absolute left-6 right-6 bottom-6 text-white">
                      <h3 className="text-xl sm:text-3xl font-semibold drop-shadow-md">{it.title}</h3>
                      {it.subtitle && <p className="text-sm sm:text-base text-gray-200 mt-1 max-w-2xl">{it.subtitle}</p>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button onClick={scrollPrev} aria-label="Anterior" className="bg-white rounded-full p-2 shadow">‹</button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button onClick={scrollNext} aria-label="Siguiente" className="bg-white rounded-full p-2 shadow">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
