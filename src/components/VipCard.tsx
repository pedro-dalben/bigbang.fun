import { VipPlan } from '../data/vips';
import { Check, Sparkles, ShieldAlert, Award } from 'lucide-react';

interface VipCardProps {
  plan: VipPlan;
}

export function VipCard({ plan }: VipCardProps) {
  
  // Cores dinâmicas para cada tipo de VIP
  const themes = {
    bronze: {
      border: 'border-[#cd7f32]/40 hover:border-[#cd7f32]',
      bg: 'bg-gradient-to-b from-[#1c130d] to-[#0b0a14]',
      badgeBg: 'bg-[#cd7f32]/20 text-[#e6a15c] border-[#cd7f32]/30',
      glow: 'hover:shadow-[0_0_25px_rgba(205,127,50,0.25)]',
      accent: 'text-[#e6a15c]',
      btn: 'bg-gradient-to-r from-[#cd7f32] to-[#a0522d] hover:from-[#b8732d] hover:to-[#8b4513] text-white',
    },
    silver: {
      border: 'border-slate-400/40 hover:border-slate-300',
      bg: 'bg-gradient-to-b from-[#181a20] to-[#0b0a14]',
      badgeBg: 'bg-slate-400/20 text-slate-200 border-slate-400/30',
      glow: 'hover:shadow-[0_0_25px_rgba(148,163,184,0.25)]',
      accent: 'text-slate-300',
      btn: 'bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-300 hover:to-slate-500 text-slate-950 font-bold',
    },
    gold: {
      border: 'border-amber-500/50 hover:border-amber-400',
      bg: 'bg-gradient-to-b from-[#241a0e] to-[#0b0a14]',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      accent: 'text-amber-400',
      btn: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold',
    }
  };

  const currentTheme = themes[plan.color];

  return (
    <div className={`relative rounded-2xl border ${currentTheme.border} ${currentTheme.bg} p-6 sm:p-8 transition-all duration-300 ${currentTheme.glow} flex flex-col justify-between h-full group`}>
      
      {/* Etiqueta Popular / Destaque */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-purple-950">
          Mais Recomendado
        </div>
      )}

      <div>
        
        {/* Cabecalho do Card */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-xl font-extrabold text-white tracking-wide group-hover:translate-x-1 transition-transform">
            {plan.name}
          </h3>
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentTheme.badgeBg}`}>
            {plan.badge}
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-6 line-clamp-2">
          {plan.description}
        </p>

        {/* Preço */}
        <div className="mb-6 pb-6 border-b border-white/5">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white tracking-tight">{plan.price}</span>
            <span className="text-xs font-medium text-slate-400">/{plan.period}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Sem renovação automática. Pagamento único por ciclo.
          </p>
        </div>

        {/* Lista de Beneficios */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Benefícios Inclusos:
          </p>
          
          <ul className="space-y-2.5">
            {plan.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <Check className={`w-4 h-4 mt-0.5 shrink-0 ${currentTheme.accent}`} />
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Ação do Card */}
      <div className="pt-4 border-t border-white/5">
        <a
          href="https://discord.gg/RH96xdsYaE"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 px-4 rounded-xl text-center text-sm font-semibold tracking-wide shadow-lg transition-all duration-200 block ${currentTheme.btn} active:scale-95`}
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Solicitar VIP / Staff
          </span>
        </a>
        
        <p className="text-[10px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
          <ShieldAlert className="w-3 h-3" />
          Ativação rápida via suporte
        </p>
      </div>

    </div>
  );
}
