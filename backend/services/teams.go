package services

import (
	"strings"
)

var BrazilianTeams = []string{
	"Flamengo", "Palmeiras", "Corinthians", "São Paulo", "Santos",
	"Grêmio", "Internacional", "Atlético Mineiro", "Cruzeiro", "Botafogo",
	"Vasco", "Bahia", "Fortaleza", "Ceará", "Athletico", "Goiás",
	"Chapecoense", "Bragantino",
}

func IsBrazilianTeam(name string) bool {
	name = strings.ToLower(name)
	for _, team := range BrazilianTeams {
		if strings.Contains(name, strings.ToLower(team)) {
			return true
		}
	}
	return false
}
