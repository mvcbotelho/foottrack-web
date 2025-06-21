package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/mvcbotelho/foottrack-backend/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Erro ao carregar o .env")
	}

	if os.Getenv("API_FOOTBALL_KEY") == "" {
		log.Fatal("API_FOOTBALL_KEY não encontrada")
	}

	router := gin.Default()

	routes.RegisterMatchRoutes(router)

	router.Run(":8080")
}
