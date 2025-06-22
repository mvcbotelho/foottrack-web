import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type { Match } from '@/types/Match';

// Configuração base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Requisição: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Resposta: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Erro na resposta:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// Tipos para as respostas da API
interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

interface ApiError {
  code: number;
  message: string;
  error?: string;
}

// Função para tratar erros da API
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    return apiError?.message || error.message || 'Erro desconhecido';
  }
  return error instanceof Error ? error.message : 'Erro desconhecido';
};

// Serviços da API
export const matchService = {
  // Buscar partidas do dia
  getTodayMatches: async (): Promise<Match[]> => {
    try {
      const response = await api.get<ApiResponse<Match[]>>('/matches');
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Buscar partidas por data
  getMatchesByDate: async (date: string): Promise<Match[]> => {
    try {
      const response = await api.get<ApiResponse<Match[]>>(`/matches?date=${date}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Buscar partidas com paginação
  getMatches: async (params?: {
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<{ matches: Match[]; pagination: any }> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.date) queryParams.append('date', params.date);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await api.get<ApiResponse<Match[]>>(`/matches?${queryParams}`);
      return {
        matches: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Buscar detalhes de uma partida
  getMatchDetails: async (id: string): Promise<Match> => {
    try {
      const response = await api.get<{ data: Match }>(`/matches/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// Health check
export const healthService = {
  check: async (): Promise<{ status: string; timestamp: string; service: string }> => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

export default api;
