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
			Long  string `json:"long"`
		} `json:"status"`
		Venue struct {
			Name string `json:"name"`
			City string `json:"city"`
		} `json:"venue"`
		Referee string `json:"referee"`
	} `json:"fixture"`

	League struct {
		ID      int    `json:"id"`
		Name    string `json:"name"`
		Country string `json:"country"`
		Logo    string `json:"logo"`
		Flag    string `json:"flag"`
		Season  int    `json:"season"`
		Round   string `json:"round"`
	} `json:"league"`

	Teams struct {
		Home struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
			Logo string `json:"logo"`
		} `json:"home"`
		Away struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
			Logo string `json:"logo"`
		} `json:"away"`
	} `json:"teams"`

	Goals struct {
		Home *int `json:"home"`
		Away *int `json:"away"`
	} `json:"goals"`

	Score struct {
		Halftime struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"halftime"`
		Fulltime struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"fulltime"`
		Extratime struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"extratime"`
		Penalty struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"penalty"`
	} `json:"score"`
}

// Estrutura completa para o frontend (compatível com a API-Football)
type MatchComplete struct {
	Fixture struct {
		ID     int    `json:"id"`
		Date   string `json:"date"`
		Status struct {
			Short string `json:"short"`
			Long  string `json:"long"`
		} `json:"status"`
		Venue struct {
			Name string `json:"name"`
			City string `json:"city"`
		} `json:"venue"`
		Referee string `json:"referee"`
	} `json:"fixture"`

	League struct {
		ID      int    `json:"id"`
		Name    string `json:"name"`
		Country string `json:"country"`
		Logo    string `json:"logo"`
		Flag    string `json:"flag"`
		Season  int    `json:"season"`
		Round   string `json:"round"`
	} `json:"league"`

	Teams struct {
		Home struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
			Logo string `json:"logo"`
		} `json:"home"`
		Away struct {
			ID   int    `json:"id"`
			Name string `json:"name"`
			Logo string `json:"logo"`
		} `json:"away"`
	} `json:"teams"`

	Goals struct {
		Home *int `json:"home"`
		Away *int `json:"away"`
	} `json:"goals"`

	Score struct {
		Halftime struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"halftime"`
		Fulltime struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"fulltime"`
		Extratime struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"extratime"`
		Penalty struct {
			Home *int `json:"home"`
			Away *int `json:"away"`
		} `json:"penalty"`
	} `json:"score"`
}

// Estrutura simplificada (mantida para compatibilidade)
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
