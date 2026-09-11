// Configuração centralizada da aplicação BN Lab
// Todas as constantes e URLs devem ser definidas aqui

export const appConfig = {
  // Identificação da aplicação
  app: {
    name: 'BN Lab',
    description: 'Painel de Gestão de Contas de Email',
    version: '1.0.0',
    author: 'BN Lab Team',
  },

  // Tema
  theme: {
    default: 'system', // 'light', 'dark', 'system'
    enableToggle: true,
  },

  // URLs de API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    cpanelUrl: process.env.NEXT_PUBLIC_CPANEL_API_URL || 'https://api.cpanel.com',
    web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '',
    web3formsUrl: 'https://api.web3forms.com/submit',
  },

  // Contactos de suporte
  support: {
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'suporte@bnlab.co.mz',
    phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+258 21 123 456',
    whatsapp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+258 84 123 456',
    hours: process.env.NEXT_PUBLIC_SUPPORT_HOURS || 'Seg-Sex: 08:00 - 18:00',
  },

  // Configurações de segurança
  security: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutos em ms
    passwordMinLength: 8,
    passwordRequirements: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      specialChars: false,
    },
  },

  // Paginação padrão
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // Idioma
  language: {
    default: 'pt-MZ',
    supported: ['pt-MZ'],
  },

  // Formatos
  formats: {
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    timezone: 'Africa/Maputo',
  },
} as const;

export type AppConfig = typeof appConfig;
