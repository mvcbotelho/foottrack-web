import { useEffect, useState } from 'react'
import api from '@/services/api'
import type { Match } from '@/types/Match'
import MatchCard from '@/components/MatchCard'

export default function MatchList() {
	const [matches, setMatches] = useState<Match[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchMatches() {
			try {
				const res = await api.get<Match[]>('/matches')
				setMatches(res.data)
			} catch (err) {
				console.error('Erro ao buscar partidas:', err)
				setError('Erro ao carregar partidas. Tente novamente mais tarde.')
			} finally {
				setLoading(false)
			}
		}

		fetchMatches()
	}, [])

	function renderContent() {
		if (loading) return <p className="text-gray-600">Carregando partidas...</p>
		if (error) return <p className="text-red-500">{error}</p>
		if (matches.length === 0)
			return <p className="text-gray-600">Nenhuma partida encontrada.</p>

		return matches.map((match) => (
			<MatchCard key={match.id} match={match} />
		))
	}


	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
					Partidas de Hoje ⚽
				</h1>
				{renderContent()}
			</div>
		</div>

	)
}
