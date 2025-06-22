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

func (s *APIFootballService) GetTodayMatches() ([]MatchComplete, error) {
	today := time.Now().Format("2006-01-02")
	return s.GetMatchesByDate(today)
}

func (s *APIFootballService) GetMatchesByDate(date string) ([]MatchComplete, error) {
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

	return s.formatMatchesComplete(apiResp.Response), nil
}

func (s *APIFootballService) GetMatchDetails(matchID string) (MatchComplete, error) {
	url := fmt.Sprintf("%s/fixtures?id=%s", s.baseURL, matchID)

	ctx, cancel := context.WithTimeout(context.Background(), s.config.Timeout)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return MatchComplete{}, fmt.Errorf("erro ao criar requisição: %w", err)
	}

	req.Header.Add("x-apisports-key", s.config.FootballKey)
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	resp, err := s.client.Do(req)
	if err != nil {
		return MatchComplete{}, fmt.Errorf("erro na requisição HTTP: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return MatchComplete{}, fmt.Errorf("API retornou status %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return MatchComplete{}, fmt.Errorf("erro ao ler resposta: %w", err)
	}

	var apiResp APIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		return MatchComplete{}, fmt.Errorf("erro ao deserializar resposta: %w", err)
	}

	if len(apiResp.Response) == 0 {
		return MatchComplete{}, fmt.Errorf("partida não encontrada")
	}

	return s.formatMatchComplete(apiResp.Response[0]), nil
}

func (s *APIFootballService) formatMatchesComplete(matches []MatchRaw) []MatchComplete {
	var formatted []MatchComplete
	for _, m := range matches {
		formatted = append(formatted, s.formatMatchComplete(m))
	}
	return formatted
}

func (s *APIFootballService) formatMatchComplete(m MatchRaw) MatchComplete {
	return MatchComplete{
		Fixture: m.Fixture,
		League:  m.League,
		Teams:   m.Teams,
		Goals:   m.Goals,
		Score:   m.Score,
	}
}

// Métodos mantidos para compatibilidade (retornam formato simplificado)
func (s *APIFootballService) GetTodayMatchesFormatted() ([]MatchFormatted, error) {
	matches, err := s.GetTodayMatches()
	if err != nil {
		return nil, err
	}
	return s.convertToFormatted(matches), nil
}

func (s *APIFootballService) GetMatchesByDateFormatted(date string) ([]MatchFormatted, error) {
	matches, err := s.GetMatchesByDate(date)
	if err != nil {
		return nil, err
	}
	return s.convertToFormatted(matches), nil
}

func (s *APIFootballService) GetMatchDetailsFormatted(matchID string) (MatchFormatted, error) {
	match, err := s.GetMatchDetails(matchID)
	if err != nil {
		return MatchFormatted{}, err
	}
	return s.convertToFormatted([]MatchComplete{match})[0], nil
}

func (s *APIFootballService) convertToFormatted(matches []MatchComplete) []MatchFormatted {
	var formatted []MatchFormatted
	for _, m := range matches {
		homeScore := 0
		awayScore := 0
		if m.Goals.Home != nil {
			homeScore = *m.Goals.Home
		}
		if m.Goals.Away != nil {
			awayScore = *m.Goals.Away
		}

		formatted = append(formatted, MatchFormatted{
			ID:      m.Fixture.ID,
			Date:    m.Fixture.Date,
			Status:  m.Fixture.Status.Short,
			League:  m.League.Name,
			Stadium: m.Fixture.Venue.Name,
			Referee: m.Fixture.Referee,
			Teams: Teams{
				Home: Team{Name: m.Teams.Home.Name, Logo: m.Teams.Home.Logo},
				Away: Team{Name: m.Teams.Away.Name, Logo: m.Teams.Away.Logo},
			},
			Score: Score{
				Home: homeScore,
				Away: awayScore,
			},
		})
	}
	return formatted
}
