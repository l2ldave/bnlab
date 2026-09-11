// Componente de cabeçalho de página
'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
};
