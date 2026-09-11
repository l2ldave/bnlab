# Guia de Desenvolvimento - BN Lab

## 🎯 Visão Geral do Projeto

O BN Lab é um painel completo de gestão de contas de email com arquitetura modular preparada para integração com a API do cPanel.

## 📁 Estrutura de Pastas Explicada

### `/src/app` - Páginas (Next.js App Router)
Cada pasta representa uma rota. Os ficheiros `page.tsx` são as páginas principais.

```
app/
├── login/page.tsx          → /login
├── forgot-password/page.tsx → /forgot-password
├── dashboard/page.tsx      → /dashboard
├── settings/
│   ├── page.tsx            → /settings
│   ├── password/page.tsx   → /settings/password
│   ├── contact/page.tsx    → /settings/contact
│   └── preferences/page.tsx → /settings/preferences
├── mailbox/
│   ├── page.tsx            → /mailbox
│   ├── autoresponders/page.tsx → /mailbox/autoresponders
│   ├── filters/page.tsx    → /mailbox/filters
│   └── forwarding/page.tsx → /mailbox/forwarding
├── contacts/
│   ├── page.tsx            → /contacts
│   └── calendar/page.tsx   → /contacts/calendar
├── spam/page.tsx           → /spam
├── email-client/page.tsx   → /email-client
├── support/page.tsx        → /support
├── privacy/page.tsx        → /privacy
├── terms/page.tsx          → /terms
└── layout.tsx              → Layout raiz
```

### `/src/components` - Componentes Reutilizáveis

**Componentes Base:**
- `Button.tsx` - Botão com 4 variantes (primary, secondary, tertiary, danger)
- `Input.tsx` - Campo de input com validação e helpers
- `Card.tsx` - Container com Claymorphism
- `Toggle.tsx` - Switch on/off
- `ConfirmDialog.tsx` - Diálogo de confirmação

**Componentes de Estado:**
- `EmptyState.tsx` - Quando não há dados
- `LoadingState.tsx` - Carregando
- `ErrorState.tsx` - Erro com retry

**Componentes de Dados:**
- `ProgressBar.tsx` - Barra de progresso
- `StatusBadge.tsx` - Badge de status

**Componentes de Layout:**
- `Sidebar.tsx` - Navegação lateral
- `TopNavbar.tsx` - Barra superior
- `Breadcrumbs.tsx` - Navegação breadcrumb
- `PageHeader.tsx` - Cabeçalho de página
- `ActionCard.tsx` - Card clicável com ação
- `StatCard.tsx` - Card de estatísticas

**Utilitários:**
- `ThemeSwitcher.tsx` - Seletor de tema
- `ToastProvider.tsx` - Notificações

### `/src/layouts` - Layouts Principais

**MainLayout.tsx**
- Layout para páginas autenticadas
- Inclui Sidebar + TopNavbar
- Protege rotas (redireciona para login se não autenticado)
- Aceita `navSections` customizadas

**AuthLayout.tsx**
- Layout simples para login, recuperação, etc
- Centrado com logo BN Lab
- Sem navegação lateral

### `/src/services` - Lógica de Negócio

Cada serviço é uma classe que implementa a lógica de um domínio específico.

**authService.ts**
- `login()` - Autenticar utilizador
- `logout()` - Fazer logout
- `getCurrentUser()` - Obter utilizador atual
- `requestPasswordRecovery()` - Solicitar recuperação
- `isAuthenticated()` - Verificar autenticação

**accountService.ts**
- `getContactInformation()` - Obter info de contacto
- `updateContactInformation()` - Atualizar info
- `getPreferences()` - Obter preferências
- `updatePreferences()` - Atualizar preferências
- `changePassword()` - Alterar palavra-passe

**mailboxService.ts**
- `getAutoresponder()` - Obter autorespostas
- `updateAutoresponder()` - Atualizar autorespostas
- `getEmailFilters()` - Obter filtros
- `createEmailFilter()` - Criar filtro
- `updateEmailFilter()` - Atualizar filtro
- `deleteEmailFilter()` - Eliminar filtro
- `getForwarders()` - Obter reencaminhamentos
- `createForwarder()` - Criar reencaminhamento
- `deleteForwarder()` - Eliminar reencaminhamento

**contactCalendarService.ts**
- `getContacts()` - Listar contactos
- `createContact()` - Criar contacto
- `updateContact()` - Atualizar contacto
- `deleteContact()` - Eliminar contacto
- `getContactGroups()` - Obter grupos
- `getCalendarEvents()` - Obter eventos
- `createCalendarEvent()` - Criar evento
- `updateCalendarEvent()` - Atualizar evento
- `deleteCalendarEvent()` - Eliminar evento

**spamService.ts**
- `getSpamSettings()` - Obter configurações
- `updateSpamSettings()` - Atualizar configurações
- `getSpamTrapRules()` - Obter regras
- `createSpamTrapRule()` - Criar regra
- `deleteSpamTrapRule()` - Eliminar regra

**emailConfigService.ts**
- `getEmailConfiguration()` - Obter configuração
- `downloadEmailProfile()` - Descarregar perfil

**supportService.ts**
- `submitSupportRequest()` - Enviar pedido de suporte

### `/src/hooks` - Hooks Customizados

**useAuth.ts**
- `login()` - Fazer login
- `logout()` - Fazer logout
- `updateUser()` - Atualizar utilizador
- Estados: `user`, `isAuthenticated`, `isLoading`, `error`

**useTheme.ts**
- `setTheme()` - Alterar tema
- `getCurrentTheme()` - Obter tema atual
- Suporta: 'light', 'dark', 'system'

**useToast.ts**
- `showToast()` - Mostrar notificação
- Tipos: 'success', 'error', 'loading', 'custom'

### `/src/types` - Definições TypeScript

Todas as interfaces e tipos são definidos em `types/index.ts`:

- `User` - Utilizador
- `UserPreferences` - Preferências
- `Mailbox` - Caixa de email
- `Contact` - Contacto
- `ContactGroup` - Grupo de contactos
- `CalendarEvent` - Evento do calendário
- `Autoresponder` - Autorespostas
- `EmailFilter` - Filtro de email
- `Forwarder` - Reencaminhamento
- `SpamSettings` - Configurações de spam
- `SpamTrapRule` - Regra de spam trap
- `EmailConfiguration` - Configuração de email
- `SupportRequest` - Pedido de suporte
- `ApiResponse<T>` - Resposta de API padrão

### `/src/config` - Configuração Centralizada

**appConfig.ts** contém:
- `app.name` - Nome da aplicação
- `theme.default` - Tema padrão
- `api.baseUrl` - URL base da API
- `api.cpanelUrl` - URL do cPanel
- `support.*` - Informações de suporte
- `security.*` - Configurações de segurança
- `formats.*` - Formatos de data/hora

### `/src/data` - Mock Data

**mockData.ts** contém dados simulados:
- `mockUser` - Utilizador de teste
- `mockMailbox` - Caixa de email
- `mockContacts` - Lista de contactos
- `mockContactGroups` - Grupos de contactos
- `mockCalendarEvents` - Eventos
- `mockAutoresponder` - Autorespostas
- `mockEmailFilters` - Filtros
- `mockForwarders` - Reencaminhamentos
- `mockSpamSettings` - Configurações de spam
- `mockSpamTrapRules` - Regras de spam trap
- `mockEmailConfiguration` - Configuração de email

### `/src/utils` - Funções Utilitárias

**validation.ts**
- `validateEmail()` - Validar email
- `validatePassword()` - Validar palavra-passe
- `formatBytes()` - Formatar bytes para legível
- `formatDate()` - Formatar datas
- `generateId()` - Gerar IDs únicos
- `truncateText()` - Cortar texto

### `/src/styles` - Estilos Globais

**globals.css**
- Tailwind directives (@tailwind)
- Estilos customizados Claymorphism
- Animações
- Scrollbar customizado

## 🔄 Fluxo de Dados

### Exemplo: Criar um Contacto

1. **Componente** (ContactsPage) exibe um formulário
2. **Hook** (useState) gerencia dados do formulário
3. **Serviço** (contactCalendarService.createContact) processa a criação
4. **Mock Data** retorna sucesso
5. **Toast** notifica o utilizador
6. **Estado** atualiza a lista de contactos
7. **UI** re-renderiza com o novo contacto

```typescript
// Passo 1: Componente chama o serviço
const response = await contactCalendarService.createContact(contactData);

// Passo 2: Serviço valida e simula a API
async createContact(contact: Contact) {
  // Validação
  if (!contact.name || !contact.email) {
    return { success: false, error: 'Erro...' };
  }
  
  // Simula chamada à API
  await this.delay(600);
  
  return {
    success: true,
    data: contact,
    message: 'Contacto criado com sucesso'
  };
}

// Passo 3: Componente processa resposta
if (response.success) {
  setContacts([...contacts, response.data]);
  showToast('Sucesso!', 'success');
}
```

## 🔌 Preparação para API do cPanel

Todos os serviços têm comentários `// TODO:` indicando onde integrar com o cPanel.

### Exemplo de Integração

**Antes (Mock):**
```typescript
async getContacts(): Promise<ApiResponse<Contact[]>> {
  await this.delay(500);
  return {
    success: true,
    data: mockContacts,
  };
}
```

**Depois (Real):**
```typescript
async getContacts(): Promise<ApiResponse<Contact[]>> {
  try {
    const response = await fetch(
      `${appConfig.api.cpanelUrl}/contacts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) throw new Error('Erro ao carregar');
    
    const data = await response.json();
    return {
      success: true,
      data: data.contacts,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao carregar contactos',
    };
  }
}
```

## 📝 Convenções de Código

### Componentes
- `PascalCase` para nomes de componentes
- Usar `React.FC<Props>` para tipagem
- Forwardar refs com `React.forwardRef` quando apropriado
- Comentar código complexo

### Services
- Nomes em camelCase
- Uma classe por ficheiro
- Métodos privados prefixados com `_private`
- Sempre retornar `ApiResponse<T>`

### Hooks
- Nomes começam com `use`
- Retornar objeto com estados e funções
- Documentar parâmetros e retorno

### Tipos
- `PascalCase` para interfaces
- Interfaces no topo do ficheiro
- Documentar propriedades complexas

## 🚀 Adicionar Nova Funcionalidade

### Exemplo: Adicionar "Assinaturas de Email"

1. **Adicionar tipo** (`types/index.ts`):
```typescript
export interface EmailSignature {
  id: string;
  name: string;
  content: string;
  default: boolean;
  createdAt: Date;
}
```

2. **Adicionar mock data** (`data/mockData.ts`):
```typescript
export const mockSignatures: EmailSignature[] = [...];
```

3. **Criar serviço** (`services/signatureService.ts`):
```typescript
class SignatureService {
  async getSignatures(): Promise<ApiResponse<EmailSignature[]>> { ... }
  async createSignature(sig: EmailSignature): Promise<ApiResponse<EmailSignature>> { ... }
  // ...
}
export const signatureService = new SignatureService();
```

4. **Exportar serviço** (`services/index.ts`):
```typescript
export { signatureService } from './signatureService';
```

5. **Criar página** (`app/mailbox/signatures/page.tsx`):
```typescript
export default function SignaturesPage() {
  // Usar signatureService para carregar/gerir assinaturas
}
```

6. **Adicionar ao menu** (`layouts/MainLayout.tsx`):
```typescript
const navSections = [
  {
    title: 'Gestão',
    items: [
      // ...
      { label: 'Assinaturas', href: '/mailbox/signatures', icon: '✏️' },
    ]
  }
];
```

## 🐛 Debugging

### Verificar Estado de Autenticação
```typescript
const { user, isAuthenticated } = useAuth();
console.log('User:', user, 'Authenticated:', isAuthenticated);
```

### Verificar Respostas de Serviços
```typescript
const response = await contactCalendarService.getContacts();
console.log('Response:', response);
if (!response.success) console.error('Erro:', response.error);
```

### Verificar Tema
```typescript
const { theme, getCurrentTheme } = useTheme();
console.log('Theme setting:', theme, 'Current:', getCurrentTheme());
```

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Claymorphism Design](https://claymorphism.com)

## ✅ Checklist de Desenvolvimento

Ao adicionar uma nova página/funcionalidade:

- [ ] Criar tipos em `types/index.ts`
- [ ] Adicionar mock data em `data/mockData.ts`
- [ ] Criar/atualizar serviço em `services/`
- [ ] Exportar serviço em `services/index.ts`
- [ ] Criar componentes necessários
- [ ] Criar página em `app/`
- [ ] Adicionar rota à navegação
- [ ] Testar responsividade
- [ ] Testar tema claro/escuro
- [ ] Testar acessibilidade
- [ ] Documentar no README

---

**Última atualização:** 11/09/2026
