package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mvcbotelho/foottrack-backend/middleware"
	"github.com/mvcbotelho/foottrack-backend/services"
)

type MatchHandler struct {
	apiService *services.APIFootballService
}

func NewMatchHandler(apiService *services.APIFootballService) *MatchHandler {
	return &MatchHandler{
		apiService: apiService,
	}
}

func RegisterMatchRoutes(r *gin.Engine, handler *MatchHandler) {
	matches := r.Group("/matches")
	{
		matches.GET("", middleware.ValidateDate, middleware.ValidatePagination, handler.GetMatches)
		matches.GET("/:id", middleware.ValidateMatchID, handler.GetMatchDetails)
	}
}

func (h *MatchHandler) GetMatches(c *gin.Context) {
	date := c.Query("date")

	var matches []services.MatchFormatted
	var err error

	if date != "" {
		matches, err = h.apiService.GetMatchesByDate(date)
	} else {
		matches, err = h.apiService.GetTodayMatches()
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, middleware.AppError{
			Code:    http.StatusInternalServerError,
			Message: "Erro ao buscar partidas",
			Error:   err.Error(),
		})
		return
	}

	// Aplicar paginação se fornecida
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))

	start := (page - 1) * limit
	end := start + limit

	if start >= len(matches) {
		matches = []services.MatchFormatted{}
	} else if end > len(matches) {
		matches = matches[start:]
	} else {
		matches = matches[start:end]
	}

	c.JSON(http.StatusOK, gin.H{
		"data": matches,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": len(matches),
		},
	})
}

func (h *MatchHandler) GetMatchDetails(c *gin.Context) {
	matchID := c.Param("id")

	match, err := h.apiService.GetMatchDetails(matchID)
	if err != nil {
		c.JSON(http.StatusNotFound, middleware.AppError{
			Code:    http.StatusNotFound,
			Message: "Partida não encontrada",
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": match,
	})
}
