// Componente de top navbar
'use client';

import React, { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ConfirmDialog } from './ConfirmDialog';

interface TopNavbarProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  userName,
  userEmail,
  onLogout,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <header className="hidden md:block bg-surface-light dark:bg-surface-dark-secondary border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-clay dark:shadow-clay-dark">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex-grow">
            <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
              Olá, <span className="font-semibold text-text-light dark:text-text-dark">{userName}</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <ThemeSwitcher />
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right">
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {userName}
                </p>
                <p className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary">
                  {userEmail}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Confirmar saída"
        message="Tem a certeza de que pretende terminar a sessão?"
        confirmText="Sair"
        cancelText="Cancelar"
        isDangerous
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
};
