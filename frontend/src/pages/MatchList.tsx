import { useState } from 'react';
import { useMatches } from '@/hooks/useMatches';
import MatchCard from '@/components/MatchCard';
import { MatchCardSkeleton } from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Button from '@/components/ui/Button';

export default function MatchList() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { data, isLoading, isError, error, refetch, isFetching } = useMatches({ date });

  const matches = data?.matches || [];
  const pagination = data?.pagination;

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <MatchCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (isError) {
      return <Error message={error.message} onRetry={() => refetch()} />;
    }

    if (matches.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma partida encontrada</h3>
          <p className="text-gray-500 mb-4">Não há partidas programadas para a data selecionada.</p>
          <Button onClick={() => refetch()} loading={isFetching}>Tentar novamente</Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 uppercase tracking-wider">
          Jogos do Dia
        </h1>
        <p className="text-gray-500 mt-1">
          Acompanhe os resultados do seu time favorito
        </p>
      </div>
      
      {/* Controles */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <Button
          variant="primary"
          onClick={() => refetch()}
          loading={isFetching}
          disabled={isLoading}
        >
          {isFetching ? 'Buscando...' : 'Buscar Jogos'}
        </Button>
      </div>

      {/* Conteúdo */}
      {renderContent()}
    </div>
  );
}
