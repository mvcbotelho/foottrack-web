import React, { useState } from 'react';
import { useTodayMatches } from '@/hooks/useMatches';
import MatchCard from '@/components/MatchCard';
import { MatchCardSkeleton } from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Button from '@/components/ui/Button';
import type { Match } from '@/types/Match';

export default function MatchList() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { data: matches, isLoading, error, refetch } = useTodayMatches();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleViewDetails = (matchId: number) => {
    // TODO: Implementar navegação para detalhes da partida
    console.log('Ver detalhes da partida:', matchId);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partidas do Dia</h1>
          <p className="text-gray-600">Carregando partidas...</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <MatchCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partidas do Dia</h1>
        </div>
        <Error 
          message={error.message} 
          onRetry={handleRefresh}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Partidas do Dia
            </h1>
            <p className="text-gray-600">
              {matches?.length || 0} partidas encontradas
            </p>
          </div>
          
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              variant="outline"
              onClick={handleRefresh}
              loading={isLoading}
            >
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de partidas */}
      {matches && matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match: Match) => (
            <MatchCard
              key={match.id}
              match={match}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma partida encontrada
          </h3>
          <p className="text-gray-600 mb-4">
            Não há partidas programadas para hoje.
          </p>
          <Button onClick={handleRefresh}>
            Tentar novamente
          </Button>
        </div>
      )}
    </div>
  );
}
