import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ServerStatusCard } from '../components/ServerStatusCard';
import { NewsCard } from '../components/NewsCard';
import { getNews, FirestoreNewsItem } from '../services/newsService';
import { 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  Users, 
  Layers, 
  Trophy, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Flame
} from 'lucide-react';

export function Home() {
  const [copied, setCopied] = useState(false);
  const [recentNews, setRecentNews] = useState<FirestoreNewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then((data) => {
        setRecentNews(data.slice(0, 3));
      })
      .catch((err) => console.error(err))
      .finally(() => setNewsLoading(false));
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText('bigbangcraft.fun');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Destaques do Servidor
  const features = [
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: 'Servidor 24 Horas',
      description: 'Host dedicado de alta performance rodando ininterruptamente com cravados 20 TPS.'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: 'Original e Pirata',
      description: 'Aberto e otimizado para que todos os seus amigos possam jogar juntos sem restrições.'
    },
    {
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      title: 'Modpack AllTheMons',
      description: 'A melhor seleção de mods de aventura, tecnologia e criaturas e cobblemon totalmente traduzida.'
    },
    {
      icon: <Trophy className="w-6 h-6 text-emerald-400" />,
      title: 'Eventos e Campeonatos',
      description: 'Dispute prêmios reais e itens lendários em nossas arenas com torneios oficiais.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        
        {/* Imagem de Fundo / Efeitos */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0b0a14]/85 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a14] via-[#0b0a14]/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80" 
            alt="Minecraft Background" 
            className="w-full h-full object-cover object-center filter brightness-50"
          />
        </div>

        {/* Efeitos de Luz Orbitando */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Esquerda: Conteúdo Principal */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge de Atualização */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/50 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs font-semibold text-purple-200">
                  Modpack <span className="text-white">AllTheMons</span> Online
                </span>
              </div>

              {/* Titulo */}
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                O Universo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400">
                  Modded Definitivo
                </span>
              </h1>

              {/* Descricao */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore novas dimensões, construa impérios industriais e capture criaturas lendárias. 
                O <span className="text-white font-semibold">BigBangCraft</span> combina a liberdade do Minecraft com uma comunidade vibrante e campeonatos inesquecíveis.
              </p>

              {/* Botoes de Acao Principais */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* Botao Copiar IP */}
                <button
                  onClick={handleCopyIp}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-purple-900/40 transition-all duration-200 active:scale-95"
                >
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-widest text-purple-200 font-semibold leading-none">
                      Clique para copiar o IP
                    </span>
                    <span className="block font-mono tracking-wide text-lg text-white font-black leading-tight mt-0.5">
                      bigbangcraft.fun
                    </span>
                  </div>
                  <div className="bg-purple-950/40 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400 animate-bounce" />
                    ) : (
                      <Copy className="w-5 h-5 text-purple-200" />
                    )}
                  </div>
                </button>

                {/* Botao Discord */}
                <a
                  href="https://discord.gg/RH96xdsYaE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-white font-semibold text-base transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-[#5865F2]" />
                  <span>Acessar Discord</span>
                </a>

              </div>

              {/* Informacao extra */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Sem lag ou quedas
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Proteção contra Griefing
                </span>
              </div>

            </div>

            {/* Direita: Status do Servidor Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto">
              <div className="animate-float">
                <ServerStatusCard />
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Destaques do Servidor Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
            Por que escolher o BigBangCraft?
          </h2>
          <p className="text-3xl font-extrabold text-white tracking-tight">
            Feito por jogadores, para jogadores
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Nossa infraestrutura foi desenhada para oferecer a melhor experiência em servidores modificados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-[#121024]/40 border border-purple-950/80 hover:border-purple-800/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-purple-950/40 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-purple-900/40 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Seção de Últimas Notícias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Fique por Dentro
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Últimas Notícias e Eventos
            </p>
          </div>
          
          <NavLink 
            to="/noticias" 
            className="inline-flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
          >
            Ver todas as notícias 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        {newsLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-500 text-xs font-semibold">Carregando notícias...</span>
          </div>
        ) : recentNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#121024]/30 rounded-2xl border border-purple-950/60">
            <p className="text-slate-400 text-sm">Nenhuma notícia encontrada.</p>
          </div>
        )}

      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/40 via-[#151329] to-indigo-900/40 border border-purple-700/40 p-8 sm:p-12 overflow-hidden text-center">
          
          {/* Efeito de fundo */}
          <div className="absolute inset-0 bg-cosmic-grid opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Junte-se a nós hoje mesmo
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Pronto para iniciar sua jornada?
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Copie o IP, adicione em seu cliente Minecraft e comece a desbravar o modpack <span className="text-white font-semibold">AllTheMons</span> agora mesmo!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCopyIp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-purple-950 font-bold text-sm shadow-lg hover:bg-purple-100 transition-colors active:scale-95"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'IP Copiado com Sucesso!' : 'Copiar IP: bigbangcraft.fun'}
              </button>

              <NavLink
                to="/vips"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-white font-bold text-sm transition-colors"
              >
                Conhecer Planos VIP
              </NavLink>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
