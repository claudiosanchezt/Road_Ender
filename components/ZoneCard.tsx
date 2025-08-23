"use client";
import React from 'react';
import type { Zone } from './types';

export default function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <article className="zone-card card p-4 rounded-lg shadow-sm bg-white glass-effect">
      <div className="h-40 bg-gray-100 rounded-md mb-3 overflow-hidden">
        { (zone as any).thumbnail || zone.hero_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={(zone as any).thumbnail || zone.hero_image} alt={zone.name} className="w-full h-full object-cover" />
        ) : (
          <div className="guide-image-placeholder h-full">{zone.name.charAt(0)}</div>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-1">{zone.name}</h3>
      {zone.region && <p className="text-sm text-gray-600 mb-2">{zone.region}</p>}
      {zone.description && <p className="text-sm text-gray-500 line-clamp-3">{zone.description}</p>}
      <div className="mt-3 flex items-center justify-between">
        <button className="btn btn-custom-primary px-3 py-1 rounded">Ver</button>
        <button className="btn btn-outline-secondary px-3 py-1 rounded">❤</button>
      </div>
    </article>
  );
}

