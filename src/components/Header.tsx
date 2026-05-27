import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Copy, Check, Sparkles } from 'lucide-react';
import brandIcon from '../assets/icon.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile ao trocar de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Efeito ao rolar a página para dar fundo semi-transparente
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText('bigbangcraft.fun');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Atualizações', path: '/atualizacoes' },
    { name: 'Players', path: '/players' },
    { name: 'VIPs', path: '/vips' },
    { name: 'Regras', path: '/regras' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0b0a14]/90 backdrop-blur-md border-b border-purple-900/30 py-3 shadow-lg shadow-purple-950/20' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-[#151329] border border-purple-500/40 p-1 rounded-lg flex items-center justify-center w-12 h-12 overflow-hidden">
                <img src={brandIcon} alt="BigBangCraft Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block leading-none">
                BigBang<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Craft</span>
              </span>
              <span className="text-[10px] text-purple-300/70 font-semibold tracking-widest uppercase block mt-0.5">
                AllTheMons
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative
                  ${isActive 
                    ? 'text-white bg-purple-950/40 border border-purple-700/50 glow-purple' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Copy IP Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleCopyIp}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-purple-900/30 transition-all duration-200 active:scale-95"
              title="Clique para copiar o IP"
            >
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#06b6d4] text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded text-white shadow">
                IP Oficial
              </span>
              <span className="font-mono tracking-wide text-purple-100 group-hover:text-white">
                bigbangcraft.fun
              </span>
              {copied ? (
                <Check className="w-4 h-4 text-green-300 animate-bounce" />
              ) : (
                <Copy className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleCopyIp}
              className="p-2 rounded-lg bg-purple-950/60 border border-purple-700/40 text-purple-300 hover:text-white"
              title="Copiar IP"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0e0d1a] border-b border-purple-900/40 px-4 pt-3 pb-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2.5 rounded-lg text-base font-medium transition-colors
                  ${isActive 
                    ? 'text-white bg-purple-600/20 border border-purple-500/30 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-slate-400 mb-2 px-1">IP do Servidor (Clique para copiar):</p>
              <button
                onClick={handleCopyIp}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30 text-white font-mono text-sm"
              >
                <span>bigbangcraft.fun</span>
                <span className="flex items-center gap-1 text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
