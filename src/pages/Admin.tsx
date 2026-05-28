import { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { auth } from "../services/firebase";
import { 
  getNews, 
  addNewsItem, 
  updateNewsItem, 
  deleteNewsItem, 
  importDefaultNews, 
  FirestoreNewsItem 
} from "../services/newsService";
import { 
  Lock, 
  Mail, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  FileText, 
  Check, 
  AlertCircle, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { NavLink } from "react-router-dom";

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Login form state
  const [email, setEmail] = useState("admin@bigbangcraft.fun");
  const [password, setPassword] = useState("123big!bang");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // News state
  const [news, setNews] = useState<FirestoreNewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [importStatus, setImportStatus] = useState("");

  // Editor modal/form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FirestoreNewsItem['category']>("Anúncio");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Categories list
  const categories: FirestoreNewsItem['category'][] = [
    "Eventos", 
    "Atualização", 
    "Comunidade", 
    "Anúncio", 
    "Competitivo"
  ];

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        loadNews();
      }
    });
    return unsubscribe;
  }, []);

  const loadNews = async () => {
    setNewsLoading(true);
    try {
      const data = await getNews();
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setNewsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error("Login failed: ", err);
      setLoginError("E-mail ou senha incorretos. Por favor, verifique se você ativou o Auth no Console do Firebase e adicionou o usuário.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setNews([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImportDefaults = async () => {
    setImportStatus("Importando...");
    try {
      const imported = await importDefaultNews();
      if (imported > 0) {
        setImportStatus(`Sucesso! ${imported} notícias originais foram importadas.`);
        loadNews();
      } else {
        setImportStatus("Nenhuma notícia importada. O banco de dados já possui registros.");
      }
    } catch (err: any) {
      setImportStatus("Erro ao importar: " + err.message);
    }
    setTimeout(() => setImportStatus(""), 4000);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNewsItem(id);
      setNews(news.filter(item => item.id !== id));
      setDeletingId(null);
    } catch (err) {
      alert("Erro ao deletar notícia.");
    }
  };

  const openCreateForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Anúncio");
    setSummary("");
    setContent("");
    setImageUrl("");
    setCustomDate(new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }));
    setFormError("");
    setIsEditing(true);
  };

  const openEditForm = (item: FirestoreNewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setSummary(item.summary);
    setContent(item.content);
    setImageUrl(item.imageUrl);
    setCustomDate(item.date);
    setFormError("");
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!title.trim() || !summary.trim() || !content.trim()) {
      setFormError("Por favor, preencha todos os campos obrigatórios (Título, Resumo e Conteúdo).");
      return;
    }

    setFormSaving(true);
    try {
      const payload = {
        title,
        category,
        summary,
        content,
        imageUrl,
        date: customDate
      };

      if (editingId) {
        await updateNewsItem(editingId, payload);
      } else {
        await addNewsItem(payload);
      }
      
      setIsEditing(false);
      loadNews();
    } catch (err: any) {
      console.error(err);
      setFormError("Erro ao salvar notícia: " + err.message);
    } finally {
      setFormSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0a14]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400 text-xs font-semibold">Carregando painel administrativo...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#121024]/60 border border-purple-950/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-purple-950/80 border border-purple-700/40 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-950">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Painel Administrativo</h1>
            <p className="text-xs text-slate-400 mt-2">
              Autenticação do BigBangCraft
            </p>
          </div>

          {loginError && (
            <div className="bg-red-950/40 border border-red-900/40 text-red-300 text-xs p-3.5 rounded-xl flex items-start gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-purple-900/40 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-purple-900/40 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 active:scale-95 transition-all duration-200 disabled:opacity-50 text-sm mt-6 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Check className="w-4 h-4" /> Acessar Painel
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <NavLink to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar para o Site
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
      
      {/* Header do Painel */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Acesso Administrador</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Gerenciador de Notícias</h1>
          <p className="text-xs text-slate-400 mt-1">Conectado como {user.email}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleImportDefaults}
            className="px-4 py-2.5 bg-cyan-950/40 border border-cyan-850 hover:bg-cyan-900/30 text-cyan-400 text-xs font-bold rounded-xl transition-all"
            title="Importa as notícias estáticas padrão do site se o Firestore estiver vazio"
          >
            Importar Notícias Padrão
          </button>
          
          <button
            onClick={openCreateForm}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-purple-900/10"
          >
            <Plus className="w-4 h-4" /> Nova Notícia
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 bg-white/5 hover:bg-red-950/20 border border-white/10 hover:border-red-900/30 text-slate-400 hover:text-red-400 rounded-xl transition-colors"
            title="Desconectar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {importStatus && (
        <div className="bg-[#121024] border border-cyan-500/30 text-cyan-300 text-xs p-4 rounded-xl flex items-center gap-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Form Editor (Inline / Modal Style) */}
      {isEditing && (
        <div className="bg-[#121024]/80 border border-purple-900/50 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            {editingId ? "Editar Notícia" : "Publicar Nova Notícia"}
          </h2>

          {formError && (
            <div className="bg-red-950/40 border border-red-900/40 text-red-300 text-xs p-3.5 rounded-xl flex items-start gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Col 1 */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Título *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Campeonato Oficial de Cobblemon"
                    className="w-full bg-black/40 border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resumo da Notícia *</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Uma descrição curta que aparece no card de notícias..."
                    className="w-full bg-black/40 border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors h-20 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Col 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FirestoreNewsItem['category'])}
                    className="w-full bg-black/40 border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-[#121024]">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Exibida</label>
                  <input
                    type="text"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    placeholder="Ex: 28 de Maio, 2026"
                    className="w-full bg-black/40 border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Image URL Input */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">URL da Imagem de Capa</label>
                <div className="relative">
                  <Upload className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... ou link de imagem do imgur"
                    className="w-full bg-black/40 border border-purple-900/40 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Preview Thumbnail */}
              <div className="flex items-end">
                {imageUrl && (
                  <div className="h-11 w-full bg-black/40 border border-purple-900/20 rounded-xl overflow-hidden flex items-center px-3 gap-2">
                    <img src={imageUrl} alt="preview" className="h-7 w-12 object-cover rounded" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <span className="text-[10px] text-slate-400 truncate">URL Carregada</span>
                  </div>
                )}
              </div>

            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Conteúdo Completo (Suporta Markdown) *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva a matéria. Use ### Título para cabeçalhos e - Item para listas."
                className="w-full bg-black/40 border border-purple-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors h-64 font-sans leading-relaxed"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-xs transition-all"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                disabled={formSaving}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-lg"
              >
                {formSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Salvar Notícia
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid de Notícias Existentes */}
      {newsLoading ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 text-xs font-medium">Buscando notícias no Firestore...</span>
        </div>
      ) : news.length > 0 ? (
        <div className="bg-[#121024]/40 border border-purple-950/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-black/20">
                  <th className="px-6 py-4">Título</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-10 h-7 object-cover rounded bg-black/40 border border-white/10 shrink-0" 
                          onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=64")}
                        />
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-purple-950/60 border border-purple-900/40 text-purple-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      {deletingId === item.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-red-400 font-semibold mr-1">Excluir?</span>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded transition-colors"
                          >
                            Sim
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-2.5 py-1 bg-[#121024] hover:bg-white/10 text-slate-300 text-[10px] font-bold rounded border border-white/5 transition-colors"
                          >
                            Não
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditForm(item)}
                            className="p-1.5 bg-white/5 hover:bg-purple-950/40 border border-white/10 hover:border-purple-800/50 text-slate-400 hover:text-purple-300 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(item.id)}
                            className="p-1.5 bg-white/5 hover:bg-red-950/40 border border-white/10 hover:border-red-800/50 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-[#121024]/20 border border-purple-950 rounded-2xl">
          <p className="text-slate-400 text-sm">Nenhuma notícia encontrada no Firestore.</p>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
            Use o botão "Importar Notícias Padrão" acima ou clique em "Nova Notícia" para adicionar os primeiros registros.
          </p>
        </div>
      )}

    </div>
  );
}
export default Admin;
