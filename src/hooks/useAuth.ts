'use client';

import { useState, useCallback, useEffect } from 'react';
import type { User } from '@/types';
import { mockUser } from '@/data/mockData';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Verificar se o utilizador está autenticado ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('bnlab_user');
        const storedAuth = localStorage.getItem('bnlab_auth');

        if (storedUser && storedAuth === 'true') {
          setState({
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simular chamada à API
      // Na versão real, isto chamaria o authService
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Validação básica
      if (!credentials.email || !credentials.password) {
        throw new Error('Email e palavra-passe são obrigatórios');
      }

      if (!credentials.email.includes('@')) {
        throw new Error('Email inválido');
      }

      if (credentials.password.length < 6) {
        throw new Error('Palavra-passe inválida');
      }

      // Mock login - aceitar qualquer email/password válida
      const user: User = {
        ...mockUser,
        email: credentials.email,
      };

      localStorage.setItem('bnlab_user', JSON.stringify(user));
      localStorage.setItem('bnlab_auth', 'true');
      localStorage.setItem('bnlab_token', 'mock-token-' + Date.now());

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bnlab_user');
    localStorage.removeItem('bnlab_auth');
    localStorage.removeItem('bnlab_token');

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...updates };
      localStorage.setItem('bnlab_user', JSON.stringify(updatedUser));

      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, []);

  return {
    ...state,
    login,
    logout,
    updateUser,
  };
}
