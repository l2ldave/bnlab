// Página de filtros de email
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, ConfirmDialog, LoadingState, EmptyState } from '@/components';
import { useToast } from '@/hooks';
import { mailboxService } from '@/services';
import type { EmailFilter } from '@/types';

export default function EmailFiltersPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<EmailFilter[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<EmailFilter | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await mailboxService.getEmailFilters();
        if (response.success && response.data) {
          setFilters(response.data);
        }
      } catch (error) {
        showToast('Erro ao carregar filtros', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDeleteFilter = async () => {
    if (!selectedFilter) return;

    const response = await mailboxService.deleteEmailFilter(selectedFilter.id);

    if (response.success) {
      setFilters(filters.filter((f) => f.id !== selectedFilter.id));
      showToast('Filtro eliminado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao eliminar filtro', 'error');
    }

    setShowDeleteConfirm(false);
    setSelectedFilter(null);
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
        title="Filtros de Email"
        description="Organize automaticamente os seus emails com base em regras personalizadas."
        action={
          <Button variant="primary" href="/mailbox/filters/new" onClick={() => {}}>
            + Novo Filtro
          </Button>
        }
      />

      {filters.length === 0 ? (
        <Card>
          <EmptyState
            icon="🔍"
            title="Nenhum filtro criado"
            description="Crie o seu primeiro filtro para organizar automaticamente os seus emails."
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {filters.map((filter) => (
            <Card key={filter.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                      {filter.name}
                    </h3>
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        filter.active ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {filter.conditions.length} condição(oes) - {filter.actions.length} ação(oes)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedFilter(filter);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Eliminar Filtro"
        message={`Tem a certeza de que deseja eliminar o filtro "${selectedFilter?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDangerous
        onConfirm={handleDeleteFilter}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </MainLayout>
  );
}
