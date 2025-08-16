'use client'

import { Carousel } from 'react-bootstrap'
import { useState, useEffect } from 'react'

interface BackgroundCarouselProps {
  selectedZone?: string
  height?: string
}

interface ZoneImage {
  url: string
  alt: string
  description: string
  location: string
}

export default function BackgroundCarousel({ selectedZone = '', height = '400px' }: BackgroundCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Imágenes según la zona seleccionada (ahora más específicas)
  const getZoneImages = (zoneName: string): ZoneImage[] => {
    const zoneKey = zoneName.toLowerCase()
    
    // Centro Histórico y lugares específicos
    if (zoneKey.includes('centro') || zoneKey.includes('histórico') || 
        zoneKey.includes('plaza de armas') || zoneKey.includes('catedral') || 
        zoneKey.includes('mercado central') || zoneKey.includes('la moneda')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=101',
          alt: 'Plaza de Armas del centro histórico',
          description: 'El corazón histórico de Santiago con su arquitectura colonial preservada',
          location: 'Plaza de Armas'
        },
        {
          url: 'https://picsum.photos/1600/900?random=102',
          alt: 'Catedral Metropolitana',
          description: 'Majestuosa arquitectura religiosa y patrimonio cultural',
          location: 'Catedral Metropolitana'
        },
        {
          url: 'https://picsum.photos/1600/900?random=103',
          alt: 'Mercado Central',
          description: 'Gastronomía tradicional y cultura local auténtica',
          location: 'Mercado Central'
        },
        {
          url: 'https://picsum.photos/1600/900?random=104',
          alt: 'Palacio de La Moneda',
          description: 'Sede del gobierno y símbolo de la historia política',
          location: 'Palacio de La Moneda'
        }
      ]
    }

    // Cordillera y lugares específicos de montaña
    if (zoneKey.includes('cordillera') || zoneKey.includes('andes') || 
        zoneKey.includes('valle del maipo') || zoneKey.includes('glaciar') || 
        zoneKey.includes('refugio') || zoneKey.includes('cajón')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=201',
          alt: 'Valle del Maipo en la cordillera',
          description: 'Espectacular valle andino con vistas panorámicas únicas',
          location: 'Valle del Maipo'
        },
        {
          url: 'https://picsum.photos/1600/900?random=202',
          alt: 'Glaciar El Morado',
          description: 'Glaciar milenario accesible para expediciones de día',
          location: 'Glaciar El Morado'
        },
        {
          url: 'https://picsum.photos/1600/900?random=203',
          alt: 'Refugio Alemán',
          description: 'Base para trekking de alta montaña y aclimatación',
          location: 'Refugio Alemán'
        },
        {
          url: 'https://picsum.photos/1600/900?random=204',
          alt: 'Parque Nacional Cajón del Maipo',
          description: 'Naturaleza virgen y senderos de montaña espectaculares',
          location: 'Cajón del Maipo'
        },
        {
          url: 'https://picsum.photos/1600/900?random=205',
          alt: 'Cumbres nevadas de los Andes',
          description: 'Picos eternamente nevados de la cordillera principal',
          location: 'Cordillera de los Andes'
        }
      ]
    }

    // Desierto de Atacama y lugares específicos
    if (zoneKey.includes('desierto') || zoneKey.includes('atacama') || 
        zoneKey.includes('valle de la luna') || zoneKey.includes('tatio') || 
        zoneKey.includes('salar') || zoneKey.includes('laguna chaxa') || 
        zoneKey.includes('valle de la muerte')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=301',
          alt: 'Valle de la Luna',
          description: 'Formaciones rocosas que parecen de otro planeta',
          location: 'Valle de la Luna'
        },
        {
          url: 'https://picsum.photos/1600/900?random=302',
          alt: 'Géyseres del Tatio al amanecer',
          description: 'Espectáculo geotérmico único en el mundo',
          location: 'Géyseres del Tatio'
        },
        {
          url: 'https://picsum.photos/1600/900?random=303',
          alt: 'Salar de Atacama',
          description: 'Extensiones salinas con flamencos rosados',
          location: 'Salar de Atacama'
        },
        {
          url: 'https://picsum.photos/1600/900?random=304',
          alt: 'Laguna Chaxa',
          description: 'Santuario de flamencos en el desierto más árido',
          location: 'Laguna Chaxa'
        },
        {
          url: 'https://picsum.photos/1600/900?random=305',
          alt: 'Valle de la Muerte',
          description: 'Paisajes lunares y formaciones rocosas únicas',
          location: 'Valle de la Muerte'
        }
      ]
    }

    // Costa Pacífica y lugares específicos
    if (zoneKey.includes('costa') || zoneKey.includes('pacífico') || 
        zoneKey.includes('valparaíso') || zoneKey.includes('viña del mar') || 
        zoneKey.includes('playa ancha') || zoneKey.includes('ritoque')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=401',
          alt: 'Puerto de Valparaíso',
          description: 'Patrimonio UNESCO con cultura marítima auténtica',
          location: 'Valparaíso'
        },
        {
          url: 'https://picsum.photos/1600/900?random=402',
          alt: 'Viña del Mar',
          description: 'Ciudad jardín con playas y arquitectura elegante',
          location: 'Viña del Mar'
        },
        {
          url: 'https://picsum.photos/1600/900?random=403',
          alt: 'Playa Ancha',
          description: 'Costa virgen con vistas panorámicas del Pacífico',
          location: 'Playa Ancha'
        },
        {
          url: 'https://picsum.photos/1600/900?random=404',
          alt: 'Acantilados de Ritoque',
          description: 'Formaciones rocosas dramáticas sobre el océano',
          location: 'Acantilados de Ritoque'
        },
        {
          url: 'https://picsum.photos/1600/900?random=405',
          alt: 'Costa del Pacífico',
          description: 'Extenso litoral con diversidad de paisajes costeros',
          location: 'Costa del Pacífico'
        }
      ]
    }

    // Región de los Lagos y lugares específicos
    if (zoneKey.includes('lagos') || zoneKey.includes('región de los lagos') || 
        zoneKey.includes('villarrica') || zoneKey.includes('llanquihue') || 
        zoneKey.includes('osorno') || zoneKey.includes('vicente pérez rosales')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=501',
          alt: 'Lago Villarrica',
          description: 'Lago cristalino dominado por el volcán activo',
          location: 'Lago Villarrica'
        },
        {
          url: 'https://picsum.photos/1600/900?random=502',
          alt: 'Lago Llanquihue con Volcán Osorno',
          description: 'Vista icónica del volcán perfecto reflejado en el lago',
          location: 'Lago Llanquihue'
        },
        {
          url: 'https://picsum.photos/1600/900?random=503',
          alt: 'Volcán Osorno',
          description: 'Cono volcánico perfecto, símbolo de la región',
          location: 'Volcán Osorno'
        },
        {
          url: 'https://picsum.photos/1600/900?random=504',
          alt: 'Parque Nacional Vicente Pérez Rosales',
          description: 'Bosques milenarios y biodiversidad única',
          location: 'Parque Nacional'
        }
      ]
    }

    // Patagonia y lugares específicos
    if (zoneKey.includes('patagonia') || zoneKey.includes('torres del paine') || 
        zoneKey.includes('perito moreno') || zoneKey.includes('campo de hielo') || 
        zoneKey.includes('fiordo')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=601',
          alt: 'Torres del Paine',
          description: 'Torres de granito, iconos de la Patagonia chilena',
          location: 'Torres del Paine'
        },
        {
          url: 'https://picsum.photos/1600/900?random=602',
          alt: 'Glaciar Perito Moreno',
          description: 'Glaciar en constante movimiento, espectáculo natural',
          location: 'Glaciar Perito Moreno'
        },
        {
          url: 'https://picsum.photos/1600/900?random=603',
          alt: 'Campo de Hielo Sur',
          description: 'Extensión de hielo continental en los Andes',
          location: 'Campo de Hielo Sur'
        },
        {
          url: 'https://picsum.photos/1600/900?random=604',
          alt: 'Fiordo Última Esperanza',
          description: 'Canales profundos entre montañas y glaciares',
          location: 'Fiordo Última Esperanza'
        }
      ]
    }

    // Valle Central y lugares específicos  
    if (zoneKey.includes('valle') || zoneKey.includes('central') || 
        zoneKey.includes('vino') || zoneKey.includes('casablanca') || 
        zoneKey.includes('santa rita') || zoneKey.includes('colchagua')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=701',
          alt: 'Ruta del Vino Valle del Maipo',
          description: 'Viñedos premium en el valle vitivinícola más famoso',
          location: 'Ruta del Vino Maipo'
        },
        {
          url: 'https://picsum.photos/1600/900?random=702',
          alt: 'Viñedos de Casablanca',
          description: 'Valle costero ideal para vinos blancos de calidad',
          location: 'Valle de Casablanca'
        },
        {
          url: 'https://picsum.photos/1600/900?random=703',
          alt: 'Hacienda Santa Rita',
          description: 'Bodega histórica con arquitectura colonial',
          location: 'Hacienda Santa Rita'
        },
        {
          url: 'https://picsum.photos/1600/900?random=704',
          alt: 'Valle de Colchagua',
          description: 'Paisajes agrícolas y tradiciones vitivinícolas',
          location: 'Valle de Colchagua'
        }
      ]
    }

    // Isla de Pascua y lugares específicos
    if (zoneKey.includes('isla') || zoneKey.includes('pascua') || 
        zoneKey.includes('rano raraku') || zoneKey.includes('tongariki') || 
        zoneKey.includes('anakena') || zoneKey.includes('rano kau')) {
      return [
        {
          url: 'https://picsum.photos/1600/900?random=801',
          alt: 'Rano Raraku - Cantera de Moais',
          description: 'Cientos de moais en su lugar de origen',
          location: 'Rano Raraku'
        },
        {
          url: 'https://picsum.photos/1600/900?random=802',
          alt: 'Ahu Tongariki al amanecer',
          description: '15 moais restaurados mirando hacia el interior',
          location: 'Ahu Tongariki'
        },
        {
          url: 'https://picsum.photos/1600/900?random=803',
          alt: 'Playa Anakena',
          description: 'Playa paradisíaca con moais y palmeras',
          location: 'Playa Anakena'
        },
        {
          url: 'https://picsum.photos/1600/900?random=804',
          alt: 'Volcán Rano Kau',
          description: 'Cráter volcánico con laguna interior',
          location: 'Volcán Rano Kau'
        }
      ]
    }

    // Imágenes por defecto si no se encuentra la zona específica
    return [
      {
        url: 'https://picsum.photos/1600/900?random=101',
        alt: 'Plaza de Armas del centro histórico',
        description: 'El corazón histórico de Santiago con su arquitectura colonial preservada',
        location: 'Plaza de Armas'
      },
      {
        url: 'https://picsum.photos/1600/900?random=102',
        alt: 'Catedral Metropolitana',
        description: 'Majestuosa arquitectura religiosa y patrimonio cultural',
        location: 'Catedral Metropolitana'
      },
      {
        url: 'https://picsum.photos/1600/900?random=103',
        alt: 'Mercado Central',
        description: 'Gastronomía tradicional y cultura local auténtica',
        location: 'Mercado Central'
      },
      {
        url: 'https://picsum.photos/1600/900?random=104',
        alt: 'Palacio de La Moneda',
        description: 'Sede del gobierno y símbolo de la historia política',
        location: 'Palacio de La Moneda'
      }
    ]
  }

  const images = getZoneImages(selectedZone)

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex)
  }

  // Log para debug cuando cambia la zona
  useEffect(() => {
    console.log('🎯 Zona seleccionada en carrusel:', selectedZone)
    const newImages = getZoneImages(selectedZone || 'general')
    console.log('🖼️ Imágenes cargadas para la zona:', newImages.length)
    console.log('📷 URLs de imágenes:', newImages.map(img => img.url))
    setActiveIndex(0)
  }, [selectedZone])

  return (
    <div className="background-carousel-container position-relative">
      <Carousel 
        activeIndex={activeIndex}
        onSelect={handleSelect}
        fade
        controls={true}
        indicators={true}
        interval={5000}
        className="h-100"
      >
        {images.map((image, index) => (
          <Carousel.Item 
            key={index}
            className="position-relative carousel-background-image"
            style={{ 
              height: height,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("${image.url}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Efectos de partículas y overlay */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,193,7,0.1) 0%, transparent 40%)',
                pointerEvents: 'none'
              }}
            />
            
            {/* Información de la imagen */}
            <div className="position-absolute bottom-0 start-0 p-4 text-white w-100">
              <div className="bg-dark bg-opacity-50 rounded p-3 backdrop-blur">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-primary me-2">📍</span>
                  <small className="text-light opacity-75">{image.location}</small>
                </div>
                <h3 className="h4 mb-2 fw-bold text-shadow">{image.alt}</h3>
                <p className="mb-0 opacity-90">{image.description}</p>
              </div>
            </div>

            {/* Botón de acción flotante */}
            <div className="position-absolute top-50 end-0 translate-middle-y pe-4">
              <button 
                className="btn btn-outline-light btn-lg rounded-circle shadow-lg"
                style={{
                  width: '60px',
                  height: '60px',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
                title="Explorar esta zona"
              >
                <i className="bi bi-arrow-right-circle fs-4"></i>
              </button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .backdrop-blur {
          backdrop-filter: blur(10px);
        }
        
        /* Animación de entrada suave para el carrusel */
        .background-carousel-container {
          animation: slideInDown 0.8s ease-out;
        }
        
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Efecto parallax sutil */
        .carousel-background-image {
          background-attachment: fixed;
        }
        
        @media (max-width: 768px) {
          .carousel-background-image {
            background-attachment: scroll;
          }
        }
      `}</style>
    </div>
  )
}
