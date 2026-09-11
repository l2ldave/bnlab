// Página de controlo de spam
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Toggle, StatusBadge, LoadingState, EmptyState } from '@/components';
import { useToast } from '@/hooks';
import { spamService } from '@/services';
import type { SpamSettings, SpamTrapRule } from '@/types';

export default function SpamPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [spamSettings, setSpamSettings] = useState<SpamSettings | null>(null);
  const [spamTrapRules, setSpamTrapRules] = useState<SpamTrapRule[]>([]);
  const [settings, setSettings] = useState({
    level: 'normal' as 'low' | 'normal' | 'high',
    moveToSpam: true,
    autoDelete: false,
    markSuspicious: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [settingsResponse, rulesResponse] = await Promise.all([
          spamService.getSpamSettings(),
          spamService.getSpamTrapRules(),
        ]);

        if (settingsResponse.success && settingsResponse.data) {
          setSpamSettings(settingsResponse.data);
          setSettings({
            level: settingsResponse.data.level,
            moveToSpam: settingsResponse.data.moveToSpam,
            autoDelete: settingsResponse.data.autoDelete,
            markSuspicious: settingsResponse.data.markSuspicious,
          });
        }

        if (rulesResponse.success && rulesResponse.data) {
          setSpamTrapRules(rulesResponse.data);
        }
      } catch (error) {
        showToast('Erro ao carregar configurações de spam', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);

    const response = await spamService.updateSpamSettings({
      id: spamSettings?.id || '',
      level: settings.level,
      moveToSpam: settings.moveToSpam,
      autoDelete: settings.autoDelete,
      markSuspicious: settings.markSuspicious,
      createdAt: spamSettings?.createdAt || new Date(),
      updatedAt: new Date(),
    });

    setIsSaving(false);

    if (response.success) {
      showToast('Configurações atualizadas com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao salvar configurações', 'error');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingState />
      </MainLayout>
    );
  }

  const levelDescriptions = {
    low: 'Apenas bloqueia emails extremamente suspeitos',
    normal: 'Equilíbrio entre segurança e recepção de emails legítimos',
    high: 'Bloqueia agressivamente qualquer email potencialmente indesejado',
  };

  return (
    <MainLayout>
      <PageHeader
        title="Controlo de Spam"
        description="Controle mensagens indesejadas e reduza emails potencialmente perigosos."
      />

      {/* Filtros de Spam */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          Filtros de Spam
        </h2>
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                Nível de Filtragem
              </h3>
              <div className="space-y-3">
                {(['low', 'normal', 'high'] as const).map((level) => (
                  <label key={level} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={settings.level === level}
                      onChange={(e) => setSettings({ ...settings, level: e.target.value as 'low' | 'normal' | 'high' })}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-text-light dark:text-text-dark capitalize">
                        {level === 'low' ? 'Baixo' : level === 'normal' ? 'Normal' : 'Alto'}
                      </p>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {levelDescriptions[level]}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <Toggle
                checked={settings.moveToSpam}
                onChange={(e) => setSettings({ ...settings, moveToSpam: e.target.checked })}
                label="Mover para pasta Spam"
                description="Emails detectados como spam serão movidos automaticamente"
              />
            </div>

            <Toggle
              checked={settings.autoDelete}
              onChange={(e) => setSettings({ ...settings, autoDelete: e.target.checked })}
              label="Eliminar automaticamente"
              description="Emails de spam serão permanentemente eliminados"
            />

            <Toggle
              checked={settings.markSuspicious}
              onChange={(e) => setSettings({ ...settings, markSuspicious: e.target.checked })}
              label="Marcar como suspeito"
              description="Emails questionavelmente spam serão marcados para sua revisão"
            />

            <Button variant="primary" isLoading={isSaving} onClick={handleSaveSettings}>
              Guardar Configurações de Spam
            </Button>
          </div>
        </Card>
      </div>

      {/* Spam Trap */}
      <div>
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          Spam Trap
        </h2>
        <Card className="mb-6">
          <div className="mb-6">
            <p className="text-text-light dark:text-text-dark mb-3">
              <strong>O que é Spam Trap?</strong>
            </p>
            <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
              O Spam Trap é um sistema de detecção avançado que identifica e bloqueia emails não solicitados. Utiliza padrões e regras para detectar mensagens indesejadas antes de chegarem à sua caixa de entrada.
            </p>
          </div>

          {spamTrapRules.length === 0 ? (
            <EmptyState
              icon="🚫"
              title="Nenhuma regra de Spam Trap activa"
              description="As regras padrão do sistema estão a proteger a sua conta."
            />
          ) : (
            <div className="space-y-4">
              {spamTrapRules.map((rule) => (
                <Card key={rule.id} className="bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-text-light dark:text-text-dark">
                          {rule.description}
                        </p>
                        <StatusBadge
                          status={rule.active ? 'active' : 'inactive'}
                          text={rule.active ? 'Ativa' : 'Inativa'}
                        />
                      </div>
                      <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary font-mono mb-2">
                        {rule.pattern}
                      </p>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        🚫 {rule.blockedCount} mensagens bloqueadas
                      </p>
                      {rule.lastActivity && (
                        <p className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary">
                          Última actividade: {rule.lastActivity.toLocaleDateString('pt-MZ')}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
