// Componente de card de estatísticas
'use client';

import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  description,
  trend,
  trendValue,
}) => {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        {icon && <div className="text-3xl">{icon}</div>}
        {trend && (
          <div
            className={`text-sm font-semibold ${
              trend === 'up'
                ? 'text-green-600 dark:text-green-400'
                : trend === 'down'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </div>
        )}
      </div>
      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
        {value}
      </p>
      {description && (
        <p className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary">
          {description}
        </p>
      )}
    </Card>
  );
};
