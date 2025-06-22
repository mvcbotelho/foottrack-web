package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/mvcbotelho/foottrack-backend/config"
	"github.com/mvcbotelho/foottrack-backend/middleware"
	"github.com/mvcbotelho/foottrack-backend/routes"
	"github.com/mvcbotelho/foottrack-backend/services"
)

func main() {
	// Carregar variáveis de ambiente
	if err := godotenv.Load(); err != nil {
		log.Printf("Aviso: arquivo .env não encontrado, usando variáveis de ambiente do sistema")
	}

	// Carregar configuração
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar configuração: %v", err)
	}

	// Configurar modo do Gin
	if gin.Mode() == gin.ReleaseMode {
		gin.SetMode(gin.ReleaseMode)
	}

	// Criar router
	router := gin.New()

	// Middlewares globais
	router.Use(middleware.ErrorHandler())
	router.Use(middleware.LoggingMiddleware())
	router.Use(middleware.CORSMiddleware())

	// Criar serviços
	apiService := services.NewAPIFootballService(&cfg.API)

	// Criar handlers
	matchHandler := routes.NewMatchHandler(apiService)

	// Registrar rotas
	routes.RegisterMatchRoutes(router, matchHandler)

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"timestamp": time.Now().UTC(),
			"service":   "foottrack-backend",
		})
	})

	// Configurar servidor HTTP
	server := &http.Server{
		Addr:         ":" + cfg.Server.Port,
		Handler:      router,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
		IdleTimeout:  cfg.Server.IdleTimeout,
	}

	log.Printf("Servidor iniciando na porta %s", cfg.Server.Port)
	log.Printf("Health check disponível em: http://localhost:%s/health", cfg.Server.Port)
	log.Printf("API disponível em: http://localhost:%s/matches", cfg.Server.Port)

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Erro ao iniciar servidor: %v", err)
	}
}
