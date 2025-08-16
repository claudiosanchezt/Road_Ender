// Hook para consumir imágenes del carrusel principal desde el backend
// Clean Architecture, TypeScript
import { useEffect, useState } from 'react';

export interface HeroImage {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  fallback: string;
  country: string;
}

export function useHeroImages(country: string = 'Chile') {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Detectar si estamos en desarrollo y el frontend corre en 3001
    let apiUrl = `/api/hero-images?country=${country}`;
    if (typeof window !== 'undefined') {
      // Si el frontend corre en 3001, consumir backend en 3000
      if (window.location.port === '3001') {
        apiUrl = `http://localhost:3000/api/hero-images?country=${country}`;
      }
    }
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo obtener las imágenes');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
        } else if (data && Array.isArray(data.images)) {
          setImages(data.images);
        } else {
          setImages([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudieron cargar las imágenes destacadas');
        setLoading(false);
      });
  }, [country]);

  return { images, loading, error };
}
