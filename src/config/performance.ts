// Configuración de optimización de rendimiento para RoadEnder
// Configuraciones para lazy loading, preload, y optimizaciones de red

export const performanceConfig = {
  // Configuración de lazy loading
  lazyLoading: {
    // Intersection Observer options
    rootMargin: '50px',
    threshold: 0.1,
    
    // Elementos a precargar críticos
    criticalImages: [
      '/images/hero/hero-1.jpg',
      '/images/hero/hero-2.jpg',
      '/images/hero/hero-3.jpg'
    ],
    
    // Elementos a lazy load
    lazyElements: [
      'img[data-lazy]',
      '.lazy-section',
      '.lazy-component'
    ]
  },

  // Configuración de preload
  preload: {
    // Recursos críticos para precargar
    critical: [
      '/fonts/inter-var.woff2',
      '/images/defaults/guide-default.svg',
      '/images/defaults/zone-default.svg',
      '/images/defaults/place-default.svg'
    ],
    
    // Recursos para prefetch (próximas páginas)
    prefetch: [
      '/api/zones',
      '/api/guides',
      '/api/places',
      '/images/zones/',
      '/images/guides/'
    ]
  },

  // Configuración de animaciones
  animations: {
    // Reducir animaciones para usuarios con preferencia
    respectReducedMotion: true,
    
    // Duración base de animaciones
    baseDuration: 0.3,
    
    // Configuración de Framer Motion
    spring: {
      type: "spring",
      stiffness: 100,
      damping: 15
    },
    
    // Configuración de scroll suave
    smoothScroll: {
      duration: 800,
      easing: 'ease-out'
    }
  },

  // Configuración de imágenes
  images: {
    // Formatos soportados en orden de preferencia
    formats: ['webp', 'avif', 'jpg'],
    
    // Calidades para diferentes tamaños
    qualities: {
      thumb: 70,
      medium: 80,
      full: 90
    },
    
    // Tamaños breakpoints
    breakpoints: {
      mobile: 320,
      tablet: 768,
      desktop: 1024,
      large: 1440
    },
    
    // Placeholder para lazy loading
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
  },

  // Configuración de caché
  cache: {
    // Service Worker configuration
    sw: {
      enabled: true,
      cacheName: 'roadender-v1',
      strategies: {
        images: 'cache-first',
        api: 'network-first',
        static: 'cache-first'
      }
    },
    
    // Browser cache headers
    headers: {
      images: 'public, max-age=31536000, immutable',
      api: 'public, max-age=300, s-maxage=600',
      static: 'public, max-age=31536000, immutable'
    }
  },

  // Configuración de red
  network: {
    // Timeout para requests
    timeout: 5000,
    
    // Retry configuration
    retry: {
      attempts: 3,
      delay: 1000
    },
    
    // Configuración de CDN
    cdn: {
      enabled: false, // Para desarrollo
      baseUrl: 'https://cdn.roadender.com',
      regions: ['us-east-1', 'sa-east-1']
    }
  },

  // Métricas de rendimiento
  metrics: {
    // Web Vitals targets
    lcp: 2500,    // Largest Contentful Paint
    fid: 100,     // First Input Delay
    cls: 0.1,     // Cumulative Layout Shift
    
    // Custom metrics
    ttfb: 800,    // Time to First Byte
    fcp: 1800,    // First Contentful Paint
    
    // Tracking
    enabled: true,
    endpoint: '/api/metrics'
  }
};

// Utilidades de optimización
export const optimizationUtils = {
  // Detectar capacidades del navegador
  detectCapabilities: () => {
    if (typeof window === 'undefined') return {};
    
    return {
      webp: window.document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1,
      avif: window.document.createElement('canvas').toDataURL('image/avif').indexOf('avif') > -1,
      lazy: 'IntersectionObserver' in window,
      serviceWorker: 'serviceWorker' in navigator,
      connection: (navigator as any).connection || {},
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  },

  // Generar srcset para imágenes responsive
  generateSrcSet: (baseUrl: string, sizes: number[]) => {
    return sizes
      .map(size => `${baseUrl}?w=${size} ${size}w`)
      .join(', ');
  },

  // Preload crítico de recursos
  preloadCritical: () => {
    if (typeof window === 'undefined') return;
    
    performanceConfig.preload.critical.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      
      // Determinar el tipo de recurso
      if (href.endsWith('.woff2')) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      } else if (href.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  },

  // Prefetch para próximas páginas
  prefetchNext: () => {
    if (typeof window === 'undefined') return;
    
    performanceConfig.preload.prefetch.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  },

  // Optimizar animaciones basado en preferencias
  getAnimationConfig: () => {
    const capabilities = optimizationUtils.detectCapabilities();
    
    if (capabilities.reducedMotion) {
      return {
        ...performanceConfig.animations,
        baseDuration: 0.1,
        spring: { type: "tween", duration: 0.1 }
      };
    }
    
    return performanceConfig.animations;
  },

  // Reportar métricas de rendimiento
  reportMetrics: (metrics: Record<string, number>) => {
    if (!performanceConfig.metrics.enabled) return;
    
    // Enviar métricas al endpoint
    fetch(performanceConfig.metrics.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metrics,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection
      })
    }).catch(() => {
      // Silently fail metrics reporting
    });
  }
};

export default performanceConfig;
