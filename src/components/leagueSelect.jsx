import React from 'react';
import { getLeagueList as getBasketballLeagues } from '../data/basketballLeagues';
import { getLeagueList as getSoccerLeagues } from '../data/soccerLeagues';
import { getLeagueList as getCricketLeagues } from '../data/cricketLeagues';

export default function LeagueSelect({ sport, onSelectLeague, onBack }) {
  let leagues = [];
  
  if (sport === 'basketball') {
    leagues = getBasketballLeagues();
  } else if (sport === 'soccer') {
    leagues = getSoccerLeagues();
  } else if (sport === 'cricket') {
    leagues = getCricketLeagues();
  }

  const sportEmoji = {
    basketball: '🏀',
    soccer: '⚽',
    cricket: '🏏'
  };

  // Separate franchise leagues and international tournaments for cricket
  const franchiseLeagues = leagues.filter(l => !l.isInternational);
  const internationalTournaments = leagues.filter(l => l.isInternational);

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
        <div className="h-full max-w-5xl mx-auto overflow-y-auto">
          
          {/* Franchise Leagues */}
          {franchiseLeagues.length > 0 && (
            <div className="mb-6">
              {sport === 'cricket' && (
                <h2 className="text-white/60 text-xs uppercase tracking-wider mb-3">
                  Franchise Leagues
                </h2>
              )}
              <div className="grid grid-cols-2 gap-4">
                {franchiseLeagues.map((league) => (
                  <LeagueTile 
                    key={league.id} 
                    league={league} 
                    onSelect={onSelectLeague}
                    showFormat={sport === 'cricket'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* International Tournaments */}
          {internationalTournaments.length > 0 && (
            <div>
              <h2 className="text-white/60 text-xs uppercase tracking-wider mb-3">
                International Tournaments
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {internationalTournaments.map((league) => (
                  <LeagueTile 
                    key={league.id} 
                    league={league} 
                    onSelect={onSelectLeague}
                    showFormat={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Non-cricket sports - just show all leagues */}
          {sport !== 'cricket' && (
            <div className="grid grid-cols-2 gap-4">
              {leagues.map((league) => (
                <LeagueTile 
                  key={league.id} 
                  league={league} 
                  onSelect={onSelectLeague}
                  showFormat={false}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function LeagueTile({ league, onSelect, showFormat }) {
  return (
    <button
      onClick={() => onSelect(league.id)}
      className="relative overflow-hidden group text-left h-44"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${league.image})` }}
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
      
      <div className="relative h-full flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white/60 text-xs uppercase tracking-wider">
              {league.country}
            </p>
            {showFormat && league.format && (
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                {league.format}
              </span>
            )}
          </div>
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
  );
}