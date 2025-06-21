package services

type Team struct {
	Name string `json:"name"`
}

type Teams struct {
	Home Team `json:"home"`
	Away Team `json:"away"`
}

type Score struct {
	Home int `json:"home"`
	Away int `json:"away"`
}

type MatchFormatted struct {
	ID      int    `json:"id"`
	Date    string `json:"date"`
	Status  string `json:"status"`
	League  string `json:"league"`
	Teams   Teams  `json:"teams"`
	Score   Score  `json:"score"`
	Stadium string `json:"stadium,omitempty"`
	Referee string `json:"referee,omitempty"`
}
