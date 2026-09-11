// Página de contactos
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card, Button, Input, ConfirmDialog, LoadingState, EmptyState } from '@/components';
import { useToast } from '@/hooks';
import { contactCalendarService } from '@/services';
import type { Contact } from '@/types';

export default function ContactsPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await contactCalendarService.getContacts();
        if (response.success && response.data) {
          setContacts(response.data);
        }
      } catch (error) {
        showToast('Erro ao carregar contactos', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Email válido é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await contactCalendarService.createContact({
      id: '',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      notes: formData.notes || undefined,
      groups: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (response.success && response.data) {
      setContacts([...contacts, response.data]);
      setFormData({ name: '', email: '', phone: '', company: '', notes: '' });
      setShowForm(false);
      showToast('Contacto criado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao criar contacto', 'error');
    }
  };

  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    const response = await contactCalendarService.deleteContact(selectedContact.id);

    if (response.success) {
      setContacts(contacts.filter((c) => c.id !== selectedContact.id));
      showToast('Contacto eliminado com sucesso', 'success');
    } else {
      showToast(response.error || 'Erro ao eliminar contacto', 'error');
    }

    setShowDeleteConfirm(false);
    setSelectedContact(null);
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
        title="Contactos"
        description="Gerencie os seus contactos de email."
        action={
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            + Novo Contacto
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome"
              placeholder="João Silva"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="joao@empresa.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />
            <Input
              label="Telefone (Opcional)"
              type="tel"
              placeholder="+258 84 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="Empresa (Opcional)"
              placeholder="Nome da empresa"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Notas (Opcional)
              </label>
              <textarea
                placeholder="Adicione notas sobre este contacto..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 rounded-clay bg-surface-light-secondary dark:bg-surface-dark-secondary text-text-light dark:text-text-dark border-2 border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-600 focus:outline-none shadow-clay resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                Criar Contacto
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="mb-6">
        <Input
          placeholder="Procurar contactos por nome ou email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon="🔍"
        />
      </Card>

      {filteredContacts.length === 0 ? (
        <Card>
          <EmptyState
            icon="👥"
            title="Nenhum contacto encontrado"
            description="Crie o seu primeiro contacto para começar a organizar os seus emails."
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <h3 className="font-semibold text-text-light dark:text-text-dark mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    📧 {contact.email}
                  </p>
                  {contact.phone && (
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      📞 {contact.phone}
                    </p>
                  )}
                  {contact.company && (
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      🏂 {contact.company}
                    </p>
                  )}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedContact(contact);
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
        title="Eliminar Contacto"
        message={`Tem a certeza de que deseja eliminar ${selectedContact?.name}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDangerous
        onConfirm={handleDeleteContact}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </MainLayout>
  );
}
