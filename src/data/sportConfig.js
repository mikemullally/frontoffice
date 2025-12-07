// SPORT CONFIGURATION
// Shared settings that drive common components

export const sportConfig = {
  basketball: {
    name: 'Basketball',
    emoji: '🏀',
    positions: ['PG', 'SG', 'SF', 'PF', 'C'],
    rosterSize: 15,
    startersCount: 5,
    hasSalaryCap: true,
    defaultSalaryCap: 140000000,
    statCategories: ['shooting', 'defense', 'rebounding', 'ballHandling', 'passing'],
    gameTerms: {
      period: 'Quarter',
      periods: 4,
      score: 'Points'
    }
  },

  soccer: {
    name: 'Soccer',
    emoji: '⚽',
    positions: ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'],
    rosterSize: 25,
    startersCount: 11,
    hasSalaryCap: true,
    defaultSalaryCap: 200000000,
    statCategories: ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'],
    gameTerms: {
      period: 'Half',
      periods: 2,
      score: 'Goals'
    }
  },

  cricket: {
    name: 'Cricket',
    emoji: '🏏',
    positions: ['BAT', 'BOWL', 'ALL', 'WK'],
    rosterSize: 15,
    startersCount: 11,
    hasSalaryCap: false,
    defaultSalaryCap: null,
    statCategories: ['batting', 'bowling', 'fielding', 'experience'],
    gameTerms: {
      period: 'Innings',
      periods: 2,
      score: 'Runs'
    }
  }
};

export function getSportConfig(sport) {
  return sportConfig[sport] || null;
}

export function getPositionsForSport(sport) {
  return sportConfig[sport]?.positions || [];
}

export function getStatCategories(sport) {
  return sportConfig[sport]?.statCategories || [];
}