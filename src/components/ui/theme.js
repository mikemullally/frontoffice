// FRONT OFFICE THEME
// Consistent design tokens across the app

export const colors = {
  // Backgrounds
  bgPrimary: '#0f172a',
  bgSecondary: '#1e293b',
  bgTertiary: '#334155',
  bgHover: '#475569',
  
  // Accents
  accent: '#3b82f6',
  accentHover: '#2563eb',
  
  // Status
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#f43f5e',
  
  // Text
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  
  // Sport accents
  basketball: '#f97316',
  soccer: '#22c55e',
  cricket: '#06b6d4'
};

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
  glow: (color) => `0 0 20px ${color}33`
};

export const gradients = {
  card: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  accent: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  danger: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
};

export const getSportColor = (sport) => {
  return colors[sport] || colors.accent;
};