// Página de configurações (índice)
'use client';

import React from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, ActionCard } from '@/components';

export default function SettingsPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Faça sua configuração"
        description="Personalize os detalhes da sua conta e mantenha as suas informações actualizadas."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionCard
          icon="🔐"
          title="Alterar Palavra-passe"
          description="Altere a palavra-passe da sua conta de email."
          href="/settings/password"
        />
        <ActionCard
          icon="👤"
          title="Informações de Contacto"
          description="Mantenha os seus dados de contacto actualizados."
          href="/settings/contact"
        />
        <ActionCard
          icon="⚙️"
          title="Preferências"
          description="Personalize a sua experiência no BN Lab."
          href="/settings/preferences"
        />
      </div>
    </MainLayout>
  );
}
