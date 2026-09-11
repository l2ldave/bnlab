// Componente de barra de progresso
'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
}) => {
  const percentage = (value / max) * 100;

  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2">
          {label && (
            <p className="text-sm font-medium text-text-light dark:text-text-dark">
              {label}
            </p>
          )}
          {showPercentage && (
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
              {Math.round(percentage)}%
            </p>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-clay overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            'bg-gradient-to-r from-primary-400 to-primary-600',
            'shadow-clay'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
