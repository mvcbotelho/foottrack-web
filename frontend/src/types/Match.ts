export interface Match {
    id: number
    date: string
    status: string
    league: string
    teams: {
      home: { name: string }
      away: { name: string }
    }
    score: {
      home: number
      away: number
    }
  }
  