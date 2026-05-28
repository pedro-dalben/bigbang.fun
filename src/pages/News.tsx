import { useState, useEffect } from 'react';
import { NewsCard } from '../components/NewsCard';
import { getNews, FirestoreNewsItem } from '../services/newsService';
import { Newspaper, Filter } from 'lucide-react';

export function News() {
  const [news, setNews] = useState<FirestoreNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Eventos', 'Atualização', 'Comunidade', 'Anúncio', 'Competitivo'];

  useEffect(() => {
    getNews()
      .then((data) => {
        setNews(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = selectedCategory === 'Todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      
      {/* Cabecalho da Página */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold mb-3">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Central de Informações</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Notícias e <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Anúncios</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Fique atualizado sobre os próximos campeonatos, eventos da comunidade, manutenções e novidades do modpack.
        </p>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <span className="text-xs text-slate-500 flex items-center gap-1 mr-2 font-medium">
          <Filter className="w-3.5 h-3.5" /> Filtrar:
        </span>
        
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950 scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Notícias */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 text-xs font-semibold">Carregando central de informações...</span>
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#121024]/30 rounded-2xl border border-purple-950">
          <p className="text-slate-400 text-sm">Nenhuma notícia encontrada para a categoria selecionada.</p>
          <button 
            onClick={() => setSelectedCategory('Todas')}
            className="mt-4 text-xs font-bold text-purple-400 hover:text-purple-300 underline"
          >
            Ver todas as notícias
          </button>
        </div>
      )}

    </div>
  );
}
