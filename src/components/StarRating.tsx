// Componente moderno de Rating con estrellas - Tourist Guides App
import React, { useState } from 'react'
import './StarRating.css'

interface StarRatingProps {
  rating: number
  size?: 'small' | 'medium' | 'large'
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  showValue?: boolean
}

export default function StarRating({ 
  rating, 
  size = 'medium', 
  interactive = false, 
  onRatingChange,
  showValue = false 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'star-rating-small'
      case 'large': return 'star-rating-large'
      default: return 'star-rating-medium'
    }
  }

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const handleStarHover = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  const renderStars = () => {
    const stars = []
    const currentRating = interactive ? (hoverRating || rating) : rating
    
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.floor(currentRating)
      const isHalfFilled = i === Math.ceil(currentRating) && currentRating % 1 !== 0
      
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          {isHalfFilled ? '⭐' : isFilled ? '★' : '☆'}
        </span>
      )
    }
    
    return stars
  }

  return (
    <div 
      className={`star-rating ${getSizeClass()}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="stars-container">
        {renderStars()}
      </div>
      {showValue && (
        <span className="rating-value">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
