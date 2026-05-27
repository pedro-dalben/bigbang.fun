import { useState, useEffect } from 'react';
import { fetchServerStatus, ServerStatus } from '../services/serverStatusService';
import { Users, Server, Activity, RefreshCw, AlertCircle, Wifi } from 'lucide-react';

export function ServerStatusCard() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      console.error("Erro ao carregar o status do servidor:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStatus();
    
    // Atualiza o status a cada 60 segundos
    const interval = setInterval(() => {
      loadStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadStatus(true);
  };

  if (loading && !status) {
    return (
      <div className="bg-[#121024]/80 backdrop-blur-md border border-purple-900/40 rounded-2xl p-6 w-full animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-purple-950 rounded w-1/3"></div>
          <div className="h-5 bg-purple-950 rounded w-1/4"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-purple-950/60 rounded w-full"></div>
          <div className="h-4 bg-purple-950/60 rounded w-5/6"></div>
          <div className="h-2 bg-purple-950 rounded-full w-full mt-4"></div>
        </div>
      </div>
    );
  }

  const isOnline = status?.online ?? false;
  const playersOnline = status?.playersOnline ?? 0;
  const maxPlayers = status?.maxPlayers ?? 100;
  const percentage = Math.min(Math.round((playersOnline / maxPlayers) * 100), 100);

  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
      isOnline 
        ? 'bg-gradient-to-b from-[#151329] to-[#0e0d1a] border-purple-800/50 glow-purple' 
        : 'bg-gradient-to-b from-[#1a1315] to-[#0e0d1a] border-red-900/50'
    }`}>
      
      {/* Absolute top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isOnline ? 'bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400' : 'bg-red-500'
      }`}></div>

      <div className="p-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white tracking-wide">Status do Servidor</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Atualizado em tempo real</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Atualizar status"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-purple-400' : ''}`} />
            </button>

            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isOnline 
                ? 'bg-green-950/60 text-green-400 border border-green-800/40' 
                : 'bg-red-950/60 text-red-400 border border-red-800/40'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-500'
              }`}></span>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Content */}
        {isOnline ? (
          <div className="space-y-4">
            
            {/* Players count */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  Jogadores Conectados
                </span>
                <span className="text-sm font-bold text-white">
                  <span className="text-purple-400 text-base">{playersOnline}</span> / {maxPlayers}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-purple-950/60 rounded-full h-2 overflow-hidden border border-purple-900/30">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
              <div className="bg-white/[0.02] rounded-xl p-2.5 border border-white/5">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Modpack / Versão</span>
                <span className="text-xs font-semibold text-purple-200 mt-0.5 block truncate" title={status?.version}>
                  {status?.version}
                </span>
              </div>

              <div className="bg-white/[0.02] rounded-xl p-2.5 border border-white/5">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Latência Média</span>
                <span className="text-xs font-semibold text-cyan-300 mt-0.5 flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-cyan-400" />
                  {status?.ping ? `${status.ping} ms` : 'Excelente'}
                </span>
              </div>
            </div>

            {/* MOTD Preview */}
            <div className="bg-black/30 rounded-lg p-2 text-center border border-purple-900/20">
              <p className="text-[11px] font-mono text-purple-300/80 italic">
                "{status?.motd}"
              </p>
            </div>

          </div>
        ) : (
          <div className="py-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold text-slate-200">Servidor em Manutenção</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Nossos engenheiros estão aplicando atualizações ou reiniciando as máquinas. Retornaremos em breve!
            </p>
          </div>
        )}

      </div>

      {/* Footer link to full players page */}
      {isOnline && (
        <div className="bg-purple-950/20 px-6 py-2.5 border-t border-purple-900/20 text-center">
          <a 
            href="/players" 
            className="text-xs text-purple-300 hover:text-white inline-flex items-center gap-1 transition-colors group font-medium"
          >
            <Activity className="w-3 h-3 text-purple-400 group-hover:scale-110 transition-transform" />
            Ver lista de jogadores online →
          </a>
        </div>
      )}

    </div>
  );
}
