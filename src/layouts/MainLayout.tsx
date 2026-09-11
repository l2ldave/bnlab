// Layout principal para páginas autenticadas
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { Sidebar, TopNavbar } from '@/components/layout';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface MainLayoutProps {
  children: React.ReactNode;
  navSections?: NavSection[];
}

const defaultNavSections: NavSection[] = [
  {
    title: 'Menu Principal',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: '📊' },
      { label: 'Faça sua configuração', href: '/settings', icon: '⚙️' },
    ],
  },
  {
    title: 'Gestão',
    items: [
      { label: 'Gerir Caixa', href: '/mailbox', icon: '📧' },
      { label: 'Calendário e Contactos', href: '/contacts', icon: '👥' },
      { label: 'Spam', href: '/spam', icon: '🚫' },
    ],
  },
  {
    title: 'Configuração',
    items: [
      { label: 'Clientes de Email', href: '/email-client', icon: '💻' },
      { label: 'Suporte', href: '/support', icon: '🆘' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Política de Privacidade', href: '/privacy', icon: '🔒' },
      { label: 'Termos e Condições', href: '/terms', icon: '📋' },
    ],
  },
];

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  navSections = defaultNavSections,
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-surface-light-secondary dark:bg-surface-dark">
      {/* Sidebar */}
      <Sidebar
        sections={navSections}
        onLogout={handleLogout}
        userName={user.name}
        userEmail={user.email}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar
          userName={user.name}
          userEmail={user.email}
          onLogout={handleLogout}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
