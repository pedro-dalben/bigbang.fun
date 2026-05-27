import { VipCard } from '../components/VipCard';
import { vipPlansData } from '../data/vips';
import { Crown, Sparkles, HelpCircle, ShieldCheck, MessageSquare } from 'lucide-react';

export function Vips() {
  
  const faqs = [
    {
      q: "Como recebo meu VIP após entrar em contato?",
      a: "Assim que você falar com um de nossos Administradores no Discord e confirmar a contribuição, seu VIP será ativado instantaneamente via console em sua conta, seja ela original ou pirata."
    },
    {
      q: "Os itens do kit mensal acumulam?",
      a: "Você pode resgatar seu kit VIP a cada 30 dias usando o comando /kit. Caso não resgate dentro do mês, ele não acumula para o próximo ciclo."
    },
    {
      q: "Posso fazer um upgrade de plano depois?",
      a: "Sim! Se você possui o plano Bronze e deseja migrar para o Prata ou Ouro, basta chamar a Staff. Você pagará apenas a diferença proporcional ao tempo restante."
    },
    {
      q: "Para onde vai o dinheiro das contribuições?",
      a: "100% do valor arrecadado é reinvestido diretamente no pagamento do host dedicado de alta performance, proteção contra ataques DDoS, comissões de novos mods e premiações dos torneios."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      
      {/* Cabecalho da Página */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Crown className="w-3.5 h-3.5" />
          <span>Apoie o Servidor</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Planos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">VIP</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Torne-se um apoiador oficial do <span className="text-white font-semibold">BigBangCraft</span>. 
          Ganhe destaque na comunidade, kits exclusivos e ajude o servidor a crescer cada vez mais!
        </p>
      </div>

      {/* Grid de Planos VIP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {vipPlansData.map((plan) => (
          <VipCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Como funciona o processo de ativação */}
      <div className="max-w-4xl mx-auto bg-[#121024]/40 border border-purple-950 rounded-3xl p-8 sm:p-10 mb-20">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
            Simples e Seguro
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            Como solicitar o seu VIP?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Passo 1 */}
          <div className="text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-purple-950 text-purple-300 font-black text-sm flex items-center justify-center mx-auto border border-purple-800/40">
              1
            </div>
            <h3 className="text-sm font-bold text-white">Escolha seu Plano</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analise os benefícios acima e decida qual pacote se encaixa melhor no seu estilo de jogo.
            </p>
          </div>

          {/* Passo 2 */}
          <div className="text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-purple-950 text-purple-300 font-black text-sm flex items-center justify-center mx-auto border border-purple-800/40">
              2
            </div>
            <h3 className="text-sm font-bold text-white">Chame a Staff</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clique em <span className="text-slate-300 font-medium">Solicitar VIP</span> para ser redirecionado ao nosso Discord ou WhatsApp oficial.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-purple-950 text-purple-300 font-black text-sm flex items-center justify-center mx-auto border border-purple-800/40">
              3
            </div>
            <h3 className="text-sm font-bold text-white">Ativação Rápida</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Um administrador confirmará os dados e ativará suas tags e kits no mesmo instante!
            </p>
          </div>

        </div>

        {/* Botao de suporte direto */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <a
            href="https://discord.gg/RH96xdsYaE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            Ainda com dúvidas? Fale com o suporte no Discord
          </a>
        </div>

      </div>

      {/* Perguntas Frequentes */}
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-purple-200 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Termos de Transparência */}
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          BigBangCraft garante a entrega de todos os itens virtuais descritos conforme os termos da comunidade.
        </p>
      </div>

    </div>
  );
}
