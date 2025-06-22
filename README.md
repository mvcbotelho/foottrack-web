# ⚽ FootTrack - Rastreador de Partidas de Futebol

Uma aplicação web moderna para acompanhar partidas de futebol em tempo real, desenvolvida com Go (backend) e React + TypeScript (frontend).

![FootTrack Interface](https://via.placeholder.com/800x400/1f2937/ffffff?text=FootTrack+Interface)

## 🚀 Funcionalidades

### Backend (Go)
- ✅ **API RESTful** com endpoints para buscar partidas
- ✅ **Integração com API-Football** para dados em tempo real
- ✅ **Configuração centralizada** com variáveis de ambiente
- ✅ **Middlewares robustos** para tratamento de erros e validação
- ✅ **Estrutura modular** com separação clara de responsabilidades
- ✅ **Logging estruturado** para monitoramento
- ✅ **Timeouts configuráveis** para requisições externas

### Frontend (React + TypeScript)
- ✅ **Interface moderna e responsiva** com Tailwind CSS
- ✅ **Gerenciamento de estado** com React Query
- ✅ **Componentes reutilizáveis** (Loading, Error, Button, etc.)
- ✅ **Hooks personalizados** para operações de API
- ✅ **Navegação com React Router** entre páginas
- ✅ **Página de detalhes da partida** com informações completas
- ✅ **Layout consistente** com cabeçalho e rodapé
- ✅ **Tratamento de erros** e estados de loading
- ✅ **Design responsivo** para mobile e desktop

## 🏗️ Arquitetura

### Backend
```
backend/
├── config/          # Configurações da aplicação
├── middleware/      # Middlewares (erro, validação, logging)
├── routes/          # Definição das rotas da API
├── services/        # Lógica de negócio e integração com APIs
└── main.go         # Ponto de entrada da aplicação
```

### Frontend
```
frontend/src/
├── components/      # Componentes reutilizáveis
│   ├── ui/         # Componentes de UI básicos
│   └── layouts/    # Layouts da aplicação
├── hooks/          # Hooks personalizados
├── pages/          # Páginas da aplicação
├── services/       # Serviços de API
├── types/          # Definições de tipos TypeScript
└── App.tsx         # Componente principal com rotas
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Go 1.21+** - Linguagem principal
- **Gin** - Framework web
- **API-Football** - Dados de partidas
- **Viper** - Gerenciamento de configuração
- **Zap** - Logging estruturado

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React Query** - Gerenciamento de estado e cache
- **React Router** - Navegação entre páginas
- **Axios** - Cliente HTTP

## 📦 Instalação e Execução

### Pré-requisitos
- Go 1.21+
- Node.js 18+
- Yarn ou npm
- Chave da API-Football

### Backend
```bash
cd backend

# Instalar dependências
go mod download

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com sua chave da API-Football

# Executar
go run main.go
```

### Frontend
```bash
cd frontend

# Instalar dependências
yarn install

# Executar em modo desenvolvimento
yarn dev
```

## 🌐 Endpoints da API

### Partidas
- `GET /matches` - Lista partidas do dia
- `GET /matches/:id` - Detalhes de uma partida específica
- `GET /matches?date=YYYY-MM-DD` - Partidas por data

### Health Check
- `GET /health` - Status da aplicação

## 🎨 Interface do Usuário

### Página Principal (`/`)
- Lista de partidas do dia
- Cards interativos com informações essenciais
- Status visual das partidas (ao vivo, finalizado, etc.)
- Navegação para detalhes ao clicar nos cards

### Página de Detalhes (`/match/:id`)
- Informações completas da partida
- Detalhes do placar (1º tempo, 2º tempo, prorrogação, pênaltis)
- Informações do estádio e árbitro
- Dados da liga e temporada
- Botão para voltar à lista

### Layout Consistente
- Cabeçalho com logo e navegação
- Rodapé com informações do projeto
- Design responsivo para todos os dispositivos

## 🔧 Configuração

### Variáveis de Ambiente (Backend)
```env
API_FOOTBALL_KEY=sua_chave_aqui
API_FOOTBALL_HOST=v3.football.api-sports.io
PORT=8080
ENV=development
```

### Variáveis de Ambiente (Frontend)
```env
VITE_API_URL=http://localhost:8080
```

## 🚀 Deploy

### Backend
```bash
# Build para produção
go build -o foottrack-backend main.go

# Executar
./foottrack-backend
```

### Frontend
```bash
# Build para produção
yarn build

# Servir arquivos estáticos
yarn preview
```

## 📝 Próximas Melhorias

### Alta Prioridade
- [ ] **Filtros avançados** por liga, time, data
- [ ] **Notificações em tempo real** para partidas ao vivo
- [ ] **Favoritos** para times e partidas
- [ ] **Histórico de partidas** com paginação

### Média Prioridade
- [ ] **Estatísticas detalhadas** dos times
- [ ] **Comparação de times** head-to-head
- [ ] **Modo escuro** na interface
- [ ] **PWA** para instalação mobile

### Baixa Prioridade
- [ ] **Múltiplas línguas** (inglês, espanhol)
- [ ] **Temas personalizáveis** de cores
- [ ] **Exportação de dados** (PDF, CSV)
- [ ] **Integração com redes sociais**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Marcus Botelho** - Desenvolvedor Full Stack

- GitHub: [@mvcbotelho](https://github.com/mvcbotelho)
- LinkedIn: [Marcus Botelho](https://linkedin.com/in/marcus-botelho)

---

Desenvolvido com ❤️ para a comunidade de futebol! ⚽
