"use client";
import React, { useState } from 'react';

export default function SearchBar() {
  const [q, setQ] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // simple client-side redirect to search page
    window.location.href = `/search?q=${encodeURIComponent(q)}`;
  }

  return (
    <form onSubmit={submit} className="flex items-center bg-gray-100 rounded overflow-hidden">
      <input
        className="flex-1 px-4 py-2 bg-transparent outline-none"
        placeholder="Buscar zonas, hospedajes o guías"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="px-4 py-2 bg-sky-600 text-white">Buscar</button>
    </form>
  );
}
