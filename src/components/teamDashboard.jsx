import React from 'react';
import { getSalaryCap, getRosterValue } from '../core/teamManager';
import { getSportConfig } from '../data/sportConfig';

const sportImages = {
  basketball: 'https://images.unsplash.com/photo-1504450758481-7338bbe7524a?auto=format&fit=crop&w=1920&q=80',
  soccer: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1920&q=80',
  cricket: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&q=80'
};

export default function TeamDashboard({ team, onViewRoster, onSignPlayer, onEnterCompetition }) {
  const config = getSportConfig(team.sport);
  const salary = getSalaryCap(team);

  const formatMoney = (amount) => {
    if (!amount) return '$0';
    if (amount >= 1000000) {
      return '$' + (amount / 1000000).toFixed(1) + 'M';
    }
    return '$' + amount.toLocaleString();
  };

  const salaryPercentage = salary ? (salary.used / salary.total) * 100 : 0;

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Compact Hero Header */}
      <div className="relative h-32 flex-shrink-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sportImages[team.sport]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        
        <div className="relative z-10 h-full flex items-end p-6">
          <div className="flex items-end justify-between w-full">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                {config.name} • Manager
              </p>
              <h1 
                className="text-2xl font-bold text-white uppercase tracking-wide"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {team.name}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {team.wins}-{team.losses}
              </div>
              <p className="text-white/60 text-xs uppercase tracking-wider">
                Record
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Fills remaining space */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto flex flex-col gap-4">
          
          {/* Top Row: Stats + Salary */}
          <div className="flex gap-4 flex-shrink-0">
            {/* Stats */}
            <div className="flex gap-4 flex-1">
              <div className="flex-1 bg-white/5 border border-white/10 p-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Roster</p>
                <p className="text-2xl font-bold text-white">
                  {team.roster.length}
                  <span className="text-white/30 text-sm">/{config.rosterSize}</span>
                </p>
              </div>
              
              <div className="flex-1 bg-white/5 border border-white/10 p-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Rating</p>
                <p className="text-2xl font-bold text-white">
                  {team.roster.length > 0 
                    ? Math.round(getRosterValue(team) / team.roster.length) 
                    : '--'}
                </p>
              </div>
            </div>

            {/* Salary Cap */}
            {salary && (
              <div className="flex-1 bg-white/5 border border-white/10 p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white/50 text-xs uppercase tracking-wider">Salary</p>
                  <p className="text-white text-xs">
                    {formatMoney(salary.available)} left
                  </p>
                </div>
                <div className="h-2 bg-white/10 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      salaryPercentage > 90 ? 'bg-red-500' : 
                      salaryPercentage > 70 ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${salaryPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Tiles - Fill remaining space */}
          <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
            
            <button
              onClick={onViewRoster}
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
                    Roster
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    {team.roster.length} players
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onSignPlayer}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80)' 
                }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p 
                    className="text-white text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Sign Player
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Free agents
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onEnterCompetition}
              className="relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=80)' 
                }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p 
                    className="text-white text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Compete
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Join a league
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