// Página de configurações de senha
'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input } from '@/components';
import { useToast } from '@/hooks';
import { accountService } from '@/services';

export default function ChangePasswordPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Palavra-passe actual é obrigatória';
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova palavra-passe é obrigatória';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Palavra-passe deve ter pelo menos 8 caracteres';
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Palavras-passe não coincidem';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const response = await accountService.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });

    setIsLoading(false);

    if (response.success) {
      showToast('Palavra-passe alterada com sucesso', 'success');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordStrength(0);
    } else {
      showToast(response.error || 'Erro ao alterar palavra-passe', 'error');
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Alterar Palavra-passe"
        description="Mantenha a sua conta protegida actualizando regularmente a sua palavra-passe."
      />

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Palavra-passe Actual"
              type="password"
              placeholder="••••••••"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              error={errors.currentPassword}
              required
            />

            <div>
              <Input
                label="Nova Palavra-passe"
                type="password"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                  calculatePasswordStrength(e.target.value);
                }}
                error={errors.newPassword}
                required
              />
              <div className="mt-3 space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full ${
                        i <= passwordStrength
                          ? i <= 1
                            ? 'bg-red-500'
                            : i <= 2
                            ? 'bg-yellow-500'
                            : i <= 3
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                  Requisitos:
                  <br />
                  ✓ Pelo menos 8 caracteres
                  <br />
                  ✓ Uma letra maiúscula
                  <br />
                  ✓ Uma letra minúscula
                  <br />
                  ✓ Um número
                </p>
              </div>
            </div>

            <Input
              label="Confirmar Nova Palavra-passe"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              required
            />

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Actualizar Palavra-passe
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
