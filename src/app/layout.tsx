// Root layout
'use client';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components';
import '../styles/globals.css';

const metadata: Metadata = {
  title: 'BN Lab - Painel de Gestão de Email',
  description: 'Painel moderno e seguro para gestão de contas de email',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-MZ" suppressHydrationWarning>
      <body className="bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
