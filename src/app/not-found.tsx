// Página 404
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-light-secondary to-surface-light dark:from-surface-dark dark:to-surface-dark-secondary flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
          Página não encontrada
        </h2>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8 max-w-md">
          Desculpe, a página que está procurando não existe. Por favor, volte ao painel principal.
        </p>
        <Link href="/dashboard">
          <Button variant="primary" size="lg">
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
