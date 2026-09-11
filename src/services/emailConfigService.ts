// Serviço de configuração de email (IMAP, POP3, SMTP)

import type { EmailConfiguration, ApiResponse } from '@/types';
import { mockEmailConfiguration } from '@/data/mockData';

class EmailConfigService {
  /**
   * Obter configuração de email
   */
  async getEmailConfiguration(): Promise<ApiResponse<EmailConfiguration>> {
    try {
      // TODO: GET /api/email-config
      await this.delay(400);
      return {
        success: true,
        data: mockEmailConfiguration,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar configuração',
      };
    }
  }

  /**
   * Descarregar perfil de configuração automática
   * Tipos suportados: apple-mail, outlook, thunderbird, android, ios
   */
  async downloadEmailProfile(profileType: string): Promise<ApiResponse<Blob>> {
    try {
      // TODO: GET /api/email-config/download/:type
      await this.delay(800);

      const content = this.generateConfigFile(profileType);
      const blob = new Blob([content], { type: 'text/plain' });

      return {
        success: true,
        data: blob,
        message: 'Ficheiro descarregado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao descarregar ficheiro',
      };
    }
  }

  /**
   * Gerar conteúdo do ficheiro de configuração
   */
  private generateConfigFile(profileType: string): string {
    const config = mockEmailConfiguration;

    switch (profileType) {
      case 'apple-mail':
        return this.generateAppleMailConfig(config);
      case 'outlook':
        return this.generateOutlookConfig(config);
      case 'thunderbird':
        return this.generateThunderbirdConfig(config);
      default:
        return JSON.stringify(config, null, 2);
    }
  }

  private generateAppleMailConfig(config: EmailConfiguration): string {
    return `
Configuração para Apple Mail
==============================

IMAP:
- Servidor: ${config.imap.server}
- Porta: ${config.imap.port}
- Segurança: ${config.imap.security}
- Utilizador: ${config.imap.username}

SMTP:
- Servidor: ${config.smtp.server}
- Porta: ${config.smtp.port}
- Segurança: ${config.smtp.security}
- Utilizador: ${config.smtp.username}
    `;
  }

  private generateOutlookConfig(config: EmailConfiguration): string {
    return `
Configuração para Outlook
==========================

IMAP:
- Servidor: ${config.imap.server}
- Porta: ${config.imap.port}
- Segurança: ${config.imap.security}
- Utilizador: ${config.imap.username}

SMTP:
- Servidor: ${config.smtp.server}
- Porta: ${config.smtp.port}
- Segurança: ${config.smtp.security}
- Utilizador: ${config.smtp.username}
    `;
  }

  private generateThunderbirdConfig(config: EmailConfiguration): string {
    return `
Configuração para Thunderbird
==============================

IMAP:
- Servidor: ${config.imap.server}
- Porta: ${config.imap.port}
- Segurança: ${config.imap.security}
- Utilizador: ${config.imap.username}

SMTP:
- Servidor: ${config.smtp.server}
- Porta: ${config.smtp.port}
- Segurança: ${config.smtp.security}
- Utilizador: ${config.smtp.username}
    `;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const emailConfigService = new EmailConfigService();
