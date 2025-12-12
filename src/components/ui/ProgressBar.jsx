import React from 'react';

export default function ProgressBar({ 
  value, 
  max = 100, 
  label = null,
  showValue = true,
  color = 'blue',
  size = 'md'
}) {
  const percentage = Math.min(100, (value / max) * 100);
  
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    red: 'bg-rose-500',
    orange: 'bg-orange-500',
    dynamic: percentage > 90 ? 'bg-rose-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-emerald-500'
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div>
      {(label || showValue) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="text-slate-400">{label}</span>}
          {showValue && (
            <span className="text-slate-300">
              {typeof value === 'number' && value > 1000 
                ? `$${(value / 1000000).toFixed(1)}M` 
                : value
              } / {typeof max === 'number' && max > 1000 
                ? `$${(max / 1000000).toFixed(1)}M` 
                : max
              }
            </span>
          )}
        </div>
      )}
      <div className={`bg-slate-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}