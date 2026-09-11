// Componente de estado vazio
'use client';

import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && (
        <div className="text-5xl mb-4 opacity-50">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
