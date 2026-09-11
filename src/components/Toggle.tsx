// Componente de toggle/switch
'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <div className="flex-grow">
          {label && (
            <p className="text-sm font-medium text-text-light dark:text-text-dark">{label}</p>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div
            className={clsx(
              'w-11 h-6 rounded-full peer',
              'bg-gray-300 dark:bg-gray-600',
              'peer-checked:bg-primary-500 dark:peer-checked:bg-primary-600',
              'transition-colors duration-200',
              'shadow-clay'
            )}
          />
          <span
            className={clsx(
              'absolute left-1 top-1 w-4 h-4 bg-white rounded-full',
              'transition-transform duration-200',
              'peer-checked:translate-x-5',
              'shadow-sm'
            )}
          />
        </label>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
