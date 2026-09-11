// Página de Política de Privacidade
'use client';

import React from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card } from '@/components';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <PageHeader title="Política de Privacidade" />

      <Card className="max-w-4xl">
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-text-light dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              A BN Lab está comprometida em proteger a sua privacidade. Esta Política de Privacidade
              explica como recolhemos, utilizamos e protegemos os seus dados pessoais ao utilizar os
              nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Dados Recolhidos</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3">
              Podemos recolher os seguintes tipos de dados:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
              <li>Informações de identificação pessoal (nome, email, telefone)</li>
              <li>Informações de conta (nome de utilizador, preferências)</li>
              <li>Dados de utilização (logs de acesso, configurações)</li>
              <li>Informações de comunicação (emails, mensagens de suporte)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Finalidade da Recolha</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3">
              Recolhemos e utilizamos dados para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
              <li>Fornecer e manter os nossos serviços</li>
              <li>Autenticar a sua conta e verificar a sua identidade</li>
              <li>Processar transações e enviar informações relacionadas</li>
              <li>Responder às suas consultas e solicitações de suporte</li>
              <li>Melhorar e personalizar os nossos serviços</li>
              <li>Garantir a segurança da conta e prevenir fraudes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Dados de Autenticação</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Os seus dados de autenticação (email, palavra-passe) são tratados com especial cuidado
              e utilizados apenas para autenticar o acesso à sua conta. Nunca compartilhamos as suas
              credenciais com terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Segurança</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Implementamos medidas de segurança técnicas e organizacionais para proteger os seus
              dados contra acesso não autorizado, alteração, divulgação ou destruição. Isto inclui
              encriptação de dados em trânsito e em repouso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Cookies e Tecnologias Semelhantes</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3">
              Utilizamos cookies e tecnologias semelhantes para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
              <li>Manter a sua sessão activa</li>
              <li>Recordar as suas preferências</li>
              <li>Melhorar a experiência do utilizador</li>
              <li>Analisar o uso do serviço</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Partilha de Dados</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Não vendemos nem alugamos os seus dados pessoais a terceiros. Apenas compartilhamos
              dados conforme necessário para fornecer os nossos serviços, e apenas com parceiros
              que concordam em proteger a sua privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Retenção de Dados</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Mantemos os seus dados apenas pelo tempo necessário para fornecer os nossos serviços
              e cumprir obrigações legais. Você pode solicitar a eliminação dos seus dados a qualquer
              momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Direitos do Utilizador</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3">
              Você tem o direito de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
              <li>Aceder aos seus dados pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Opor-se ao processamento dos seus dados</li>
              <li>Solicitar a portabilidade dos seus dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contacto</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Se tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos os seus
              dados, por favor contacte-nos:
            </p>
            <p className="text-text-light dark:text-text-dark font-medium mt-3">
              Email: suporte@bnlab.co.mz
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Alterações à Política</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Podemos actualizar esta Política de Privacidade periodicamente. Notificar-lo-emos
              sobre alterações materiais por email ou através do nosso site.
            </p>
          </section>
        </div>
      </Card>
    </MainLayout>
  );
}
