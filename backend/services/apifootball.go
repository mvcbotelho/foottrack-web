package services

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/mvcbotelho/foottrack-backend/config"
)

type APIFootballService struct {
	client  *http.Client
	config  *config.APIConfig
	baseURL string
}

func NewAPIFootballService(cfg *config.APIConfig) *APIFootballService {
	return &APIFootballService{
		client: &http.Client{
			Timeout: cfg.Timeout,
		},
		config:  cfg,
		baseURL: cfg.BaseURL,
	}
}

func (s *APIFootballService) GetTodayMatches() ([]MatchFormatted, error) {
	today := time.Now().Format("2006-01-02")
	return s.GetMatchesByDate(today)
}

func (s *APIFootballService) GetMatchesByDate(date string) ([]MatchFormatted, error) {
	url := fmt.Sprintf("%s/fixtures?date=%s", s.baseURL, date)

	ctx, cancel := context.WithTimeout(context.Background(), s.config.Timeout)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("erro ao criar requisição: %w", err)
	}

	req.Header.Add("x-apisports-key", s.config.FootballKey)
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("erro na requisição HTTP: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("API retornou status %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("erro ao ler resposta: %w", err)
	}

	var apiResp APIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		return nil, fmt.Errorf("erro ao deserializar resposta: %w", err)
	}

	return s.formatMatches(apiResp.Response), nil
}

func (s *APIFootballService) GetMatchDetails(matchID string) (MatchFormatted, error) {
	url := fmt.Sprintf("%s/fixtures?id=%s", s.baseURL, matchID)

	ctx, cancel := context.WithTimeout(context.Background(), s.config.Timeout)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return MatchFormatted{}, fmt.Errorf("erro ao criar requisição: %w", err)
	}

	req.Header.Add("x-apisports-key", s.config.FootballKey)
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	resp, err := s.client.Do(req)
	if err != nil {
		return MatchFormatted{}, fmt.Errorf("erro na requisição HTTP: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return MatchFormatted{}, fmt.Errorf("API retornou status %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return MatchFormatted{}, fmt.Errorf("erro ao ler resposta: %w", err)
	}

	var apiResp APIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		return MatchFormatted{}, fmt.Errorf("erro ao deserializar resposta: %w", err)
	}

	if len(apiResp.Response) == 0 {
		return MatchFormatted{}, fmt.Errorf("partida não encontrada")
	}

	return s.formatMatch(apiResp.Response[0]), nil
}

func (s *APIFootballService) formatMatches(matches []MatchRaw) []MatchFormatted {
	var formatted []MatchFormatted
	for _, m := range matches {
		formatted = append(formatted, s.formatMatch(m))
	}
	return formatted
}

func (s *APIFootballService) formatMatch(m MatchRaw) MatchFormatted {
	return MatchFormatted{
		ID:      m.Fixture.ID,
		Date:    m.Fixture.Date,
		Status:  m.Fixture.Status.Short,
		League:  m.League.Name,
		Stadium: m.Fixture.Venue.Name,
		Referee: m.Fixture.Referee,
		Teams: Teams{
			Home: Team{Name: m.Teams.Home.Name},
			Away: Team{Name: m.Teams.Away.Name},
		},
		Score: Score{
			Home: m.Goals.Home,
			Away: m.Goals.Away,
		},
	}
}
