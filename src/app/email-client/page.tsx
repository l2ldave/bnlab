// Página de configuração de email (IMAP, POP3, SMTP)
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, LoadingState, StatCard } from '@/components';
import { useToast } from '@/hooks';
import { emailConfigService } from '@/services';
import type { EmailConfiguration } from '@/types';

export default function EmailClientPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState<EmailConfiguration | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await emailConfigService.getEmailConfiguration();
        if (response.success && response.data) {
          setConfig(response.data);
        }
      } catch (error) {
        showToast('Erro ao carregar configuração', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    showToast('Configuração copiada', 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  if (isLoading || !config) {
    return (
      <MainLayout>
        <LoadingState />
      </MainLayout>
    );
  }

  const configSections = [
    {
      title: 'IMAP',
      description: 'Sincronizar emails entre vários dispositivos',
      data: config.imap,
      fields: ['server', 'port', 'security', 'username'],
      id: 'imap',
    },
    {
      title: 'POP3',
      description: 'Descarregar emails para um cliente de email',
      data: config.pop3,
      fields: ['server', 'port', 'security', 'username'],
      id: 'pop3',
    },
    {
      title: 'SMTP',
      description: 'Enviar emails através de um cliente de email',
      data: config.smtp,
      fields: ['server', 'port', 'security', 'username'],
      id: 'smtp',
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Clientes de Email"
        description="Configure como os seus emails são recebidos, respondidos e encaminhados."
      />

      {/* Clientes Populares */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          Clientes Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Apple Mail', icon: '🍎', type: 'apple-mail' },
            { name: 'Outlook', icon: '💼', type: 'outlook' },
            { name: 'Thunderbird', icon: '🐦', type: 'thunderbird' },
            { name: 'Gmail', icon: '📧', type: 'gmail' },
            { name: 'Android', icon: '🤖', type: 'android' },
            { name: 'iPhone/iPad', icon: '📱', type: 'ios' },
          ].map((client) => (
            <Card key={client.type} hoverable clickable>
              <div className="text-center">
                <div className="text-4xl mb-4">{client.icon}</div>
                <p className="font-semibold text-text-light dark:text-text-dark mb-2">
                  {client.name}
                </p>
                <Button variant="secondary" size="sm">
                  Instruções
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Configurações Técnicas */}
      <div>
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          Configurações Técnicas
        </h2>
        <div className="space-y-6">
          {configSections.map((section) => (
            <Card key={section.id}>
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-6">
                {section.description}
              </p>

              <div className="space-y-3 mb-6 font-mono text-sm">
                <div className="bg-surface-light-secondary dark:bg-surface-dark-tertiary p-4 rounded-clay">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-text-light dark:text-text-dark">
                      Servidor: <span className="font-semibold">{section.data.server}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-text-light dark:text-text-dark">
                      Porta: <span className="font-semibold">{section.data.port}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-text-light dark:text-text-dark">
                      Segurança: <span className="font-semibold">{section.data.security}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-light dark:text-text-dark">
                      Utilizador: <span className="font-semibold">{section.data.username}</span>
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `Servidor: ${section.data.server}\nPorta: ${section.data.port}\nSegurança: ${section.data.security}\nUtilizador: ${section.data.username}`,
                    section.id
                  )
                }
              >
                {copiedSection === section.id ? '✓ Copiado' : '📋 Copiar Configuração'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
