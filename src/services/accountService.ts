// Serviço de gestão de conta
// Informações pessoais, preferências, senha

import type { User, UserPreferences, ApiResponse } from '@/types';
import { mockUser } from '@/data/mockData';

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class AccountService {
  /**
   * Obter informações de contacto
   */
  async getContactInformation(): Promise<ApiResponse<User>> {
    try {
      // TODO: GET /api/account/contact-info
      await this.delay(400);
      return {
        success: true,
        data: mockUser,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar informações de contacto',
      };
    }
  }

  /**
   * Actualizar informações de contacto
   */
  async updateContactInformation(updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      // TODO: PUT /api/account/contact-info
      await this.delay(600);

      if (!updates.name || !updates.email) {
        return {
          success: false,
          error: 'Nome e email são obrigatórios',
        };
      }

      const updated = { ...mockUser, ...updates };
      return {
        success: true,
        data: updated,
        message: 'Informações actualizadas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao actualizar informações',
      };
    }
  }

  /**
   * Obter preferências de conta
   */
  async getPreferences(): Promise<ApiResponse<UserPreferences>> {
    try {
      // TODO: GET /api/account/preferences
      await this.delay(400);
      return {
        success: true,
        data: mockUser.preferences,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar preferências',
      };
    }
  }

  /**
   * Actualizar preferências de conta
   */
  async updatePreferences(
    preferences: Partial<UserPreferences>
  ): Promise<ApiResponse<UserPreferences>> {
    try {
      // TODO: PUT /api/account/preferences
      await this.delay(600);

      const updated = { ...mockUser.preferences, ...preferences };
      return {
        success: true,
        data: updated,
        message: 'Preferências actualizadas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao actualizar preferências',
      };
    }
  }

  /**
   * Alterar palavra-passe
   */
  async changePassword(request: ChangePasswordRequest): Promise<ApiResponse<null>> {
    try {
      // TODO: POST /api/account/change-password
      await this.delay(800);

      if (!request.currentPassword || !request.newPassword || !request.confirmPassword) {
        return {
          success: false,
          error: 'Todos os campos são obrigatórios',
        };
      }

      if (request.newPassword !== request.confirmPassword) {
        return {
          success: false,
          error: 'As palavras-passe não coincidem',
        };
      }

      if (request.newPassword.length < 8) {
        return {
          success: false,
          error: 'A palavra-passe deve ter pelo menos 8 caracteres',
        };
      }

      // Validar força da palavra-passe
      if (!this.isPasswordStrong(request.newPassword)) {
        return {
          success: false,
          error:
            'A palavra-passe deve conter maiúsculas, minúsculas e números',
        };
      }

      return {
        success: true,
        message: 'Palavra-passe alterada com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao alterar palavra-passe',
      };
    }
  }

  /**
   * Validar força da palavra-passe
   */
  private isPasswordStrong(password: string): boolean {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return hasUppercase && hasLowercase && hasNumbers;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const accountService = new AccountService();
