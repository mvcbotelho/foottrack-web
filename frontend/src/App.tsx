import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MatchList from '@/pages/MatchList';
import './App.css';

// Configurar React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">
              ⚽ FootTrack
            </h1>
            <p className="text-sm text-gray-600">
              Acompanhe as partidas de futebol em tempo real
            </p>
          </div>
        </header>
        
        <main>
          <MatchList />
        </main>
        
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-sm text-gray-600">
              © 2024 FootTrack. Desenvolvido com ❤️ por Marcus Botelho
            </p>
          </div>
        </footer>
      </div>
      
      {/* React Query DevTools - apenas em desenvolvimento */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
