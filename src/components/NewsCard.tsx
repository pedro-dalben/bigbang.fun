import { NavLink } from 'react-router-dom';
import { NewsItem } from '../data/news';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  
  // Cores de categoria
  const categoryColors = {
    Eventos: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    Atualização: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    Comunidade: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Anúncio: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Competitivo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const badgeStyle = categoryColors[news.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

  return (
    <div className="bg-[#121024]/60 border border-purple-950 hover:border-purple-800/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col justify-between group">
      
      <div>
        {/* Imagem de Capa */}
        <div className="relative h-48 w-full overflow-hidden bg-purple-950/40">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121024] via-transparent to-transparent"></div>
          
          {/* Categoria Badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md ${badgeStyle}`}>
              {news.category}
            </span>
          </div>
        </div>

        {/* Corpo do Card */}
        <div className="p-5">
          
          {/* Data */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <time>{news.date}</time>
          </div>

          {/* Titulo */}
          <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 mb-2 group-hover:text-purple-300 transition-colors">
            {news.title}
          </h3>

          {/* Resumo */}
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {news.summary}
          </p>

        </div>
      </div>

      {/* Botao de Ação */}
      <div className="px-5 pb-5 pt-2">
        <NavLink 
          to={`/noticias/${news.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group/btn"
        >
          Ler matéria completa
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </NavLink>
      </div>

    </div>
  );
}
