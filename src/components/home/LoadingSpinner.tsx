// Componente de Loading con animaciones atractivas
// Spinner personalizado para el home dinámico

'use client';

import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16', 
    large: 'w-24 h-24'
  };

  const containerClasses = {
    small: 'p-4',
    medium: 'p-8',
    large: 'p-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      {/* Spinner principal */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        
        {/* Puntos orbitales */}
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-500 rounded-full transform -translate-x-1/2 animate-bounce"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-y-1/2 animate-bounce" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2 animate-bounce" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>

      {/* Mensaje de carga */}
      {message && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 font-medium animate-pulse">{message}</p>
          
          {/* Barra de progreso animada */}
          <div className="mt-2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse" 
                 style={{
                   animation: 'loading-bar 2s ease-in-out infinite'
                 }}>
            </div>
          </div>
        </div>
      )}

      {/* Iconos flotantes temáticos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-2xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>
          🏔️
        </div>
        <div className="absolute top-20 right-20 text-2xl opacity-20 animate-bounce" style={{animationDelay: '1.5s'}}>
          🌊
        </div>
        <div className="absolute bottom-20 left-20 text-2xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>
          🌲
        </div>
        <div className="absolute bottom-10 right-10 text-2xl opacity-20 animate-bounce" style={{animationDelay: '2.5s'}}>
          🏕️
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
