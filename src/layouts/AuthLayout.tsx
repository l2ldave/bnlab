// Layout para páginas de autenticação (login, recuperação, etc)
'use client';

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-light-secondary to-surface-light dark:from-surface-dark dark:to-surface-dark-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            BN Lab
          </h1>
          {title && (
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              {description}
            </p>
          )}
        </div>

        {/* Content Card */}
        <div className="bg-surface-light dark:bg-surface-dark-secondary rounded-clay shadow-clay dark:shadow-clay-dark p-8 border border-gray-100 dark:border-gray-700">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
          <p>&copy; 2024 BN Lab. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};
