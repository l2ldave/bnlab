// Serviço de contactos e calendário

import type {
  Contact,
  ContactGroup,
  CalendarEvent,
  ApiResponse,
} from '@/types';
import {
  mockContacts,
  mockContactGroups,
  mockCalendarEvents,
} from '@/data/mockData';

class ContactCalendarService {
  /**
   * Obter todos os contactos
   */
  async getContacts(): Promise<ApiResponse<Contact[]>> {
    try {
      // TODO: GET /api/contacts
      await this.delay(500);
      return {
        success: true,
        data: mockContacts,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar contactos',
      };
    }
  }

  /**
   * Criar contacto
   */
  async createContact(contact: Contact): Promise<ApiResponse<Contact>> {
    try {
      // TODO: POST /api/contacts
      await this.delay(600);

      if (!contact.name || !contact.email) {
        return {
          success: false,
          error: 'Nome e email são obrigatórios',
        };
      }

      return {
        success: true,
        data: contact,
        message: 'Contacto criado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar contacto',
      };
    }
  }

  /**
   * Actualizar contacto
   */
  async updateContact(contact: Contact): Promise<ApiResponse<Contact>> {
    try {
      // TODO: PUT /api/contacts/:id
      await this.delay(600);
      return {
        success: true,
        data: contact,
        message: 'Contacto actualizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao actualizar contacto',
      };
    }
  }

  /**
   * Eliminar contacto
   */
  async deleteContact(contactId: string): Promise<ApiResponse<null>> {
    try {
      // TODO: DELETE /api/contacts/:id
      await this.delay(500);
      return {
        success: true,
        message: 'Contacto eliminado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao eliminar contacto',
      };
    }
  }

  /**
   * Obter grupos de contactos
   */
  async getContactGroups(): Promise<ApiResponse<ContactGroup[]>> {
    try {
      // TODO: GET /api/contact-groups
      await this.delay(400);
      return {
        success: true,
        data: mockContactGroups,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar grupos',
      };
    }
  }

  /**
   * Obter eventos do calendário
   */
  async getCalendarEvents(): Promise<ApiResponse<CalendarEvent[]>> {
    try {
      // TODO: GET /api/calendar/events
      await this.delay(500);
      return {
        success: true,
        data: mockCalendarEvents,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar eventos',
      };
    }
  }

  /**
   * Criar evento no calendário
   */
  async createCalendarEvent(event: CalendarEvent): Promise<ApiResponse<CalendarEvent>> {
    try {
      // TODO: POST /api/calendar/events
      await this.delay(600);

      if (!event.title || !event.startDate || !event.endDate) {
        return {
          success: false,
          error: 'Título e datas são obrigatórios',
        };
      }

      return {
        success: true,
        data: event,
        message: 'Evento criado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar evento',
      };
    }
  }

  /**
   * Actualizar evento
   */
  async updateCalendarEvent(event: CalendarEvent): Promise<ApiResponse<CalendarEvent>> {
    try {
      // TODO: PUT /api/calendar/events/:id
      await this.delay(600);
      return {
        success: true,
        data: event,
        message: 'Evento actualizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao actualizar evento',
      };
    }
  }

  /**
   * Eliminar evento
   */
  async deleteCalendarEvent(eventId: string): Promise<ApiResponse<null>> {
    try {
      // TODO: DELETE /api/calendar/events/:id
      await this.delay(500);
      return {
        success: true,
        message: 'Evento eliminado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao eliminar evento',
      };
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const contactCalendarService = new ContactCalendarService();
