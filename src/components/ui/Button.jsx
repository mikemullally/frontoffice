import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon = null
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/25',
    danger: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/25',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    ghost: 'bg-transparent hover:bg-slate-700/50 text-slate-300 hover:text-white'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-lg font-semibold
        transition-all duration-200
        flex items-center justify-center gap-2
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}