// Componente de card de ação
'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from './Card';

interface ActionCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
}) => {
  const content = (
    <div className="flex items-start gap-4">
      {icon && <div className="text-3xl flex-shrink-0">{icon}</div>}
      <div className="flex-grow">
        <h3 className="font-semibold text-text-light dark:text-text-dark mb-1">
          {title}
        </h3>
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {description}
        </p>
      </div>
      <div className="text-2xl flex-shrink-0 text-primary-500">→</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <Card hoverable clickable>
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card hoverable clickable onClick={onClick}>
      {content}
    </Card>
  );
};
