export interface Match {
  id: number
  date: string
  status: string
  league: string
  teams: {
    home: {
      name: string
      logo?: string
    }
    away: {
      name: string
      logo?: string
    }
  }
  score: {
    home: number
    away: number
  }
  stadium?: string
  referee?: string
}
