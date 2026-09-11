// Página de recuperação de palavra-passe
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/layouts';
import { Input, Button } from '@/components';
import { useToast } from '@/hooks';
import { authService } from '@/services';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    accountEmail: '',
    recoveryEmail: '',
  });
  const [errors, setErrors] = useState({ fullName: '', accountEmail: '', recoveryEmail: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = { fullName: '', accountEmail: '', recoveryEmail: '' };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
      isValid = false;
    }

    if (!formData.accountEmail || !formData.accountEmail.includes('@')) {
      newErrors.accountEmail = 'Email da conta inválido';
      isValid = false;
    }

    if (!formData.recoveryEmail || !formData.recoveryEmail.includes('@')) {
      newErrors.recoveryEmail = 'Email de recuperação inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const response = await authService.requestPasswordRecovery({
      fullName: formData.fullName,
      accountEmail: formData.accountEmail,
      recoveryEmail: formData.recoveryEmail,
    });

    setIsLoading(false);

    if (response.success) {
      setSubmitted(true);
      showToast('Pedido enviado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao enviar pedido', 'error');
    }
  };

  if (submitted) {
    return (
      <AuthLayout title="Recuperação de Acesso" description="Pedido enviado com sucesso">
        <div className="space-y-6 text-center">
          <div className="text-5xl">✓</div>
          <div>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
              Pedido enviado com sucesso
            </h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Analisaremos o seu pedido e enviaremos as novas credenciais para o endereço
              indicado em breve.
            </p>
          </div>
          <Link href="/login">
            <Button variant="primary" size="lg" fullWidth>
              Voltar ao login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Recuperar Acesso" description="Preencha os dados abaixo para solicitar novas credenciais">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Nome Completo"
          placeholder="João Silva"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
          required
        />

        <Input
          label="Email da Conta"
          type="email"
          placeholder="sua.conta@empresa.co.mz"
          value={formData.accountEmail}
          onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
          error={errors.accountEmail}
          required
        />

        <Input
          label="Email para Receber Novas Credenciais"
          type="email"
          placeholder="seu.email.pessoal@gmail.com"
          value={formData.recoveryEmail}
          onChange={(e) => setFormData({ ...formData, recoveryEmail: e.target.value })}
          error={errors.recoveryEmail}
          required
          helperText="Enviaremos as novas credenciais para este endereço"
        />

        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
          Solicitar Recuperação
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">
          Voltou a lembrar-se da senha?
        </p>
        <Link href="/login" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          Voltar ao login
        </Link>
      </div>
    </AuthLayout>
  );
}
