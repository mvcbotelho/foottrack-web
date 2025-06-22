import type { Match } from '@/types/Match';
import Button from '@/components/ui/Button';

interface MatchCardProps {
  match: Match;
  onViewDetails?: (matchId: number) => void;
  className?: string;
}

export default function MatchCard({ match, onViewDetails, className = '' }: MatchCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'FT': 'bg-green-100 text-green-800',
      'HT': 'bg-yellow-100 text-yellow-800',
      'NS': 'bg-blue-100 text-blue-800',
      'LIVE': 'bg-red-100 text-red-800',
      'POSTP': 'bg-gray-100 text-gray-800',
      'CANC': 'bg-red-100 text-red-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow ${className}`}>
      {/* Header com liga e status */}
      <div className="flex justify-between items-start mb-3">
        <div className="text-sm text-gray-500 font-medium truncate flex-1">
          {match.league}
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(match.status)}`}>
          {match.status}
        </span>
      </div>

      {/* Times e Placar */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1 text-right pr-4">
          <div className="font-semibold text-gray-900 truncate">
            {match.teams.home.name}
          </div>
        </div>
        
        <div className="flex-shrink-0 px-4 py-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">
            {match.score.home} - {match.score.away}
          </div>
        </div>
        
        <div className="flex-1 text-left pl-4">
          <div className="font-semibold text-gray-900 truncate">
            {match.teams.away.name}
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <span>{formatDate(match.date)}</span>
        {match.stadium && (
          <span className="truncate max-w-32" title={match.stadium}>
            📍 {match.stadium}
          </span>
        )}
      </div>

      {/* Botão de detalhes */}
      {onViewDetails && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(match.id)}
            className="text-xs"
          >
            Ver detalhes
          </Button>
        </div>
      )}
    </div>
  );
}
