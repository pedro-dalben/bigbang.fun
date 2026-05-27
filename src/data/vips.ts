export interface VipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  color: 'bronze' | 'silver' | 'gold';
  badge: string;
  benefits: string[];
  popular?: boolean;
}

export const vipPlansData: VipPlan[] = [
  {
    id: 'vip-bronze',
    name: 'VIP Bronze',
    price: 'R$ 14,90',
    period: 'por mês',
    description: 'O ponto de partida ideal para quem quer apoiar o servidor e ter facilidades essenciais.',
    color: 'bronze',
    badge: 'Iniciante',
    benefits: [
      'Tag exclusiva [Bronze] no chat e no tab',
      'Kit inicial VIP exclusivo',
      'Acesso a comandos básicos (/hat, /craft)',
      'Prioridade de entrada em eventos da comunidade',
      'Sem tempo de espera para teletransportes'
    ]
  },
  {
    id: 'vip-prata',
    name: 'VIP Prata',
    price: 'R$ 29,90',
    period: 'por mês',
    description: 'Para jogadores dedicados que buscam mais liberdade, lares extras e estilo no servidor.',
    color: 'silver',
    badge: 'Mais Jogado',
    popular: true,
    benefits: [
      'Todos os benefícios do plano Bronze',
      'Kit mensal melhorado com itens raros',
      'Até 15 lares (/home) simultâneos',
      'Cosméticos e partículas exclusivas',
      'Prioridade máxima em filas e eventos',
      'Acesso ao canal de voz reservado no Discord'
    ]
  },
  {
    id: 'vip-ouro',
    name: 'VIP Ouro',
    price: 'R$ 49,90',
    period: 'por mês',
    description: 'A experiência definitiva! Domine o servidor com o máximo de vantagens e prestígio.',
    color: 'gold',
    badge: 'Lendário',
    benefits: [
      'Todos os benefícios do plano Prata',
      'Kit premium mensal com itens lendários',
      'Destaque absoluto com cargo e cor no Discord',
      'Acesso antecipado a novos eventos e dimensões',
      'Benefícios e comandos exclusivos no servidor',
      'Capacidade de colorir o nome e mensagens no chat',
      'Suporte direto e prioritário com a Staff'
    ]
  }
];
