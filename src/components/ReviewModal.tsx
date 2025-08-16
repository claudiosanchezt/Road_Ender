// Componente Modal para agregar reseñas - Tourist Guides App
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/api-service'
import StarRating from './StarRating'

interface ReviewModalProps {
  show: boolean
  onHide: () => void
  guide: any
  onReviewAdded: () => void
}

export default function ReviewModal({ show, onHide, guide, onReviewAdded }: ReviewModalProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [clientName, setClientName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Obtener usuario logueado del localStorage
  const getLoggedUser = () => {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('user_data')
        if (userData) {
          return JSON.parse(userData)
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error)
      }
    }
    return null
  }

  // Auto-completar nombre cuando se abre el modal
  useEffect(() => {
    if (show) {
      const user = getLoggedUser()
      if (user && user.firstName && user.lastName) {
        setClientName(`${user.firstName} ${user.lastName}`)
      }
    }
  }, [show])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!clientName.trim()) {
      setError('Por favor ingresa tu nombre')
      return
    }

    try {
      setLoading(true)
      setError(null)

  // Llamar al API service
  await (apiService as any).addReview(guide.id, {
        rating,
        comment: comment.trim(),
        clientName: clientName.trim()
      })

      setSuccess(true)
      setTimeout(() => {
        onReviewAdded()
        onHide()
        resetForm()
      }, 1500)

    } catch (err) {
      setError('Error al enviar la reseña. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setRating(5)
    setComment('')
    // Mantener el nombre si el usuario está logueado
    const user = getLoggedUser()
    setClientName(user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '')
    setError(null)
    setSuccess(false)
  }

  const handleClose = () => {
    if (!loading) {
      resetForm()
      onHide()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="gradient-text">✍️ Agregar Reseña para {guide?.name}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {success ? (
          <Alert variant="success" className="text-center">
            <h5>¡Reseña enviada exitosamente! ⭐</h5>
            <p>Gracias por tu opinión sobre {guide?.name}</p>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tu Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    disabled={loading || (getLoggedUser() !== null)}
                  />
                  {getLoggedUser() && (
                    <Form.Text className="text-success">
                      ✅ Conectado como {getLoggedUser().firstName} {getLoggedUser().lastName}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Calificación *</Form.Label>
                  <div className="d-flex align-items-center">
                    <StarRating
                      rating={rating}
                      size="large"
                      interactive={!loading}
                      onRatingChange={setRating}
                      showValue={true}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Comparte tu experiencia con este guía..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
                maxLength={500}
              />
              <Form.Text className="text-muted">
                {comment.length}/500 caracteres
              </Form.Text>
            </Form.Group>

            <div className="bg-light p-3 rounded mb-3">
              <h6 className="mb-2">Vista previa:</h6>
              <div className="d-flex align-items-center mb-2">
                <strong className="me-2">{clientName || 'Tu nombre'}</strong>
                <span className="text-warning">
                  {'⭐'.repeat(rating)}
                </span>
                <span className="text-muted ms-1">({rating}/5)</span>
              </div>
              <p className="mb-0 text-muted">
                {comment || 'Tu comentario aparecerá aquí...'}
              </p>
            </div>
          </Form>
        )}
      </Modal.Body>
      
      {!success && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading || !clientName.trim()}
          >
            {loading ? '📤 Enviando...' : '📝 Enviar Reseña'}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}
