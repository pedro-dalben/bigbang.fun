import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getNewsItem, FirestoreNewsItem } from '../services/newsService';
import { Calendar, ArrowLeft, Share2, Sparkles } from 'lucide-react';

export function NewsDetails() {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<FirestoreNewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getNewsItem(id)
      .then((data) => {
        setNewsItem(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0a14]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400 text-xs font-semibold">Carregando notícia...</span>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-40 pb-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Matéria não encontrada</h1>
        <p className="text-slate-400 text-sm mb-8">
          A notícia que você está procurando pode ter sido removida ou o link está incorreto.
        </p>
        <NavLink 
          to="/noticias" 
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Notícias
        </NavLink>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.summary,
        url: window.location.href,
      }).catch((err) => console.error(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  // Processador simples para renderizar texto com estilo markdown básico
  const renderFormattedContent = (text: string) => {
    return text.split('\n\n').map((paragraph, pIdx) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Cabeçalhos H3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={pIdx} className="text-xl sm:text-2xl font-black text-white mt-8 mb-4 tracking-wide flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Cabeçalhos H4
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={pIdx} className="text-base sm:text-lg font-bold text-purple-300 mt-6 mb-2 tracking-tight">
            {trimmed.replace('#### ', '')}
          </h4>
        );
      }

      // Listas
      if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter(item => item.trim().startsWith('- '));
        return (
          <ul key={pIdx} className="space-y-2 my-4 pl-4 border-l-2 border-purple-900/60">
            {items.map((item, iIdx) => {
              let line = item.replace('- ', '').trim();
              
              // Processa **negrito** básico se houver
              const parts = line.split(/\*\*(.*?)\*\*/g);
              
              return (
                <li key={iIdx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 align-middle"></span>
                  {parts.map((part, partIdx) => 
                    partIdx % 2 === 1 ? <strong key={partIdx} className="text-white font-bold">{part}</strong> : part
                  )}
                </li>
              );
            })}
          </ul>
        );
      }

      // Processa **negrito** e *itálico* simples no parágrafo
      const renderInline = (str: string) => {
        // Negrito
        const boldParts = str.split(/\*\*(.*?)\*\*/g);
        return boldParts.map((bp, bpIdx) => {
          if (bpIdx % 2 === 1) {
            return <strong key={bpIdx} className="text-white font-bold">{bp}</strong>;
          }
          // Itálico
          const italicParts = bp.split(/\*(.*?)\*/g);
          return italicParts.map((ip, ipIdx) => 
            ipIdx % 2 === 1 ? <em key={ipIdx} className="text-purple-200 italic">{ip}</em> : ip
          );
        });
      };

      return (
        <p key={pIdx} className="text-sm sm:text-base text-slate-300 leading-relaxed my-4">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      
      {/* Botao de Retorno */}
      <NavLink 
        to="/noticias" 
        className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Voltar para a lista de notícias
      </NavLink>

      {/* Artigo */}
      <article className="bg-[#121024]/60 border border-purple-950 rounded-3xl overflow-hidden shadow-xl">
        
        {/* Capa */}
        <div className="relative h-64 sm:h-96 w-full">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121024] via-[#121024]/40 to-transparent"></div>
          
          {/* Categoria Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-700/50 backdrop-blur-md">
              {newsItem.category}
            </span>
          </div>

          {/* Overlay do título para telas menores */}
          <div className="absolute bottom-4 left-4 right-4 sm:hidden">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <time>{newsItem.date}</time>
            </div>
            <h1 className="text-xl font-black text-white leading-tight">
              {newsItem.title}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          
          {/* Cabecalho para telas maiores */}
          <div className="hidden sm:block pb-6 border-b border-white/5 mb-8">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <time>{newsItem.date}</time>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
                title="Compartilhar matéria"
              >
                <Share2 className="w-3.5 h-3.5" /> Compartilhar
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {newsItem.title}
            </h1>
          </div>

          {/* Botão de compartilhar em mobile */}
          <div className="flex justify-end sm:hidden pb-4 border-b border-white/5 mb-6">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 px-2.5 py-1 rounded-md"
            >
              <Share2 className="w-3 h-3" /> Compartilhar
            </button>
          </div>

          {/* Resumo em destaque */}
          <div className="bg-purple-950/30 border-l-4 border-purple-500 p-4 rounded-r-xl mb-8">
            <p className="text-sm text-purple-200/90 font-medium italic leading-relaxed">
              "{newsItem.summary}"
            </p>
          </div>

          {/* Corpo do Conteúdo Formato Longo */}
          <div className="prose prose-invert max-w-none">
            {renderFormattedContent(newsItem.content)}
          </div>

          {/* Rodapé do Artigo */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
                BBC
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Equipe BigBangCraft</span>
                <span className="block text-[10px] text-slate-500">Jornalismo & Comunidade</span>
              </div>
            </div>

            <NavLink
              to="/noticias"
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-center transition-colors"
            >
              Ver Outras Notícias
            </NavLink>
          </div>

        </div>

      </article>

      {/* Dica de IP final */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" />
          Quer participar das nossas novidades? Entre agora no IP: <span className="text-slate-300 font-mono">bigbangcraft.fun</span>
        </p>
      </div>

    </div>
  );
}
