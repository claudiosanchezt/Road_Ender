'use client'

import { Card, Badge, Button } from 'react-bootstrap'
import { Guide } from '@/types'

interface GuideCardProps {
  guide: any
  onContact: (guideId: any) => void
  onViewProfile: (guideId: any) => void
  onAddReview?: (guide: any) => void
  onShowCarousel?: (guide: any) => void
}

export default function GuideCard({ guide, onContact, onViewProfile, onAddReview, onShowCarousel }: GuideCardProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'baja': return 'success'
      case 'media': return 'warning'
      case 'alta': return 'danger'
      case 'muy alta': return 'dark'
      default: return 'secondary'
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        <div 
          className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
          style={{ height: '200px' }}
        >
          <span className="text-white">📸 {guide.name}</span>
        </div>
        <Badge 
          bg={guide.availability ? "success" : "danger"}
          className="position-absolute top-0 start-0 m-2"
        >
          {guide.availability ? "Disponible" : "Ocupado"}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title>{guide.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {guide.description}
        </Card.Text>
        
        <div className="mb-2">
          <strong>Zona:</strong> {guide.zone}
        </div>
        
        <div className="mb-2">
          <strong>Especialidades:</strong>
          <br />
          {guide.specialties.map((specialty: any) => (
            <Badge bg="secondary" className="me-1 mb-1" key={specialty}>
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="mb-2">
          <strong>Idiomas:</strong>
          <br />
          {guide.languages.map((language: any) => (
            <Badge bg="info" className="me-1 mb-1" key={language}>
              {language}
            </Badge>
          ))}
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-warning">
              {'★'.repeat(Math.max(0, Math.min(5, Math.floor(guide.rating || 0))))}
            </span>
            <span className="ms-1">{guide.rating} ({guide.totalReviews} reseñas)</span>
          </div>
          <strong className="text-primary">${guide.pricePerDay}/día</strong>
        </div>
        
        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            disabled={!guide.availability}
            onClick={() => onContact(guide.id)}
          >
            {guide.availability ? "Contactar Guía" : "No Disponible"}
          </Button>
          
          {/* Botón para mostrar carrusel de imágenes */}
          {onShowCarousel && (
            <Button 
              variant="info" 
              size="sm"
              className="mb-2"
              onClick={() => onShowCarousel(guide)}
            >
              🖼️ Ver Zona en Fotos
            </Button>
          )}
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-secondary" 
              size="sm"
              className="flex-fill"
              onClick={() => onViewProfile(guide.id)}
            >
              Ver Perfil
            </Button>
            {onAddReview && (
              <Button 
                variant="outline-warning" 
                size="sm"
                className="flex-fill"
                onClick={() => onAddReview(guide)}
              >
                ⭐ Reseñar
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
