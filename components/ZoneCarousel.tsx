"use client";
import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Zone = { id: number; name: string; hero_image?: string; description?: string };

export default function ZoneCarousel({ items }: { items: Zone[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const autoplayRef = useRef<any>(null);

  useEffect(() => {
    if (!emblaApi) return;
    // Restart autoplay when items change
    emblaApi.reInit();
  }, [emblaApi, items]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!items || items.length === 0) {
    return (
      <div className="py-8">
        <p className="text-center text-gray-600">No hay zonas destacadas.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {items.slice(0, 12).map((z) => (
            <div key={z.id} className="embla__slide min-w-[280px] flex-shrink-0">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="h-48 bg-gray-100 rounded-md mb-3 overflow-hidden">
                  {z.hero_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={z.hero_image} alt={z.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg text-gray-700">{z.name}</div>
                  )}
                </div>
                <h3 className="font-semibold text-lg">{z.name}</h3>
                {z.description && <p className="text-sm text-gray-600 mt-1">{z.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button aria-label="Anterior" onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
        ‹
      </button>
      <button aria-label="Siguiente" onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
        ›
      </button>
    </div>
  );
}
