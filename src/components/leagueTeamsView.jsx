import React from 'react';
import { getSportConfig } from '../data/sportConfig';

export default function LeagueTeamsView({ league, onBack, onAddTeam, onRemoveTeam }) {
  const config = getSportConfig(league.sport);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">League Teams</h2>
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white"
        >
          ← Back
        </button>
      </div>

      {league.teams.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center text-slate-400">
          No teams in the league yet
        </div>
      ) : (
        <div className="space-y-2">
          {league.teams.map((team, index) => (
            <div 
              key={index}
              className="bg-slate-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="text-white font-bold">{team.name}</div>
                <div className="text-slate-400 text-sm">
                  {team.roster?.length || 0} players
                </div>
              </div>
              
              <button
                onClick={() => onRemoveTeam(team.name)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onAddTeam}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold"
      >
        + Add Team
      </button>
    </div>
  );
}