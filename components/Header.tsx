"use client";
import React, { useState } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3">
            {/* Simple inline SVG logo */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="6" fill="#0ea5e9" />
              <path d="M7 13c1.5-2 4-5 6-5 2 0 3.5 3 5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">RoadEnder</span>
          </a>
        </div>

        <div className="flex-1 mx-6 hidden sm:block">
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a className="text-sm font-medium text-gray-700 hover:text-sky-600 transition" href="/zones">Zonas</a>
          <a className="text-sm font-medium text-gray-700 hover:text-sky-600 transition" href="/hospedajes">Hospedajes</a>
          <a className="text-sm font-medium text-gray-700 hover:text-sky-600 transition" href="/guides">Guías</a>
          <a className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow" href="/login">Entrar</a>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span className="text-xl">{open ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div className="absolute top-16 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="mb-3">
                <SearchBar />
              </div>
              <div className="flex flex-col gap-3">
                <a href="/zones" className="py-3 text-gray-800 font-medium border-b">Zonas</a>
                <a href="/hospedajes" className="py-3 text-gray-800 font-medium border-b">Hospedajes</a>
                <a href="/guides" className="py-3 text-gray-800 font-medium border-b">Guías</a>
                <a href="/login" className="py-3 text-sky-600 font-semibold">Entrar</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
