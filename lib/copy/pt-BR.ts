/**
 * Todo o texto da landing page (PRD_LP seção 6 + 12.1 + 13).
 * Textos definitivos: não reescreva. Mudou o PRD → mude aqui.
 * Variáveis entre {chaves} são substituídas com `fill()`.
 * Itens marcados [confirmar Diego] no PRD estão comentados como tal.
 */

/**
 * Todo o texto da landing page. Fonte: docs/PRD_LP_v2.md (seções 4, 5, 6, 8 e 9); o que o v2 não
 * redefine continua como em docs/PRD_LP.md (formulário, tour, consentimento, páginas internas).
 * Regras: zero travessão, glossário do DS, textos idênticos ao PRD (teste em tests/unit/copy.test.ts).
 * Variáveis entre {chaves} são substituídas com `fill()`.
 */

export const copy = {
  meta: {
    title: 'Outra Vez | CRM para quem vende em marketplace',
    description:
      'Identifique quem comprou de você no Mercado Livre, Shopee e Amazon e venda de novo pelo WhatsApp. Integra com Bling e outros ERPs. Agende uma demo.',
    slogan: 'Vendeu uma vez? Venda outra vez.',
  },

  a11y: {
    skipToContent: 'Pular para o conteúdo',
    home: 'Outra Vez, voltar ao início',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuTitle: 'Menu',
    mainNav: 'Navegação principal',
    footerNav: 'Links do rodapé',
  },

  cta: {
    primary: 'Agendar demo grátis',
    header: 'Agendar demo',
    secondaryHero: 'Ver como funciona',
  },

  header: {
    nav: [
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Rota de recompra', href: '#rota-de-recompra' },
      { label: 'Por dentro', href: '#por-dentro' },
      { label: 'Integrações', href: '#integracoes' },
      { label: 'Perguntas', href: '#perguntas' },
    ],
    signIn: 'Entrar',
  },

  hero: {
    eyebrow: 'CRM para quem vende em marketplace',
    h1Before: 'Vendeu uma vez? Venda ',
    h1Highlight: 'outra vez.',
    subtitle:
      'O Outra Vez identifica quem comprou de você em cada marketplace, cuida do pós-venda pelo WhatsApp e avisa o cliente na hora de comprar de novo. No marketplace ou no seu canal.',
    microcopy: '30 minutos por videochamada. Grátis e sem compromisso.',
    visual: {
      storeName: 'Casa Lavanda',
      bubble1:
        'Oi, Maria! Aqui é da Casa Lavanda. Seu pedido Kit Refil Lavanda foi faturado e já está seguindo para entrega. Se tiver qualquer problema com a entrega, é só responder esta mensagem. Você também quer receber dicas e ofertas da Casa Lavanda por aqui?',
      bubble1Buttons: ['Quero receber', 'Não, obrigado'],
      reply: 'Quero receber',
      dateSeparator: '42 dias depois',
      bubble2:
        'Oi, Maria! O Kit Refil Lavanda que você comprou costuma durar cerca de 45 dias. Já está na hora de repor?',
      bubble2Button: 'Ver produto',
      kpiLabel: 'Comprou de novo',
      kpiValue: 'R$ 149,90',
      kpiChannel: 'Shopee',
      caption: 'Conversa ilustrativa',
    },
  },

  /** Faixa "Funciona com" logo abaixo do hero (PRD v2 7 e 9.2). */
  logoStrip: {
    label: 'Funciona com',
    ariaLabel: 'Marketplaces compatíveis',
    more: 'e outros canais do seu ERP',
    erp: 'Bling e outros ERPs com API',
  },

  problem: {
    eyebrow: 'O problema',
    h2: 'Você paga para vender. E paga de novo para vender para o mesmo cliente.',
    cards: [
      {
        icon: 'Store',
        title: 'O cliente fica com o marketplace.',
        text: 'Comissão, frete e anúncio saem de cada venda. Na hora de comprar de novo, ele volta para a busca e você paga anúncio para reconquistar quem já tinha comprado de você.',
      },
      {
        icon: 'Archive',
        title: 'Seus compradores estão parados no ERP.',
        text: 'Milhares de pedidos registrados, sem contato, sem histórico entre canais e sem ninguém olhando para eles.',
      },
      {
        icon: 'Clock',
        title: 'Ninguém avisa na hora de repor.',
        text: 'O produto acaba, o cliente abre o app e compra de quem aparecer primeiro.',
      },
    ],
    closing: 'A sua próxima venda já está na sua base de pedidos.',
  },

  howItWorks: {
    eyebrow: 'Como funciona',
    h2: 'Da venda no marketplace ao cliente que volta.',
    subtitle: 'Você conecta o ERP uma vez. A tecnologia faz o resto e mostra cada passo no painel.',
    steps: [
      {
        icon: 'Plug',
        title: 'Conecta o seu ERP.',
        text: 'Lemos pedidos e notas. Não alteramos nada.',
      },
      {
        icon: 'ScanSearch',
        title: 'Identifica quem comprou.',
        text: 'Cruzamos os dados de cada pedido com bases cadastrais para reconhecer o comprador e chegar a um contato válido.',
      },
      {
        icon: 'Repeat',
        title: 'Junta os canais e prevê a recompra.',
        text: 'O mesmo cliente do Mercado Livre e da Shopee vira uma ficha só, e o sistema aprende quando cada produto costuma acabar.',
      },
      {
        icon: 'MessageCircle',
        title: 'Cuida do pós-venda.',
        text: 'A primeira mensagem é sobre o pedido e pede permissão. Novidades e reposição só para quem aceitou.',
      },
      {
        icon: 'ChartNoAxesColumn',
        title: 'Mostra o que voltou.',
        text: 'Cada venda nova aparece no painel, com canal, valor e custo para trazer.',
      },
    ],
  },

  /** Seção nova (PRD v2 5.2 e 9.5). */
  route: {
    eyebrow: 'Rota de recompra',
    h2: 'Você decide para onde cada cliente volta.',
    subtitle:
      'Algumas recompras valem mais no marketplace, outras no seu canal. O Outra Vez segue a regra que você definir.',
    defaultBadge: 'Padrão',
    cards: [
      {
        id: 'marketplace',
        icon: 'Store',
        title: 'No marketplace',
        when: 'Sempre que você não tem canal próprio, ou para produtos em que o ranking do anúncio importa',
        gets: 'Link para o seu anúncio no marketplace. Recompra conta para sua reputação e posição',
      },
      {
        id: 'canal',
        icon: 'House',
        title: 'No seu canal',
        when: 'Cliente que aceitou novidades, quando você tem loja virtual ou vende pelo WhatsApp',
        gets: 'Link para sua loja ou atendimento direto. Sem comissão de marketplace nessa venda',
      },
      {
        id: 'regra',
        icon: 'Split',
        title: 'Por regra',
        // PRD v2 diz "segmento", proibido pelo glossário do DS → "lista de clientes".
        when: 'Por produto, margem ou lista de clientes',
        gets: 'Ex.: kits e recompra recorrente vão para o seu canal; produto de entrada vai para o marketplace',
      },
    ],
    note: 'O marketplace é a rota padrão. O seu canal só entra para clientes que aceitaram receber novidades.',
    diagram: {
      marketplace: 'Seu anúncio',
      own: 'Sua loja',
    },
    // Rótulos do diagrama e das linhas do card que o PRD descreve sem texto literal.
    ui: {
      customer: 'Cliente',
      when: 'Quando usar',
      gets: 'O que o cliente recebe',
      diagramLabel:
        'Diagrama: o cliente no centro, com uma seta de retorno para o seu anúncio no marketplace e outra para a sua loja.',
    },
  },

  tour: {
    eyebrow: 'Conheça por dentro',
    h2: 'O painel que você vai abrir todo dia.',
    subtitle: 'Telas reais do Outra Vez com dados de uma loja de exemplo.',
    cta: 'Agendar demo grátis',
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
        text: 'O mesmo comprador do Mercado Livre, da Shopee e da Amazon numa ficha só, com quanto já gastou e quando comprou pela última vez.',
        hotspots: [
          { title: 'Um cliente, todos os canais', text: 'comprou no Mercado Livre e na Shopee.' },
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
        title: 'Custo antes de enviar.',
        text: 'Você vê quanto o WhatsApp vai cobrar e quantos clientes ficam de fora antes de confirmar qualquer envio em massa.',
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

  safety: {
    eyebrow: 'Segurança',
    h2: 'Feito para vender de novo sem colocar sua conta em risco.',
    subtitle:
      'O medo de punição do marketplace é real. Por isso as regras de proteção já vêm ligadas.',
    // [validação jurídica, PRD v2 12] Itens 3 e 5.
    items: [
      {
        icon: 'MessageSquareText',
        title: 'A primeira mensagem é sobre o pedido.',
        text: 'Nada de oferta fria. O cliente recebe um aviso útil e escolhe se quer novidades.',
      },
      {
        icon: 'UserCheck',
        title: 'Novidade só para quem aceitou.',
        text: 'Quem responde SAIR para de receber na hora.',
      },
      {
        icon: 'MessageSquareOff',
        title: 'Nunca usamos o chat do marketplace.',
        text: 'Tudo parte do pedido que já está no seu ERP.',
      },
      {
        icon: 'BadgeCheck',
        title: 'WhatsApp oficial.',
        text: 'Pela API oficial, com o número da sua loja. Nada de ferramenta não oficial que derruba número.',
      },
      {
        icon: 'Lock',
        title: 'Seus dados, suas regras.',
        text: 'Você é dono da base. Guardamos só o necessário e registramos a origem de cada dado.',
      },
    ],
  },

  /** Seção nova (PRD v2 6 e 9.9). */
  integrations: {
    eyebrow: 'Integrações',
    h2: 'Funciona com o ERP que você já usa.',
    subtitle:
      'Começamos pelo Bling. Se o seu ERP ou hub tem API, a gente conecta durante a implantação.',
    active: 'Integração ativa',
    onboarding: 'Conectamos na implantação',
    other: {
      title: 'Seu ERP tem API? A gente conecta.',
      cta: 'Usa outro sistema? Me conta qual',
    },
  },

  /** Simulador antigo (v1). Sai na etapa 3, quando a calculadora nova entra. */
  simulator: {
    eyebrow: 'Faça as contas',
    h2: 'Quanto pode voltar para a sua loja em um ano?',
    subtitle:
      'É uma simulação com dados de mercado. Na demo, a gente refaz com os pedidos reais do seu ERP.',
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

  calculator: {
    eyebrow: 'Faça as contas',
    h2: 'Quanto pode voltar para a sua loja em um ano?',
    subtitle:
      'É uma simulação com dados de mercado. Na demo, a gente refaz com os pedidos reais do seu ERP.',
    inputs: {
      orders: 'Pedidos por mês',
      ticket: 'Ticket médio',
      category: 'O que você vende',
      ownChannelToggle: 'Tenho loja virtual ou vendo pelo WhatsApp',
      ownChannel: 'Recompras no seu canal',
    },
    categories: {
      media: 'Média do e-commerce',
      suplementos: 'Suplementos e saúde',
      beleza: 'Beleza e cuidados',
      reposicao: 'Pet, alimentos e reposição',
      alto_valor: 'Alto valor (eletrônicos, luxo)',
    },
    outputs: {
      revenue: 'Receita que pode voltar em 12 meses',
      customers: 'Clientes que compram de novo',
      orders: 'Pedidos a mais no ano',
      commission: 'Comissão que fica com você',
      commissionOff: 'Ative se você tem canal próprio',
    },
    showMath: 'Ver as contas',
    assumptions: {
      uniqueCustomers: 'Clientes únicos por pedido',
      uniqueCustomersNote: 'Na demo usamos os CPFs únicos reais do seu ERP',
      validContact: 'Compradores com contato válido encontrado',
      validContactNote: 'Mantido da versão atual',
      capture: 'Parte do benchmark que o Outra Vez captura',
      captureNote: 'Hipótese a validar com os primeiros clientes',
      commission: 'Comissão média de marketplace evitada',
      commissionNote: 'Faixa real: ML 10 a 19%, Shopee 14 a 20%, Magalu 16%',
    },
    disclaimer:
      'Simulação com dados públicos de recompra do e-commerce e premissas médias. Não é promessa de resultado. Não inclui a assinatura do Outra Vez nem o custo das mensagens, que mostramos na demo.',
    cta: 'Agendar demo com os meus números',
    // Textos de apoio que o PRD descreve sem texto literal (linha de apoio, cabeçalhos, fórmula).
    ui: {
      support: 'Cerca de {perMonth} por mês. {pct} do que você fatura no ano.',
      categoryHeader: 'Categoria',
      benchmarkHeader: 'Recompra no e-commerce',
      extrasHeader: 'Pedidos extras por cliente que volta em 12 meses',
      sourceHeader: 'Fonte',
      assumptionHeader: 'Premissa',
      valueHeader: 'Valor',
      noteHeader: 'Observação',
      formulaTitle: 'A conta, em linguagem simples',
      formula: [
        'Pedidos por mês × 12 × clientes únicos por pedido = clientes no ano.',
        'Desses, os que têm contato válido podem receber mensagem.',
        'A taxa de recompra da sua categoria × a parte que o Outra Vez captura = quantos voltam.',
        'Quem volta × pedidos extras da categoria × ticket médio = receita em 12 meses.',
        'Comissão que fica com você = receita × recompras no seu canal × comissão média.',
        'A receita nunca passa de 12% do que você fatura no ano.',
      ],
      sourcesTitle: 'Fontes',
      ordersValue: '{n} pedidos por mês',
      ticketValue: '{v} de ticket médio',
      ownChannelValue: '{n}% das recompras no seu canal',
    },
  },

  comparison: {
    eyebrow: 'Comparação',
    h2: 'O que muda em relação ao jeito de hoje.',
    columns: ['Planilha do ERP', 'WhatsApp Web + extensão', 'CRM genérico', 'Outra Vez'],
    values: { yes: 'Sim', partial: 'Em parte', no: 'Não' },
    rows: [
      {
        label: 'Clientes de todos os canais numa lista só',
        cells: ['partial', 'no', 'partial', 'yes'],
      },
      { label: 'Encontra um contato válido para cada comprador', cells: ['no', 'no', 'no', 'yes'] },
      { label: 'Avisa quando o produto deve acabar', cells: ['no', 'no', 'no', 'yes'] },
      { label: 'Pede permissão antes de mandar novidades', cells: ['no', 'no', 'partial', 'yes'] },
      {
        label: 'Escolhe se a recompra vai para o marketplace ou para o seu canal',
        cells: ['no', 'no', 'no', 'yes'],
      },
      { label: 'Mostra quanto voltou em vendas', cells: ['no', 'no', 'partial', 'yes'] },
      { label: 'Envio pela API oficial do WhatsApp', cells: ['no', 'no', 'partial', 'yes'] },
    ],
    ui: {
      tabsLabel: 'Comparar o Outra Vez com',
    },
  },

  demo: {
    eyebrow: 'A demo',
    h2: '30 minutos para ver se faz sentido para a sua loja.',
    steps: [
      {
        title: 'Entendemos sua operação.',
        text: 'Canais, volume de pedidos e quais produtos seus clientes compram de novo.',
      },
      {
        title: 'Mostramos o Outra Vez por dentro.',
        text: 'Da conexão com o ERP até a primeira venda que volta.',
      },
      {
        title: 'Fazemos as contas com os seus pedidos.',
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
    // [confirmar Diego, só publicar se for verdade] NEXT_PUBLIC_FEATURE_PILOT.
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
        a: 'O Outra Vez foi desenhado para reduzir esse risco. Nunca usamos o chat do marketplace, a primeira mensagem é sempre sobre o pedido real e novidades só vão para quem aceitou. Por padrão, os links levam para o seu anúncio no próprio marketplace. Cada marketplace tem regras próprias, e na demo mostramos como lidamos com cada uma.',
      },
      {
        id: 'contato',
        q: 'Como vocês identificam o cliente e encontram o contato?',
        a: 'A partir dos dados do pedido no seu ERP, consultamos bases cadastrais para reconhecer o comprador e chegar a um telefone válido. Se o contato já está no seu ERP, usamos esse sem custo. Quando o nome encontrado não confere com o do pedido, o número fica como "a confirmar" e não recebe mensagem automática.',
      },
      {
        id: 'lgpd',
        q: 'Isso está de acordo com a LGPD?',
        // [validação jurídica, PRD v2 12]
        a: 'Você continua dono dos dados e o Outra Vez trata esses dados em seu nome. Guardamos só o necessário, registramos de onde cada dado veio e toda mensagem tem saída fácil. O cliente também tem uma página para parar de receber quando quiser.',
      },
      {
        id: 'rota',
        q: 'A recompra acontece no marketplace ou no meu site?',
        a: 'Você escolhe. O padrão é o seu anúncio no marketplace. Se você tem loja virtual ou vende pelo WhatsApp, pode levar clientes que aceitaram novidades para o seu canal, por produto ou por lista de clientes.',
      },
      {
        id: 'erp',
        q: 'Funciona com o meu ERP?',
        a: 'A integração com o Bling já está ativa. Se você usa Tiny, Omie, UpSeller ou outro ERP ou hub com API, a gente conecta durante a implantação.',
      },
      {
        id: 'altera-erp',
        q: 'O Outra Vez altera alguma coisa no meu ERP?',
        a: 'Não. Só lemos pedidos, notas e contatos.',
      },
      {
        id: 'tempo',
        q: 'Em quanto tempo vejo meus clientes?',
        a: 'Os primeiros aparecem minutos depois da conexão. O histórico completo carrega em segundo plano.',
      },
      {
        id: 'api-oficial',
        q: 'Preciso ter a API oficial do WhatsApp?',
        a: 'Sim, as mensagens saem pelo número da sua loja na API oficial. Se você ainda não tem, a gente ajuda a conectar na implantação.',
      },
      {
        id: 'reguas',
        q: 'Vou ter que montar as réguas do zero?',
        a: 'Não. Você começa com réguas prontas de pós-venda, reposição e reativação e ajusta o que quiser.',
      },
      {
        id: 'preco',
        q: 'Quanto custa?',
        a: 'Depende do volume da sua operação. A assinatura e o custo das mensagens aparecem na demo, já com os seus números. Você vê o custo antes de cada envio.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'Agende sua demo',
    h2: 'Seu cliente já comprou. A próxima venda começa daí.',
    subtitle: 'Leva menos de um minuto. Depois você escolhe o horário.',
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
    // Textos de apoio que o PRD 9 não define literalmente (erros extras, rótulos auxiliares).
    ui: {
      required: 'obrigatório',
      optional: 'opcional',
      selectPlaceholder: 'Escolha uma opção',
      sending: 'Enviando…',
      stepAnnounce: 'Etapa {step} de 2',
      errors: {
        storeName: 'Escreva o nome da loja.',
        marketplaces: 'Escolha pelo menos um canal.',
        orders: 'Escolha uma faixa de pedidos.',
        erp: 'Escolha o ERP que você usa.',
        generic: 'Algo deu errado do nosso lado. Tente de novo em alguns minutos.',
      },
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
      { label: 'Rota de recompra', href: '/#rota-de-recompra' },
      { label: 'Por dentro', href: '/#por-dentro' },
      { label: 'Integrações', href: '/#integracoes' },
      { label: 'Perguntas', href: '/#perguntas' },
      { label: 'Política de privacidade', href: '/privacidade' },
      { label: 'Termos de uso', href: '/termos' },
    ],
    legal: 'Outra Vez é um produto da Vivaz.',
    // [confirmar Diego] CNPJ: entra depois do ponto final quando existir em lib/site.ts.
    cnpj: 'CNPJ {CNPJ_VIVAZ}',
    trademarks:
      'Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop, Shein, Bling, Tiny, Omie, UpSeller e demais marcas citadas pertencem a seus respectivos donos. O Outra Vez não é afiliado a elas. Logos usados apenas para indicar compatibilidade.',
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
    // Rótulos do painel "Configurar" e do link no rodapé (PRD 12.1 descreve, sem texto literal).
    ui: {
      region: 'Aviso de cookies',
      necessary: 'Necessários',
      necessaryText: 'Fazem o site funcionar. Sempre ligados.',
      analytics: 'Análise',
      analyticsText: 'Mostram como a página é usada, sem identificar você.',
      ads: 'Publicidade',
      adsText: 'Medem os resultados dos nossos anúncios.',
      save: 'Salvar escolhas',
      footerLink: 'Preferências de cookies',
    },
  },
} as const;

/** Substitui {chaves} por valores. Chaves sem valor ficam como estão. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export type Copy = typeof copy;
