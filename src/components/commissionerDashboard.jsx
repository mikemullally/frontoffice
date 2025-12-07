import React from 'react';
import { getLeagueRevenue, canStartSeason } from '../core/commissionerManager';
import { getSportConfig } from '../data/sportConfig';

export default function CommissionerDashboard({ 
  league, 
  onManageTeams, 
  onEditRules,
  onManageRevenue,
  onStartSeason 
}) {
  const config = getSportConfig(league.sport);
  const revenue = getLeagueRevenue(league);
  const seasonCheck = canStartSeason(league);

  const formatMoney = (amount) => {
    if (amount >= 1000000000) {
      return '$' + (amount / 1000000000).toFixed(1) + 'B';
    }
    return '$' + (amount / 1000000).toFixed(1) + 'M';
  };

  return (
    <div className="space-y-6">
      {/* League Header */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {config.emoji} {league.name}
        </h2>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-white">{league.teams.length}</div>
            <div className="text-slate-400 text-sm">Teams</div>
          </div>
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-green-400">
              {formatMoney(revenue.total)}
            </div>
            <div className="text-slate-400 text-sm">Revenue</div>
          </div>
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-blue-400">{league.reputation}</div>
            <div className="text-slate-400 text-sm">Reputation</div>
          </div>
        </div>
      </div>

      {/* League Rules Summary */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">League Rules</h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Salary Cap:</span>
            <span className="text-white">
              {league.rules.salaryCap ? formatMoney(league.rules.salaryCap) : 'None'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Roster Size:</span>
            <span className="text-white">{league.rules.maxRosterSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Draft:</span>
            <span className="text-white">
              {league.rules.draftEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Playoff Teams:</span>
            <span className="text-white">{league.rules.playoffTeams}</span>
          </div>
        </div>
      </div>

      {/* Season Status */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Season Status</h3>
        
        {league.season ? (
          <div className="text-green-400">Season in progress...</div>
        ) : (
          <div>
            {seasonCheck.canStart ? (
              <div className="text-green-400">Ready to start season!</div>
            ) : (
              <div className="text-yellow-400">{seasonCheck.error}</div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onManageTeams}
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold"
        >
          Manage Teams
        </button>
        <button
          onClick={onEditRules}
          className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-bold"
        >
          Edit Rules
        </button>
        <button
          onClick={onManageRevenue}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-lg font-bold"
        >
          Revenue & Deals
        </button>
        <button
          onClick={onStartSeason}
          disabled={!seasonCheck.canStart}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-4 rounded-lg font-bold"
        >
          Start Season
        </button>
      </div>
    </div>
  );
}