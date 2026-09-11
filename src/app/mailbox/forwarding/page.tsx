// Página de reencaminhamentos de email
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, Toggle, ConfirmDialog, LoadingState, EmptyState } from '@/components';
import { useToast } from '@/hooks';
import { mailboxService } from '@/services';
import type { Forwarder } from '@/types';

export default function ForwardersPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [forwarders, setForwarders] = useState<Forwarder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedForwarder, setSelectedForwarder] = useState<Forwarder | null>(null);
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await mailboxService.getForwarders();
        if (response.success && response.data) {
          setForwarders(response.data);
        }
      } catch (error) {
        showToast('Erro ao carregar reencaminhamentos', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Email válido é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await mailboxService.createForwarder({
      id: '',
      destinationEmail: formData.email,
      active: true,
      keepCopy: true,
      createdAt: new Date(),
    });

    if (response.success && response.data) {
      setForwarders([...forwarders, response.data]);
      setFormData({ email: '' });
      setShowForm(false);
      showToast('Reencaminhamento criado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao criar reencaminhamento', 'error');
    }
  };

  const handleDeleteForwarder = async () => {
    if (!selectedForwarder) return;

    const response = await mailboxService.deleteForwarder(selectedForwarder.id);

    if (response.success) {
      setForwarders(forwarders.filter((f) => f.id !== selectedForwarder.id));
      showToast('Reencaminhamento eliminado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao eliminar reencaminhamento', 'error');
    }

    setShowDeleteConfirm(false);
    setSelectedForwarder(null);
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
        title="Reencaminhamento de Emails"
        description="Configure para onde deseja que os seus emails sejam encaminhados automaticamente."
        action={
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            + Novo Reencaminhamento
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email de Destino"
              type="email"
              placeholder="seu.email@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
              error={errors.email}
              required
            />
            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                Criar Reencaminhamento
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {forwarders.length === 0 ? (
        <Card>
          <EmptyState
            icon="📤"
            title="Nenhum reencaminhamento configurado"
            description="Crie o seu primeiro reencaminhamento para receber emails em outro endereço."
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {forwarders.map((forwarder) => (
            <Card key={forwarder.id}>
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <p className="font-medium text-text-light dark:text-text-dark mb-1">
                    {forwarder.destinationEmail}
                  </p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {forwarder.active ? '✓ Ativo' : '✗ Inativo'} - {forwarder.keepCopy ? 'Manter cópia' : 'Sem cópia'}
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedForwarder(forwarder);
                    setShowDeleteConfirm(true);
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Eliminar Reencaminhamento"
        message={`Tem a certeza de que deseja eliminar o reencaminhamento para ${selectedForwarder?.destinationEmail}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDangerous
        onConfirm={handleDeleteForwarder}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </MainLayout>
  );
}
