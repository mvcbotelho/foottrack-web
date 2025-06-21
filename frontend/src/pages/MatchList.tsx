import { useEffect, useState } from 'react'
import api from '@/services/api'
import type { Match } from '@/types/Match'
import MatchCard from '@/components/MatchCard'

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .get<Match[]>('/matches')
      .then((res) => {
        setMatches(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar partidas:', err)
        setError('Erro ao carregar partidas. Tente novamente mais tarde.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Partidas de Hoje</h1>

      {loading && <p className="text-gray-600">Carregando partidas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && matches.length === 0 && (
        <p className="text-gray-600">Nenhuma partida encontrada.</p>
      )}

      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}
