import { useState, useEffect } from 'react';
import { fetchServerStatus, ServerStatus } from '../services/serverStatusService';
import { Users, Search, RefreshCw, AlertCircle, Shield, Wifi, UserCheck } from 'lucide-react';

export function Players() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadStatus = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await fetchServerStatus('bigbangcraft.fun');
      setStatus(data);
    } catch (err) {
      console.error("Erro ao carregar o status de jogadores:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStatus();
    
    // Atualiza a lista a cada 45 segundos
    const interval = setInterval(() => {
      loadStatus();
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadStatus(true);
  };

  // Filtra os jogadores de acordo com a busca
  const playersList = status?.playersList || [];
  const filteredPlayers = playersList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isOnline = status?.online ?? false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      
      {/* Cabecalho da Página */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Comunidade em Tempo Real</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Jogadores <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Online</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Confira quem está desbravando o modpack neste exato momento. Chame seus amigos, forme seu clã e domine o servidor!
        </p>
      </div>

      {/* Painel de Status e Filtro */}
      <div className="bg-[#121024]/60 border border-purple-950 rounded-2xl p-6 mb-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Informacoes de Conexao */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              isOnline ? 'bg-green-950/50 text-green-400 border border-green-800/40' : 'bg-red-950/50 text-red-400 border border-red-800/40'
            }`}>
              <Users className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Geral</span>
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></span>
              </div>
              
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-white">
                  {status ? status.playersOnline : 0}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {status ? status.maxPlayers : 100} conectados
                </span>
              </div>
            </div>

            {/* Ping Info */}
            <div className="hidden sm:block pl-4 border-l border-white/5 ml-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Latência</span>
              <span className="text-sm font-semibold text-cyan-400 flex items-center gap-1 mt-0.5">
                <Wifi className="w-3.5 h-3.5" />
                {status?.ping || 18} ms
              </span>
            </div>
          </div>

          {/* Barra de Pesquisa e Refresh */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Buscar jogador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-purple-900/40 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-bold transition-colors shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>

          </div>

        </div>
      </div>

      {/* Area de Listagem dos Jogadores */}
      {loading && !status ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-[#121024]/40 border border-purple-950 rounded-xl p-4 flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-purple-950/60 shrink-0"></div>
              <div className="space-y-1.5 flex-1">
                <div className="h-3 bg-purple-950 rounded w-3/4"></div>
                <div className="h-2 bg-purple-950/60 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : !isOnline ? (
        <div className="text-center py-16 bg-[#121024]/30 rounded-2xl border border-purple-950">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3 opacity-80" />
          <h3 className="text-lg font-bold text-white">Servidor Offline no Momento</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-md mx-auto">
            Não é possível listar os jogadores enquanto o servidor passa por reinicialização. Tente novamente em alguns instantes.
          </p>
        </div>
      ) : filteredPlayers.length > 0 ? (
        <div>
          <p className="text-xs text-slate-500 mb-4 px-1">
            Exibindo <span className="text-slate-300 font-semibold">{filteredPlayers.length}</span> jogador(es) online
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPlayers.map((player) => {
              // Simulamos algumas tags de clã/cargos para os primeiros da lista para dar mais imersão
              const isStaff = player.name.toLowerCase().includes('admin') || player.name === 'SteveGamer' || player.name === 'Alex_Pro';
              const isVip = player.name === 'DiamondMiner' || player.name === 'RedstoneGod' || player.name === 'EnderQueen';

              return (
                <div 
                  key={player.id}
                  className="bg-[#121024]/40 border border-purple-950/80 hover:border-purple-700/50 rounded-xl p-3 flex items-center gap-3 transition-all duration-200 hover:scale-[1.02] group"
                >
                  {/* Avatar do Jogador usando mc-heads.net */}
                  <div className="relative shrink-0">
                    <img 
                      src={`https://mc-heads.net/avatar/${player.name}/64`}
                      alt={player.name}
                      onError={(e) => {
                        // Fallback caso a API de rostos falhe
                        (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/MHF_Steve/64';
                      }}
                      className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 object-cover"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#121024]"></span>
                  </div>

                  {/* Nome e Cargo */}
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-purple-300 transition-colors" title={player.name}>
                      {player.name}
                    </span>
                    
                    <div className="flex items-center gap-1 mt-0.5">
                      {isStaff ? (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-red-400 bg-red-950/50 px-1 rounded flex items-center gap-0.5">
                          <Shield className="w-2 h-2" /> Staff
                        </span>
                      ) : isVip ? (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/50 px-1 rounded">
                          VIP
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-500 flex items-center gap-0.5">
                          <UserCheck className="w-2 h-2" /> Membro
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-[#121024]/30 rounded-2xl border border-purple-950">
          <p className="text-slate-400 text-sm">Nenhum jogador encontrado com o nome "{searchQuery}".</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 underline"
          >
            Limpar busca
          </button>
        </div>
      )}
    </div>
  );
}
