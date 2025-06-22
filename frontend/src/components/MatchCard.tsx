import type { Match } from '@/types/Match';

interface MatchCardProps {
  match: any;
  onViewDetails: (matchId: number) => void;
}

export default function MatchCard({ match, onViewDetails }: MatchCardProps) {
  if (!match || !match.id || !match.teams) return null;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={() => onViewDetails(match.id)}
    >
      <div className="bg-gray-800 text-white p-2 text-center">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">{match.league}</span>
          <div className="px-2 py-1 rounded text-xs font-bold bg-blue-500">
            {match.status}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
            <h3 className="text-sm font-semibold text-gray-800 truncate">{match.teams.home.name}</h3>
          </div>
          <div className="mx-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {match.score.home} <span className="text-white mx-2">vs</span> {match.score.away}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(match.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <div className="flex-1 text-center">
            <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
            <h3 className="text-sm font-semibold text-gray-800 truncate">{match.teams.away.name}</h3>
          </div>
        </div>
        {match.stadium && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">📍 {match.stadium}</p>
          </div>
        )}
      </div>
    </div>
  );
}
