/**
 * Todo o texto da landing page (PRD_LP seção 6 + 12.1 + 13).
 * Textos definitivos: não reescreva. Mudou o PRD → mude aqui.
 * Variáveis entre {chaves} são substituídas com `fill()`.
 * Itens marcados [confirmar Diego] no PRD estão comentados como tal.
 */

export const copy = {
  meta: {
    title: 'Outra Vez — CRM para quem vende em marketplace',
    description:
      'Transforme as notas fiscais do Bling em clientes com WhatsApp e réguas de recompra. Venda de novo para quem já comprou, em qualquer marketplace. Agende uma demo grátis.',
    slogan: 'Vendeu uma vez? Venda outra vez.',
  },

  a11y: {
    skipToContent: 'Pular para o conteúdo',
    home: 'Outra Vez — voltar ao início',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuTitle: 'Menu',
    mainNav: 'Navegação principal',
    footerNav: 'Links do rodapé',
  },

  cta: {
    primary: 'Agendar demo grátis',
    header: 'Agendar demo',
    secondaryHero: 'Ver por dentro',
  },

  header: {
    nav: [
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Por dentro', href: '#por-dentro' },
      { label: 'Segurança', href: '#seguranca' },
      { label: 'Perguntas', href: '#perguntas' },
    ],
    signIn: 'Entrar',
  },

  hero: {
    eyebrow: 'CRM para quem vende em marketplace',
    h1Before: 'Vendeu uma vez? Venda ',
    h1Highlight: 'outra vez.',
    subtitle:
      'O Outra Vez transforma as notas fiscais do seu Bling em clientes com nome, histórico e WhatsApp — e manda a mensagem certa na hora de comprar de novo. Em qualquer marketplace, sem arriscar sua conta.',
    microcopy: '30 minutos · por videochamada · grátis e sem compromisso',
    visual: {
      bubble1:
        'Oi, Maria! Aqui é da Loja Exemplo. Seu pedido Kit Refil Lavanda foi faturado e já está seguindo para entrega. Se tiver qualquer problema com a entrega, é só responder esta mensagem. Você também quer receber dicas e ofertas da Loja Exemplo por aqui?',
      bubble1Buttons: ['Quero receber', 'Não, obrigado'],
      reply: 'Quero receber',
      dateSeparator: '42 dias depois',
      bubble2:
        'Oi, Maria! O Kit Refil Lavanda que você comprou costuma durar cerca de 45 dias. Já está na hora de repor?',
      bubble2Button: 'Ver produto',
      kpiLabel: 'Comprou de novo',
      kpiValue: 'R$ 149,90',
      kpiChannel: 'Shopee',
      caption: 'Conversa ilustrativa de uma loja de exemplo.',
    },
  },

  channelBar: {
    label: 'Para quem vende em',
    channels: ['Mercado Livre', 'Shopee', 'Amazon', 'Magalu', 'e outros canais do seu Bling'],
    integration: 'Integrado ao Bling',
  },

  problem: {
    eyebrow: 'O problema',
    h2: 'Todo mês você paga de novo para vender para quem já comprou.',
    cards: [
      {
        icon: 'Store',
        title: 'O cliente é do marketplace, não seu.',
        text: 'Cada venda paga comissão e anúncio. Quando o cliente quer comprar de novo, você disputa ele do zero com quem anunciar mais.',
      },
      {
        icon: 'Archive',
        title: 'Seus clientes estão parados no Bling.',
        text: 'Milhares de nomes e CPFs nas notas fiscais, sem telefone, sem histórico entre canais e sem ninguém olhando.',
      },
      {
        icon: 'Clock',
        title: 'Ninguém avisa na hora de repor.',
        text: 'O produto acaba, o cliente abre o marketplace e compra de quem aparecer primeiro. Não precisava ser assim.',
      },
    ],
    closing: 'A próxima venda pode começar de quem já comprou de você.',
  },

  howItWorks: {
    eyebrow: 'Como funciona',
    h2: 'Do pedido à recompra, no automático.',
    subtitle: 'Você conecta o Bling uma vez. O resto roda sozinho.',
    steps: [
      {
        icon: 'Plug',
        title: 'Conecte seu Bling.',
        text: 'Lemos seus pedidos e notas fiscais. Não alteramos nada no seu Bling.',
      },
      {
        icon: 'Users',
        title: 'Seus clientes numa lista só.',
        text: 'Quem comprou no Mercado Livre e na Shopee com o mesmo CPF vira um cliente só, com todo o histórico.',
      },
      {
        icon: 'Search',
        title: 'Busca de WhatsApp.',
        text: 'Encontramos o WhatsApp de cada cliente a partir do CPF da nota. Você define quanto quer gastar.',
      },
      {
        icon: 'Repeat',
        title: 'Réguas no automático.',
        text: 'A primeira mensagem é sempre sobre o pedido real e pergunta se o cliente quer receber novidades. Depois vêm aviso de reposição e reativação.',
      },
      {
        icon: 'TrendingUp',
        title: 'Veja quem comprou de novo.',
        text: 'Cada venda que volta aparece no painel, com quanto custou para trazer.',
      },
    ],
  },

  tour: {
    eyebrow: 'Conheça por dentro',
    h2: 'É isso que você vai usar todo dia.',
    subtitle: 'Telas reais do Outra Vez. Os números são de uma loja de exemplo.',
    cta: 'Quero ver com os meus números',
    sampleLabel: 'Dados de uma loja de exemplo.',
    tabs: [
      {
        id: 'inicio',
        label: 'Início',
        title: 'Quanto voltou, num relance.',
        text: 'A primeira tela mostra o que interessa: quanto seus clientes compraram de novo e quem está na hora de comprar.',
        hotspots: [
          {
            title: 'Vendas geradas pelo Outra Vez',
            text: 'pedidos de quem recebeu sua mensagem e comprou de novo.',
          },
          {
            title: 'Do WhatsApp encontrado à recompra',
            text: 'o funil mostra onde cada cliente está.',
          },
          { title: 'Oportunidade do dia', text: 'clientes na hora de repor um produto.' },
        ],
      },
      {
        id: 'clientes',
        label: 'Clientes',
        title: 'Cada comprador vira um cliente de verdade.',
        text: 'Mesmo CPF em canais diferentes vira uma ficha só, com tudo que ele já comprou e cada mensagem que recebeu.',
        hotspots: [
          { title: 'Um cliente, vários canais', text: 'comprou no Mercado Livre e na Shopee.' },
          // PRD 7.5 diz "segmento", proibido pelo glossário 4.5 → ADR-LP-10.
          { title: 'Quanto vale esse cliente', text: 'total gasto, pedidos e tipo de cliente.' },
          {
            title: 'Tudo que aconteceu',
            text: 'pedidos, mensagens e a recompra na linha do tempo.',
          },
        ],
      },
      {
        id: 'reguas',
        label: 'Réguas',
        title: 'A mensagem certa na hora certa, sozinha.',
        text: 'Você liga uma régua pronta e ela cuida do resto. Nenhuma oferta sai para quem não aceitou receber.',
        hotspots: [
          { title: 'O gatilho', text: 'quando o cliente está perto da próxima compra prevista.' },
          { title: 'A regra de ouro', text: 'só segue quem aceitou novidades.' },
          { title: 'Sai sozinho', text: 'quem compra de novo deixa de receber.' },
        ],
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp',
        title: 'O que seu cliente recebe.',
        text: 'Mensagens curtas, com o nome da sua loja, sobre o pedido que ele fez. E sempre com uma saída fácil.',
        hotspots: [
          { title: 'Começa pelo pedido', text: 'aviso útil, não propaganda.' },
          { title: 'Pede permissão', text: 'o cliente escolhe se quer novidades.' },
          { title: 'Saída fácil', text: 'responder SAIR para tudo na hora.' },
        ],
      },
      {
        id: 'envio',
        label: 'Envio em massa',
        title: 'Você sabe o custo antes de enviar.',
        text: 'Antes de qualquer envio em massa, o Outra Vez mostra quanto vai custar e quem fica de fora — e por quê.',
        hotspots: [
          { title: 'Quantos recebem', text: 'só quem pode receber.' },
          { title: 'Quanto custa', text: 'valor estimado no WhatsApp.' },
          { title: 'Quem fica de fora', text: 'e o motivo.' },
        ],
      },
      {
        id: 'bling',
        label: 'Bling',
        title: 'Conecta em minutos. Não mexe em nada.',
        text: 'Você autoriza o Bling uma vez. Os primeiros clientes aparecem em minutos e o histórico continua chegando em segundo plano.',
        hotspots: [
          { title: 'Um clique', text: 'conexão oficial com o Bling.' },
          { title: 'Só leitura', text: 'não alteramos nada no seu Bling.' },
          { title: 'Já dá pra usar', text: 'sem esperar o histórico inteiro.' },
        ],
      },
    ],
    // Rótulos de interface do tour que o PRD 7.2 descreve sem texto literal.
    ui: {
      tabsLabel: 'Telas do Outra Vez',
      deviceLabel: 'Ver em',
      mobile: 'Celular',
      desktop: 'Computador',
      themeLabel: 'Tema da tela',
      light: 'Claro',
      dark: 'Escuro',
      hotspot: 'Marcador',
    },
  },

  benefits: {
    eyebrow: 'O que muda',
    h2: 'Menos venda que se perde. Mais cliente que volta.',
    illustrative: 'Exemplo ilustrativo.',
    cards: [
      {
        kind: 'icon',
        icon: 'Users',
        title: 'Um cliente, todos os canais.',
        text: 'O mesmo comprador do Mercado Livre, da Shopee e da Amazon numa ficha só, com quanto já gastou e quando comprou pela última vez.',
      },
      {
        kind: 'number-coral',
        number: '312',
        title: 'clientes na hora de repor o Kit Refil.',
        text: 'O Outra Vez calcula quando cada produto costuma acabar e avisa o cliente na hora certa.',
      },
      {
        kind: 'icon',
        icon: 'ShieldCheck',
        title: 'Pós-venda que protege sua reputação.',
        text: 'O cliente recebe aviso do pedido e um canal direto para resolver problema antes de abrir reclamação no marketplace.',
      },
      {
        kind: 'icon',
        icon: 'BookUser',
        title: 'Uma base que é sua.',
        text: 'Cada cliente que aceita novidades fica na sua lista, pronto para a próxima campanha — sem depender do anúncio.',
      },
      {
        kind: 'icon',
        icon: 'Receipt',
        title: 'Custo antes de enviar.',
        text: 'Você vê quanto o WhatsApp vai cobrar e quantos clientes ficam de fora antes de confirmar qualquer envio em massa.',
      },
      {
        kind: 'number-ink',
        number: 'R$ 4.820',
        title: 'voltaram em vendas.',
        text: 'O painel mostra as vendas geradas pelo Outra Vez: pedidos de quem recebeu sua mensagem e comprou de novo, em qualquer canal.',
      },
    ],
  },

  safety: {
    eyebrow: 'Segurança',
    h2: 'Feito para vender de novo sem colocar sua conta em risco.',
    subtitle:
      'O medo de ser punido pelo marketplace é real. Por isso o Outra Vez já vem com as regras certas ligadas.',
    // [confirmar Diego] Revisar os itens 3 e 5 com o jurídico antes de publicar.
    items: [
      {
        icon: 'MessageSquareText',
        title: 'A primeira mensagem é sobre o pedido.',
        text: 'Nada de oferta fria. O cliente recebe um aviso útil e escolhe se quer receber novidades.',
      },
      {
        icon: 'UserCheck',
        title: 'Novidade só para quem aceitou.',
        text: 'Mensagens de oferta só saem para clientes que responderam "Quero receber". Quem envia SAIR para de receber na hora.',
      },
      {
        icon: 'Link',
        title: 'Links levam para a sua loja no marketplace.',
        text: 'Por padrão, a recompra acontece dentro do canal onde você já vende.',
      },
      {
        icon: 'BadgeCheck',
        title: 'API oficial do WhatsApp.',
        text: 'As mensagens saem pelo número da sua loja, pela API oficial — sem gambiarra que derruba número.',
      },
      {
        icon: 'Lock',
        title: 'Seus dados, suas regras.',
        text: 'Você continua dono dos dados dos seus clientes. Guardamos só o necessário e registramos de onde cada informação veio.',
      },
    ],
    footnote:
      'Cada marketplace tem as próprias regras. Na demo, mostramos como o Outra Vez lida com cada uma delas.',
  },

  simulator: {
    eyebrow: 'Faça as contas',
    h2: 'Quanto pode voltar para a sua loja?',
    subtitle:
      'Mexa nos números. É uma simulação, não uma promessa — na demo a gente refaz com os seus dados.',
    inputs: {
      orders: 'Pedidos por mês',
      ticket: 'Ticket médio',
      rate: 'Clientes que compram de novo depois das réguas',
    },
    outputs: {
      revenue: 'Vendas que podem voltar por mês',
      customers: 'Clientes que compram de novo',
      cost: 'Custo estimado de Busca de WhatsApp e mensagens',
      perReal: 'Para cada R$ 1 investido',
      perRealSuffix: 'em vendas',
    },
    showMath: 'Ver as contas',
    assumptionsHeader: { label: 'Premissa', value: 'Valor' },
    assumptions: {
      whatsappFound: 'Clientes com WhatsApp encontrado',
      acceptNews: 'Clientes que aceitam novidades',
      lookupPrice: 'Preço da Busca de WhatsApp por cliente',
      utilityMessagePrice: 'Mensagem de aviso do pedido',
      marketingMessagePrice: 'Mensagem de novidade',
      marketingMessagesPerMonth: 'Mensagens de novidade por cliente que aceitou, por mês',
    },
    disclaimer:
      'Simulação com premissas médias, não é promessa de resultado. Não inclui a assinatura do Outra Vez, apresentada na demo. Preços do WhatsApp definidos pela Meta e sujeitos a mudança.',
    cta: 'Ver isso com os meus números',
  },

  comparison: {
    eyebrow: 'Comparação',
    h2: 'O que muda em relação ao jeito de hoje.',
    columns: ['Planilha do Bling', 'WhatsApp Web + extensão', 'CRM genérico', 'Outra Vez'],
    values: { yes: 'Sim', partial: 'Em parte', no: 'Não' },
    rows: [
      {
        label: 'Clientes de todos os canais numa lista só',
        cells: ['partial', 'no', 'partial', 'yes'],
      },
      { label: 'Encontra o WhatsApp a partir da nota', cells: ['no', 'no', 'no', 'yes'] },
      { label: 'Avisa quando o produto deve acabar', cells: ['no', 'no', 'no', 'yes'] },
      { label: 'Pede permissão antes de mandar novidades', cells: ['no', 'no', 'partial', 'yes'] },
      { label: 'Mostra quanto voltou em vendas', cells: ['no', 'no', 'partial', 'yes'] },
      { label: 'Envio pela API oficial do WhatsApp', cells: ['no', 'no', 'partial', 'yes'] },
      { label: 'Funciona bem no celular', cells: ['no', 'yes', 'partial', 'yes'] },
    ],
  },

  demo: {
    eyebrow: 'A demo',
    h2: '30 minutos para ver se faz sentido pra sua loja.',
    steps: [
      {
        title: 'Entendemos sua operação.',
        text: 'Canais, volume de pedidos e quais produtos seus clientes compram de novo.',
      },
      {
        title: 'Mostramos o Outra Vez por dentro.',
        text: 'Da conexão com o Bling até a primeira venda que volta.',
      },
      {
        title: 'Fazemos as contas com os seus números.',
        text: 'Quanto pode voltar e quanto custa para trazer.',
      },
    ],
    facts: [
      { icon: 'Video', text: 'Por videochamada' },
      { icon: 'Clock', text: '30 minutos' },
      { icon: 'BadgeCheck', text: 'Grátis e sem compromisso' },
    ],
    // [confirmar Diego] card do anfitrião.
    host: {
      name: 'Diego Rodrigues, fundador do Outra Vez',
      quote:
        'Eu mesmo faço a demo. Se o Outra Vez não fizer sentido pra sua operação, eu te falo isso na call.',
    },
    // [confirmar Diego — só publicar se for verdade] NEXT_PUBLIC_FEATURE_PILOT.
    pilot: {
      title: 'Programa piloto aberto',
      text: 'Estamos abrindo o Outra Vez para um grupo pequeno de sellers. Quem entra agora acompanha o produto de perto e tem condições de piloto.',
    },
  },

  faq: {
    eyebrow: 'Perguntas',
    h2: 'O que todo seller pergunta antes da demo.',
    items: [
      {
        id: 'punicao',
        q: 'Posso ser punido pelo marketplace?',
        a: 'O Outra Vez foi desenhado para reduzir esse risco: a primeira mensagem é sempre sobre o pedido real, novidades só vão para quem aceitou receber e os links levam, por padrão, para a sua loja dentro do marketplace. Nunca usamos o chat do marketplace. Cada canal tem regras próprias — na demo mostramos como o Outra Vez lida com elas.',
      },
      {
        id: 'whatsapp',
        q: 'Como vocês encontram o WhatsApp do meu cliente?',
        a: 'Pela Busca de WhatsApp: consultamos uma base de dados cadastrais a partir do CPF da nota fiscal. Se o contato já tem celular no seu Bling, usamos esse número sem custo. Quando o nome encontrado não bate com o da nota, o número fica como "Número a confirmar" e não entra nas réguas automáticas.',
      },
      {
        id: 'lgpd',
        q: 'Isso está de acordo com a LGPD?',
        // [confirmar Diego — revisar com jurídico]
        a: 'Você continua dono dos dados dos seus clientes e o Outra Vez trata esses dados em seu nome. Guardamos só o necessário (telefone, e-mail, cidade e UF), registramos de onde cada dado veio e toda mensagem tem uma saída fácil. O cliente também tem uma página para parar de receber mensagens quando quiser.',
      },
      {
        id: 'bling',
        q: 'Preciso usar o Bling?',
        a: 'Hoje, sim: o Outra Vez lê pedidos e notas pelo Bling. Outros ERPs estão nos planos. Se você usa outro, deixe seu contato que avisamos quando chegar.',
      },
      {
        id: 'altera-bling',
        q: 'O Outra Vez altera alguma coisa no meu Bling?',
        a: 'Não. Só lemos pedidos, notas fiscais e contatos.',
      },
      {
        id: 'tempo',
        q: 'Em quanto tempo vejo meus clientes?',
        a: 'Os primeiros clientes aparecem minutos depois de conectar o Bling. O histórico completo continua carregando em segundo plano, sem você precisar esperar.',
      },
      {
        id: 'api-oficial',
        q: 'Preciso ter a API oficial do WhatsApp?',
        a: 'As mensagens saem pelo número da sua loja, pela API oficial do WhatsApp. Se você ainda não tem, na demo mostramos o passo a passo para conectar.',
      },
      {
        id: 'reguas',
        q: 'Vou ter que montar as réguas do zero?',
        a: 'Não. Você começa com réguas prontas de pós-venda, reposição e reativação, e ajusta o que quiser.',
      },
      {
        id: 'preco',
        q: 'Quanto custa?',
        a: 'Depende do tamanho da sua operação. Na demo mostramos os planos e estimamos o custo com os seus números. A Busca de WhatsApp e as mensagens são cobradas por uso, e você vê o custo antes de cada envio.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'Agende sua demo',
    h2: 'Seu cliente já comprou. A próxima venda pode começar daí.',
    subtitle: 'Preencha em menos de um minuto e escolha o melhor horário.',
    checks: [
      'Grátis e sem compromisso',
      '30 minutos por videochamada',
      'Com os números da sua loja',
    ],
    whatsapp: 'Prefere falar pelo WhatsApp?',
    whatsappMessage: 'Oi, quero conhecer o Outra Vez',
  },

  form: {
    step1: {
      indicator: '1 de 2',
      name: 'Seu nome',
      whatsapp: 'WhatsApp com DDD',
      email: 'E-mail',
      consentBefore:
        'Aceito receber o contato do Outra Vez sobre a demo por WhatsApp e e-mail. Veja a ',
      consentLink: 'Política de privacidade',
      consentAfter: '.',
      submit: 'Continuar',
      errors: {
        name: 'Escreva seu nome.',
        whatsapp: 'Confira o número: DDD + 9 dígitos.',
        email: 'Confira o e-mail. Exemplo: voce@sualoja.com.br',
        consent: 'Marque para a gente poder falar com você.',
      },
    },
    step2: {
      indicator: '2 de 2',
      back: 'Voltar',
      storeName: 'Nome da loja',
      marketplaces: 'Onde você vende?',
      marketplaceOptions: [
        'Mercado Livre',
        'Shopee',
        'Amazon',
        'Magalu',
        'TikTok Shop',
        'Loja própria',
        'Outro',
      ],
      orders: 'Quantos pedidos por mês, somando todos os canais?',
      ordersOptions: [
        { value: 'ate_300', label: 'Até 300' },
        { value: '300_1000', label: '300 a 1.000' },
        { value: '1000_3000', label: '1.000 a 3.000' },
        { value: '3000_10000', label: '3.000 a 10.000' },
        { value: '10000_mais', label: 'Mais de 10.000' },
      ],
      erp: 'Qual ERP você usa?',
      erpOptions: [
        { value: 'bling', label: 'Bling' },
        { value: 'tiny_olist', label: 'Tiny/Olist' },
        { value: 'omie', label: 'Omie' },
        { value: 'outro', label: 'Outro' },
        { value: 'nenhum', label: 'Não uso ERP' },
        { value: 'nao_sei', label: 'Não sei' },
      ],
      erpOther: 'Qual?',
      submit: 'Escolher horário',
    },
    calendar: {
      title: 'Escolha o melhor horário',
      subtitle: '30 minutos por videochamada.',
      fallback:
        'Não conseguimos abrir o calendário agora. A gente te chama no WhatsApp para marcar o horário.',
      fallbackButton: 'Falar no WhatsApp',
    },
  },

  footer: {
    links: [
      { label: 'Como funciona', href: '/#como-funciona' },
      { label: 'Por dentro', href: '/#por-dentro' },
      { label: 'Perguntas', href: '/#perguntas' },
      { label: 'Política de privacidade', href: '/privacidade' },
      { label: 'Termos de uso', href: '/termos' },
    ],
    // [confirmar Diego] CNPJ.
    legal: 'Outra Vez é um produto da Vivaz · CNPJ {CNPJ_VIVAZ}',
    trademarks:
      'Mercado Livre, Shopee, Amazon, Magalu e Bling são marcas de seus respectivos donos. O Outra Vez não é afiliado a elas.',
  },

  mobileBar: {
    support: '30 min · grátis',
  },

  thankYou: {
    h1: 'Demo marcada.',
    text: 'Você vai receber a confirmação e o link da videochamada no e-mail {email}. Quer adiantar? Separe quantos pedidos sua loja faz por mês e quais produtos seus clientes costumam comprar de novo.',
    when: '{data} às {hora}',
    addToCalendar: 'Adicionar ao calendário',
    back: 'Voltar para o início',
  },

  waitlist: {
    h1: 'Você está na lista.',
    text: 'Por enquanto o Outra Vez funciona com o Bling. Assim que chegar ao {erp}, você é um dos primeiros a saber.',
    back: 'Voltar para o início',
  },

  consent: {
    text: 'Usamos cookies para entender como a página é usada e medir nossos anúncios. Você escolhe.',
    acceptAll: 'Aceitar todos',
    necessaryOnly: 'Só os necessários',
    configure: 'Configurar',
  },
} as const;

/** Substitui {chaves} por valores. Chaves sem valor ficam como estão. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export type Copy = typeof copy;
