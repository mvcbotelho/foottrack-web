import type { Match } from '@/types/Match';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

interface MatchDetailCardProps {
  match: Match;
}

export default function MatchDetailCard({ match }: MatchDetailCardProps) {
  const navigate = useNavigate();

  if (!match) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold">{match.league}</span>
        <span className="px-3 py-1 rounded-full text-sm font-bold text-white bg-blue-500">
          {match.status}
        </span>
      </div>
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {new Date(match.date).toLocaleString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        {match.stadium && (
          <p className="text-sm text-gray-500">📍 {match.stadium}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-20 h-20 mx-auto mb-3 object-contain" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">{match.teams.home.name}</h2>
        </div>
        <div className="mx-8 text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {match.score.home} <span className="mx-4 text-gray-400">x</span> {match.score.away}
          </div>
          <div className="text-sm text-gray-500">{match.status === 'FT' ? 'Final' : 'Tempo'}</div>
        </div>
        <div className="flex-1 text-center">
          <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-20 h-20 mx-auto mb-3 object-contain" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">{match.teams.away.name}</h2>
        </div>
      </div>
      <div className="text-center mt-6">
        <Button onClick={() => navigate('/')} variant="secondary">
          ← Voltar para a lista de jogos
        </Button>
      </div>
    </div>
  );
} 