'use client';

import { useCallback } from 'react';
import toast from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading' | 'custom';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export function useToast() {
  const showToast = useCallback((message: string, type: ToastType = 'custom', options?: ToastOptions) => {
    const defaultOptions = {
      duration: 3000,
      position: 'top-right' as const,
      ...options,
    };

    switch (type) {
      case 'success':
        toast.success(message, defaultOptions);
        break;
      case 'error':
        toast.error(message, defaultOptions);
        break;
      case 'loading':
        toast.loading(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  }, []);

  return { showToast };
}
