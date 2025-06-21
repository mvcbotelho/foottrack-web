import type { Match } from '@/types/Match'

type Props = {
  match: Match
}

export default function MatchCard({ match }: Props) {
  return (
    <div className="p-4 border rounded shadow bg-white mb-2">
      <div className="text-sm text-gray-500">{match.league}</div>
      <div className="flex justify-between items-center text-lg font-semibold">
        <span>{match.teams.home.name}</span>
        <span>{match.score.home} x {match.score.away}</span>
        <span>{match.teams.away.name}</span>
      </div>
      <div className="text-sm text-gray-600">
        {new Date(match.date).toLocaleString()} • {match.status}
      </div>
    </div>
  )
}
