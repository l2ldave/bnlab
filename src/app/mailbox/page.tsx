// Página de gestão de caixa (índice)
'use client';

import React from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, ActionCard } from '@/components';

export default function MailboxPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Gerir Caixa"
        description="Configure como os seus emails são recebidos, respondidos e encaminhados."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionCard
          icon="💬"
          title="Autorespostas"
          description="Configure mensagens automáticas quando estiver fora."
          href="/mailbox/autoresponders"
        />
        <ActionCard
          icon="🔍"
          title="Filtros de Email"
          description="Organize automaticamente os seus emails com regras personalizadas."
          href="/mailbox/filters"
        />
        <ActionCard
          icon="📤"
          title="Reencaminhamento"
          description="Encaminhe os seus emails para outro endereço automaticamente."
          href="/mailbox/forwarding"
        />
      </div>
    </MainLayout>
  );
}
