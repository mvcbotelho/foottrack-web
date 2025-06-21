# ⚽ FootTrack

**FootTrack** é uma aplicação web que permite visualizar partidas de futebol do dia e consultar estatísticas detalhadas de cada jogo. O projeto foi criado como uma vitrine técnica utilizando **Go no backend** e **React + Tailwind no frontend**, integrando com a [API-Football](https://www.api-football.com/) como fonte de dados.

---

## 🚀 Tecnologias Utilizadas

### Backend
- [Go](https://golang.org/)
- [Gin](https://github.com/gin-gonic/gin)
- HTTP Client nativo
- DotEnv para variáveis de ambiente

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
- 🔜 Cache de dados no backend
- 🔜 Filtros por campeonato, time ou data

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

Crie um arquivo `.env` no diretório `backend/` com a seguinte chave:

```env
API_FOOTBALL_KEY=your_api_key_here
```

---

## 📷 Preview (Em breve)

*Será adicionada uma imagem da interface aqui quando o frontend estiver implementado.*

---

## 📌 Próximos passos

- [ ] Implementar cache de respostas no backend
- [ ] Paginação e filtros no frontend
- [ ] Deploy na Vercel e Render
- [ ] Testes unitários (Go e React)

---

## 📚 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, contribuir ou adaptar.

---

## ✍️ Autor

**Marcus Botelho**  
[LinkedIn](https://www.linkedin.com/in/mvcbotelho) • marcus.itec@gmail.com
