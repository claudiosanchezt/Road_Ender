'use client'

import { Modal, Carousel, Button, Badge, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'

interface ZoneImage {
  url: string
  alt: string
  description: string
  location: string
}

interface ImageCarouselModalProps {
  show: boolean
  onHide: () => void
  zone: string
  guideName?: string
  title?: string
}

export default function ImageCarouselModal({ 
  show, 
  onHide, 
  zone, 
  guideName,
  title 
}: ImageCarouselModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Imágenes según la zona (usando URLs de ejemplo - en producción usarías imágenes reales)
  const getZoneImages = (zoneName: string): ZoneImage[] => {
    const zoneKey = zoneName.toLowerCase()
    
    if (zoneKey.includes('centro') || zoneKey.includes('histórico')) {
      return [
        {
          url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop&crop=center',
          alt: 'Centro Histórico',
          description: 'Arquitectura colonial y plazas emblemáticas',
          location: 'Centro Histórico'
        },
        {
          url: 'https://images.unsplash.com/photo-1555109307-f8d5c8a66d46?w=800&h=600&fit=crop&crop=center',
          alt: 'Catedral Principal',
          description: 'Majestuosa catedral con siglos de historia',
          location: 'Plaza Mayor'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
          alt: 'Calles Coloniales',
          description: 'Pintorescas calles empedradas llenas de cultura',
          location: 'Barrio Colonial'
        }
      ]
    } else if (zoneKey.includes('cordillera') || zoneKey.includes('montaña') || zoneKey.includes('andes')) {
      return [
        {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
          alt: 'Picos Nevados',
          description: 'Majestuosas montañas cubiertas de nieve eterna',
          location: 'Cordillera de los Andes'
        },
        {
          url: 'https://images.unsplash.com/photo-1464822759844-d150baec843a?w=800&h=600&fit=crop&crop=center',
          alt: 'Lagos de Montaña',
          description: 'Cristalinos lagos de origen glacial',
          location: 'Lagos Andinos'
        },
        {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
          alt: 'Senderos de Trekking',
          description: 'Rutas de montañismo para todos los niveles',
          location: 'Alta Montaña'
        }
      ]
    } else if (zoneKey.includes('costa') || zoneKey.includes('playa')) {
      return [
        {
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center',
          alt: 'Costa Dorada',
          description: 'Espectaculares playas de arena dorada',
          location: 'Costa Pacífica'
        },
        {
          url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center',
          alt: 'Acantilados Costeros',
          description: 'Impresionantes formaciones rocosas junto al mar',
          location: 'Acantilados del Pacífico'
        },
        {
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center',
          alt: 'Atardeceres Costeros',
          description: 'Puestas de sol inolvidables sobre el océano',
          location: 'Mirador Costero'
        }
      ]
    } else if (zoneKey.includes('valle')) {
      return [
        {
          url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&crop=center',
          alt: 'Valles Verdes',
          description: 'Exuberantes valles con vegetación tropical',
          location: 'Valle Central'
        },
        {
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center',
          alt: 'Cultivos en Terrazas',
          description: 'Antiguas terrazas de cultivo andinas',
          location: 'Terrazas Ancestrales'
        },
        {
          url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center',
          alt: 'Bosques del Valle',
          description: 'Densos bosques nativos llenos de vida',
          location: 'Reserva Natural'
        }
      ]
    } else {
      // Imágenes genéricas de turismo
      return [
        {
          url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&crop=center',
          alt: 'Destino Turístico',
          description: 'Hermosos paisajes esperándote',
          location: 'Zona Turística'
        },
        {
          url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73786?w=800&h=600&fit=crop&crop=center',
          alt: 'Aventura Natural',
          description: 'Experiencias únicas en la naturaleza',
          location: 'Área Natural'
        },
        {
          url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop&crop=center',
          alt: 'Paisajes Únicos',
          description: 'Descubre lugares inolvidables',
          location: 'Destino Especial'
        }
      ]
    }
  }

  const images = getZoneImages(zone)

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex)
  }

  // Efecto de transición automática suave
  useEffect(() => {
    if (!show) return
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Cambio cada 5 segundos

    return () => clearInterval(interval)
  }, [show, images.length])

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      centered
      className="carousel-modal"
      backdrop="static"
      animation={true}
    >
      <Modal.Header closeButton className="border-0 position-absolute bg-transparent" style={{ zIndex: 1050 }}>
        <Modal.Title className="text-white text-shadow gradient-text">
          {title || `${guideName ? `Tours con ${guideName}` : 'Explora'} - ${zone}`}
        </Modal.Title>
      </Modal.Header>
      
      <div className="position-relative overflow-hidden rounded">
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          interval={null} // Desactivar auto-play del carrusel (usamos nuestro propio timer)
          fade // Efecto de desvanecimiento suave
          controls={true}
          indicators={true}
          className="carousel-custom"
        >
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div 
                className="carousel-image-container"
                style={{
                  height: '75vh',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'end',
                  padding: '2rem',
                  position: 'relative'
                }}
              >
                {/* Efecto de partículas sutiles */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                    pointerEvents: 'none'
                  }}
                />
                
                <Card className="bg-dark bg-opacity-75 text-white border-0 w-100 backdrop-blur">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <Badge bg="info" className="mb-3 px-3 py-2 fs-6">
                          📍 {image.location}
                        </Badge>
                        <Card.Title className="h3 mb-3 text-shadow">{image.alt}</Card.Title>
                        <Card.Text className="lead opacity-90 mb-0">
                          {image.description}
                        </Card.Text>
                        
                        {guideName && (
                          <div className="mt-3 p-3 bg-primary bg-opacity-20 rounded">
                            <small className="text-light">
                              🎯 <strong>Tu guía:</strong> {guideName} te mostrará los mejores rincones de este lugar
                            </small>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-end ms-4">
                        <div className="bg-primary bg-opacity-30 rounded-circle p-3 mb-2">
                          <span className="text-white fw-bold fs-5">
                            {index + 1}
                          </span>
                        </div>
                        <small className="text-light opacity-75">
                          de {images.length}
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Overlay con información principal */}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center pointer-events-none">
          <div className="text-center text-white position-absolute" style={{ top: '20%' }}>
            <h1 className="display-4 fw-bold text-shadow mb-3">
              ✨ {zone}
            </h1>
            {guideName && (
              <p className="lead text-shadow fs-4">
                Aventuras únicas con <strong className="text-warning">{guideName}</strong>
              </p>
            )}
            <div className="mt-4">
              <Badge bg="warning" className="px-4 py-2 fs-6 text-dark">
                🎪 Experiencia Premium
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Modal.Footer className="border-0 bg-gradient" style={{ 
        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)' 
      }}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="text-white">
            <small className="opacity-75">
              💡 <strong>Tip:</strong> Las imágenes cambian automáticamente cada 5 segundos
            </small>
          </div>
          <div>
            <Button 
              variant="outline-light" 
              className="me-3 px-4"
              onClick={() => setActiveIndex(Math.floor(Math.random() * images.length))}
            >
              🎲 Sorpréndeme
            </Button>
            <Button 
              variant="warning" 
              className="px-4 text-dark fw-bold"
              onClick={onHide}
            >
              🚀 ¡Comenzar Aventura!
            </Button>
          </div>
        </div>
      </Modal.Footer>

      <style jsx global>{`
        .carousel-modal .modal-dialog {
          max-width: 95vw;
          margin: 0.5rem auto;
        }
        
        .carousel-modal .modal-content {
          border-radius: 20px;
          overflow: hidden;
          border: none;
        }
        
        .carousel-custom .carousel-control-prev,
        .carousel-custom .carousel-control-next {
          width: 8%;
          background: linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
          border-radius: 0 20px 20px 0;
          transition: all 0.3s ease;
        }
        
        .carousel-custom .carousel-control-next {
          border-radius: 20px 0 0 20px;
          background: linear-gradient(270deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
        }
        
        .carousel-custom .carousel-control-prev:hover,
        .carousel-custom .carousel-control-next:hover {
          background: rgba(0,0,0,0.6);
          transform: scale(1.05);
        }
        
        .carousel-custom .carousel-indicators {
          bottom: 2rem;
          gap: 8px;
        }
        
        .carousel-custom .carousel-indicators button {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin: 0;
          background-color: rgba(255,255,255,0.4);
          border: 3px solid rgba(255,255,255,0.6);
          transition: all 0.3s ease;
        }
        
        .carousel-custom .carousel-indicators button.active {
          background-color: #ffc107;
          border-color: #fff;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(255,193,7,0.6);
        }
        
        .text-shadow {
          text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.5);
        }
        
        .carousel-item {
          transition: opacity 1s ease-in-out;
        }
        
        .carousel-fade .carousel-item {
          opacity: 0;
          transition-property: opacity;
          transform: none;
        }
        
        .carousel-fade .carousel-item.active {
          opacity: 1;
        }
        
        .backdrop-blur {
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }
        
        .carousel-image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,123,255,0.1) 0%, rgba(255,193,7,0.1) 100%);
          pointer-events: none;
        }
        
        .modal-enter {
          opacity: 0;
          transform: scale(0.9);
        }
        
        .modal-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
        }
        
        .modal-exit {
          opacity: 1;
          transform: scale(1);
        }
        
        .modal-exit-active {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .carousel-modal .modal-header .btn-close {
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          opacity: 0.8;
          transition: all 0.3s ease;
        }
        
        .carousel-modal .modal-header .btn-close:hover {
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transform: rotate(90deg);
        }
      `}</style>
    </Modal>
  )
}
