import React from 'react';
import { getStandings } from '../core/competitionManager';
import { getSportConfig } from '../data/sportConfig';

export default function StandingsView({ competition, onBack }) {
  const config = getSportConfig(competition.sport);
  const standings = getStandings(competition);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Standings</h2>
        <button onClick={onBack} className="text-slate-400 hover:text-white">
          ← Back
        </button>
      </div>

      <div className="bg-slate-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-600">
            <tr className="text-slate-300 text-sm">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Team</th>
              <th className="py-3 px-4 text-center">W</th>
              <th className="py-3 px-4 text-center">L</th>
              <th className="py-3 px-4 text-center">PCT</th>
              <th className="py-3 px-4 text-center">{config.gameTerms.score} For</th>
              <th className="py-3 px-4 text-center">{config.gameTerms.score} Against</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr 
                key={team.team}
                className={`border-t border-slate-600 ${index === 0 ? 'bg-yellow-900/20' : ''}`}
              >
                <td className="py-3 px-4 text-slate-400">{index + 1}</td>
                <td className="py-3 px-4 text-white font-medium">{team.team}</td>
                <td className="py-3 px-4 text-center text-green-400">{team.wins}</td>
                <td className="py-3 px-4 text-center text-red-400">{team.losses}</td>
                <td className="py-3 px-4 text-center text-white">{team.winPct}</td>
                <td className="py-3 px-4 text-center text-slate-300">{team.pointsFor}</td>
                <td className="py-3 px-4 text-center text-slate-300">{team.pointsAgainst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}