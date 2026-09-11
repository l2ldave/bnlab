// Página de calendário
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, LoadingState, EmptyState } from '@/components';
import { useToast } from '@/hooks';
import { contactCalendarService } from '@/services';
import type { CalendarEvent } from '@/types';

export default function CalendarPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    attendees: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await contactCalendarService.getCalendarEvents();
        if (response.success && response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        showToast('Erro ao carregar eventos', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Data de início é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime || '09:00'}`);
    const endDateTime = new Date(`${formData.endDate || formData.startDate}T${formData.endTime || '10:00'}`);

    const response = await contactCalendarService.createCalendarEvent({
      id: '',
      title: formData.title,
      description: formData.description || undefined,
      startDate: startDateTime,
      endDate: endDateTime,
      location: formData.location || undefined,
      attendees: formData.attendees ? formData.attendees.split(',').map((a) => a.trim()) : undefined,
      reminder: 15,
      recurring: 'none',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (response.success && response.data) {
      setEvents([...events, response.data]);
      setFormData({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        attendees: '',
      });
      setShowForm(false);
      showToast('Evento criado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao criar evento', 'error');
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
        title="Calendário"
        description="Gerencie os seus eventos e compromissos."
        action={
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            + Novo Evento
          </Button>
        }
      />

      {/* Modo de Visualização */}
      <Card className="mb-6">
        <div className="flex gap-2">
          {(['day', 'week', 'month'] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode(mode)}
            >
              {mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : 'Mês'}
            </Button>
          ))}
        </div>
      </Card>

      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Título"
              placeholder="Nome do evento"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              required
            />

            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Descrição (Opcional)
              </label>
              <textarea
                placeholder="Descreva o evento..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary text-text-light dark:text-text-dark border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 focus:outline-none shadow-clay resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data de Início"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                error={errors.startDate}
                required
              />
              <Input
                label="Hora de Início"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data de Fim (Opcional)"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              <Input
                label="Hora de Fim"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>

            <Input
              label="Local (Opcional)"
              placeholder="Sala de conferência ou Online"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />

            <Input
              label="Participantes (Opcional)"
              placeholder="email1@empresa.com, email2@empresa.com"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              helperText="Separe múltiplos emails com vírgulas"
            />

            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                Criar Evento
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Listagem de Eventos */}
      {events.length === 0 ? (
        <Card>
          <EmptyState
            icon="📅"
            title="Nenhum evento agendado"
            description="Crie o seu primeiro evento para manter-se organizado."
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <h3 className="font-semibold text-text-light dark:text-text-dark mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    📅 {event.startDate.toLocaleDateString('pt-MZ')} às {event.startDate.toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {event.location && (
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      📍 {event.location}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-sm mt-2 text-text-light-secondary dark:text-text-dark-secondary">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
