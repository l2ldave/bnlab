// Componente de seletor de tema
'use client';

import React from 'react';
import { useTheme } from '@/hooks';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-clay transition-all ${
          theme === 'light'
            ? 'bg-primary-500 text-white shadow-clay-hover'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
        }`}
        title="Tema claro"
      >
        ☀️
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-clay transition-all ${
          theme === 'dark'
            ? 'bg-primary-500 text-white shadow-clay-hover'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
        }`}
        title="Tema escuro"
      >
        🌙
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-clay transition-all ${
          theme === 'system'
            ? 'bg-primary-500 text-white shadow-clay-hover'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
        }`}
        title="Automático"
      >
        💻
      </button>
    </div>
  );
};
