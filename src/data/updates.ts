export interface UpdateCategory {
  category: 'Gameplay' | 'Performance' | 'Mods' | 'Correções' | 'Eventos';
  changes: string[];
}

export interface UpdateItem {
  id: string;
  version: string;
  date: string;
  summary: string;
  details: UpdateCategory[];
}

export const updatesData: UpdateItem[] = [
  {
    id: 'v2-4-0',
    version: 'v2.4.0 - Era Cósmica',
    date: '02 de Outubro, 2026',
    summary: 'A maior atualização do ano! Introdução do Vazio Primordial, reformulação de mods de tecnologia e grandes ganhos de estabilidade.',
    details: [
      {
        category: 'Gameplay',
        changes: [
          'Liberado o acesso ao portal do Vazio Primordial para jogadores com nível de exploração 20+.',
          'Rebalanceamento dos multiplicadores de dano para espadas de liga de Titânio.',
          'Adicionado sistema de missões diárias no NPC do Spawn com recompensas em moedas e experiência.'
        ]
      },
      {
        category: 'Performance',
        changes: [
          'Otimização do coletor de lixo (Garbage Collector) do servidor, reduzindo travamentos (stutters) em 40%.',
          'Limitação inteligente de entidades por chunk para evitar lag intencional com fazendas gigantes.',
          'Melhoria na sincronização de pacotes de dados das mochilas.'
        ]
      },
      {
        category: 'Mods',
        changes: [
          'Atualizado o modpack AllTheMons para a versão 3.1.2.',
          'Adicionado o mod de armazenamento digital avançado para facilitar o controle de inventários massivos.',
          'Removido o mod de minimapa antigo e substituído por uma alternativa mais leve e com suporte a marcadores de equipe.'
        ]
      },
      {
        category: 'Correções',
        changes: [
          'Corrigido o bug de duplicação que envolvia cabos de transferência de energia.',
          'Resolvido o problema de dessincronização ao usar o teletransporte (/home) montado em criaturas.',
          'Corrigido o erro visual nas texturas das armaduras místicas sob efeito de poções.'
        ]
      },
      {
        category: 'Eventos',
        changes: [
          'Adicionada a nova arena oficial para os torneios mensais.',
          'Configurados os novos horários automáticos para os eventos de Spleef e Parkour.'
        ]
      }
    ]
  },
  {
    id: 'v2-3-5',
    version: 'v2.3.5 - Estabilidade & Economia',
    date: '12 de Setembro, 2026',
    summary: 'Foco na correção de problemas relatados pela comunidade e ajustes finos nos preços da loja oficial.',
    details: [
      {
        category: 'Gameplay',
        changes: [
          'Ajuste nos preços de compra e venda de minérios brutos na loja do servidor.',
          'Aumentado o limite de blocos protegidos por jogador inicial de 1.000 para 2.500 blocos.'
        ]
      },
      {
        category: 'Correções',
        changes: [
          'Corrigida a falha onde jogadores conseguiam quebrar blocos em áreas de proteção com explosivos de nível 3.',
          'Reparado o sistema de envio de mensagens privadas (/tell) que falhava ao usar cores personalizadas.'
        ]
      },
      {
        category: 'Performance',
        changes: [
          'Reduzido o tempo de salvamento automático do mundo (auto-save) de 15 segundos para 3 segundos, evitando o congelamento temporário.'
        ]
      }
    ]
  },
  {
    id: 'v2-3-0',
    version: 'v2.3.0 - Renascimento do Submundo',
    date: '20 de Agosto, 2026',
    summary: 'Expansão do Nether com novos biomas modificados, criaturas de fogo exclusivas e novos minérios de forja.',
    details: [
      {
        category: 'Gameplay',
        changes: [
          'Novos biomas adicionados ao Nether com geração de terreno customizada.',
          'Adicionada a Forja de Almas, permitindo criar ferramentas com auto-reparo passivo.'
        ]
      },
      {
        category: 'Mods',
        changes: [
          'Atualização de compatibilidade com os clientes piratas mais recentes.',
          'Adicionados novos shaders recomendados diretamente no instalador do modpack.'
        ]
      },
      {
        category: 'Eventos',
        changes: [
          'Implementado o evento de Invasão de Criaturas no Nether todas as sextas-feiras.'
        ]
      }
    ]
  }
];
