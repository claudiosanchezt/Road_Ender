import React, { useState } from 'react'
import { Button, Spinner, Alert, Badge, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import { useWeather } from '../hooks/useWeather'

interface WeatherWidgetProps {
  className?: string
  compact?: boolean
  showLocation?: boolean
}

export default function WeatherWidget({ 
  className = '', 
  compact = false, 
  showLocation = true 
}: WeatherWidgetProps) {
  const { weather, loading, error, refreshWeather, requestLocation, locationPermission, useDefaultLocation } = useWeather()
  const [showLocationModal, setShowLocationModal] = useState(false)

  const handleLocationRequest = async () => {
    if (locationPermission === 'prompt' || locationPermission === 'unknown') {
      setShowLocationModal(true)
    } else if (locationPermission === 'denied') {
      // Si ya fue denegado, usar ubicación por defecto
      await useDefaultLocation()
    } else {
      // Si ya está permitido, solicitar ubicación
      await requestLocation()
    }
  }

  const handleAllowLocation = async () => {
    setShowLocationModal(false)
    await requestLocation()
  }

  const handleDenyLocation = async () => {
    setShowLocationModal(false)
    await useDefaultLocation()
  }

  if (loading && !weather) {
    return (
      <div className={`d-flex align-items-center ${className}`}>
        <Spinner animation="border" size="sm" className="me-2" />
        <small className="text-muted">Obteniendo clima...</small>
      </div>
    )
  }

  if (error && !weather) {
    return (
      <div className={`d-flex align-items-center ${className}`}>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="weather-error-tooltip">
              {error}
            </Tooltip>
          }
        >
          <Button
            variant="outline-warning"
            size="sm"
            onClick={handleLocationRequest}
            className="d-flex align-items-center"
          >
            <i className="bi bi-exclamation-triangle me-1"></i>
            <span className="d-none d-md-inline">Obtener clima</span>
          </Button>
        </OverlayTrigger>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className={`d-flex align-items-center ${className}`}>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleLocationRequest}
          className="d-flex align-items-center"
        >
          <i className="bi bi-geo-alt me-1"></i>
          <span className="d-none d-md-inline">Ver clima local</span>
        </Button>
      </div>
    )
  }

  const formatWeather = () => {
    return {
      temperature: `${weather.temperature}°C`,
      conditions: weather.conditions.charAt(0).toUpperCase() + weather.conditions.slice(1),
      humidity: `${weather.humidity}%`,
      windSpeed: `${weather.windSpeed} km/h`,
      pressure: `${weather.pressure} hPa`,
      location: `${weather.city}, ${weather.country}`
    }
  }

  const isUsingDefaultLocation = () => {
    return weather?.city?.includes('(ubicación por defecto)') || locationPermission === 'denied'
  }

  const getWeatherEmoji = () => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
  return iconMap[weather.icon || ''] || '🌤️'
  }

  const formattedWeather = formatWeather()

  if (compact) {
    return (
      <div className={`d-flex align-items-center ${className}`}>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="weather-tooltip">
              <div className="text-start">
                <div><strong>{formattedWeather.location}</strong></div>
                <div>{formattedWeather.conditions}</div>
                <div>Humedad: {formattedWeather.humidity}</div>
                <div>Viento: {formattedWeather.windSpeed}</div>
                <div>Presión: {formattedWeather.pressure}</div>
              </div>
            </Tooltip>
          }
        >
          <div 
            className="d-flex align-items-center px-3 py-1 rounded-pill cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer'
            }}
          >
            <span className="me-2" style={{ fontSize: '1.2rem' }}>
              {getWeatherEmoji()}
            </span>
            <div className="text-white">
              <div className="fw-bold" style={{ fontSize: '0.9rem', lineHeight: '1.1' }}>
                {formattedWeather.temperature}
              </div>
              {showLocation && (
                <div style={{ fontSize: '0.7rem', opacity: '0.8', lineHeight: '1' }}>
                  {weather.city}
                </div>
              )}
            </div>
            {loading && (
              <Spinner animation="border" size="sm" className="ms-2" style={{ width: '12px', height: '12px' }} />
            )}
          </div>
        </OverlayTrigger>
        
        {isUsingDefaultLocation() && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="default-location-tooltip">
                Usando ubicación por defecto. Haz clic para permitir ubicación precisa.
              </Tooltip>
            }
          >
            <i 
              className="bi bi-geo-alt text-info ms-2 cursor-pointer" 
              style={{ fontSize: '0.8rem', cursor: 'pointer' }}
              onClick={handleLocationRequest}
            ></i>
          </OverlayTrigger>
        )}
        
        {locationPermission === 'denied' && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="location-denied-tooltip">
                Permiso de ubicación denegado. Habilita la geolocalización para clima local.
              </Tooltip>
            }
          >
            <i className="bi bi-geo-alt-fill text-warning ms-2" style={{ fontSize: '0.8rem' }}></i>
          </OverlayTrigger>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-3 p-4 shadow-sm ${className}`}>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center">
          <span className="me-3" style={{ fontSize: '2.5rem' }}>
            {getWeatherEmoji()}
          </span>
          <div>
            <h3 className="mb-0 text-primary">{formattedWeather.temperature}</h3>
            <p className="mb-0 text-muted">{formattedWeather.conditions}</p>
            {showLocation && (
              <small className="text-muted">
                <i className="bi bi-geo-alt me-1"></i>
                {formattedWeather.location}
              </small>
            )}
          </div>
        </div>
        
        <div className="text-end">
          {isUsingDefaultLocation() && (
            <Button
              variant="outline-info"
              size="sm"
              onClick={handleLocationRequest}
              className="me-2"
              title="Obtener clima de tu ubicación exacta"
            >
              <i className="bi bi-geo-alt"></i>
            </Button>
          )}
          
          <Button
            variant="outline-primary"
            size="sm"
            onClick={refreshWeather}
            disabled={loading}
            className="mb-2"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <i className="bi bi-arrow-clockwise"></i>
            )}
          </Button>
          
          {locationPermission === 'denied' && (
            <div>
              <Badge bg="warning" className="small">
                <i className="bi bi-geo-alt-fill me-1"></i>
                Sin ubicación
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="row g-3">
        <div className="col-6">
          <div className="text-center">
            <div className="text-muted small">Humedad</div>
            <div className="fw-bold">{formattedWeather.humidity}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center">
            <div className="text-muted small">Viento</div>
            <div className="fw-bold">{formattedWeather.windSpeed}</div>
          </div>
        </div>
        <div className="col-12">
          <div className="text-center">
            <div className="text-muted small">Presión Atmosférica</div>
            <div className="fw-bold">{formattedWeather.pressure}</div>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="warning" className="mt-3 small mb-0">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {/* Modal de solicitud de geolocalización */}
      <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-geo-alt me-2"></i>
            Ubicación para el clima
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-geo-alt-fill text-primary mb-3" style={{fontSize: '3rem'}}></i>
            <h5>¿Permitir acceso a tu ubicación?</h5>
            <p className="text-muted">
              Necesitamos tu ubicación para mostrarte el clima más preciso de tu zona.
              Si prefieres no compartir tu ubicación, mostraremos el clima de Santiago, Chile.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleDenyLocation}>
            <i className="bi bi-x-circle me-1"></i>
            No, usar ubicación por defecto
          </Button>
          <Button variant="primary" onClick={handleAllowLocation}>
            <i className="bi bi-check-circle me-1"></i>
            Sí, permitir ubicación
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
