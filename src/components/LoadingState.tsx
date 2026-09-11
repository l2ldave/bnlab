// Componente de estado de carregamento
'use client';

import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Carregando...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="animate-spin text-4xl mb-4">⏳</div>
      <p className="text-text-light-secondary dark:text-text-dark-secondary">
        {message}
      </p>
    </div>
  );
};
