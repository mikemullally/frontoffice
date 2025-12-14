// SEASON STRUCTURE BY SPORT AND LEAGUE

export const seasonStructures = {
  // NBA Season Structure
  nba: {
    leagueId: 'nba',
    sport: 'basketball',
    phases: [
      {
        id: 'board_meeting',
        name: 'Board of Governors Meeting',
        type: 'event',
        month: 'August',
        weeks: 1,
        activities: ['proposals', 'lobbying', 'voting'],
        description: 'Annual meeting to discuss rule changes and league business'
      },
      {
        id: 'preseason',
        name: 'Pre-Season',
        type: 'games',
        month: 'October',
        weeks: 2,
        gamesPerTeam: 4,
        description: 'Exhibition games before the regular season'
      },
      {
        id: 'regular_season_1',
        name: 'Regular Season - 1st Half',
        type: 'games',
        month: 'October-December',
        weeks: 10,
        gamesPerTeam: 35,
        description: 'First half of the regular season'
      },
      {
        id: 'nba_cup',
        name: 'NBA Cup',
        type: 'tournament',
        month: 'December',
        weeks: 2,
        format: 'group_knockout',
        description: 'In-season tournament for the NBA Cup'
      },
      {
        id: 'all_star',
        name: 'All-Star Weekend',
        type: 'event',
        month: 'February',
        weeks: 1,
        activities: ['all_star_game', 'skills_challenge', 'three_point_contest', 'dunk_contest'],
        description: 'Mid-season showcase of the best players'
      },
      {
        id: 'regular_season_2',
        name: 'Regular Season - 2nd Half',
        type: 'games',
        month: 'January-April',
        weeks: 14,
        gamesPerTeam: 47,
        description: 'Second half of the regular season'
      },
      {
        id: 'play_in',
        name: 'Play-In Tournament',
        type: 'tournament',
        month: 'April',
        weeks: 1,
        format: 'play_in',
        description: 'Tournament for 7th-10th seeds to earn playoff spots'
      },
      {
        id: 'playoffs',
        name: 'NBA Playoffs',
        type: 'playoffs',
        month: 'April-June',
        weeks: 8,
        format: 'bracket',
        rounds: [
          { name: 'First Round', games: 7, teams: 16 },
          { name: 'Conference Semifinals', games: 7, teams: 8 },
          { name: 'Conference Finals', games: 7, teams: 4 },
          { name: 'NBA Finals', games: 7, teams: 2 }
        ],
        description: 'Championship tournament'
      },
      {
        id: 'free_agency',
        name: 'Free Agency',
        type: 'transaction',
        month: 'July',
        weeks: 2,
        activities: ['signings', 'trades', 'contract_negotiations'],
        description: 'Players can sign with new teams'
      },
      {
        id: 'draft',
        name: 'NBA Draft',
        type: 'event',
        month: 'June',
        weeks: 1,
        rounds: 2,
        description: 'Teams select new players from college and international prospects'
      },
      {
        id: 'summer_league',
        name: 'Summer League',
        type: 'games',
        month: 'July',
        weeks: 2,
        gamesPerTeam: 5,
        description: 'Showcase for rookies and young players'
      }
    ]
  },

  // EuroLeague Season Structure
  euroleague: {
    leagueId: 'euroleague',
    sport: 'basketball',
    phases: [
      {
        id: 'board_meeting',
        name: 'Board Meeting',
        type: 'event',
        month: 'August',
        weeks: 1,
        activities: ['proposals', 'voting'],
        description: 'Annual meeting for league business'
      },
      {
        id: 'regular_season',
        name: 'Regular Season',
        type: 'games',
        month: 'October-April',
        weeks: 28,
        gamesPerTeam: 34,
        description: 'Round-robin regular season'
      },
      {
        id: 'playoffs',
        name: 'Playoffs',
        type: 'playoffs',
        month: 'April-May',
        weeks: 4,
        format: 'bracket',
        rounds: [
          { name: 'Quarterfinals', games: 5, teams: 8 },
          { name: 'Final Four', games: 1, teams: 4 }
        ],
        description: 'Championship tournament'
      },
      {
        id: 'free_agency',
        name: 'Transfer Window',
        type: 'transaction',
        month: 'June-July',
        weeks: 4,
        activities: ['signings', 'transfers'],
        description: 'Player movement period'
      }
    ]
  },

  // Premier League Season Structure
  premier_league: {
    leagueId: 'premier_league',
    sport: 'soccer',
    phases: [
      {
        id: 'board_meeting',
        name: 'Owners Meeting',
        type: 'event',
        month: 'July',
        weeks: 1,
        activities: ['proposals', 'voting'],
        description: 'Annual meeting for league business'
      },
      {
        id: 'summer_transfer',
        name: 'Summer Transfer Window',
        type: 'transaction',
        month: 'July-August',
        weeks: 6,
        activities: ['signings', 'transfers', 'loans'],
        description: 'Main transfer period'
      },
      {
        id: 'regular_season_1',
        name: 'Season - 1st Half',
        type: 'games',
        month: 'August-December',
        weeks: 17,
        gamesPerTeam: 19,
        description: 'First half of the league season'
      },
      {
        id: 'winter_transfer',
        name: 'January Transfer Window',
        type: 'transaction',
        month: 'January',
        weeks: 4,
        activities: ['signings', 'transfers', 'loans'],
        description: 'Mid-season transfer period'
      },
      {
        id: 'regular_season_2',
        name: 'Season - 2nd Half',
        type: 'games',
        month: 'January-May',
        weeks: 21,
        gamesPerTeam: 19,
        description: 'Second half of the league season'
      }
    ]
  },

  // IPL Season Structure
  ipl: {
    leagueId: 'ipl',
    sport: 'cricket',
    phases: [
      {
        id: 'auction',
        name: 'IPL Auction',
        type: 'event',
        month: 'December',
        weeks: 1,
        activities: ['bidding', 'squad_building'],
        description: 'Annual player auction'
      },
      {
        id: 'board_meeting',
        name: 'Governing Council Meeting',
        type: 'event',
        month: 'February',
        weeks: 1,
        activities: ['proposals', 'voting', 'scheduling'],
        description: 'Pre-season meeting for rules and schedule'
      },
      {
        id: 'league_stage',
        name: 'League Stage',
        type: 'games',
        month: 'March-May',
        weeks: 7,
        gamesPerTeam: 14,
        description: 'Round-robin league phase'
      },
      {
        id: 'playoffs',
        name: 'Playoffs',
        type: 'playoffs',
        month: 'May',
        weeks: 2,
        format: 'ipl_playoffs',
        rounds: [
          { name: 'Qualifier 1', games: 1, teams: 2 },
          { name: 'Eliminator', games: 1, teams: 2 },
          { name: 'Qualifier 2', games: 1, teams: 2 },
          { name: 'Final', games: 1, teams: 2 }
        ],
        description: 'Knockout stage for top 4 teams'
      },
      {
        id: 'retention',
        name: 'Retention Window',
        type: 'transaction',
        month: 'November',
        weeks: 2,
        activities: ['retention', 'rtm'],
        description: 'Teams retain players before auction'
      }
    ]
  },

  // T20 World Cup Structure
  t20_world_cup: {
    leagueId: 't20_world_cup',
    sport: 'cricket',
    phases: [
      {
        id: 'squad_announcement',
        name: 'Squad Announcements',
        type: 'event',
        month: 'May',
        weeks: 1,
        activities: ['squad_selection'],
        description: 'Teams announce their squads'
      },
      {
        id: 'group_stage',
        name: 'Group Stage',
        type: 'games',
        month: 'June',
        weeks: 2,
        format: 'groups',
        gamesPerTeam: 4,
        description: 'Round-robin within groups'
      },
      {
        id: 'super_eight',
        name: 'Super Eight',
        type: 'games',
        month: 'June',
        weeks: 1,
        format: 'groups',
        gamesPerTeam: 3,
        description: 'Second group stage'
      },
      {
        id: 'knockouts',
        name: 'Knockout Stage',
        type: 'playoffs',
        month: 'June',
        weeks: 1,
        format: 'bracket',
        rounds: [
          { name: 'Semi-Finals', games: 1, teams: 4 },
          { name: 'Final', games: 1, teams: 2 }
        ],
        description: 'Semi-finals and final'
      }
    ]
  },

  // MLS Season Structure
  mls: {
    leagueId: 'mls',
    sport: 'soccer',
    phases: [
      {
        id: 'superdraft',
        name: 'SuperDraft',
        type: 'event',
        month: 'January',
        weeks: 1,
        rounds: 3,
        description: 'Annual college player draft'
      },
      {
        id: 'preseason',
        name: 'Pre-Season',
        type: 'games',
        month: 'February',
        weeks: 4,
        gamesPerTeam: 4,
        description: 'Exhibition games and training'
      },
      {
        id: 'regular_season',
        name: 'Regular Season',
        type: 'games',
        month: 'February-October',
        weeks: 34,
        gamesPerTeam: 34,
        description: 'League season'
      },
      {
        id: 'playoffs',
        name: 'MLS Cup Playoffs',
        type: 'playoffs',
        month: 'October-December',
        weeks: 6,
        format: 'bracket',
        rounds: [
          { name: 'Round One', games: 3, teams: 16 },
          { name: 'Conference Semifinals', games: 3, teams: 8 },
          { name: 'Conference Finals', games: 2, teams: 4 },
          { name: 'MLS Cup', games: 1, teams: 2 }
        ],
        description: 'Championship tournament'
      },
      {
        id: 'free_agency',
        name: 'Free Agency',
        type: 'transaction',
        month: 'November-December',
        weeks: 4,
        activities: ['signings', 're-entry_draft'],
        description: 'Player movement period'
      }
    ]
  }
};

// Default structure for leagues without specific definition
export const defaultStructures = {
  basketball: {
    phases: [
      { id: 'board_meeting', name: 'Board Meeting', type: 'event', weeks: 1 },
      { id: 'preseason', name: 'Pre-Season', type: 'games', weeks: 2 },
      { id: 'regular_season', name: 'Regular Season', type: 'games', weeks: 20 },
      { id: 'playoffs', name: 'Playoffs', type: 'playoffs', weeks: 4 },
      { id: 'free_agency', name: 'Free Agency', type: 'transaction', weeks: 2 }
    ]
  },
  soccer: {
    phases: [
      { id: 'board_meeting', name: 'Board Meeting', type: 'event', weeks: 1 },
      { id: 'transfer_window', name: 'Transfer Window', type: 'transaction', weeks: 4 },
      { id: 'regular_season', name: 'League Season', type: 'games', weeks: 34 },
      { id: 'playoffs', name: 'Playoffs', type: 'playoffs', weeks: 4 }
    ]
  },
  cricket: {
    phases: [
      { id: 'auction', name: 'Player Auction', type: 'event', weeks: 1 },
      { id: 'league_stage', name: 'League Stage', type: 'games', weeks: 6 },
      { id: 'playoffs', name: 'Playoffs', type: 'playoffs', weeks: 2 }
    ]
  }
};

export function getSeasonStructure(leagueId, sport) {
  // Check for specific league structure
  if (seasonStructures[leagueId]) {
    return seasonStructures[leagueId];
  }
  
  // Return default structure for the sport
  return {
    leagueId,
    sport,
    ...defaultStructures[sport]
  };
}

export function getPhaseById(leagueId, sport, phaseId) {
  const structure = getSeasonStructure(leagueId, sport);
  return structure.phases.find(p => p.id === phaseId) || null;
}

export function getNextPhase(leagueId, sport, currentPhaseId) {
  const structure = getSeasonStructure(leagueId, sport);
  const currentIndex = structure.phases.findIndex(p => p.id === currentPhaseId);
  
  if (currentIndex === -1 || currentIndex >= structure.phases.length - 1) {
    return null; // No next phase or at end of season
  }
  
  return structure.phases[currentIndex + 1];
}