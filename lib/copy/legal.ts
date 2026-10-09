/**
 * Política de privacidade e termos de uso do SITE (não do produto).
 * [confirmar Diego] Texto-base para revisão jurídica (PRD 17, pergunta 7) — não é parecer legal.
 * Sem CNPJ e sem e-mail de contato confirmados, os trechos ficam neutros (ver lib/site.ts).
 */

export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };

export const legalUpdatedAt = '09/10/2026';

export const privacy = {
  title: 'Política de privacidade',
  intro:
    'Esta política explica como o site do Outra Vez trata os dados de quem visita a página e pede uma demonstração. O Outra Vez é um produto da Vivaz, que é a controladora desses dados.',
  sections: [
    {
      title: 'Quais dados coletamos',
      paragraphs: ['Quando você preenche o formulário de demonstração, coletamos:'],
      list: [
        'nome, WhatsApp e e-mail;',
        'nome da loja, canais onde você vende, faixa de pedidos por mês e ERP que usa;',
        'os valores que você usou no simulador, se veio de lá;',
        'a origem da visita (por exemplo, parâmetros de campanha como utm_source), a página de entrada e o navegador usado.',
      ],
    },
    {
      title: 'Para que usamos',
      paragraphs: [
        'Usamos esses dados para falar com você sobre a demonstração, marcar o horário, preparar a conversa com os números da sua loja e entender quais canais de divulgação trazem visitas. Não vendemos seus dados.',
      ],
    },
    {
      title: 'Base legal',
      paragraphs: [
        'O contato sobre a demonstração acontece com o seu consentimento, dado na caixa de aceite do formulário, e para atender o seu próprio pedido (procedimentos preliminares a um possível contrato). A medição de visitas e de anúncios só acontece se você aceitar os cookies correspondentes.',
      ],
    },
    {
      title: 'Com quem compartilhamos',
      paragraphs: [
        'Compartilhamos os dados só com fornecedores que nos ajudam a operar o site e o atendimento, como hospedagem, ferramenta de agendamento e o sistema onde organizamos os pedidos de demonstração. Ferramentas de medição e anúncios só recebem dados se você aceitar os cookies, e nunca recebem seu nome, e-mail ou telefone em texto.',
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'Cookies necessários fazem o site funcionar. Cookies de análise e de publicidade só são usados com a sua escolha no aviso de cookies, que você pode mudar quando quiser.',
      ],
    },
    {
      title: 'Por quanto tempo guardamos',
      paragraphs: [
        'Pedidos de demonstração que não avançam são apagados em até 12 meses. Registros identificados como spam são apagados em até 30 dias.',
      ],
    },
    {
      title: 'Seus direitos',
      paragraphs: [
        'Pela Lei Geral de Proteção de Dados (LGPD), você pode pedir para confirmar se tratamos seus dados, ver, corrigir, apagar ou levar seus dados para outro fornecedor, saber com quem compartilhamos e retirar o seu consentimento a qualquer momento.',
      ],
    },
    {
      title: 'Segurança',
      paragraphs: [
        'Usamos conexão segura (HTTPS) e limitamos o acesso aos dados às pessoas que precisam deles para atender o seu pedido.',
      ],
    },
    {
      title: 'Mudanças nesta política',
      paragraphs: [
        'Se esta política mudar, a nova versão fica publicada nesta página com a data de atualização.',
      ],
    },
  ] satisfies LegalSection[],
  contactTitle: 'Como falar com a gente',
  contactWithEmail: 'Para exercer seus direitos ou tirar dúvidas, escreva para {email}.',
  contactWithoutEmail:
    'Para exercer seus direitos ou tirar dúvidas, fale com a gente pelos canais de contato desta página.',
};

export const terms = {
  title: 'Termos de uso',
  intro:
    'Estes termos valem para o uso deste site. O uso do produto Outra Vez tem contrato próprio, apresentado na contratação.',
  sections: [
    {
      title: 'O que é este site',
      paragraphs: [
        'Este site apresenta o Outra Vez, um produto da Vivaz, e permite pedir uma demonstração gratuita de 30 minutos por videochamada, sem compromisso de contratação.',
      ],
    },
    {
      title: 'Números e telas de exemplo',
      paragraphs: [
        'As telas e os números mostrados no site são de uma loja de exemplo e servem só para ilustrar o produto. O simulador usa premissas médias e não é promessa de resultado. Os resultados de cada loja dependem da operação, dos produtos e dos clientes.',
      ],
    },
    {
      title: 'Marcas de terceiros',
      paragraphs: [
        'Mercado Livre, Shopee, Amazon, Magalu, Bling e WhatsApp são marcas de seus respectivos donos. O Outra Vez não é afiliado a elas.',
      ],
    },
    {
      title: 'Uso adequado',
      paragraphs: [
        'Ao pedir uma demonstração, você se compromete a informar dados verdadeiros. Não é permitido usar o site para enviar conteúdo automatizado, tentar acessar áreas restritas ou atrapalhar o funcionamento da página.',
      ],
    },
    {
      title: 'Privacidade',
      paragraphs: ['O tratamento de dados pessoais segue a nossa Política de privacidade.'],
    },
    {
      title: 'Mudanças e lei aplicável',
      paragraphs: [
        'Estes termos podem ser atualizados, e a versão vigente fica nesta página. Eles seguem a legislação brasileira.',
      ],
    },
  ] satisfies LegalSection[],
};
