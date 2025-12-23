import React from 'react';
import { getLeagueRevenue, canStartSeason } from '../core/commissionerManager';
import { getSportConfig } from '../data/sportConfig';
import QuitButton from './ui/QuitButton';

const sportImages = {
  basketball: 'https://images.unsplash.com/photo-1504450758481-7338bbe7524a?auto=format&fit=crop&w=1920&q=80',
  soccer: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1920&q=80',
  cricket: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&q=80'
};

export default function CommissionerDashboard({ 
  league, 
  onManageTeams, 
  onEditRules,
  onManageRevenue,
  onEditLeagues,
  onStartSeason,
  onBack,
  onQuit
}) {
  const config = getSportConfig(league.sport);
  const revenue = getLeagueRevenue(league);
  const seasonCheck = canStartSeason(league);

  const formatMoney = (amount) => {
    if (amount >= 1000000000) {
      return '$' + (amount / 1000000000).toFixed(1) + 'B';
    }
    if (amount >= 1000000) {
      return '$' + (amount / 1000000).toFixed(1) + 'M';
    }
    return '$' + amount.toLocaleString();
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Compact Hero Header */}
      <div className="relative h-32 flex-shrink-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sportImages[league.sport]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              ← Back
            </button>
          )}
          <div className="h-4 w-px bg-white/20" />
          <QuitButton onQuit={onQuit} />
        </div>
        
        <div className="relative z-10 h-full flex items-end p-6">
          <div className="flex items-end justify-between w-full">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                {config.name} • Commissioner
              </p>
              <h1 
                className="text-2xl font-bold text-white uppercase tracking-wide"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {league.name}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {league.teams.length}
              </div>
              <p className="text-white/60 text-xs uppercase tracking-wider">
                Teams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto flex flex-col gap-4">
          
          {/* Stats Row */}
          <div className="flex gap-4 flex-shrink-0">
            <div className="flex-1 bg-white/5 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Revenue</p>
              <p className="text-2xl font-bold text-white">{formatMoney(revenue.total)}</p>
            </div>
            
            <div className="flex-1 bg-white/5 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Per Team</p>
              <p className="text-2xl font-bold text-white">{formatMoney(revenue.perTeam)}</p>
            </div>
            
            <div className="flex-1 bg-white/5 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Reputation</p>
              <p className="text-2xl font-bold text-white">{league.reputation}</p>
            </div>
          </div>

          {/* Season Status */}
          <div className="bg-white/5 border border-white/10 p-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Season Status</p>
                {seasonCheck.canStart ? (
                  <p className="text-emerald-400">Ready to start</p>
                ) : (
                  <p className="text-yellow-400">{seasonCheck.error}</p>
                )}
              </div>
              <button
                onClick={onStartSeason}
                disabled={!seasonCheck.canStart}
                className="px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
              >
                Start Season
              </button>
            </div>
          </div>

          {/* Action Tiles - Now 4 columns */}
          <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">
            
            <button
              onClick={onManageTeams}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80)' 
                }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p 
                    className="text-white text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Teams
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    {league.teams.length} teams
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onEditRules}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80)' 
                }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p 
                    className="text-white text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Rules
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    League settings
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onManageRevenue}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80)' 
                }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p 
                    className="text-white text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Revenue
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    TV & deals
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onEditLeagues}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80)' 
                }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p 
                    className="text-white text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Leagues
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Create & edit
                  </p>
                </div>
              </div>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}