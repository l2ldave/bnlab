// Componente de botão reutilizável
'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'font-medium rounded-clay transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 shadow-clay hover:shadow-clay-hover dark:shadow-clay-dark dark:hover:shadow-clay-dark-hover',
      secondary:
        'bg-surface-light-tertiary text-text-light hover:bg-gray-300 dark:bg-surface-dark-tertiary dark:text-text-dark dark:hover:bg-surface-dark-secondary shadow-clay hover:shadow-clay-hover dark:shadow-clay-dark dark:hover:shadow-clay-dark-hover',
      tertiary:
        'bg-transparent text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-surface-dark-tertiary border border-primary-200 dark:border-primary-700',
      danger:
        'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-clay hover:shadow-clay-hover dark:shadow-clay-dark dark:hover:shadow-clay-dark-hover',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span>
            Carregando...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
