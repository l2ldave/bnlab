// Dados simulados para desenvolvimento
// Substituir com dados reais via API do cPanel

import type {
  User,
  Mailbox,
  Contact,
  ContactGroup,
  CalendarEvent,
  Autoresponder,
  EmailFilter,
  Forwarder,
  SpamSettings,
  SpamTrapRule,
  EmailConfiguration,
} from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@empresa.co.mz',
  avatar: undefined,
  preferences: {
    theme: 'system',
    language: 'pt-MZ',
    timezone: 'Africa/Maputo',
    dateFormat: 'DD/MM/YYYY',
    notifications: true,
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-09-11'),
};

export const mockMailbox: Mailbox = {
  id: '1',
  email: 'joao.silva@empresa.co.mz',
  quota: 10 * 1024 * 1024 * 1024, // 10 GB em bytes
  used: 2.4 * 1024 * 1024 * 1024, // 2.4 GB em bytes
  messageCount: 1248,
  sentCount: 684,
  createdAt: new Date('2024-01-15'),
};

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Maria Santos',
    email: 'maria@empresa.com',
    phone: '+258 84 123 4567',
    company: 'Empresa A',
    notes: 'Contacto importante',
    groups: ['clientes'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-09-01'),
  },
  {
    id: '2',
    name: 'Pedro Costa',
    email: 'pedro@empresa.com',
    phone: '+258 82 987 6543',
    company: 'Empresa B',
    notes: '',
    groups: ['equipa'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-09-01'),
  },
  {
    id: '3',
    name: 'Ana Ferreira',
    email: 'ana@fornecedor.com',
    phone: '+258 85 555 5555',
    company: 'Fornecedor XYZ',
    notes: 'Fornecedor de equipamento',
    groups: ['fornecedores'],
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-09-01'),
  },
];

export const mockContactGroups: ContactGroup[] = [
  {
    id: '1',
    name: 'Clientes',
    description: 'Contactos de clientes',
    color: '#f97316',
    contactIds: ['1'],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    name: 'Equipa',
    description: 'Membros da equipa',
    color: '#3b82f6',
    contactIds: ['2'],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Fornecedores',
    description: 'Fornecedores e parceiros',
    color: '#10b981',
    contactIds: ['3'],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: 'Família',
    description: 'Contactos familiares',
    color: '#8b5cf6',
    contactIds: [],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '5',
    name: 'Outros',
    description: 'Outros contactos',
    color: '#6b7280',
    contactIds: [],
    createdAt: new Date('2024-02-01'),
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Reunião com cliente',
    description: 'Discussão sobre novo projecto',
    startDate: new Date('2024-09-15T10:00:00'),
    endDate: new Date('2024-09-15T11:00:00'),
    location: 'Sala de conferência',
    attendees: ['maria@empresa.com'],
    reminder: 15,
    recurring: 'none',
    createdAt: new Date('2024-09-11'),
    updatedAt: new Date('2024-09-11'),
  },
  {
    id: '2',
    title: 'Standup diário',
    description: 'Reunião rápida com a equipa',
    startDate: new Date('2024-09-12T09:00:00'),
    endDate: new Date('2024-09-12T09:30:00'),
    location: 'Online',
    attendees: ['pedro@empresa.com'],
    reminder: 10,
    recurring: 'daily',
    createdAt: new Date('2024-09-11'),
    updatedAt: new Date('2024-09-11'),
  },
];

export const mockAutoresponder: Autoresponder = {
  id: '1',
  active: false,
  subject: 'Fora do escritório',
  message: 'Obrigado pela sua mensagem. Estarei fora do escritório até 15 de Setembro.',
  startDate: new Date('2024-09-12'),
  endDate: new Date('2024-09-15'),
  createdAt: new Date('2024-09-11'),
  updatedAt: new Date('2024-09-11'),
};

export const mockEmailFilters: EmailFilter[] = [
  {
    id: '1',
    name: 'Newsletters automáticas',
    active: true,
    conditions: [
      {
        field: 'subject',
        operator: 'contains',
        value: 'newsletter',
      },
    ],
    actions: [
      {
        type: 'move',
        value: 'Newsletters',
      },
    ],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-09-01'),
  },
  {
    id: '2',
    name: 'Facturas para pasta',
    active: true,
    conditions: [
      {
        field: 'subject',
        operator: 'contains',
        value: 'factura',
      },
    ],
    actions: [
      {
        type: 'move',
        value: 'Facturas',
      },
    ],
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-09-01'),
  },
];

export const mockForwarders: Forwarder[] = [
  {
    id: '1',
    destinationEmail: 'joao.personal@gmail.com',
    active: true,
    keepCopy: true,
    createdAt: new Date('2024-06-01'),
  },
  {
    id: '2',
    destinationEmail: 'joao@outlook.com',
    active: false,
    keepCopy: false,
    createdAt: new Date('2024-05-01'),
  },
];

export const mockSpamSettings: SpamSettings = {
  id: '1',
  level: 'normal',
  moveToSpam: true,
  autoDelete: false,
  markSuspicious: true,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-09-01'),
};

export const mockSpamTrapRules: SpamTrapRule[] = [
  {
    id: '1',
    active: true,
    pattern: '.*@spam-domain.com',
    description: 'Bloqueia domínio de spam conhecido',
    blockedCount: 245,
    lastActivity: new Date('2024-09-10'),
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-09-10'),
  },
  {
    id: '2',
    active: true,
    pattern: 'viagra|cialis|casino',
    description: 'Palavras-chave comuns de spam',
    blockedCount: 1203,
    lastActivity: new Date('2024-09-11'),
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-09-11'),
  },
];

export const mockEmailConfiguration: EmailConfiguration = {
  imap: {
    server: 'imap.empresa.co.mz',
    port: 993,
    security: 'SSL/TLS',
    username: 'joao.silva@empresa.co.mz',
  },
  pop3: {
    server: 'pop3.empresa.co.mz',
    port: 995,
    security: 'SSL/TLS',
    username: 'joao.silva@empresa.co.mz',
  },
  smtp: {
    server: 'smtp.empresa.co.mz',
    port: 587,
    security: 'STARTTLS',
    username: 'joao.silva@empresa.co.mz',
  },
};
