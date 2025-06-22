import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { matchService } from '@/services/api';

// Hook para buscar partidas do dia
export function useTodayMatches() {
  return useQuery({
    queryKey: ['matches', 'today'],
    queryFn: matchService.getTodayMatches,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}

// Hook para buscar partidas por data
export function useMatchesByDate(date: string) {
  return useQuery({
    queryKey: ['matches', 'date', date],
    queryFn: () => matchService.getMatchesByDate(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook para buscar partidas com paginação
export function useMatches(params?: {
  date?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['matches', 'paginated', params],
    queryFn: () => matchService.getMatches(params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook para infinite scroll de partidas
export function useInfiniteMatches(params?: {
  date?: string;
  limit?: number;
}) {
  return useInfiniteQuery({
    queryKey: ['matches', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      matchService.getMatches({
        ...params,
        page: pageParam,
        limit: params?.limit || 20,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const nextPage = pagination.page + 1;
      const totalPages = Math.ceil(pagination.total / pagination.limit);
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook para buscar detalhes de uma partida
export function useMatchDetails(id: string) {
  return useQuery({
    queryKey: ['match', 'details', id],
    queryFn: () => matchService.getMatchDetails(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
} 