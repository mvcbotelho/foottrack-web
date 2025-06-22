import { Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span role="img" aria-label="soccer ball">⚽</span>
            <span>FootTrack</span>
          </Link>
          <p className="text-sm text-gray-600">
            Acompanhe as partidas de futebol em tempo real
          </p>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet /> {/* O conteúdo da rota atual será renderizado aqui */}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} FootTrack. Desenvolvido com ❤️ por Marcus Botelho
          </p>
        </div>
      </footer>
    </div>
  );
} 