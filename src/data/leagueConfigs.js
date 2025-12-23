// LEAGUE CONFIGURATIONS
// Real-world season settings for each league

export const leagueConfigs = {
  // ============ BASKETBALL ============
  nba: {
    gamesPerTeam: 82,
    startDate: '2024-10-22',
    playoffTeams: 16,
    playoffRounds: 4,
    playoffGamesPerRound: 7,
    // Scheduling constraints
    minDaysBetweenGames: 1,    // At least 1 day rest
    maxGamesPerWeek: 4,        // Max 4 games per week per team
    targetGamesPerWeek: 3,     // Aim for ~3 games per week
    backToBackAllowed: true     // Can play consecutive days occasionally
  },
  euroleague: {
    gamesPerTeam: 34,
    startDate: '2024-10-03',
    playoffTeams: 8,
    playoffRounds: 3,
    playoffGamesPerRound: 5,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },
  cba: {
    gamesPerTeam: 52,
    startDate: '2024-10-19',
    playoffTeams: 12,
    playoffRounds: 4,
    playoffGamesPerRound: 5,
    minDaysBetweenGames: 1,
    maxGamesPerWeek: 3,
    targetGamesPerWeek: 2,
    backToBackAllowed: true
  },
  nbl: {
    gamesPerTeam: 28,
    startDate: '2024-09-19',
    playoffTeams: 6,
    playoffRounds: 3,
    playoffGamesPerRound: 5,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },

  // ============ SOCCER ============
  premier_league: {
    gamesPerTeam: 38,
    startDate: '2024-08-16',
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,    // At least 3 days between games
    maxGamesPerWeek: 2,        // Max 2 games (weekend + midweek)
    targetGamesPerWeek: 1,     // Usually just 1 per week
    backToBackAllowed: false,
    preferredDays: [0, 6]       // Sunday, Saturday
  },
  la_liga: {
    gamesPerTeam: 38,
    startDate: '2024-08-15',
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false,
    preferredDays: [0, 6]
  },
  bundesliga: {
    gamesPerTeam: 34,
    startDate: '2024-08-23',
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false,
    preferredDays: [5, 6]       // Friday, Saturday
  },
  serie_a: {
    gamesPerTeam: 38,
    startDate: '2024-08-17',
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false,
    preferredDays: [0, 6]
  },
  ligue_1: {
    gamesPerTeam: 34,
    startDate: '2024-08-16',
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false,
    preferredDays: [0, 6]
  },
  brasileirao: {
    gamesPerTeam: 38,
    startDate: '2024-04-13',
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false,
    preferredDays: [0, 3, 6]    // Sun, Wed, Sat
  },
  mls: {
    gamesPerTeam: 34,
    startDate: '2024-02-21',
    playoffTeams: 16,
    playoffRounds: 4,
    playoffGamesPerRound: 1,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false,
    preferredDays: [0, 6]
  },

  // ============ CRICKET ============
  ipl: {
    gamesPerTeam: 14,
    startDate: '2025-03-21',
    playoffTeams: 4,
    playoffRounds: 3,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1.5,
    backToBackAllowed: false
  },
  bbl: {
    gamesPerTeam: 10,
    startDate: '2024-12-15',
    playoffTeams: 5,
    playoffRounds: 3,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1.5,
    backToBackAllowed: false
  },
  psl: {
    gamesPerTeam: 10,
    startDate: '2025-04-08',
    playoffTeams: 4,
    playoffRounds: 3,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },
  cpl: {
    gamesPerTeam: 10,
    startDate: '2025-08-14',
    playoffTeams: 4,
    playoffRounds: 3,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1.5,
    backToBackAllowed: false
  },
  the_hundred: {
    gamesPerTeam: 8,
    startDate: '2025-07-23',
    playoffTeams: 4,
    playoffRounds: 2,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1.5,
    backToBackAllowed: false
  },
  sa20: {
    gamesPerTeam: 10,
    startDate: '2025-01-09',
    playoffTeams: 4,
    playoffRounds: 3,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1.5,
    backToBackAllowed: false
  },
  icc_world_cup: {
    gamesPerTeam: 9,
    startDate: '2027-10-01',
    playoffTeams: 4,
    playoffRounds: 2,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },
  t20_world_cup: {
    gamesPerTeam: 5,
    startDate: '2026-06-01',
    playoffTeams: 4,
    playoffRounds: 2,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },
  champions_trophy: {
    gamesPerTeam: 4,
    startDate: '2025-02-19',
    playoffTeams: 4,
    playoffRounds: 2,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 1,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },
  wtc: {
    gamesPerTeam: 6,
    startDate: '2025-06-01',
    playoffTeams: 2,
    playoffRounds: 1,
    playoffGamesPerRound: 1,
    minDaysBetweenGames: 5,
    maxGamesPerWeek: 1,
    targetGamesPerWeek: 0.5,
    backToBackAllowed: false
  }
};

// Default configs by sport
export const defaultConfigs = {
  basketball: {
    gamesPerTeam: 30,
    playoffTeams: 8,
    playoffRounds: 3,
    playoffGamesPerRound: 5,
    allowDraws: false,
    minDaysBetweenGames: 1,
    maxGamesPerWeek: 3,
    targetGamesPerWeek: 2,
    backToBackAllowed: true
  },
  soccer: {
    gamesPerTeam: 30,
    playoffTeams: 0,
    playoffRounds: 0,
    playoffGamesPerRound: 0,
    allowDraws: true,
    minDaysBetweenGames: 3,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  },
  cricket: {
    gamesPerTeam: 10,
    playoffTeams: 4,
    playoffRounds: 2,
    playoffGamesPerRound: 1,
    allowDraws: false,
    minDaysBetweenGames: 2,
    maxGamesPerWeek: 2,
    targetGamesPerWeek: 1,
    backToBackAllowed: false
  }
};

export function getLeagueConfig(leagueId, sport) {
  if (leagueConfigs[leagueId]) {
    return {
      ...defaultConfigs[sport],
      ...leagueConfigs[leagueId]
    };
  }
  
  return {
    ...defaultConfigs[sport],
    startDate: new Date().toISOString().split('T')[0]
  };
}