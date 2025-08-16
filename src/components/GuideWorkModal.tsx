'use client'

import { Modal, Carousel, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

interface GuideWorkModalProps {
  show: boolean
  onHide: () => void
  guide: any
}

interface GuideWorkImage {
  url: string
  alt: string
  description: string
  activity: string
}

export default function GuideWorkModal({ show, onHide, guide }: GuideWorkModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Detectar hidratación del cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Función para formatear números de manera consistente
  const formatNumber = (num: number): string => {
    if (!isClient) return num.toString()
    return num.toLocaleString('es-CL')
  }

  // Generar imágenes específicas de trabajo para cada guía
  const getGuideWorkImages = (guideData: any): GuideWorkImage[] => {
    if (!guideData) return []

    const guideId = guideData.id || 1
    const specialty = guideData.specialty?.toLowerCase() || 'general'
    const zone = guideData.zone?.toLowerCase() || 'general'

    // Imágenes base según especialidad y zona
    const baseImageId = (guideId * 100) + 900 // Ensures unique images per guide

    if (specialty.includes('montaña') || specialty.includes('trekking')) {
      return [
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 1}`,
          alt: `${guideData.name} guiando en montaña`,
          description: `${guideData.name} liderando una expedición de trekking`,
          activity: 'Expedición de Montaña'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 2}`,
          alt: `${guideData.name} explicando rutas`,
          description: 'Explicando las mejores rutas y puntos de interés',
          activity: 'Orientación de Ruta'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 3}`,
          alt: `${guideData.name} con equipo de seguridad`,
          description: 'Verificando equipo de seguridad y preparando la expedición',
          activity: 'Preparación de Seguridad'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 4}`,
          alt: `${guideData.name} en campamento`,
          description: 'Organizando el campamento base para la noche',
          activity: 'Campamento Base'
        }
      ]
    }

    if (specialty.includes('histórico') || specialty.includes('cultural')) {
      return [
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 5}`,
          alt: `${guideData.name} en tour histórico`,
          description: `${guideData.name} explicando la historia colonial`,
          activity: 'Tour Histórico'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 6}`,
          alt: `${guideData.name} en museo`,
          description: 'Guiando visitantes por sitios de interés cultural',
          activity: 'Visita Cultural'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 7}`,
          alt: `${guideData.name} con grupo`,
          description: 'Compartiendo anécdotas y datos históricos fascinantes',
          activity: 'Narrativa Histórica'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 8}`,
          alt: `${guideData.name} en arquitectura`,
          description: 'Mostrando detalles arquitectónicos únicos',
          activity: 'Arquitectura Colonial'
        }
      ]
    }

    if (specialty.includes('gastronómico') || specialty.includes('culinario')) {
      return [
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 9}`,
          alt: `${guideData.name} en mercado`,
          description: `${guideData.name} seleccionando ingredientes locales`,
          activity: 'Tour Gastronómico'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 10}`,
          alt: `${guideData.name} cocinando`,
          description: 'Enseñando técnicas culinarias tradicionales',
          activity: 'Clase de Cocina'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 11}`,
          alt: `${guideData.name} en restaurante`,
          description: 'Presentando platos típicos de la región',
          activity: 'Degustación'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 12}`,
          alt: `${guideData.name} con productores`,
          description: 'Visitando productores locales y viñedos',
          activity: 'Productores Locales'
        }
      ]
    }

    if (specialty.includes('aventura') || specialty.includes('deportes')) {
      return [
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 13}`,
          alt: `${guideData.name} en actividad extrema`,
          description: `${guideData.name} liderando actividades de aventura`,
          activity: 'Deportes Extremos'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 14}`,
          alt: `${guideData.name} con equipo`,
          description: 'Preparando equipo para actividades acuáticas',
          activity: 'Deportes Acuáticos'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 15}`,
          alt: `${guideData.name} escalando`,
          description: 'Enseñando técnicas de escalada en roca',
          activity: 'Escalada en Roca'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 16}`,
          alt: `${guideData.name} en rappel`,
          description: 'Supervisando descensos en rappel',
          activity: 'Rappel y Descensos'
        }
      ]
    }

    if (specialty.includes('naturaleza') || specialty.includes('ecoturismo')) {
      return [
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 17}`,
          alt: `${guideData.name} observando fauna`,
          description: `${guideData.name} identificando especies nativas`,
          activity: 'Observación de Fauna'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 18}`,
          alt: `${guideData.name} en bosque`,
          description: 'Explicando ecosistemas y biodiversidad',
          activity: 'Educación Ambiental'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 19}`,
          alt: `${guideData.name} con telescopio`,
          description: 'Guiando sesiones de observación astronómica',
          activity: 'Astroturismo'
        },
        {
          url: `https://picsum.photos/800/600?random=${baseImageId + 20}`,
          alt: `${guideData.name} en conservación`,
          description: 'Participando en proyectos de conservación',
          activity: 'Conservación'
        }
      ]
    }

    // Imágenes por defecto para cualquier especialidad
    return [
      {
        url: `https://picsum.photos/800/600?random=${baseImageId + 21}`,
        alt: `${guideData.name} trabajando`,
        description: `${guideData.name} compartiendo su experiencia local`,
        activity: 'Experiencia Local'
      },
      {
        url: `https://picsum.photos/800/600?random=${baseImageId + 22}`,
        alt: `${guideData.name} con turistas`,
        description: 'Creando experiencias memorables para visitantes',
        activity: 'Atención Personalizada'
      },
      {
        url: `https://picsum.photos/800/600?random=${baseImageId + 23}`,
        alt: `${guideData.name} planificando`,
        description: 'Planificando itinerarios personalizados',
        activity: 'Planificación de Tours'
      },
      {
        url: `https://picsum.photos/800/600?random=${baseImageId + 24}`,
        alt: `${guideData.name} explicando`,
        description: 'Compartiendo conocimientos sobre la región',
        activity: 'Guía Experto'
      }
    ]
  }

  // Generar reseñas y comentarios realistas para cada guía
  const getGuideReviews = (guideData: any) => {
    if (!guideData) return []

    const guideId = guideData.id || 1
    const specialty = guideData.specialty?.toLowerCase() || 'general'
    
    const reviewTemplates = [
      {
        names: ['María González', 'Carlos Rodríguez', 'Ana López', 'Diego Martín', 'Sofía Herrera'],
        countries: ['España', 'Argentina', 'México', 'Colombia', 'Chile'],
        dates: ['Hace 2 semanas', 'Hace 1 mes', 'Hace 3 meses', 'Hace 2 meses', 'Hace 1 semana']
      }
    ]

    const mountainReviews = [
      { rating: 5, comment: "Increíble experiencia! {name} conoce cada rincón de la montaña. Su experiencia y profesionalismo hicieron que nuestro trekking fuera seguro y memorable." },
      { rating: 5, comment: "El mejor guía de montaña que hemos tenido. Excelente conocimiento de rutas, muy atento a la seguridad del grupo y con historias fascinantes." },
      { rating: 4, comment: "Tour muy bien organizado. {name} es experto en su área y nos llevó por lugares increíbles que jamás habríamos encontrado solos." },
      { rating: 5, comment: "Profesional excepcional. Su pasión por la montaña es contagiosa y nos transmitió mucho conocimiento sobre la flora y fauna local." }
    ]

    const historicalReviews = [
      { rating: 5, comment: "Excelente guía histórico! {name} tiene un conocimiento impresionante de la historia local. Cada lugar cobró vida con sus relatos." },
      { rating: 5, comment: "Tour fascinante por el centro histórico. Las anécdotas de {name} hicieron que viviéramos la historia de primera mano." },
      { rating: 4, comment: "Muy recomendable. {name} conoce todos los secretos históricos de la ciudad y los cuenta de manera muy entretenida." },
      { rating: 5, comment: "Increíble conocimiento histórico y cultural. {name} nos mostró lugares únicos y nos contó historias que no están en las guías turísticas." }
    ]

    const gastronomicReviews = [
      { rating: 5, comment: "¡Qué experiencia culinaria! {name} nos llevó a los mejores lugares locales. Probamos sabores auténticos que jamás olvidaremos." },
      { rating: 5, comment: "Tour gastronómico excepcional. {name} conoce a todos los productores locales y nos enseñó sobre ingredientes únicos de la región." },
      { rating: 4, comment: "Delicioso recorrido. {name} es un experto en gastronomía local y nos hizo descubrir platos increíbles." },
      { rating: 5, comment: "La mejor forma de conocer la cultura local es a través de su comida. {name} nos guió por una experiencia culinaria inolvidable." }
    ]

    const adventureReviews = [
      { rating: 5, comment: "¡Adrenalina pura! {name} es un profesional en deportes extremos. Nos sentimos seguros mientras vivíamos la aventura de nuestras vidas." },
      { rating: 5, comment: "Experiencia increíble de aventura. {name} tiene todo el equipo profesional y conoce los mejores spots para actividades extremas." },
      { rating: 4, comment: "Tour de aventura muy bien organizado. {name} se preocupa mucho por la seguridad y al mismo tiempo nos divirtió mucho." },
      { rating: 5, comment: "Guía de aventura excepcional. {name} nos retó a superar nuestros límites de manera segura y divertida." }
    ]

    const natureReviews = [
      { rating: 5, comment: "Increíble conocimiento de la fauna local. {name} nos mostró especies que jamás habríamos visto solos. Un verdadero experto en naturaleza." },
      { rating: 5, comment: "Tour de naturaleza fascinante. {name} conoce cada planta, cada ave, cada detalle del ecosistema. Aprendimos muchísimo." },
      { rating: 4, comment: "Excelente guía de ecoturismo. {name} nos enseñó a observar y respetar la naturaleza de manera responsable." },
      { rating: 5, comment: "Experiencia única en la naturaleza. {name} tiene una conexión especial con el entorno y nos transmitió su amor por la conservación." }
    ]

    let selectedReviews = []
    if (specialty.includes('montaña') || specialty.includes('trekking')) {
      selectedReviews = mountainReviews
    } else if (specialty.includes('histórico') || specialty.includes('cultural')) {
      selectedReviews = historicalReviews
    } else if (specialty.includes('gastronómico') || specialty.includes('culinario')) {
      selectedReviews = gastronomicReviews
    } else if (specialty.includes('aventura') || specialty.includes('deportes')) {
      selectedReviews = adventureReviews
    } else if (specialty.includes('naturaleza') || specialty.includes('ecoturismo')) {
      selectedReviews = natureReviews
    } else {
      selectedReviews = [
        { rating: 5, comment: "Excelente guía local. {name} nos mostró los mejores lugares de la zona con gran profesionalismo y conocimiento." },
        { rating: 4, comment: "Muy buena experiencia. {name} es muy amable y conoce perfectamente su área de especialización." },
        { rating: 5, comment: "Recomendado 100%. {name} hizo que nuestro viaje fuera inolvidable con su calidez y expertise local." }
      ]
    }

    // Generar 3-4 reseñas usando el ID del guía para consistencia
    const numReviews = 3 + (guideId % 2) // 3 o 4 reseñas
    const reviews = []
    
    for (let i = 0; i < numReviews; i++) {
      const reviewIndex = (guideId + i) % selectedReviews.length
      const nameIndex = (guideId + i) % reviewTemplates[0].names.length
      const countryIndex = (guideId + i) % reviewTemplates[0].countries.length
      const dateIndex = (guideId + i) % reviewTemplates[0].dates.length
      
      const review = selectedReviews[reviewIndex]
      reviews.push({
        name: reviewTemplates[0].names[nameIndex],
        country: reviewTemplates[0].countries[countryIndex],
        date: reviewTemplates[0].dates[dateIndex],
        rating: review.rating,
        comment: review.comment.replace('{name}', guideData.name)
      })
    }

    return reviews
  }

  const images = getGuideWorkImages(guide)
  const reviews = getGuideReviews(guide)

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex)
  }

  if (!guide) return null

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      centered
      className="guide-work-modal"
    >
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="d-flex align-items-center">
          <span className="me-2">👨‍🏫</span>
          {guide.name} en Acción
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <Carousel 
          activeIndex={activeIndex}
          onSelect={handleSelect}
          fade
          controls={true}
          indicators={true}
          interval={4000}
          className="guide-work-carousel"
        >
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <div
                className="carousel-image-container"
                style={{
                  height: '400px',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url("${image.url}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative'
                }}
              >
                {/* Información de la actividad */}
                <div className="position-absolute bottom-0 start-0 end-0 p-4">
                  <div className="bg-dark bg-opacity-75 rounded p-3 text-white">
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-success me-2">🎯</span>
                      <small className="text-light">{image.activity}</small>
                    </div>
                    <h5 className="mb-1">{image.alt}</h5>
                    <p className="mb-0 opacity-90 small">{image.description}</p>
                  </div>
                </div>

                {/* Indicador de imagen */}
                <div className="position-absolute top-0 end-0 p-3">
                  <span className="badge bg-dark bg-opacity-75 text-light">
                    {index + 1} / {images.length}
                  </span>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Información del guía */}
        <div className="p-4 bg-light">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h6 className="mb-1 gradient-text">
                <i className="bi bi-star-fill me-1"></i>
                {guide.name}
              </h6>
              <p className="mb-1 text-muted small">
                <i className="bi bi-geo-alt me-1"></i>
                Especialista en {guide.specialty} - {guide.zone}
              </p>
              <p className="mb-0 small">
                <i className="bi bi-award me-1"></i>
                {guide.experience} años de experiencia • Calificación: {guide.rating}/5
              </p>
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex flex-column align-items-end">
                <span className="h5 mb-1 gradient-text fw-bold">
                  ${formatNumber(guide.pricePerDay || 0)}/día
                </span>
                <small className="text-muted">
                  <i className="bi bi-people me-1"></i>
                  {guide.groupSize || 'Hasta 8'} personas
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Reseñas y Comentarios */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-3 p-4 shadow-sm">
            <div className="d-flex align-items-center mb-3">
              <h6 className="mb-0 gradient-text">
                <i className="bi bi-chat-quote me-2"></i>
                Reseñas de Viajeros
              </h6>
              <span className="badge bg-primary ms-2">{reviews.length} reseñas</span>
            </div>
            
            <div className="row g-3">
              {reviews.map((review, index) => (
                <div key={index} className="col-12">
                  <div className="border rounded-2 p-3 bg-light">
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                             style={{ width: '32px', height: '32px', fontSize: '14px', color: 'white' }}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
                            {review.name}
                          </div>
                          <small className="text-muted">
                            <i className="bi bi-geo-alt me-1"></i>
                            {review.country} • {review.date}
                          </small>
                        </div>
                      </div>
                      <div className="d-flex">
                        {[...Array(5)].map((_, starIndex) => (
                          <i 
                            key={starIndex}
                            className={`bi bi-star${starIndex < review.rating ? '-fill' : ''} text-warning`}
                            style={{ fontSize: '12px' }}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="mb-0 text-muted" style={{ fontSize: '13px', lineHeight: '1.4' }}>
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Estadísticas de reseñas */}
            <div className="mt-3 pt-3 border-top">
              <div className="row text-center">
                <div className="col-4">
                  <div className="text-primary fw-bold">{guide.rating}/5</div>
                  <small className="text-muted">Calificación</small>
                </div>
                <div className="col-4">
                  <div className="text-success fw-bold">98%</div>
                  <small className="text-muted">Recomiendan</small>
                </div>
                <div className="col-4">
                  <div className="text-info fw-bold">{reviews.length}+</div>
                  <small className="text-muted">Reseñas</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <div className="d-flex justify-content-between w-100">
          <Button variant="outline-secondary" onClick={onHide}>
            <i className="bi bi-arrow-left me-1"></i>
            Volver
          </Button>
          <div>
            <Button variant="outline-primary" className="me-2">
              <i className="bi bi-chat-dots me-1"></i>
              Contactar
            </Button>
            <Button variant="primary">
              <i className="bi bi-calendar-check me-1"></i>
              Reservar Tour
            </Button>
          </div>
        </div>
      </Modal.Footer>

      <style jsx>{`
        .guide-work-modal .modal-content {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .guide-work-carousel .carousel-control-prev,
        .guide-work-carousel .carousel-control-next {
          width: 5%;
        }

        .guide-work-carousel .carousel-indicators {
          bottom: 80px;
        }

        .carousel-image-container {
          transition: transform 0.3s ease;
        }

        .carousel-image-container:hover {
          transform: scale(1.02);
        }
      `}</style>
    </Modal>
  )
}
