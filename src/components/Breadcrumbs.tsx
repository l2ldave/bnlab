// Componente de breadcrumbs
'use client';

import React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-light-secondary dark:text-text-dark-secondary">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
