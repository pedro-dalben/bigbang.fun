import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Componentes
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Páginas
import { Home } from './pages/Home';
import { News } from './pages/News';
import { NewsDetails } from './pages/NewsDetails';
import { Updates } from './pages/Updates';
import { Players } from './pages/Players';
import { Vips } from './pages/Vips';
import { Rules } from './pages/Rules';

// Rola a página para o topo automaticamente ao mudar de rota
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <div className="min-h-screen flex flex-col bg-[#0b0a14] text-slate-100 font-sans relative">
        
        {/* Fundo com efeito de grade cósmica super suave */}
        <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none"></div>

        {/* Header Fixo */}
        <Header />

        {/* Corpo principal da aplicação */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/noticias/:id" element={<NewsDetails />} />
            <Route path="/atualizacoes" element={<Updates />} />
            <Route path="/players" element={<Players />} />
            <Route path="/vips" element={<Vips />} />
            <Route path="/regras" element={<Rules />} />
            
            {/* Fallback caso a URL não exista */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}
