import React from 'react';
import { getSalaryCap, getRosterValue } from '../core/teamManager';
import { getSportConfig } from '../data/sportConfig';

export default function TeamDashboard({ team, onViewRoster, onSignPlayer }) {
  const config = getSportConfig(team.sport);
  const salary = getSalaryCap(team);
  const rosterValue = getRosterValue(team);

  const formatMoney = (amount) => {
    return '$' + (amount / 1000000).toFixed(1) + 'M';
  };

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {config.emoji} {team.name}
        </h2>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-white">
              {team.roster.length}/{config.rosterSize}
            </div>
            <div className="text-slate-400 text-sm">Players</div>
          </div>
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-green-400">{team.wins}</div>
            <div className="text-slate-400 text-sm">Wins</div>
          </div>
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-red-400">{team.losses}</div>
            <div className="text-slate-400 text-sm">Losses</div>
          </div>
        </div>
      </div>

      {/* Salary Cap - only if sport has one */}
      {salary && (
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Salary Cap</h3>
          
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">Used: {formatMoney(salary.used)}</span>
            <span className="text-slate-400">Cap: {formatMoney(salary.total)}</span>
          </div>
          
          <div className="h-4 bg-slate-600 rounded overflow-hidden">
            <div 
              className={`h-full ${salary.used / salary.total > 0.9 ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${(salary.used / salary.total) * 100}%` }}
            />
          </div>
          
          <div className="mt-2 text-right text-green-400 font-bold">
            {formatMoney(salary.available)} available
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onViewRoster}
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold"
        >
          View Roster
        </button>
        <button
          onClick={onSignPlayer}
          className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold"
        >
          Sign Player
        </button>
      </div>
    </div>
  );
}