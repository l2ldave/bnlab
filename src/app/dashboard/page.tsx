// Página de dashboard
'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, StatCard, ActionCard, Card, LoadingState, ErrorState } from '@/components';
import { useAuth } from '@/hooks';
import { mockMailbox } from '@/data/mockData';

const formatBytes = (bytes: number) => {
  const gb = bytes / (1024 * 1024 * 1024);
  return gb.toFixed(1) + ' GB';
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingState message="Carregando painel..." />
      </MainLayout>
    );
  }

  const usagePercentage = (mockMailbox.used / mockMailbox.quota) * 100;

  return (
    <MainLayout>
      <PageHeader
        title={`Olá, ${user?.name.split(' ')[0]}`}
        description="Aqui pode gerir a sua conta de email de forma simples e segura."
      />

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon="📧"
          label="Conta de Email"
          value={user?.email || 'N/A'}
        />
        <StatCard
          icon="💾"
          label="Espaço Utilizado"
          value={`${formatBytes(mockMailbox.used)} / ${formatBytes(mockMailbox.quota)}`}
          description={`${usagePercentage.toFixed(0)}% utilizado`}
        />
        <StatCard
          icon="📬"
          label="Emails Recebidos"
          value={mockMailbox.messageCount.toLocaleString('pt-MZ')}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          icon="📤"
          label="Emails Enviados"
          value={mockMailbox.sentCount.toLocaleString('pt-MZ')}
          trend="up"
          trendValue="+5%"
        />
      </div>

      {/* Acesso Rápido */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            icon="🔐"
            title="Alterar Palavra-passe"
            description="Mantenha a sua conta protegida."
            href="/settings/password"
          />
          <ActionCard
            icon="📨"
            title="Autorespostas"
            description="Configure mensagens automáticas."
            href="/mailbox/autoresponders"
          />
          <ActionCard
            icon="🔍"
            title="Filtros de Email"
            description="Organize os seus emails."
            href="/mailbox/filters"
          />
          <ActionCard
            icon="💻"
            title="Configurar Cliente"
            description="Instruções para Outlook, Gmail, etc."
            href="/email-client"
          />
          <ActionCard
            icon="🛡️"
            title="Controlo de Spam"
            description="Reduza emails indesejados."
            href="/spam"
          />
          <ActionCard
            icon="📞"
            title="Suporte"
            description="Contacte o nosso suporte."
            href="/support"
          />
        </div>
      </div>

      {/* Actividade Recente */}
      <div>
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          Actividade Recente
        </h2>
        <Card>
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-text-light dark:text-text-dark">
                  Palavra-passe alterada
                </p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Há 2 dias
                </p>
              </div>
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-text-light dark:text-text-dark">
                  Filtro de email criado
                </p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Há 5 dias
                </p>
              </div>
              <span className="text-blue-600 dark:text-blue-400">+</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-text-light dark:text-text-dark">
                  Login efectuado
                </p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Há 1 hora
                </p>
              </div>
              <span className="text-primary-600 dark:text-primary-400">→</span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
