// Tipos principais da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: boolean;
}

export interface Mailbox {
  id: string;
  email: string;
  quota: number;
  used: number;
  messageCount: number;
  sentCount: number;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  groups: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactGroup {
  id: string;
  name: string;
  description?: string;
  color?: string;
  contactIds: string[];
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees?: string[];
  reminder?: number; // minutos antes
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

export interface Autoresponder {
  id: string;
  active: boolean;
  subject: string;
  message: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailFilter {
  id: string;
  name: string;
  active: boolean;
  conditions: FilterCondition[];
  actions: FilterAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterCondition {
  field: 'from' | 'to' | 'subject' | 'body';
  operator: 'contains' | 'equals' | 'starts_with' | 'ends_with';
  value: string;
}

export interface FilterAction {
  type: 'move' | 'mark_read' | 'delete' | 'forward' | 'add_label';
  value?: string;
}

export interface Forwarder {
  id: string;
  destinationEmail: string;
  active: boolean;
  keepCopy: boolean;
  createdAt: Date;
}

export interface SpamSettings {
  id: string;
  level: 'low' | 'normal' | 'high';
  moveToSpam: boolean;
  autoDelete: boolean;
  markSuspicious: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpamTrapRule {
  id: string;
  active: boolean;
  pattern: string;
  description?: string;
  blockedCount: number;
  lastActivity?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailConfiguration {
  imap: {
    server: string;
    port: number;
    security: 'SSL/TLS' | 'STARTTLS';
    username: string;
  };
  pop3: {
    server: string;
    port: number;
    security: 'SSL/TLS' | 'STARTTLS';
    username: string;
  };
  smtp: {
    server: string;
    port: number;
    security: 'SSL/TLS' | 'STARTTLS';
    username: string;
  };
}

export interface SupportRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
  loading: boolean;
  error: string | null;
}
