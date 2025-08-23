"use client";
import React from 'react';
import type { Zone } from './types';

export default function FeaturedZoneCard({ zone }: { zone: Zone }) {
  return (
    <article className="featured-zone-card relative rounded-lg overflow-hidden shadow-lg">
      <div className="h-56 md:h-64 lg:h-72 bg-gray-200">
        { (zone as any).thumbnail || zone.hero_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={(zone as any).thumbnail || zone.hero_image} alt={zone.name} className="w-full h-full object-cover" />
        ) : (
          <div className="guide-image-placeholder h-full flex items-center justify-center text-4xl">{zone.name.charAt(0)}</div>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold">{zone.name}</h3>
        {zone.region && <p className="text-sm text-gray-600">{zone.region}</p>}
        {zone.description && <p className="mt-2 text-sm text-gray-500 line-clamp-3">{zone.description}</p>}
      </div>
    </article>
  );
}
