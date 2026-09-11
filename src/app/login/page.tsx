// Página de login
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/layouts';
import { Input, Button } from '@/components';
import { useAuth, useToast } from '@/hooks';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Palavra-passe é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      showToast('Login efectuado com sucesso', 'success');
      router.push('/dashboard');
    } else {
      showToast('Email ou palavra-passe inválidos', 'error');
    }
  };

  return (
    <AuthLayout title="Entrar">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="seu.email@empresa.co.mz"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
          icon="✉️"
        />

        <Input
          label="Palavra-passe"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          required
          icon="🔒"
        />

        <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
          Entrar
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Esqueceu a palavra-passe?
        </Link>
      </div>
    </AuthLayout>
  );
}
