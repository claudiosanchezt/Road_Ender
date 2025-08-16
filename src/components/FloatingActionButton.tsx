'use client'

import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useState } from 'react'

interface FloatingActionButtonProps {
  onShowGallery: () => void
  selectedZone?: string
}

export default function FloatingActionButton({ onShowGallery, selectedZone }: FloatingActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const tooltip = (
    <Tooltip id="fab-tooltip">
      {selectedZone ? `Ver galería de ${selectedZone}` : 'Explorar destinos en fotos'}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={tooltip}
    >
      <Button
        variant="primary"
        className="floating-action-button"
        onClick={onShowGallery}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,123,255,0.3)',
          zIndex: 1040,
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          cursor: 'pointer'
        }}
      >
        {isHovered ? '📸' : '🖼️'}
        
        <style jsx>{`
          .floating-action-button:hover {
            box-shadow: 0 6px 25px rgba(0,123,255,0.4) !important;
            transform: scale(1.1) !important;
          }
          
          .floating-action-button:active {
            transform: scale(0.95) !important;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          .floating-action-button {
            animation: pulse 3s infinite ease-in-out;
          }
          
          .floating-action-button:hover {
            animation: none;
          }
        `}</style>
      </Button>
    </OverlayTrigger>
  )
}
