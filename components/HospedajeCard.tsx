import React from 'react';
import type { Hospedaje } from '../src/lib/api';

export default function HospedajeCard({ item }: { item: Hospedaje }) {
  return (
    <article className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.address}</p>
      {item.price !== undefined && <p className="mt-2 font-medium">${item.price}</p>}
      <p className="mt-2 text-gray-700 text-sm">{item.description}</p>
    </article>
  );
}
