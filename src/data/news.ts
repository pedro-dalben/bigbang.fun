export interface NewsItem {
  id: string;
  title: string;
  category: 'Eventos' | 'Atualização' | 'Comunidade' | 'Anúncio' | 'Competitivo';
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
}

export const newsData: NewsItem[] = [
  {
    id: 'campeonato-competitivo-chegando',
    title: '🏆 O Primeiro Grande Campeonato Competitivo Chegando!',
    category: 'Competitivo',
    date: '15 de Outubro, 2026',
    summary: 'Prepare seus melhores equipamentos e reúna seu clã! O primeiro torneio oficial do BigBangCraft terá premiações em dinheiro e itens lendários.',
    content: `
      ### Chegou a hora de provar o seu valor!

      Estamos extremamente empolgados em anunciar o **1º Campeonato Oficial do BigBangCraft**! Com o sucesso do nosso modpack *AllTheMons*, vimos clãs inteiros dominando territórios e construindo impérios. Agora, queremos ver quem realmente possui a melhor estratégia e as melhores builds no campo de batalha.

      #### 📅 Datas e Inscrições
      - **Abertura das Inscrições:** 20 de Outubro
      - **Início das Classificatórias:** 01 de Novembro
      - **Grande Final (Transmissão ao vivo):** 15 de Novembro

      #### 💎 Premiações
      - **1º Lugar:** R$ 500,00 + Tag [Campeão] exclusiva no servidor + 3x VIP Ouro
      - **2º Lugar:** R$ 250,00 + 3x VIP Prata
      - **3º Lugar:** 3x VIP Bronze + Caixas de Cosméticos Lendários

      #### ⚔️ Regras Gerais
      As batalhas acontecerão em uma arena customizada e isolada do mundo principal para garantir 100% de performance e zero lag. O uso de itens duplicados ou exploração de falhas resultará em desclassificação imediata do clã.

      Fique de olho no nosso **Discord** para o formulário de inscrição. Reúna seus amigos e comece a treinar!
    `,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nova-atualizacao-servidor',
    title: '🚀 Mega Atualização: Novas Dimensões e Otimização Extrema',
    category: 'Atualização',
    date: '02 de Outubro, 2026',
    summary: 'Adicionamos novas missões diárias, rebalanceamento na economia e aplicamos patches de estabilidade que aumentaram o TPS médio para cravados 20!',
    content: `
      ### O BigBangCraft nunca esteve tão rápido!

      Nossa equipe de desenvolvedores e engenheiros trabalhou incansavelmente nas últimas semanas para entregar a atualização mais aguardada do modpack *AllTheMons*. Focamos em três pilares: **Performance**, **Conteúdo** e **Economia**.

      #### ⚡ Performance e TPS
      Substituimos vários scripts internos por soluções nativas e otimizadas. Com isso, mesmo com mais de 80 jogadores simultâneos gerando chunks, o servidor tem mantido a taxa de **20 TPS** (Ticks Per Second) de forma constante!

      #### 🌍 Novas Dimensões
      Foi liberado o portal para o **Vazio Primordial**, uma dimensão de alto risco e alta recompensa onde os minérios têm taxa de refino dobrada, mas o PvP é totalmente ativado e não há perda de itens desativada!

      #### 💰 Economia Dinâmica
      A loja da comunidade recebeu um reajuste de preços baseado na oferta e demanda. Itens muito vendidos terão seus preços levemente reduzidos automaticamente, incentivando os jogadores a diversificarem suas fazendas e produções.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'reset-concluido',
    title: '✨ Reset do Mundo de Mineração Concluído com Sucesso',
    category: 'Anúncio',
    date: '28 de Setembro, 2026',
    summary: 'O mundo de mineração e exploração foi totalmente resetado! Novos recursos, estruturas raras e dungeons inéditas aguardam os exploradores.',
    content: `
      ### Recursos renovados para todos!

      Como programado em nosso calendário mensal, o **Mundo de Mineração** foi 100% gerado novamente. Isso significa que todos os minérios raros, baús de dungeons e estruturas especiais estão intactos e prontos para serem descobertos!

      #### 🔍 O que mudou no novo gerador?
      - Aumento de 15% na taxa de aparição de estruturas do mod de Dungeons.
      - Nova camada de minérios profundos acessível apenas com picaretas de nível 4 ou superior.
      - Sistema de proteção temporária na área de spawn do mundo de mineração para evitar *spawn kill*.

      Lembramos que o **Mundo Principal (Cidades e Bases)** NUNCA é resetado. Suas construções, máquinas e estoques continuam 100% seguros!
    `,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'novos-eventos-comunidade',
    title: '🎉 Calendário de Eventos da Comunidade para este Mês',
    category: 'Eventos',
    date: '20 de Setembro, 2026',
    summary: 'Confira a programação completa de eventos semanais: Corrida de Parkour, Spleef com habilidades, Invasão de Bosses e o clássico Esconde-Esconde.',
    content: `
      ### Diversão garantida toda semana!

      No BigBangCraft, a jogabilidade vai muito além de apenas acumular recursos. Nossa equipe de Staffers preparou um calendário recheado de eventos automáticos e manuais para você se divertir com seus amigos e ganhar prêmios incríveis!

      #### ⏰ Programação Fixa
      - **Terças-feiras às 20h:** Corrida de Parkour Maluca (Prêmio: Chaves de Caixas)
      - **Quintas-feiras às 20h:** Torneio de Spleef Explosivo
      - **Sábados às 18h:** Mega Invasão de Bosses no Spawn
      - **Domingos às 16h:** Esconde-Esconde valendo Coins e Itens Especiais

      Além dos eventos fixos, fiquem atentos aos alertas no chat do jogo! Nossos moderadores costumam fazer mini-eventos surpresa com chuva de itens e vale-vips.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'correcoes-melhorias-recentes',
    title: '🔧 Correções de Bugs e Melhorias de Qualidade de Vida',
    category: 'Comunidade',
    date: '10 de Setembro, 2026',
    summary: 'Lista detalhada de pequenos ajustes solicitados pelos jogadores, incluindo correções em mochilas, chat global e otimização de renderização.',
    content: `
      ### Ouvindo a nossa comunidade!

      Agradecemos a todos os jogadores que utilizam o canal de sugestões e relatórios de bugs no nosso Discord. Graças a vocês, aplicamos um *hotfix* com dezenas de melhorias na experiência de jogo.

      #### 🛠️ Principais Correções
      - Corrigido o erro que fazia algumas mochilas não abrirem em territórios de aliados.
      - Ajustado o filtro do chat global para evitar falsos positivos com palavras comuns.
      - Reduzido o volume dos efeitos sonoros das máquinas de processamento avançado.
      - Otimizado o envio de pacotes de dados das entidades customizadas, reduzindo o *desync* em conexões com ping mais alto.

      Continuem enviando seus feedbacks! O BigBangCraft é feito por jogadores, para jogadores.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  }
];
