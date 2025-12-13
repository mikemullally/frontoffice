import React from 'react';
import { getLeagueList as getBasketballLeagues } from '../data/basketballLeagues';
import { getLeagueList as getSoccerLeagues } from '../data/soccerLeagues';

export default function LeagueSelect({ sport, onSelectLeague, onBack }) {
  const leagues = sport === 'basketball' 
    ? getBasketballLeagues() 
    : sport === 'soccer' 
      ? getSoccerLeagues() 
      : [];

  const sportEmoji = {
    basketball: '🏀',
    soccer: '⚽',
    cricket: '🏏'
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <h1 
            className="text-2xl font-bold text-white uppercase tracking-wider"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            Select League
          </h1>
        </div>
        <div className="text-white/60 text-sm uppercase tracking-wider">
          {sportEmoji[sport]} {sport}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto">
          <div className="h-full grid grid-cols-2 gap-4 overflow-y-auto">
            {leagues.map((league) => (
              <button
                key={league.id}
                onClick={() => onSelectLeague(league.id)}
                className="relative overflow-hidden group text-left h-48"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${league.image})` }}
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
                
                <div className="relative h-full flex flex-col justify-between p-5">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      {league.country}
                    </p>
                    <h2 
                      className="text-xl font-bold text-white uppercase tracking-wider"
                      style={{ fontFamily: 'Arial Black, sans-serif' }}
                    >
                      {league.name}
                    </h2>
                    <p className="text-white/70 text-sm mt-1">
                      {league.fullName}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Teams</p>
                      <p className="text-white text-lg font-bold">{league.teamCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-xs uppercase tracking-wider">Salary</p>
                      <p className={`text-sm font-semibold ${league.hasSalaryCap ? 'text-yellow-400' : 'text-emerald-400'}`}>
                        {league.hasSalaryCap ? 'Capped' : 'No Cap'}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}