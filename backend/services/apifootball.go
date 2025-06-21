package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type MatchResponse struct {
	Response []interface{} `json:"response"`
}

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
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result MatchResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	var formatted []MatchFormatted
	for _, item := range result.Response {
		raw := item.(map[string]interface{})

		fixture := raw["fixture"].(map[string]interface{})
		league := raw["league"].(map[string]interface{})
		teams := raw["teams"].(map[string]interface{})
		score := raw["goals"].(map[string]interface{})

		formatted = append(formatted, MatchFormatted{
			ID:     int(fixture["id"].(float64)),
			Date:   fixture["date"].(string),
			Status: fixture["status"].(map[string]interface{})["short"].(string),
			League: league["name"].(string),
			Teams: Teams{
				Home: Team{Name: teams["home"].(map[string]interface{})["name"].(string)},
				Away: Team{Name: teams["away"].(map[string]interface{})["name"].(string)},
			},
			Score: Score{
				Home: int(score["home"].(float64)),
				Away: int(score["away"].(float64)),
			},
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
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return MatchFormatted{}, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result MatchResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return MatchFormatted{}, err
	}

	if len(result.Response) == 0 {
		return MatchFormatted{}, fmt.Errorf("Partida não encontrada")
	}

	raw := result.Response[0].(map[string]interface{})
	fixture := raw["fixture"].(map[string]interface{})
	league := raw["league"].(map[string]interface{})
	teams := raw["teams"].(map[string]interface{})
	score := raw["goals"].(map[string]interface{})

	formatted := MatchFormatted{
		ID:      int(fixture["id"].(float64)),
		Date:    fixture["date"].(string),
		Status:  fixture["status"].(map[string]interface{})["short"].(string),
		League:  league["name"].(string),
		Stadium: fixture["venue"].(map[string]interface{})["name"].(string),
		Referee: fixture["referee"].(string),
		Teams: Teams{
			Home: Team{Name: teams["home"].(map[string]interface{})["name"].(string)},
			Away: Team{Name: teams["away"].(map[string]interface{})["name"].(string)},
		},
		Score: Score{
			Home: int(score["home"].(float64)),
			Away: int(score["away"].(float64)),
		},
	}

	return formatted, nil
}
