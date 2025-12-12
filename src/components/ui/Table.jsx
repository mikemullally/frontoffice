import React from 'react';

export default function Table({ children, className = '' }) {
  return (
    <div className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg ${className}`}>
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-slate-800/50">
      <tr className="text-slate-400 text-sm uppercase tracking-wider">
        {children}
      </tr>
    </thead>
  );
}

export function TableHeaderCell({ children, align = 'left' }) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <th className={`py-4 px-4 font-semibold ${alignClass[align]}`}>
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-slate-700/50">{children}</tbody>;
}

export function TableRow({ children, highlight = false, onClick }) {
  return (
    <tr 
      onClick={onClick}
      className={`
        transition-colors
        ${highlight ? 'bg-yellow-500/10' : 'hover:bg-slate-700/30'}
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, align = 'left', highlight = false }) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <td className={`py-4 px-4 ${alignClass[align]} ${highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
      {children}
    </td>
  );
}