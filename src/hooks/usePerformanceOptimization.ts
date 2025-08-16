// Hook personalizado para optimización de rendimiento
// Lazy loading, intersection observer, y optimizaciones de memoria

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Hook para Intersection Observer optimizado
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasBeenInView, options]);

  return { ref, isInView, hasBeenInView };
};

// Hook para lazy loading de imágenes
export const useLazyImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (isInView && !imageSrc && src) {
      setImageSrc(src);
    }
  }, [isInView, imageSrc, src]);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsError(true);
      img.src = imageSrc;
    }
  }, [imageSrc]);

  return { ref, imageSrc, isLoaded, isError };
};

// Hook para throttling de eventos
export const useThrottle = (callback: Function, delay: number) => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: any[]) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );
};

// Hook para scroll suave optimizado
export const useSmoothScroll = () => {
  const scrollTo = useCallback((elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollTo };
};

// Utils para optimización de imágenes
export const getOptimizedImageUrl = (
  originalUrl: string,
  width: number,
  quality = 85
): string => {
  // Si es una URL externa, devolver tal como está
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }

  // Para imágenes locales, construir URL optimizada
  const baseName = originalUrl.split('.')[0];
  const extension = originalUrl.split('.').pop();
  
  return `${baseName}_w${width}_q${quality}.${extension}`;
};
