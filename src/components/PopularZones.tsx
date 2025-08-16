import React from 'react'
import { Card, Row, Col, Badge, Button } from 'react-bootstrap'
import Link from 'next/link'

interface PopularZone {
  id: string
  name: string
  guidesCount: number
  averageRating: number
  complexity: string
  popularActivities: string[]
  description: string
  imageUrl?: string
}

interface PopularZonesProps {
  zones: PopularZone[]
  onZoneSelect: (zoneId: string) => void
}

const PopularZones: React.FC<PopularZonesProps> = ({ zones, onZoneSelect }) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'baja':
        return 'success'
      case 'media':
        return 'warning'
      case 'alta':
        return 'danger'
      case 'muy alta':
        return 'dark'
      default:
        return 'secondary'
    }
  }

  const getComplexityIcon = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'baja':
        return '🟢'
      case 'media':
        return '🟡'
      case 'alta':
        return '🟠'
      case 'muy alta':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const getRatingStars = (rating: number) => {
    const safeRating = Math.max(0, Math.min(5, Math.floor(rating || 0)))
    return '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Zonas Populares</h3>
        <Link href="/zones">
          <Button variant="outline-primary" size="sm">
            Ver todas las zonas
          </Button>
        </Link>
      </div>

      <Row>
        {zones.map((zone) => (
          <Col key={zone.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0 card-hover">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={zone.imageUrl || `https://picsum.photos/300/200?random=${zone.id}`}
                  style={{ height: '180px', objectFit: 'cover' }}
                  alt={zone.name}
                />
                <Badge 
                  bg={getComplexityColor(zone.complexity)} 
                  className="position-absolute top-0 start-0 m-2"
                >
                  {getComplexityIcon(zone.complexity)} {zone.complexity}
                </Badge>
              </div>

              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="h5 mb-1">{zone.name}</Card.Title>
                  <div className="text-warning small">
                    {getRatingStars(zone.averageRating)}
                    <div className="text-muted">{zone.averageRating.toFixed(1)}</div>
                  </div>
                </div>

                <Card.Text className="text-muted small mb-2 flex-grow-1">
                  {zone.description}
                </Card.Text>

                <div className="mb-3">
                  <div className="small text-muted mb-1">Actividades populares:</div>
                  <div>
                    {zone.popularActivities.slice(0, 3).map((activity, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                        {activity}
                      </Badge>
                    ))}
                    {zone.popularActivities.length > 3 && (
                      <Badge bg="secondary" className="me-1 mb-1">
                        +{zone.popularActivities.length - 3} más
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="small text-muted">
                      <strong>{zone.guidesCount}</strong> guías disponibles
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => onZoneSelect(zone.id)}
                    >
                      Explorar zona
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PopularZones
