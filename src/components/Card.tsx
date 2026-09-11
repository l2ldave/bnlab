// Componente de card para apresentar conteúdo
'use client';

import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, clickable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-surface-light dark:bg-surface-dark-secondary',
          'rounded-clay',
          'p-6',
          'shadow-clay dark:shadow-clay-dark',
          'border border-gray-100 dark:border-gray-700',
          'transition-all duration-200',
          hoverable && 'hover:shadow-clay-hover dark:hover:shadow-clay-dark-hover',
          (hoverable || clickable) && 'hover:translate-y-[-2px]',
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
