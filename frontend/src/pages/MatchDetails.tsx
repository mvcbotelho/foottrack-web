import { useParams, useNavigate } from 'react-router-dom';
import useMatchDetails from '@/hooks/useMatchDetails';
import Loading from '@/components/ui/Loading';
import ErrorComponent from '@/components/ui/Error';
import Button from '@/components/ui/Button';
import MatchDetailCard from '@/components/MatchDetailCard';

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: match, isLoading, isError, error } = useMatchDetails(id);

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ErrorComponent message="ID da partida não encontrado." />
        <Button onClick={() => navigate('/')} className="mt-4">
          Voltar para a lista de jogos
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <Loading />}
      {isError && (
        <div className="text-center">
          <ErrorComponent message={error?.message || 'Ocorreu um erro ao buscar os detalhes da partida.'} />
          <Button onClick={() => navigate('/')} className="mt-4">
            Voltar
          </Button>
        </div>
      )}
      {match && <MatchDetailCard match={match} />}
    </div>
  );
} 