package middleware

import (
	"net/http"
	"regexp"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type ValidationErrors struct {
	Errors []ValidationError `json:"errors"`
}

func ValidateDate(c *gin.Context) {
	date := c.Query("date")
	if date == "" {
		return // Data opcional, usa hoje por padrão
	}

	// Validar formato YYYY-MM-DD
	dateRegex := regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`)
	if !dateRegex.MatchString(date) {
		c.JSON(http.StatusBadRequest, ValidationErrors{
			Errors: []ValidationError{
				{
					Field:   "date",
					Message: "Data deve estar no formato YYYY-MM-DD",
				},
			},
		})
		c.Abort()
		return
	}

	// Validar se a data é válida
	if _, err := time.Parse("2006-01-02", date); err != nil {
		c.JSON(http.StatusBadRequest, ValidationErrors{
			Errors: []ValidationError{
				{
					Field:   "date",
					Message: "Data inválida",
				},
			},
		})
		c.Abort()
		return
	}

	c.Next()
}

func ValidateMatchID(c *gin.Context) {
	matchID := c.Param("id")
	if matchID == "" {
		c.JSON(http.StatusBadRequest, ValidationErrors{
			Errors: []ValidationError{
				{
					Field:   "id",
					Message: "ID da partida é obrigatório",
				},
			},
		})
		c.Abort()
		return
	}

	// Validar se é um número
	if _, err := strconv.Atoi(matchID); err != nil {
		c.JSON(http.StatusBadRequest, ValidationErrors{
			Errors: []ValidationError{
				{
					Field:   "id",
					Message: "ID da partida deve ser um número",
				},
			},
		})
		c.Abort()
		return
	}

	c.Next()
}

func ValidatePagination(c *gin.Context) {
	page := c.Query("page")
	limit := c.Query("limit")

	if page != "" {
		if pageNum, err := strconv.Atoi(page); err != nil || pageNum < 1 {
			c.JSON(http.StatusBadRequest, ValidationErrors{
				Errors: []ValidationError{
					{
						Field:   "page",
						Message: "Página deve ser um número maior que 0",
					},
				},
			})
			c.Abort()
			return
		}
	}

	if limit != "" {
		if limitNum, err := strconv.Atoi(limit); err != nil || limitNum < 1 || limitNum > 100 {
			c.JSON(http.StatusBadRequest, ValidationErrors{
				Errors: []ValidationError{
					{
						Field:   "limit",
						Message: "Limite deve ser um número entre 1 e 100",
					},
				},
			})
			c.Abort()
			return
		}
	}

	c.Next()
}
