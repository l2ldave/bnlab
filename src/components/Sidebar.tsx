// Componente de sidebar/navegação
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface SidebarProps {
  sections: NavSection[];
  onLogout: () => void;
  userName: string;
  userEmail: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  onLogout,
  userName,
  userEmail,
}) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          BN Lab
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-text-light dark:text-text-dark truncate">
              {userName}
            </p>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto p-4">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {section.title && (
              <p className="text-xs font-semibold text-text-light-tertiary dark:text-text-dark-tertiary uppercase tracking-wider px-3 mb-3">
                {section.title}
              </p>
            )}
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-clay transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-primary-500 text-white shadow-clay-hover'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light-secondary dark:hover:bg-surface-dark-tertiary'
                  )}
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span className="flex-grow text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onLogout}
          className="w-full px-3 py-2 rounded-clay bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 transition-all duration-200 text-sm font-medium"
        >
          🚪 Sair
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-surface-light dark:bg-surface-dark-secondary border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-clay bg-primary-500 text-white shadow-clay-hover"
      >
        ☰
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface-light dark:bg-surface-dark-secondary z-40 md:hidden overflow-y-auto shadow-clay-hover">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};
