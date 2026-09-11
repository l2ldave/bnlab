// Serviço de autenticação
// Camada de abstração para operações de autenticação
// Preparado para integração futura com API real

import type { User, ApiResponse } from '@/types';
import { mockUser } from '@/data/mockData';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface ForgotPasswordRequest {
  fullName: string;
  accountEmail: string;
  recoveryEmail: string;
}

class AuthService {
  /**
   * Fazer login
   * @param credentials Email e password
   * @returns Utilizador e token
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      // TODO: Substituir por chamada real à API do cPanel
      // POST /api/auth/login
      // const response = await fetch(`${API_BASE_URL}/auth/login`, { ... })

      // Mock simulado
      await this.delay(800);

      if (!this.validateEmail(credentials.email)) {
        return {
          success: false,
          error: 'Email inválido',
        };
      }

      if (credentials.password.length < 6) {
        return {
          success: false,
          error: 'Credenciais inválidas',
        };
      }

      const user: User = {
        ...mockUser,
        email: credentials.email,
      };

      return {
        success: true,
        data: {
          user,
          token: `bearer_${Date.now()}`,
        },
        message: 'Login efectuado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao efectuar login',
      };
    }
  }

  /**
   * Fazer logout
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      // TODO: Substituir por chamada real à API
      // POST /api/auth/logout

      await this.delay(300);

      return {
        success: true,
        message: 'Logout efectuado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao fazer logout',
      };
    }
  }

  /**
   * Obter utilizador actual
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // TODO: GET /api/auth/me
      await this.delay(300);

      const storedUser = localStorage.getItem('bnlab_user');
      if (!storedUser) {
        return {
          success: false,
          error: 'Utilizador não autenticado',
        };
      }

      return {
        success: true,
        data: JSON.parse(storedUser),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter utilizador',
      };
    }
  }

  /**
   * Solicitação de recuperação de palavra-passe
   */
  async requestPasswordRecovery(
    request: ForgotPasswordRequest
  ): Promise<ApiResponse<null>> {
    try {
      // TODO: POST /api/auth/forgot-password
      // Integrar com Web3Forms para envio de email

      await this.delay(1000);

      if (!request.fullName || !request.accountEmail || !request.recoveryEmail) {
        return {
          success: false,
          error: 'Todos os campos são obrigatórios',
        };
      }

      if (!this.validateEmail(request.accountEmail) || !this.validateEmail(request.recoveryEmail)) {
        return {
          success: false,
          error: 'Email inválido',
        };
      }

      // Aqui seria enviado o email via Web3Forms
      // const web3formsResponse = await web3formsService.send({ ... })

      return {
        success: true,
        message: 'Pedido enviado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao processar pedido',
      };
    }
  }

  /**
   * Verificar se o utilizador está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = localStorage.getItem('bnlab_token');
      return !!token;
    } catch {
      return false;
    }
  }

  /**
   * Validar email
   */
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Delay para simular latência de rede
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const authService = new AuthService();
