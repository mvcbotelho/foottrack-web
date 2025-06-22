# ⚽ FootTrack

**FootTrack** é uma aplicação web que permite visualizar partidas de futebol do dia e consultar estatísticas detalhadas de cada jogo. O projeto foi criado como uma vitrine técnica utilizando **Go no backend** e **React + Tailwind no frontend**, integrando com a [API-Football](https://www.api-football.com/) como fonte de dados.

---

## 🚀 Tecnologias Utilizadas

### Backend
- [Go](https://golang.org/)
- [Gin](https://github.com/gin-gonic/gin) - Framework web
- HTTP Client nativo com timeout configurável
- DotEnv para variáveis de ambiente
- Middleware de validação e tratamento de erros
- Configuração centralizada

### Frontend
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS com configuração robusta
- [TanStack Query](https://tanstack.com/query) - Gerenciamento de estado e cache
- [Axios](https://axios-http.com/) - Cliente HTTP
- **Design Moderno:** Componentes reutilizáveis e hooks personalizados

---

## 🔧 Funcionalidades

- ✅ Listar partidas do dia
- ✅ **Design Moderno e Inspirador:** Interface baseada em designs de alta qualidade
- ✅ Visualizar detalhes e estatísticas da partida
- ✅ Interface responsiva e moderna
- ✅ Paginação de resultados
- ✅ Validação de parâmetros de entrada
- ✅ Tratamento robusto de erros
- ✅ Health check endpoint
- ✅ Cache inteligente de dados
- ✅ Loading states e feedback visual
- ✅ Skeleton loading para melhor UX
- ✅ **Contraste e Legibilidade:** Ajustes finos de UI para melhor experiência
- 🔜 Cache de dados no backend
- 🔜 Filtros por campeonato, time ou data

---

## 🏗️ Arquitetura

### Backend
```
backend/
├── config/          # Configuração centralizada
├── middleware/      # Middlewares (erro, validação, CORS)
├── routes/          # Handlers e rotas
├── services/        # Lógica de negócio e integração com APIs
└── main.go         # Ponto de entrada da aplicação
```

### Frontend
```
frontend/src/
├── components/
│   ├── ui/          # Componentes reutilizáveis (Button, Loading, Error)
│   └── MatchCard.tsx
├── hooks/           # Hooks personalizados para gerenciamento de estado
├── pages/           # Páginas da aplicação
├── services/        # Serviços de API
├── types/           # Definições TypeScript
└── App.tsx         # Componente principal
```

### Melhorias Implementadas

#### 🔒 **Backend - Segurança e Validação**
- Validação automática de parâmetros de entrada
- Sanitização de dados da API externa
- Configuração de CORS adequada
- Validação de formato de data (YYYY-MM-DD)
- Validação de IDs numéricos

#### 🛡️ **Backend - Tratamento de Erros**
- Middleware global de tratamento de erros
- Logging estruturado com informações detalhadas
- Respostas de erro padronizadas
- Tratamento de panics e recuperação
- Timeout configurável para requisições HTTP

#### ⚙️ **Backend - Configuração**
- Configuração centralizada com validação
- Variáveis de ambiente com valores padrão
- Timeouts configuráveis (leitura, escrita, idle)
- Configuração de servidor HTTP robusta

#### 📊 **Backend - Monitoramento**
- Health check endpoint (`/health`)
- Logs detalhados de requisições
- Métricas básicas de performance
- Status de inicialização informativo

#### 🎨 **Frontend - Gerenciamento de Estado**
- TanStack Query para cache inteligente
- Hooks personalizados para diferentes consultas
- Retry automático e stale time configurável
- DevTools para desenvolvimento

#### 🧩 **Frontend - Componentes Reutilizáveis**
- Loading com spinner e skeleton
- Error com tratamento e retry
- Button com variantes e loading state
- MatchCard com design moderno

#### 🔌 **Frontend - Serviços de API**
- Axios com interceptors para logging
- Timeout configurável
- Tratamento de erros centralizado
- Tipos TypeScript para respostas

#### 🎯 **Frontend - UX/UI**
- **Design Moderno:** Interface redesenhada para ser visualmente atraente e profissional.
- Skeleton loading para feedback visual
- Estados de erro com opção de retry
- Loading states em botões
- Responsividade melhorada
- Animações e transições suaves

---

## 📦 Instalação

### Pré-requisitos
- Go 1.21+
- Node.js 18+
- Conta gratuita na [API-Football](https://dashboard.api-football.com/)
- Yarn ou npm

### Clonando o repositório
```bash
git clone https://github.com/seuusuario/foottrack.git
cd foottrack
```

### Backend
```bash
cd backend
cp .env.example .env
# Configure sua API key no arquivo .env
go run main.go
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` no diretório `backend/` com as seguintes configurações:

```env
# Configurações do Servidor
PORT=8080
READ_TIMEOUT=30s
WRITE_TIMEOUT=30s
IDLE_TIMEOUT=60s

# Configurações da API Football
API_FOOTBALL_KEY=your_api_key_here
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
API_TIMEOUT=10s
```

Para o frontend, crie um arquivo `.env` no diretório `frontend/`:

```env
VITE_API_URL=http://localhost:8080
```

---

## 📡 Endpoints da API

### GET `/health`
Health check da aplicação
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z",
  "service": "foottrack-backend"
}
```

### GET `/matches`
Lista partidas com paginação
- **Query params:**
  - `date` (opcional): Data no formato YYYY-MM-DD
  - `page` (opcional): Número da página (padrão: 1)
  - `limit` (opcional): Itens por página (padrão: 20, máx: 100)

### GET `/matches/:id`
Detalhes de uma partida específica
- **Path params:**
  - `id`: ID numérico da partida

---

## 🎨 Interface do Usuário

### Características da UI
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Loading States**: Feedback visual durante carregamento
- **Error Handling**: Tratamento elegante de erros com opção de retry
- **Skeleton Loading**: Placeholders animados para melhor UX
- **Componentes Reutilizáveis**: Biblioteca de componentes consistentes
- **Animações**: Transições suaves e feedback visual

### Componentes Principais
- **MatchCard**: Exibe informações da partida com um design de banner moderno, logos dos times e placar/horário em destaque.
- **Loading**: Spinner e skeleton para diferentes contextos
- **Error**: Tratamento de erros com opções de retry
- **Button**: Botão com variantes e estados de loading

---

## 📷 Preview (Em breve)

*Será adicionada uma imagem da interface aqui quando o frontend estiver implementado.*

---

## 📌 Próximos passos

- [ ] Implementar cache de respostas no backend
- [ ] Adicionar rate limiting
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar navegação com React Router
- [ ] Implementar filtros avançados no frontend
- [ ] Deploy na Vercel e Render
- [ ] Documentação Swagger/OpenAPI
- [ ] Configurar PWA (Progressive Web App)

---

## 📚 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, contribuir ou adaptar.

---

## ✍️ Autor

**Marcus Botelho**  
[LinkedIn](https://www.linkedin.com/in/mvcbotelho) • marcus.itec@gmail.com
