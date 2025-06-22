import type { Match } from '@/types/Match';

export default function MatchCard({ match }: { match: Match }) {
  const formatTime = (dateString: string) => {
    if (!dateString) return 'A definir';
    try {
      return new Date(dateString)
        .toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        .replace(':', 'H');
    } catch (e) {
      return 'A definir';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const score = match.score.home !== null && match.score.away !== null
      ? `${match.score.home} x ${match.score.away}`
      : formatTime(match.date);

  const scoreOrTimeStyles = match.score.home !== null
    ? "text-2xl"
    : "text-lg";

  return (
    <div className="font-sans w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        {/* Time da Casa */}
        <div className="flex flex-col items-center w-24">
          {match.teams.home.logo ? (
            <img src={match.teams.home.logo} alt={match.teams.home.name} className="h-14 w-14 object-contain" />
          ) : (
            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
              {getInitials(match.teams.home.name)}
            </div>
          )}
        </div>

        {/* Banner Central */}
        <div className="relative flex-grow text-center mx-2">
          {/* Placar ou Horário */}
          <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 font-bold px-5 py-1.5 rounded-full z-10 whitespace-nowrap ${scoreOrTimeStyles}`}>
            {score}
          </div>

          {/* Banner com Times */}
          <div className="bg-gray-800 text-white font-bold text-md uppercase py-4 px-2 rounded-lg relative overflow-hidden flex items-center justify-between">
            <span className="truncate w-2/5 text-right pr-2">
              {match.teams.home.name}
            </span>
            <span className="text-white text-sm font-semibold pt-3">vs</span>
            <span className="truncate w-2/5 text-left pl-2">
              {match.teams.away.name}
            </span>
          </div>
        </div>

        {/* Time Visitante */}
        <div className="flex flex-col items-center w-24">
          {match.teams.away.logo ? (
            <img src={match.teams.away.logo} alt={match.teams.away.name} className="h-14 w-14 object-contain" />
          ) : (
            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
              {getInitials(match.teams.away.name)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
