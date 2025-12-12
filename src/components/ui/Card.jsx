import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  glow = null 
}) {
  const baseStyle = `
    bg-gradient-to-br from-slate-800 to-slate-900
    rounded-xl p-6
    shadow-lg
    ${hover ? 'hover:from-slate-700 hover:to-slate-800 transition-all cursor-pointer' : ''}
    ${glow ? `ring-1 ring-${glow}-500/30` : ''}
  `;

  return (
    <div className={`${baseStyle} ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, subvalue, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    red: 'text-rose-400',
    orange: 'text-orange-400',
    cyan: 'text-cyan-400'
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-lg">
      <div className="text-slate-400 text-sm font-medium mb-1">{label}</div>
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</div>
      {subvalue && (
        <div className="text-slate-500 text-sm mt-1">{subvalue}</div>
      )}
      {trend && (
        <div className={`text-sm mt-2 ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

export function PlayerCard({ player, rating, sport = 'basketball', onClick }) {
  const sportColors = {
    basketball: 'orange',
    soccer: 'green',
    cricket: 'cyan'
  };
  
  const sportBg = {
    basketball: 'from-orange-500/20 to-transparent',
    soccer: 'from-emerald-500/20 to-transparent',
    cricket: 'from-cyan-500/20 to-transparent'
  };

  const getRatingColor = (r) => {
    if (r >= 85) return 'text-emerald-400 bg-emerald-400/20';
    if (r >= 75) return 'text-blue-400 bg-blue-400/20';
    if (r >= 65) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-rose-400 bg-rose-400/20';
  };

  return (
    <div 
      onClick={onClick}
      className={`
        bg-gradient-to-br from-slate-800 to-slate-900 
        rounded-xl overflow-hidden shadow-lg
        hover:from-slate-700 hover:to-slate-800 
        transition-all cursor-pointer
        border border-slate-700/50
      `}
    >
      {/* Top accent bar */}
      <div className={`h-1 bg-gradient-to-r ${sportBg[sport]}`} />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-white font-bold text-lg">{player.name}</div>
            <div className="text-slate-400 text-sm">{player.position} • {player.team}</div>
          </div>
          <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getRatingColor(rating)}`}>
            {rating}
          </div>
        </div>
        
        {/* Stats */}
        <div className="space-y-2">
          <StatBar label="SHT" value={player.shooting} />
          <StatBar label="DEF" value={player.defense} />
          <StatBar label="REB" value={player.rebounding} />
          <StatBar label="BHL" value={player.ballHandling} />
          <StatBar label="PAS" value={player.passing} />
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value }) {
  const getBarColor = (v) => {
    if (v >= 85) return 'bg-emerald-500';
    if (v >= 75) return 'bg-blue-500';
    if (v >= 65) return 'bg-yellow-500';
    return 'bg-rose-500';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-500 text-xs w-8">{label}</span>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${getBarColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-slate-300 text-xs w-6 text-right">{value}</span>
    </div>
  );
}