import type { Match } from '@/types/Match'

type Props = {
  match: Match
}

export default function MatchCard({ match }: Props) {
  const date = new Date(match.date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  // Buscar algo para substituir pelos escudos reais via API
  const getShield = (team: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(team)}&background=random&size=48`

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 px-6 py-5 mb-6 hover:shadow-lg transition">
      {/* Nome do campeonato */}
      <div className="text-sm font-semibold text-gray-500 mb-4 pl-1 tracking-wide uppercase">
        {match.league}
      </div>

      {/* Linha dos times e placar */}
      <div className="flex items-center justify-between mb-3">
        {/* Time da casa */}
        <div className="flex items-center gap-3 w-1/3">
          <img
            src={getShield(match.teams.home.name)}
            alt={match.teams.home.name}
            className="w-9 h-9 rounded-full border"
          />
          <span className="text-sm font-medium text-gray-800 truncate">
            {match.teams.home.name}
          </span>
        </div>

        {/* Placar */}
        <div className="flex flex-col items-center w-1/3">
          <span className="text-xl font-extrabold text-gray-900">
            {match.score.home} - {match.score.away}
          </span>
          <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${match.status === 'FT' ? 'bg-green-100 text-green-700' :
              match.status === 'NS' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
            }`}>
            {match.status}
          </span>
        </div>

        {/* Time visitante */}
        <div className="flex items-center gap-3 justify-end w-1/3">
          <span className="text-sm font-medium text-gray-800 text-right truncate">
            {match.teams.away.name}
          </span>
          <img
            src={getShield(match.teams.away.name)}
            alt={match.teams.away.name}
            className="w-9 h-9 rounded-full border"
          />
        </div>
      </div>

      {/* Rodapé com data */}
      <div className="text-xs text-center text-gray-500 mt-1">
        ⏰ {date}
      </div>
    </div>
  )
}
