package services

type APIResponse struct {
	Response []MatchRaw `json:"response"`
}

type MatchRaw struct {
	Fixture struct {
		ID     int    `json:"id"`
		Date   string `json:"date"`
		Status struct {
			Short string `json:"short"`
		} `json:"status"`
		Venue struct {
			Name string `json:"name"`
		} `json:"venue"`
		Referee string `json:"referee"`
	} `json:"fixture"`

	League struct {
		Name string `json:"name"`
	} `json:"league"`

	Teams struct {
		Home struct {
			Name string `json:"name"`
			Logo string `json:"logo"`
		} `json:"home"`
		Away struct {
			Name string `json:"name"`
			Logo string `json:"logo"`
		} `json:"away"`
	} `json:"teams"`

	Goals struct {
		Home int `json:"home"`
		Away int `json:"away"`
	} `json:"goals"`
}

type Team struct {
	Name string `json:"name"`
	Logo string `json:"logo"`
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
