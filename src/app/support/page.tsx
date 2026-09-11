// Página de suporte
'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, LoadingState } from '@/components';
import { useToast } from '@/hooks';
import { supportService } from '@/services';
import { appConfig } from '@/config/appConfig';

export default function SupportPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Email válido é obrigatório';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const response = await supportService.submitSupportRequest(formData);

    setIsLoading(false);

    if (response.success) {
      setSubmitted(true);
      showToast('Mensagem enviada com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao enviar mensagem', 'error');
    }
  };

  if (submitted) {
    return (
      <MainLayout>
        <PageHeader title="Contacto" description="Entraremos em contacto em breve" />
        <Card className="max-w-2xl">
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-2">
              Mensagem Enviada com Sucesso
            </h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6">
              Obrigado pela sua mensagem. Analisaremos o seu pedido e entraremos em contacto
              em breve através do endereço {formData.email}.
            </p>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Enviar Outra Mensagem
            </Button>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Contacto"
        description="Precisa de ajuda? Entre em contacto com o nosso suporte."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nome Completo"
                placeholder="João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="seu.email@empresa.co.mz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                required
              />

              <Input
                label="Assunto"
                placeholder="Descreva brevemente o seu problema"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                error={errors.subject}
                required
              />

              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Descreva com detalhe o seu problema..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary text-text-light dark:text-text-dark border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 focus:outline-none shadow-clay transition-all duration-200 resize-none"
                  rows={6}
                  required
                />
                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>

        {/* Informações de Contacto */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
              Informações de Contacto
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                  📧 Email
                </p>
                <a
                  href={`mailto:${appConfig.support.email}`}
                  className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {appConfig.support.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                  📞 Telefone
                </p>
                <a
                  href={`tel:${appConfig.support.phone}`}
                  className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {appConfig.support.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                  💬 WhatsApp
                </p>
                <a
                  href={`https://wa.me/${appConfig.support.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {appConfig.support.whatsapp}
                </a>
              </div>
              <div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                  🕐 Horário de Atendimento
                </p>
                <p className="font-medium text-text-light dark:text-text-dark">
                  {appConfig.support.hours}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
              Perguntas Frequentes
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                • Como altero a minha palavra-passe?
              </p>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                • Como configuro um cliente de email?
              </p>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                • Como crio filtros de email?
              </p>
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                • Como encaminho emails?
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
