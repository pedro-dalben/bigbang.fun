# 🌌 BigBangCraft — Website Oficial do Servidor

O website oficial do **BigBangCraft**, o servidor de Minecraft Modded definitivo com o modpack **AllTheMons**. O site exibe o status do servidor em tempo real, lista de jogadores online, notícias, notas de atualização (changelogs), planos VIP e regras da comunidade.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando práticas modernas de desenvolvimento web focado em alta performance e design responsivo:

- **React 19 & TypeScript**: Componentização robusta com tipagem estática e segura.
- **Vite**: Ferramenta de build extremamente veloz para desenvolvimento local instantâneo.
- **Tailwind CSS**: Estilização baseada em utilitários modernos e visual futurista (glassmorfismo, glows e gradientes cósmicos).
- **React Router Dom (v7)**: Navegação SPA fluida entre páginas sem recarregamento.
- **Lucide React**: Ícones de alta qualidade para interface rica.
- **Integração Real-Time**: Consumo da API pública [mcsrvstat.us v3](https://api.mcsrvstat.us/) para status de servidor e jogadores conectados.

---

## 🎨 Funcionalidades

1. **Início (Home)**: Painel interativo com o IP do servidor (`bigbangcraft.fun`), status online/offline, contagem de jogadores, destaques de recursos e as últimas novidades.
2. **Jogadores Online (Players)**: Consulta em tempo real à API para listar os jogadores atualmente conectados, mostrando a latência (ping), avatares dinâmicos (Minecraft Skins), cargo de Staff/VIP e campo de busca instantânea.
3. **Notícias & Eventos**: Feed categorizado (Eventos, Atualização, Comunidade, Anúncios) para manter os jogadores cientes de tudo o que acontece.
4. **Changelogs (Atualizações)**: Histórico detalhado de atualizações categorizadas por jogabilidade, performance, novos mods, correções de bugs e eventos.
5. **Apoio & VIPs**: Apresentação dos planos VIP (Bronze, Prata, Ouro) e do fluxo de solicitação via suporte do Discord.
6. **Regras**: Código de conduta e diretrizes da comunidade para garantir um ambiente saudável e competitivo.

---

## 🛠️ Configuração e Execução Local

Siga as instruções abaixo para rodar o projeto localmente em sua máquina.

### Pré-requisitos
- Node.js (versão 18 ou superior recomendado)
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone git@github.com:pedro-dalben/bigbang.fun.git
cd bigbang.fun
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em modo de desenvolvimento
```bash
npm run dev
```
O servidor de desenvolvimento iniciará em `http://localhost:5173`.

### 4. Build de Produção
Para compilar o projeto para produção:
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `/dist`.

### 5. Pré-visualização da Build
Para testar localmente a build gerada:
```bash
npm run preview
```

---

## 📁 Estrutura de Diretórios

```text
├── dist/                   # Build final de produção
├── src/
│   ├── assets/             # Arquivos de imagem e logos (.png, .ico)
│   ├── components/         # Componentes compartilhados (Header, Footer, Cards)
│   ├── data/               # Dados estáticos (notícias, patches, planos VIP)
│   ├── pages/              # Páginas da aplicação (Home, Players, Rules, etc.)
│   ├── services/           # Integração com APIs externas (serverStatusService)
│   ├── utils/              # Funções utilitárias (Tailwind merge)
│   ├── App.tsx             # Componente raiz com o roteamento
│   ├── index.css           # Configurações globais de estilos do Tailwind
│   └── main.tsx            # Ponto de entrada do React
├── index.html              # HTML base da SPA
├── tailwind.config.js      # Configurações e customizações do Tailwind
└── tsconfig.json           # Configurações do TypeScript
```

---

## 📡 Integração com a API do Servidor

O site consome a API do **mcsrvstat.us** no arquivo `src/services/serverStatusService.ts`. O status é atualizado automaticamente a cada 45 segundos nas páginas que exibem dados dinâmicos.

- **URL de Consulta**: `https://api.mcsrvstat.us/3/bigbangcraft.fun`
- **Componentes Conectados**: `ServerStatusCard.tsx` e `Players.tsx`.
