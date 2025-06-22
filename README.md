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
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

---

## 🔧 Funcionalidades

- ✅ Listar partidas do dia
- ✅ Visualizar detalhes e estatísticas da partida
- ✅ Interface responsiva e leve
- ✅ Paginação de resultados
- ✅ Validação de parâmetros de entrada
- ✅ Tratamento robusto de erros
- ✅ Health check endpoint
- 🔜 Cache de dados no backend
- 🔜 Filtros por campeonato, time ou data

---

## 🏗️ Arquitetura do Backend

### Estrutura de Pastas
```
backend/
├── config/          # Configuração centralizada
├── middleware/      # Middlewares (erro, validação, CORS)
├── routes/          # Handlers e rotas
├── services/        # Lógica de negócio e integração com APIs
└── main.go         # Ponto de entrada da aplicação
```

### Melhorias Implementadas

#### 🔒 **Segurança e Validação**
- Validação automática de parâmetros de entrada
- Sanitização de dados da API externa
- Configuração de CORS adequada
- Validação de formato de data (YYYY-MM-DD)
- Validação de IDs numéricos

#### 🛡️ **Tratamento de Erros**
- Middleware global de tratamento de erros
- Logging estruturado com informações detalhadas
- Respostas de erro padronizadas
- Tratamento de panics e recuperação
- Timeout configurável para requisições HTTP

#### ⚙️ **Configuração**
- Configuração centralizada com validação
- Variáveis de ambiente com valores padrão
- Timeouts configuráveis (leitura, escrita, idle)
- Configuração de servidor HTTP robusta

#### 📊 **Monitoramento**
- Health check endpoint (`/health`)
- Logs detalhados de requisições
- Métricas básicas de performance
- Status de inicialização informativo

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
yarn install
yarn dev
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

## 📷 Preview (Em breve)

*Será adicionada uma imagem da interface aqui quando o frontend estiver implementado.*

---

## 📌 Próximos passos

- [ ] Implementar cache de respostas no backend
- [ ] Adicionar rate limiting
- [ ] Implementar testes unitários e de integração
- [ ] Paginação e filtros no frontend
- [ ] Deploy na Vercel e Render
- [ ] Documentação Swagger/OpenAPI

---

## 📚 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, contribuir ou adaptar.

---

## ✍️ Autor

**Marcus Botelho**  
[LinkedIn](https://www.linkedin.com/in/mvcbotelho) • marcus.itec@gmail.com
