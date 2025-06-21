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

func GetTodayMatches() ([]interface{}, error) {
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

	return result.Response, nil
}
