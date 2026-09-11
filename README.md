# BN Lab - Painel de Gestão de Contas de Email

🎯 **Um website completo, moderno, responsivo e funcional para gestão de contas de email**

## ✨ Características Principais

- 🎨 **Design Claymorphism** - Interface moderna e elegante com sombras suaves e efeito de profundidade
- 🌙 **Tema Claro/Escuro** - Com detecção automática do sistema operativo
- 📱 **100% Responsivo** - Desktop, tablet e mobile otimizados
- 🔐 **Segurança em Primeiro Lugar** - Arquitetura preparada para autenticação segura
- 🏗️ **Arquitetura Modular** - Fácil de expandir e manter
- 🔌 **Preparado para API** - Serviços abstratos para integração futura com cPanel
- 🇲🇿 **Português de Moçambique** - Interface 100% em PT-MZ

## 🚀 Começar

### Requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/l2ldave/bnlab.git
cd bnlab

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```

Aceda a `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
│   ├── login/             # Página de login
│   ├── dashboard/         # Painel principal
│   ├── settings/          # Configurações (password, contact, preferences)
│   ├── mailbox/           # Gestão de caixa (autoresponders, filters, forwarding)
│   ├── contacts/          # Contactos e calendário
│   ├── spam/              # Controlo de spam
│   ├── email-client/      # Configuração de clientes de email
│   ├── support/           # Página de suporte
│   ├── privacy/           # Política de privacidade
│   ├── terms/             # Termos e condições
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes reutilizáveis
├── layouts/              # Layouts principais
├── services/             # Serviços de lógica de negócio
├── hooks/                # Hooks customizados
├── types/                # Definições TypeScript
├── config/               # Configuração centralizada
├── data/                 # Mock data para desenvolvimento
├── utils/                # Funções utilitárias
└── styles/               # Estilos globais
```

## 🎨 Design System

### Cores Principais
- **Laranja (Primária)**: #f97316
- **Neutras**: Escala de cinzentos
- **Tema Claro**: Branco com tons leves
- **Tema Escuro**: Preto com tons escuros

### Componentes
Todos os componentes seguem a linguagem **Claymorphism** com:
- Cards arredondados (border-radius: 16px)
- Sombras suaves e elegantes
- Efeito de profundidade
- Bordas subtis
- Transições suaves

## 📄 Páginas Implementadas

### Autenticação
- ✅ Login (com validação)
- ✅ Recuperação de Palavra-passe

### Dashboard
- ✅ Painel principal com estatísticas
- ✅ Acesso rápido às funcionalidades
- ✅ Atividade recente

### Configurações
- ✅ Alterar Palavra-passe (com indicador de força)
- ✅ Informações de Contacto
- ✅ Preferências (Tema, Idioma, Timezone, Notificações)

### Gestão de Caixa
- ✅ Autorespostas
- ✅ Filtros de Email
- ✅ Reencaminhamento de Emails

### Contactos e Calendário
- ✅ Gestão de Contactos (criar, editar, eliminar, pesquisar)
- ✅ Grupos de Contactos
- ✅ Calendário com múltiplas vistas (dia, semana, mês)
- ✅ Eventos do Calendário

### Spam
- ✅ Filtros de Spam com 3 níveis (Baixo, Normal, Alto)
- ✅ Spam Trap com regras
- ✅ Configurações de proteção

### Configuração de Clientes de Email
- ✅ Instruções para clientes populares (Apple Mail, Outlook, Thunderbird, etc)
- ✅ Configurações IMAP, POP3, SMTP
- ✅ Copiar configurações

### Suporte
- ✅ Formulário de Contacto
- ✅ Informações de Suporte
- ✅ Perguntas Frequentes

### Legal
- ✅ Política de Privacidade
- ✅ Termos e Condições

## 🔌 Integração com API do cPanel

O projeto está completamente preparado para integração futura com a API do cPanel.

### Arquitetura de Integração

```
Componente UI
    ↓
  Hook (useAuth, etc)
    ↓
  Service (authService, etc)
    ↓
  Adapter (cpanelService)
    ↓
  API do cPanel
```

### Substituição Futura

Para integrar com o cPanel, basta modificar os serviços em `/src/services/` para chamar a API real em vez de retornar mock data:

```typescript
// De:
const mockUser = { ... };

// Para:
const response = await fetch(`${API_BASE_URL}/user`, {
  headers: { Authorization: `Bearer ${token}` }
});
const userData = await response.json();
```

## ⚙️ Configuração Centralizada

Todas as configurações estão em `/src/config/appConfig.ts`:

```typescript
appConfig.app.name              // Nome da aplicação
appConfig.api.baseUrl           // URL base da API
appConfig.api.cpanelUrl         // URL do cPanel
appConfig.support.email         // Email de suporte
appConfig.support.phone         // Telefone de suporte
appConfig.support.whatsapp      // WhatsApp de suporte
appConfig.support.hours         // Horário de atendimento
```

## 🔒 Segurança

- ✅ Validação de formulários (frontend e backend ready)
- ✅ Proteção contra XSS com React
- ✅ CSRF protection ready
- ✅ Passwords hasheadas (mock)
- ✅ Sessões seguras
- ✅ Tokens de autenticação
- ✅ HTTPS ready

## 📱 Responsividade

- ✅ **Desktop**: Layout completo com sidebar fixa
- ✅ **Tablet**: Sidebar compacta, ajustes responsivos
- ✅ **Mobile**: Menu hamburger, layout em coluna única

## ♿ Acessibilidade

- ✅ Contraste adequado (WCAG AA)
- ✅ Labels em todos os campos
- ✅ Navegação por teclado
- ✅ Focus states visíveis
- ✅ Estrutura semântica HTML
- ✅ aria-labels quando necessário

## 🚀 Build e Deploy

```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📚 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notificações
- **Zustand** - State management (preparado)
- **Next Themes** - Tema claro/escuro
- **Zod** - Validação de dados
- **Lucide React** - Ícones

## 📝 Licença

MIT

## 👤 Autor

**BN Lab Team**

## 📞 Suporte

Email: suporte@bnlab.co.mz
Phone: +258 21 123 456
WhatsApp: +258 84 123 456

---

**Desenvolvido com ❤️ por BN Lab**
