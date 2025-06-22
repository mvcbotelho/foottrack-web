import React from 'react';
import type { Match } from '@/types/Match';

// Um placeholder para quando o logo do time não está disponível.
const LogoPlaceholder = () => (
  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center">
    <svg 
      className="w-6 h-6 text-gray-400" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      ></path>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  </div>
);

interface MatchCardProps {
  match: any;
  onViewDetails: (matchId: number) => void;
}

export default function MatchCard({ match, onViewDetails }: MatchCardProps) {
  if (!match || !match.id || !match.teams) return null;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={() => onViewDetails(match.id)}
    >
      <div className="bg-gray-800 text-white p-2 text-center">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">{match.league}</span>
          <div className="px-2 py-1 rounded text-xs font-bold bg-blue-500">
            {match.status}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center">
          {/* Time da Casa */}
          <div className="w-2/5 text-center">
            {match.teams.home.logo ? (
              <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
            ) : (
              <LogoPlaceholder />
            )}
            <h3 className="text-sm font-semibold text-gray-800 truncate">{match.teams.home.name}</h3>
          </div>

          {/* Placar */}
          <div className="w-1/5 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1 whitespace-nowrap">
              {match.score.home} <span className="mx-1 text-gray-500 text-lg">vs</span> {match.score.away}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(match.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {/* Time Visitante */}
          <div className="w-2/5 text-center">
            {match.teams.away.logo ? (
              <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
            ) : (
              <LogoPlaceholder />
            )}
            <h3 className="text-sm font-semibold text-gray-800 truncate">{match.teams.away.name}</h3>
          </div>
        </div>
        {match.stadium && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">📍 {match.stadium}</p>
          </div>
        )}
      </div>
    </div>
  );
}
