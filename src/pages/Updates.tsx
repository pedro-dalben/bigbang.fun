import { UpdateCard } from '../components/UpdateCard';
import { updatesData } from '../data/updates';
import { History, Sparkles } from 'lucide-react';

export function Updates() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      
      {/* Cabecalho da Página */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold mb-3">
          <History className="w-3.5 h-3.5" />
          <span>Notas de Atualização</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Changelog e <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Patches</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Acompanhe todas as modificações, otimizações e novos conteúdos implementados pela nossa equipe no modpack <span className="text-white font-medium">AllTheMons</span>.
        </p>
      </div>

      {/* Timeline de Atualizações */}
      <div className="relative space-y-12">
        
        {/* Linha vertical decorativa da Timeline */}
        <div className="absolute top-4 bottom-4 left-[15px] sm:left-[27px] w-0.5 bg-gradient-to-b from-purple-500 via-purple-900/40 to-transparent hidden sm:block"></div>

        {updatesData.map((update, idx) => (
          <div key={update.id} className="relative flex gap-6">
            
            {/* Indicador visual na timeline */}
            <div className="hidden sm:flex flex-col items-center shrink-0 z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                idx === 0 
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-950 glow-purple' 
                  : 'bg-[#151329] border-purple-900/50 text-purple-400'
              }`}>
                <Sparkles className={`w-6 h-6 ${idx === 0 ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              </div>
              
              {idx === 0 && (
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-300 mt-1">
                  Recente
                </span>
              )}
            </div>

            {/* Conteudo do Update */}
            <div className="flex-1">
              <UpdateCard update={update} />
            </div>

          </div>
        ))}

      </div>

      {/* Dica de contribuição */}
      <div className="mt-16 text-center bg-white/[0.02] border border-white/5 rounded-2xl p-6">
        <p className="text-xs text-slate-400">
          Encontrou algum erro ou tem uma sugestão de mod para a próxima atualização? 
        </p>
        <a 
          href="https://discord.gg/RH96xdsYaE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 underline"
        >
          Abra um ticket em nosso Discord oficial →
        </a>
      </div>

    </div>
  );
}
