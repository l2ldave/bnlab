// Página de autorespostas
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, Toggle, ConfirmDialog, LoadingState, ErrorState } from '@/components';
import { useToast } from '@/hooks';
import { mailboxService } from '@/services';
import type { Autoresponder } from '@/types';

export default function AutorespondersPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [autoresponder, setAutoresponder] = useState<Autoresponder | null>(null);
  const [formData, setFormData] = useState({
    active: false,
    subject: '',
    message: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await mailboxService.getAutoresponder();
        if (response.success && response.data) {
          setAutoresponder(response.data);
          setFormData({
            active: response.data.active,
            subject: response.data.subject,
            message: response.data.message,
            startDate: response.data.startDate.toISOString().split('T')[0],
            endDate: response.data.endDate.toISOString().split('T')[0],
          });
        }
      } catch (error) {
        showToast('Erro ao carregar autorespostas', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (formData.active) {
      if (!formData.subject.trim()) {
        newErrors.subject = 'Assunto é obrigatório';
        isValid = false;
      }
      if (!formData.message.trim()) {
        newErrors.message = 'Mensagem é obrigatória';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);

    const response = await mailboxService.updateAutoresponder({
      id: autoresponder?.id || '',
      active: formData.active,
      subject: formData.subject,
      message: formData.message,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      createdAt: autoresponder?.createdAt || new Date(),
      updatedAt: new Date(),
    });

    setIsSaving(false);

    if (response.success) {
      showToast('Autorespostas actualizadas com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao actualizar autorespostas', 'error');
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
        title="Autorespostas"
        description="Configure mensagens automáticas quando estiver fora."
      />

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Toggle
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              label="Ativar autorespostas"
              description="Envie automaticamente uma mensagem para emails recebidos"
            />

            {formData.active && (
              <>
                <Input
                  label="Assunto"
                  placeholder="Fora do escritório"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  error={errors.subject}
                />

                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Mensagem
                  </label>
                  <textarea
                    placeholder="Escreva aqui a sua mensagem automática..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary text-text-light dark:text-text-dark border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 focus:outline-none shadow-clay transition-all duration-200 resize-none"
                    rows={6}
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Data de Início"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                  <Input
                    label="Data de Fim"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </>
            )}

            <Button type="submit" variant="primary" isLoading={isSaving}>
              Guardar Configuração
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
