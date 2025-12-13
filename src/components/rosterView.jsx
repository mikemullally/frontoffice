import React from 'react';
import { getSportConfig } from '../data/sportConfig';

export default function RosterView({ team, onBack, onReleasePlayer }) {
  const config = getSportConfig(team.sport);

  const formatMoney = (amount) => {
    if (!amount) return '$0';
    return '$' + (amount / 1000000).toFixed(1) + 'M';
  };

  const getOverallRating = (player) => {
    const stats = config.statCategories;
    const total = stats.reduce((sum, stat) => sum + (player[stat] || 0), 0);
    return Math.round(total / stats.length);
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
            Roster
          </h1>
        </div>
        <div className="text-white/60 text-sm">
          {team.roster.length} / {config.rosterSize} players
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        {team.roster.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/40 text-lg mb-4">No players signed yet</p>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-white text-black text-sm font-bold uppercase tracking-wider"
              >
                Sign Players
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="grid gap-2">
              {team.roster.map((player, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 bg-white/10 flex items-center justify-center text-xl font-bold text-white"
                      style={{ fontFamily: 'Arial Black, sans-serif' }}
                    >
                      {getOverallRating(player)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{player.name}</div>
                      <div className="text-white/50 text-sm">
                        {player.position} • {player.team || 'Free Agent'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-white/50 text-xs uppercase tracking-wider">Salary</div>
                      <div className="text-white">{formatMoney(player.salary)}</div>
                    </div>
                    
                    <button
                      onClick={() => onReleasePlayer(player.name)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 text-sm font-semibold uppercase tracking-wider hover:bg-red-500/30 transition-colors"
                    >
                      Release
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}