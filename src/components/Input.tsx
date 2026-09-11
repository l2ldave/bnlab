// Componente de input para formulários
'use client';

import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
          <input
            ref={ref}
            className={clsx(
              'w-full px-4 py-2 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary',
              'text-text-light dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-500',
              'border-2 border-gray-200 dark:border-gray-600',
              'focus:outline-none focus:border-primary-500 dark:focus:border-primary-600',
              'shadow-clay transition-all duration-200',
              error && 'border-red-500 focus:border-red-500',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
