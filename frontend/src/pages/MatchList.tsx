import { useNavigate } from 'react-router-dom';
import { useTodayMatches } from '@/hooks/useMatches';
import MatchCard from '@/components/MatchCard';
import Loading from '@/components/ui/Loading';
import ErrorComponent from '@/components/ui/Error';
import Button from '@/components/ui/Button';

export default function MatchList() {
  const navigate = useNavigate();
  const { data: matches, isLoading, isError, error, refetch } = useTodayMatches();

  const handleViewDetails = (matchId: number) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <Loading />}
      {isError && (
        <div className="text-center">
          <ErrorComponent message={error?.message || 'Ocorreu um erro ao buscar os jogos.'} />
          <Button onClick={() => refetch()} className="mt-4">
            Tentar novamente
          </Button>
        </div>
      )}

      {matches && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches
            .filter(
              (match) =>
                match &&
                typeof match.id === 'number' &&
                match.teams &&
                match.teams.home &&
                match.teams.away
            )
            .map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onViewDetails={handleViewDetails}
              />
            ))}
        </div>
      )}
    </div>
  );
}
