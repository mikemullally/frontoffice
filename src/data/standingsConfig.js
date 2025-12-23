// STANDINGS CONFIGURATION BY SPORT
// Defines how standings tables are displayed for each sport

export const standingsConfig = {
  basketball: {
    label: 'Standings',
    sortBy: 'winPct', // Primary sort field
    sortDirection: 'desc',
    columns: [
      { id: 'rank', label: '#', align: 'center', width: 'w-10' },
      { id: 'team', label: 'Team', align: 'left', width: 'flex-1' },
      { id: 'wins', label: 'W', align: 'center', width: 'w-12' },
      { id: 'losses', label: 'L', align: 'center', width: 'w-12' },
      { id: 'winPct', label: 'W%', align: 'center', width: 'w-16' },
      { id: 'pointsFor', label: 'Pts', align: 'center', width: 'w-14' },
      { id: 'pointsAgainst', label: 'PA', align: 'center', width: 'w-14' },
      { id: 'pointsPct', label: 'P%', align: 'center', width: 'w-16' },
      { id: 'gamesBehind', label: 'GB', align: 'center', width: 'w-14' },
      { id: 'streak', label: 'STRK', align: 'center', width: 'w-14' },
      { id: 'last10', label: 'L10', align: 'center', width: 'w-14' }
    ],
    calculations: {
      winPct: (team) => team.gamesPlayed > 0 ? (team.wins / team.gamesPlayed) : 0,
      pointsPct: (team) => {
        const total = team.pointsFor + team.pointsAgainst;
        return total > 0 ? (team.pointsFor / total) : 0;
      },
      gamesBehind: (team, leader) => {
        if (!leader || team.team === leader.team) return 0;
        // GB = ((Leader Wins - Team Wins) + (Team Losses - Leader Losses)) / 2
        const gb = ((leader.wins - team.wins) + (team.losses - leader.losses)) / 2;
        // Round to nearest 0.5
        return Math.round(gb * 2) / 2;
      }
    },
    formatters: {
      winPct: (value) => value.toFixed(3).replace('0.', '.'),
      pointsPct: (value) => value.toFixed(3).replace('0.', '.'),
      gamesBehind: (value) => {
        if (value === 0) return '-';
        // Show as whole number or .5
        return Number.isInteger(value) ? value.toString() : value.toFixed(1);
      },
      streak: (value) => {
        if (value === 0) return '-';
        return value > 0 ? `W${value}` : `L${Math.abs(value)}`;
      },
      last10: (value) => {
        if (!value || value.length === 0) return '-';
        const wins = value.filter(r => r === 'W').length;
        const losses = value.filter(r => r === 'L').length;
        return `${wins}-${losses}`;
      }
    },
    playoffLine: true // Show a line after playoff spots
  },

  soccer: {
    label: 'Table',
    sortBy: 'points',
    sortDirection: 'desc',
    tiebreakers: ['goalDifference', 'goalsFor'], // Secondary sort fields
    columns: [
      { id: 'rank', label: '#', align: 'center', width: 'w-10' },
      { id: 'team', label: 'Team', align: 'left', width: 'flex-1' },
      { id: 'gamesPlayed', label: 'Pl', align: 'center', width: 'w-12' },
      { id: 'wins', label: 'W', align: 'center', width: 'w-12' },
      { id: 'draws', label: 'D', align: 'center', width: 'w-12' },
      { id: 'losses', label: 'L', align: 'center', width: 'w-12' },
      { id: 'goalsFor', label: 'GF', align: 'center', width: 'w-14' },
      { id: 'goalsAgainst', label: 'GA', align: 'center', width: 'w-14' },
      { id: 'goalDifference', label: 'GD', align: 'center', width: 'w-14' },
      { id: 'points', label: 'Pts', align: 'center', width: 'w-14', highlight: true }
    ],
    calculations: {
      points: (team) => (team.wins * 3) + (team.draws || 0),
      goalDifference: (team) => team.pointsFor - team.pointsAgainst,
      goalsFor: (team) => team.pointsFor,
      goalsAgainst: (team) => team.pointsAgainst
    },
    formatters: {
      goalDifference: (value) => value > 0 ? `+${value}` : value.toString()
    },
    playoffLine: false,
    zones: [
      { positions: [1, 4], color: 'emerald', label: 'Champions League' },
      { positions: [5, 6], color: 'blue', label: 'Europa League' },
      { positions: [17, 20], color: 'red', label: 'Relegation' }
    ]
  },

  cricket: {
    label: 'Table',
    sortBy: 'points',
    sortDirection: 'desc',
    tiebreakers: ['netRunRate'],
    columns: [
      { id: 'rank', label: '#', align: 'center', width: 'w-10' },
      { id: 'team', label: 'Team', align: 'left', width: 'flex-1' },
      { id: 'gamesPlayed', label: 'M', align: 'center', width: 'w-12' },
      { id: 'wins', label: 'W', align: 'center', width: 'w-12' },
      { id: 'ties', label: 'T', align: 'center', width: 'w-12' },
      { id: 'losses', label: 'L', align: 'center', width: 'w-12' },
      { id: 'noResult', label: 'N/R', align: 'center', width: 'w-12' },
      { id: 'points', label: 'Pts', align: 'center', width: 'w-14', highlight: true },
      { id: 'netRunRate', label: 'NRR', align: 'center', width: 'w-16' }
    ],
    calculations: {
      points: (team) => (team.wins * 2) + (team.ties || 0) + (team.noResult || 0),
      netRunRate: (team) => {
        // NRR = (Total runs scored / Total overs faced) - (Total runs conceded / Total overs bowled)
        // Simplified version using points
        if (team.gamesPlayed === 0) return 0;
        const runsScored = team.pointsFor || 0;
        const runsConceded = team.pointsAgainst || 0;
        const oversEquivalent = team.gamesPlayed * 20; // Assuming T20
        return ((runsScored - runsConceded) / oversEquivalent);
      }
    },
    formatters: {
      netRunRate: (value) => {
        const formatted = value.toFixed(3);
        return value >= 0 ? `+${formatted}` : formatted;
      }
    },
    playoffLine: true
  }
};

/**
 * Get standings configuration for a sport
 */
export function getStandingsConfig(sport) {
  return standingsConfig[sport] || standingsConfig.basketball;
}

/**
 * Calculate derived standings values
 */
export function calculateStandingsValues(team, config, leader = null) {
  const calculated = { ...team };
  
  // Run all calculations
  if (config.calculations) {
    Object.entries(config.calculations).forEach(([key, fn]) => {
      if (key === 'gamesBehind') {
        calculated[key] = fn(team, leader);
      } else {
        calculated[key] = fn(team);
      }
    });
  }
  
  return calculated;
}

/**
 * Format a value for display
 */
export function formatStandingsValue(value, columnId, config) {
  if (value === null || value === undefined) return '-';
  
  // Check for custom formatter
  if (config.formatters && config.formatters[columnId]) {
    return config.formatters[columnId](value);
  }
  
  // Default formatting
  if (typeof value === 'number') {
    return Math.round(value).toString();
  }
  
  return value.toString();
}

/**
 * Sort standings based on config
 */
export function sortStandings(standings, config) {
  const standingsArray = Object.values(standings);
  
  return standingsArray.sort((a, b) => {
    // Calculate values for sorting
    const aCalc = calculateStandingsValues(a, config);
    const bCalc = calculateStandingsValues(b, config);
    
    // Primary sort
    const primaryA = aCalc[config.sortBy] || 0;
    const primaryB = bCalc[config.sortBy] || 0;
    
    if (primaryA !== primaryB) {
      return config.sortDirection === 'desc' ? primaryB - primaryA : primaryA - primaryB;
    }
    
    // Tiebreakers
    if (config.tiebreakers) {
      for (const tiebreaker of config.tiebreakers) {
        const tieA = aCalc[tiebreaker] || 0;
        const tieB = bCalc[tiebreaker] || 0;
        if (tieA !== tieB) {
          return tieB - tieA; // Always descending for tiebreakers
        }
      }
    }
    
    return 0;
  });
}

/**
 * Get the value to display in a cell
 */
export function getCellValue(team, columnId, config, leader = null) {
  const calculated = calculateStandingsValues(team, config, leader);
  
  // Handle special column IDs
  switch (columnId) {
    case 'rank':
      return null; // Rank is handled separately
    case 'team':
      return team.team;
    case 'gamesPlayed':
      return team.gamesPlayed || 0;
    case 'wins':
      return team.wins || 0;
    case 'losses':
      return team.losses || 0;
    case 'draws':
      return team.draws || 0;
    case 'ties':
      return team.ties || 0;
    case 'noResult':
      return team.noResult || 0;
    case 'pointsFor':
    case 'goalsFor':
      return team.pointsFor || 0;
    case 'pointsAgainst':
    case 'goalsAgainst':
      return team.pointsAgainst || 0;
    default:
      return calculated[columnId];
  }
}