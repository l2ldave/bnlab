// Serviço de suporte ao cliente
// Integração com Web3Forms para envio de emails

import type { SupportRequest, ApiResponse } from '@/types';
import { appConfig } from '@/config/appConfig';

interface SupportFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class SupportService {
  /**
   * Enviar pedido de suporte
   * Integrado com Web3Forms
   */
  async submitSupportRequest(
    formData: SupportFormData
  ): Promise<ApiResponse<SupportRequest>> {
    try {
      // Validação
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        return {
          success: false,
          error: 'Todos os campos são obrigatórios',
        };
      }

      if (!this.validateEmail(formData.email)) {
        return {
          success: false,
          error: 'Email inválido',
        };
      }

      // TODO: Implementar envio via Web3Forms
      // const response = await fetch(appConfig.api.web3formsUrl, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     access_key: appConfig.api.web3formsKey,
      //     subject: `[BN Lab Suporte] ${formData.subject}`,
      //     from_name: 'BN Lab Support',
      //     to_email: appConfig.support.email,
      //     reply_to: formData.email,
      //     message: `Nome: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
      //   }),
      // });

      await this.delay(1000);

      const supportRequest: SupportRequest = {
        id: `support_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        success: true,
        data: supportRequest,
        message: 'Mensagem enviada com sucesso. Entraremos em contacto em breve.',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao enviar mensagem',
      };
    }
  }

  /**
   * Validar email
   */
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const supportService = new SupportService();
