// Página de configurações de informações de contacto
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, LoadingState, ErrorState } from '@/components';
import { useToast, useAuth } from '@/hooks';
import { accountService } from '@/services';

interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
}

export default function ContactInfoPage() {
  const { showToast } = useToast();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });
  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await accountService.getContactInformation();
        if (response.success && response.data) {
          setFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            phone: '',
            company: '',
            jobTitle: '',
          });
        }
      } catch (error) {
        showToast('Erro ao carregar dados', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<ContactInfo> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Email válido é obrigatório';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);

    const response = await accountService.updateContactInformation({
      name: formData.name,
      email: formData.email,
    });

    setIsSaving(false);

    if (response.success) {
      if (response.data) {
        updateUser({ name: response.data.name, email: response.data.email });
      }
      showToast('Informações actualizadas com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao actualizar informações', 'error');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingState />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Informações de Contacto"
        description="Mantenha os seus dados de contacto actualizados."
      />

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome Completo"
              placeholder="João Silva"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name as string}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="joao@empresa.co.mz"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email as string}
              required
            />

            <Input
              label="Telefone (Opcional)"
              type="tel"
              placeholder="+258 84 123 4567"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="Empresa (Opcional)"
              placeholder="Nome da empresa"
              value={formData.company || ''}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />

            <Input
              label="Cargo (Opcional)"
              placeholder="Cargo na empresa"
              value={formData.jobTitle || ''}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />

            <Button type="submit" variant="primary" isLoading={isSaving}>
              Guardar Alterações
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
