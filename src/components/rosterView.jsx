import React from 'react';

export default function RosterView({ team, onBack, onReleasePlayer }) {
  const formatMoney = (amount) => {
    return '$' + (amount / 1000000).toFixed(1) + 'M';
  };

  const getOverallRating = (player) => {
    return Math.round(
      (player.shooting + player.defense + player.rebounding + 
       player.ballHandling + player.passing) / 5
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Roster</h2>
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white"
        >
          ← Back
        </button>
      </div>

      {team.roster.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center text-slate-400">
          No players signed yet
        </div>
      ) : (
        <div className="space-y-2">
          {team.roster.map((player, index) => (
            <div 
              key={index}
              className="bg-slate-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="text-white font-bold">{player.name}</div>
                <div className="text-slate-400 text-sm">
                  {player.position} • {player.team}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">
                    {getOverallRating(player)}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {formatMoney(player.salary)}
                  </div>
                </div>
                
                <button
                  onClick={() => onReleasePlayer(player.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Release
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}