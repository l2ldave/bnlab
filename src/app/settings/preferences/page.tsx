// Página de preferências de conta
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Toggle, LoadingState } from '@/components';
import { useToast, useAuth } from '@/hooks';
import { useTheme } from '@/hooks';
import { accountService } from '@/services';

export default function PreferencesPage() {
  const { showToast } = useToast();
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: theme as 'light' | 'dark' | 'system',
    language: 'pt-MZ',
    timezone: 'Africa/Maputo',
    dateFormat: 'DD/MM/YYYY',
    notifications: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await accountService.getPreferences();
        if (response.success && response.data) {
          setPreferences(response.data);
        }
      } catch (error) {
        showToast('Erro ao carregar preferências', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setPreferences({ ...preferences, theme: newTheme });
    setTheme(newTheme);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    const response = await accountService.updatePreferences({
      theme: preferences.theme,
      language: preferences.language,
      timezone: preferences.timezone,
      dateFormat: preferences.dateFormat,
      notifications: preferences.notifications,
    });

    setIsSaving(false);

    if (response.success) {
      if (user) {
        updateUser({ preferences: response.data });
      }
      showToast('Preferências actualizadas com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao actualizar preferências', 'error');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingState />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Preferências de Conta"
        description="Personalize a sua experiência no BN Lab."
      />

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tema */}
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                Tema
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={preferences.theme === 'light'}
                    onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-light dark:text-text-dark">☀️ Claro</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={preferences.theme === 'dark'}
                    onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-light dark:text-text-dark">🌙 Escuro</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="system"
                    checked={preferences.theme === 'system'}
                    onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-light dark:text-text-dark">💻 Automático</span>
                </label>
              </div>
            </div>

            {/* Idioma */}
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                Idioma
              </h3>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full px-4 py-2 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 text-text-light dark:text-text-dark"
              >
                <option value="pt-MZ">Português (Moçambique)</option>
              </select>
            </div>

            {/* Fuso Horário */}
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                Fuso Horário
              </h3>
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                className="w-full px-4 py-2 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 text-text-light dark:text-text-dark"
              >
                <option value="Africa/Maputo">Africa/Maputo (CAT)</option>
                <option value="UTC">UTC</option>
                <option value="Africa/Johannesburg">Africa/Johannesburg (SAST)</option>
              </select>
            </div>

            {/* Formato de Data */}
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                Formato de Data
              </h3>
              <select
                value={preferences.dateFormat}
                onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                className="w-full px-4 py-2 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 text-text-light dark:text-text-dark"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            {/* Notificações */}
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                Notificações
              </h3>
              <Toggle
                checked={preferences.notifications}
                onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                label="Ativar notificações por email"
                description="Receba alertas sobre actividade importante na sua conta"
              />
            </div>

            <Button type="submit" variant="primary" isLoading={isSaving}>
              Guardar Preferências
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
