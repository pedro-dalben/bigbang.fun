import { Scale, ShieldAlert, UserX, Bug, Flame, HeartHandshake, AlertOctagon } from 'lucide-react';

export function Rules() {
  
  const rulesList = [
    {
      icon: <HeartHandshake className="w-5 h-5 text-purple-400" />,
      title: "1. Respeite os outros jogadores",
      description: "O BigBangCraft é um ambiente para todas as idades. Discursos de ódio, ofensas graves, assédio ou discriminação de qualquer natureza resultam em silenciamento (mute) ou banimento imediato."
    },
    {
      icon: <UserX className="w-5 h-5 text-red-400" />,
      title: "2. Proibido o uso de Hacks ou Cheats",
      description: "A utilização de clientes modificados (X-Ray, KillAura, Fly, Speed, etc.), macros ou qualquer ferramenta externa que conceda vantagens injustas sobre os demais é estritamente proibida."
    },
    {
      icon: <Bug className="w-5 h-5 text-amber-400" />,
      title: "3. Proibido o abuso de Bugs",
      description: "Encontrou uma falha de duplicação ou um erro no modpack? Reporte imediatamente à Staff. O aproveitamento intencional de falhas para enriquecimento ilícito gera o reset total da conta."
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      title: "4. Proibido Griefing fora das regras",
      description: "A destruição de construções alheias em áreas protegidas ou a criação de armadilhas em portais públicos não é tolerada. O PvP é liberado apenas nas áreas ou dimensões designadas."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-cyan-400" />,
      title: "5. Respeite a equipe de Staff",
      description: "Nossos moderadores e administradores dedicam seu tempo para manter a ordem. O desrespeito, envio excessivo de mensagens desnecessárias (flood) ou desacato às orientações da equipe serão punidos."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      
      {/* Cabecalho da Página */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Diretrizes de Convivência</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Regras do <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400">Servidor</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Para garantir a diversão e a justiça para todos os aventureiros, pedimos que leia com atenção e siga nosso código de conduta.
        </p>
      </div>

      {/* Lista de Regras */}
      <div className="space-y-6 mb-16">
        {rulesList.map((rule, idx) => (
          <div 
            key={idx}
            className="bg-[#121024]/60 border border-purple-950 hover:border-purple-800/50 rounded-2xl p-6 sm:p-8 transition-all duration-200 flex gap-4 sm:gap-6 items-start"
          >
            <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-900/40 shrink-0 mt-0.5">
              {rule.icon}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {rule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {rule.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Seção sobre Punições */}
      <div className="bg-gradient-to-r from-red-950/30 via-[#151329] to-purple-950/30 border border-red-900/30 rounded-3xl p-8 text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500"></div>

        <AlertOctagon className="w-10 h-10 text-red-400 mx-auto mb-3" />
        
        <h3 className="text-lg font-bold text-white mb-2">
          Aplicação de Punições
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          As punições podem variar conforme a gravidade e a reincidência da infração. 
          A equipe de Staff reserva-se o direito de analisar cada caso individualmente, aplicando desde advertências verbais até o banimento permanente de IP e hardware.
        </p>

        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
          <span>⚠️ 1ª Infração: Alerta / Mute</span>
          <span>🛑 2ª Infração: Banimento Temporário</span>
          <span>❌ 3ª Infração: Banimento Permanente</span>
        </div>

      </div>

      {/* Rodapé da Página */}
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-500">
          Ao conectar-se ao IP <span className="text-slate-300 font-mono">bigbangcraft.fun</span>, você concorda automaticamente com todas as regras listadas acima.
        </p>
      </div>

    </div>
  );
}
