import { UpdateItem } from '../data/updates';
import { Calendar, Tag, Zap, Cpu, Wrench, ShieldAlert, Sparkles, Layers } from 'lucide-react';

interface UpdateCardProps {
  update: UpdateItem;
}

export function UpdateCard({ update }: UpdateCardProps) {
  
  // Icones e cores dinamicas por subcategoria
  const getCategoryConfig = (cat: string) => {
    switch (cat) {
      case 'Gameplay':
        return {
          icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
          color: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/20'
        };
      case 'Performance':
        return {
          icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" />,
          color: 'text-cyan-400',
          bg: 'bg-cyan-500/10 border-cyan-500/20'
        };
      case 'Mods':
        return {
          icon: <Layers className="w-3.5 h-3.5 text-purple-400" />,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10 border-purple-500/20'
        };
      case 'Correções':
        return {
          icon: <Wrench className="w-3.5 h-3.5 text-emerald-400" />,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10 border-emerald-500/20'
        };
      case 'Eventos':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-pink-400" />,
          color: 'text-pink-400',
          bg: 'bg-pink-500/10 border-pink-500/20'
        };
      default:
        return {
          icon: <Tag className="w-3.5 h-3.5 text-slate-400" />,
          color: 'text-slate-400',
          bg: 'bg-slate-500/10 border-slate-500/20'
        };
    }
  };

  return (
    <div className="bg-[#121024]/40 border border-purple-950 hover:border-purple-800/40 rounded-2xl p-6 transition-all duration-300">
      
      {/* Cabecalho da Atualizacao */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-purple-600 text-white shadow">
              Patch
            </span>
            <h3 className="text-lg font-extrabold text-white tracking-wide">
              {update.version}
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {update.summary}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <time>{update.date}</time>
        </div>
      </div>

      {/* Lista de categorias do changelog */}
      <div className="mt-5 space-y-5">
        {update.details.map((section, idx) => {
          const config = getCategoryConfig(section.category);
          
          return (
            <div key={idx} className="space-y-2">
              
              {/* Categoria Header */}
              <div className="flex items-center gap-1.5">
                <span className={`p-1 rounded ${config.bg}`}>
                  {config.icon}
                </span>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                  {section.category}
                </h4>
              </div>

              {/* Lista de mudancas */}
              <ul className="space-y-1.5 pl-6 border-l border-white/5">
                {section.changes.map((change, cIdx) => (
                  <li key={cIdx} className="text-xs text-slate-300 relative">
                    <span className="absolute -left-4 top-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
                    <span className="leading-relaxed">{change}</span>
                  </li>
                ))}
              </ul>

            </div>
          );
        })}
      </div>

      {/* Roda do Card */}
      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-purple-400" />
          Atualização aplicada automaticamente no servidor
        </span>
        <span className="font-mono">ID: {update.id}</span>
      </div>

    </div>
  );
}
