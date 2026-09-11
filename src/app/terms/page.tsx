// Página de Termos e Condições
'use client';

import React from 'react';
import { MainLayout } from '@/layouts';
import { PageHeader, Card } from '@/components';

export default function TermsPage() {
  return (
    <MainLayout>
      <PageHeader title="Termos e Condições" />

      <Card className="max-w-4xl">
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-text-light dark:text-text-dark">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Ao aceder e utilizar o BN Lab, você aceita estar vinculado por estes Termos e
              Condições. Se não concordar com qualquer parte destes termos, por favor não utilize
              o nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Utilização do Serviço</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              O BN Lab é fornecido para seu uso pessoal e profissional. Você concorda em utilizar
              o serviço de forma legal e ética, e em conformidade com todas as leis aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Responsabilidade do Utilizador</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3">
              Você é responsável por:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
              <li>Manter a confidencialidade da sua palavra-passe</li>
              <li>Não partilhar a sua conta com terceiros</li>
              <li>Notificar-nos imediatamente de qualquer acesso não autorizado</li>
              <li>Utilizar o serviço apenas para fins legítimos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Segurança da Conta</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Você é responsável pela segurança da sua conta. Recomendamos que altere a sua
              palavra-passe regularmente e nunca a partilhe com ninguém. O BN Lab não será
              responsável por qualquer acesso não autorizado resultante de negligência da sua parte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Utilização do Email</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              O BN Lab fornece ferramentas para gerir o seu email. Você concorda em utilizar estas
              ferramentas apenas para fins legítimos e em conformidade com as leis de protecção de
              dados aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Disponibilidade do Serviço</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Embora nos esforçemos para manter o serviço disponível 24/7, não podemos garantir uma
              disponibilidade contínua. Podem ocorrer manutenções, atualizações ou problemas técnicos
              que causem interrupções temporárias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Suspensão ou Encerramento</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Reservamos o direito de suspender ou encerrar sua conta se:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
              <li>Violar estes Termos e Condições</li>
              <li>Utilizar o serviço para atividades ilegais</li>
              <li>Enviar spam ou conteúdo abusivo</li>
              <li>Não pagar taxas aplicáveis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Propriedade Intelectual</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              O BN Lab e todo o seu conteúdo (incluindo código, design, logotipo) são propriedade
              intelectual do BN Lab. Você não pode reproduzir, modificar ou distribuir qualquer parte
              sem consentimento expresso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Limitação de Responsabilidade</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              O BN Lab é fornecido "como está". Na máxima extensão permitida pela lei, não nos
              responsabilizamos por qualquer dano indireto, incidental, especial ou consequente
              resultante do uso ou incapacidade de usar o serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Alterações aos Termos</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Podemos atualizar estes Termos e Condições periodicamente. Continuando a utilizar o
              serviço após alterações, você aceita os novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contacto</h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Se tiver dúvidas sobre estes Termos e Condições, por favor contacte-nos:
            </p>
            <p className="text-text-light dark:text-text-dark font-medium mt-3">
              Email: suporte@bnlab.co.mz
            </p>
          </section>
        </div>
      </Card>
    </MainLayout>
  );
}
