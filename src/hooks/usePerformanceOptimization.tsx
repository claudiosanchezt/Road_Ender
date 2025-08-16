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
export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: T) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );
};

// Hook para debouncing
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para scroll suave optimizado
export const useSmoothScroll = () => {
  const scrollTo = useCallback((elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      
      // Usar requestAnimationFrame para una animación más suave
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - percentage, 3);
        
        window.scrollTo(0, startPosition + distance * easeOut);
        
        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    }
  }, []);

  return { scrollTo };
};

// Hook para preload de recursos críticos
export const usePreloadResources = (resources: string[]) => {
  useEffect(() => {
    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup prefetch links
      resources.forEach((resource) => {
        const existingLink = document.querySelector(`link[href="${resource}"]`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [resources]);
};

// Hook para gestión de memoria y cleanup
export const useMemoryOptimization = () => {
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const observersRef = useRef<Set<IntersectionObserver>>(new Set());

  const addTimeout = useCallback((timeout: NodeJS.Timeout) => {
    timeoutsRef.current.add(timeout);
  }, []);

  const addInterval = useCallback((interval: NodeJS.Timeout) => {
    intervalsRef.current.add(interval);
  }, []);

  const addObserver = useCallback((observer: IntersectionObserver) => {
    observersRef.current.add(observer);
  }, []);

  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutsRef.current.forEach((timeout) => {
        clearTimeout(timeout);
      });

      // Clear all intervals
      intervalsRef.current.forEach((interval) => {
        clearInterval(interval);
      });

      // Disconnect all observers
      observersRef.current.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  return { addTimeout, addInterval, addObserver };
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

// Componente de imagen optimizada
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  priority?: boolean;
}> = ({ 
  src, 
  alt, 
  width = 800, 
  height, 
  quality = 85, 
  className = '',
  priority = false 
}) => {
  const { ref, imageSrc, isLoaded, isError } = useLazyImage(
    priority ? src : getOptimizedImageUrl(src, width, quality)
  );

  // Si es priority, cargar inmediatamente
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [priority, src]);

  return (
    <div 
      ref={ref as any}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
      
      {/* Imagen principal */}
      {imageSrc && !isError && (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      
      {/* Fallback en caso de error */}
      {isError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">📷</span>
        </div>
      )}
    </div>
  );
};

export default {
  useInView,
  useLazyImage,
  useThrottle,
  useDebounce,
  useSmoothScroll,
  usePreloadResources,
  useMemoryOptimization,
  getOptimizedImageUrl,
  OptimizedImage,
};
