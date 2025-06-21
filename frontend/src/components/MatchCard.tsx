import type { Match } from '@/types/Match'

type Props = {
  match: Match
}

export default function MatchCard({ match }: Props) {
  const date = new Date(match.date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()


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
          {match.teams.home.logo ? (
            <img
              src={match.teams.home.logo}
              alt={match.teams.home.name}
              className="w-10 h-10 object-contain rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
              {getInitials(match.teams.home.name)}
            </div>
          )}

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
          {match.teams.away.logo ? (
            <img
              src={match.teams.away.logo}
              alt={match.teams.away.name}
              className="w-10 h-10 object-contain rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
              {getInitials(match.teams.away.name)}
            </div>
          )}


        </div>
      </div>

      {/* Rodapé com data */}
      <div className="text-xs text-center text-gray-500 mt-1">
        ⏰ {date}
      </div>
    </div>
  )
}
