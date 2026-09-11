// Componente de toast/notificação
'use client';

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '16px',
          padding: '16px',
          fontSize: '14px',
          boxShadow:
            '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        },
        success: {
          style: {
            background: '#ffffff',
            color: '#000000',
            border: '1px solid #e5e7eb',
          },
          icon: '✓',
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fecaca',
          },
          icon: '✕',
        },
      }}
    />
  );
};
