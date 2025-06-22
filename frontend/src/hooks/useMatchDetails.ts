import { useQuery } from '@tanstack/react-query';
import { matchService } from '@/services/api';
import type { Match } from '@/types/Match';

export default function useMatchDetails(matchId: string | undefined) {
  return useQuery<Match, Error>({
    queryKey: ['match', matchId],
    queryFn: () => {
      if (!matchId) {
        throw new Error('ID da partida é inválido.');
      }
      return matchService.getMatchDetails(matchId);
    },
    enabled: !!matchId, // A query só será executada se matchId não for nulo/undefined
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
} 