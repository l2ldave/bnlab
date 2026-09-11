// Componente de estado de erro
'use client';

import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Erro ao carregar',
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
        {title}
      </h3>
      <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6 max-w-sm">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} size="md">
          Tentar novamente
        </Button>
      )}
    </div>
  );
};
