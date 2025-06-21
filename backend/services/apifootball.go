package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

func GetTodayMatches() ([]MatchFormatted, error) {

	apiKey := os.Getenv("API_FOOTBALL_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("API key não encontrada")
	}

	today := time.Now().Format("2006-01-02")
	url := fmt.Sprintf("https://v3.football.api-sports.io/fixtures?date=%s", today)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("x-apisports-key", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var apiResp APIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		return nil, err
	}

	var formatted []MatchFormatted
	for _, m := range apiResp.Response {
		home := m.Teams.Home.Name
		away := m.Teams.Away.Name

		if !IsBrazilianTeam(home) && !IsBrazilianTeam(away) {
			continue
		}

		formatted = append(formatted, MatchFormatted{
			ID:     m.Fixture.ID,
			Date:   m.Fixture.Date,
			Status: m.Fixture.Status.Short,
			League: m.League.Name,
			Teams: Teams{
				Home: Team{Name: m.Teams.Home.Name},
				Away: Team{Name: m.Teams.Away.Name},
			},
			Score: Score{
				Home: m.Goals.Home,
				Away: m.Goals.Away,
			},
			Stadium: m.Fixture.Venue.Name,
			Referee: m.Fixture.Referee,
		})
	}

	return formatted, nil
}

func GetMatchDetails(matchID string) (MatchFormatted, error) {
	apiKey := os.Getenv("API_FOOTBALL_KEY")
	if apiKey == "" {
		return MatchFormatted{}, fmt.Errorf("API key não encontrada")
	}

	url := fmt.Sprintf("https://v3.football.api-sports.io/fixtures?id=%s", matchID)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return MatchFormatted{}, err
	}

	req.Header.Add("x-apisports-key", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return MatchFormatted{}, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var apiResp APIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		return MatchFormatted{}, err
	}

	if len(apiResp.Response) == 0 {
		return MatchFormatted{}, fmt.Errorf("Partida não encontrada")
	}

	m := apiResp.Response[0]

	formatted := MatchFormatted{
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

	return formatted, nil
}
