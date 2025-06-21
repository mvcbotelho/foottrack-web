package routes

import (
	"net/http"

	"github.com/mvcbotelho/foottrack-backend/services"

	"github.com/gin-gonic/gin"
)

func RegisterMatchRoutes(r *gin.Engine) {
	r.GET("/matches", func(c *gin.Context) {
		matches, err := services.GetTodayMatches()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, matches)
	})

	r.GET("/matches/:id", func(c *gin.Context) {
		matchID := c.Param("id")
		match, err := services.GetMatchDetails(matchID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, match)
	})
}
