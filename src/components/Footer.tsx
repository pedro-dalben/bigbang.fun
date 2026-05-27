import { NavLink } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, MessageSquare } from 'lucide-react';
import brandIcon from '../assets/icon.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07060d] border-t border-purple-950/60 pt-12 pb-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#151329] border border-purple-500/40 p-1 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden">
                <img src={brandIcon} alt="BigBangCraft Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                BigBang<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Craft</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              O seu servidor de Minecraft Modded com o modpack <span className="text-purple-300 font-semibold">AllTheMons</span>. 
              Aventure-se em um universo recheado de exploração, economia ativa e campeonatos épicos. 
              Aberto 24 horas para todos os jogadores originais e piratas!
            </p>

            <div className="flex flex-wrap gap-3">
              <a 
                href="https://discord.gg/RH96xdsYaE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-[#5865F2] hover:text-white text-xs font-medium transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Comunidade Discord
              </a>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-950/30 border border-green-800/40 text-green-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                Servidor Protegido
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="text-slate-400 hover:text-purple-400 transition-colors">Início</NavLink>
              </li>
              <li>
                <NavLink to="/noticias" className="text-slate-400 hover:text-purple-400 transition-colors">Notícias</NavLink>
              </li>
              <li>
                <NavLink to="/atualizacoes" className="text-slate-400 hover:text-purple-400 transition-colors">Atualizações</NavLink>
              </li>
              <li>
                <NavLink to="/players" className="text-slate-400 hover:text-purple-400 transition-colors">Jogadores Online</NavLink>
              </li>
              <li>
                <NavLink to="/vips" className="text-slate-400 hover:text-purple-400 transition-colors">Planos VIP</NavLink>
              </li>
              <li>
                <NavLink to="/regras" className="text-slate-400 hover:text-purple-400 transition-colors">Regras do Servidor</NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Server Info */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
              Conexão
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div>
                <span className="block text-xs text-slate-500">IP de Conexão</span>
                <span className="font-mono text-purple-300 font-semibold select-all">bigbangcraft.fun</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Modpack Oficial</span>
                <span className="text-slate-300">AllTheMons</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Disponibilidade</span>
                <span className="text-green-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  24/7 Online
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} <span className="text-slate-300 font-medium">BigBangCraft</span>. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-purple-500 fill-purple-500" /> para a comunidade.
          </p>
          <p className="text-center md:text-right max-w-md">
            BigBangCraft não é afiliado ou endossado pela <span className="text-slate-400">Mojang Studios</span> ou <span className="text-slate-400">Microsoft Corporation</span>.
          </p>
        </div>

      </div>
    </footer>
  );
}
