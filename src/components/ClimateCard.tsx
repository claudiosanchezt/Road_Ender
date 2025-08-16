import React from 'react'
import { Card, Row, Col, Badge } from 'react-bootstrap'

interface ClimateInfo {
  temperature: string
  humidity: string
  pressure: string
  conditions: string
  windSpeed?: string
  visibility?: string
}

interface ClimateCardProps {
  climateData: ClimateInfo
  zone?: string
}

const ClimateCard: React.FC<ClimateCardProps> = ({ climateData, zone }) => {
  const getConditionIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('sol') || lowerCondition.includes('despejado')) return '☀️'
    if (lowerCondition.includes('nublado') || lowerCondition.includes('nube')) return '☁️'
    if (lowerCondition.includes('lluvia') || lowerCondition.includes('lloviendo')) return '🌧️'
    if (lowerCondition.includes('nieve') || lowerCondition.includes('nevando')) return '❄️'
    if (lowerCondition.includes('tormenta')) return '⛈️'
    if (lowerCondition.includes('viento')) return '💨'
    return '🌤️'
  }

  const getConditionColor = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('sol') || lowerCondition.includes('despejado')) return 'warning'
    if (lowerCondition.includes('nublado')) return 'secondary'
    if (lowerCondition.includes('lluvia')) return 'primary'
    if (lowerCondition.includes('nieve')) return 'light'
    if (lowerCondition.includes('tormenta')) return 'danger'
    return 'info'
  }

  return (
    <Card className="climate-card text-white h-100 border-0">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <div className="small text-light opacity-75">
              {zone ? `${zone}` : 'Clima actual'}
            </div>
            <div className="h4 mb-0 fw-bold">{climateData.temperature}</div>
          </div>
          <div style={{ fontSize: '2rem' }}>
            {getConditionIcon(climateData.conditions)}
          </div>
        </div>

        <div className="small text-light opacity-75 mb-2">
          {climateData.conditions}
        </div>

        <div className="d-flex justify-content-between text-center small">
          <div>
            <div className="fw-semibold">{climateData.humidity}</div>
            <div className="opacity-75">Humedad</div>
          </div>
          <div>
            <div className="fw-semibold">{climateData.pressure}</div>
            <div className="opacity-75">Presión</div>
          </div>
          <div>
            <div className="fw-semibold">{climateData.windSpeed}</div>
            <div className="opacity-75">Viento</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ClimateCard
