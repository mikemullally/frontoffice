// COMPETITION MANAGER
// Manages leagues, tournaments, schedules, and standings

import { getSportConfig } from '../data/sportConfig';

export const COMPETITION_TYPES = {
  LEAGUE: 'league',
  TOURNAMENT: 'tournament',
  PLAYOFFS: 'playoffs'
};

export function createCompetition(name, sport, type, teams) {
  return {
    name,
    sport,
    type,
    teams: teams || [],
    schedule: [],
    standings: {},
    currentRound: 0,
    status: 'pending', // pending, active, completed
    champion: null
  };
}

export function addTeamToCompetition(competition, team) {
  if (competition.status !== 'pending') {
    return { success: false, error: 'Competition already started' };
  }

  if (competition.teams.find(t => t.name === team.name)) {
    return { success: false, error: 'Team already in competition' };
  }

  return {
    success: true,
    competition: {
      ...competition,
      teams: [...competition.teams, team]
    }
  };
}

export function generateSchedule(competition) {
  if (competition.teams.length < 2) {
    return { success: false, error: 'Need at least 2 teams' };
  }

  let schedule = [];

  if (competition.type === COMPETITION_TYPES.LEAGUE) {
    schedule = generateLeagueSchedule(competition.teams);
  } else if (competition.type === COMPETITION_TYPES.TOURNAMENT) {
    schedule = generateTournamentSchedule(competition.teams);
  } else if (competition.type === COMPETITION_TYPES.PLAYOFFS) {
    schedule = generatePlayoffSchedule(competition.teams);
  }

  // Initialize standings
  const standings = {};
  competition.teams.forEach(team => {
    standings[team.name] = {
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0
    };
  });

  return {
    success: true,
    competition: {
      ...competition,
      schedule,
      standings,
      status: 'active',
      currentRound: 1
    }
  };
}

// Round-robin: every team plays every other team
function generateLeagueSchedule(teams) {
  const schedule = [];
  let matchday = 1;

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      schedule.push({
        matchday,
        homeTeam: teams[i].name,
        awayTeam: teams[j].name,
        homeScore: null,
        awayScore: null,
        status: 'scheduled'
      });
      matchday++;
    }
  }

  return schedule;
}

// Single elimination bracket
function generateTournamentSchedule(teams) {
  const schedule = [];
  let round = 1;

  // First round matchups
  for (let i = 0; i < teams.length; i += 2) {
    if (teams[i + 1]) {
      schedule.push({
        round,
        homeTeam: teams[i].name,
        awayTeam: teams[i + 1].name,
        homeScore: null,
        awayScore: null,
        status: 'scheduled'
      });
    }
  }

  return schedule;
}

// Playoff bracket (seeded)
function generatePlayoffSchedule(teams) {
  // Sort by wins for seeding
  const seeded = [...teams].sort((a, b) => (b.wins || 0) - (a.wins || 0));
  return generateTournamentSchedule(seeded);
}

export function recordGameResult(competition, homeTeam, awayTeam, homeScore, awayScore) {
  const gameIndex = competition.schedule.findIndex(
    g => g.homeTeam === homeTeam && g.awayTeam === awayTeam && g.status === 'scheduled'
  );

  if (gameIndex === -1) {
    return { success: false, error: 'Game not found' };
  }

  const newSchedule = [...competition.schedule];
  newSchedule[gameIndex] = {
    ...newSchedule[gameIndex],
    homeScore,
    awayScore,
    status: 'completed'
  };

  // Update standings
  const newStandings = { ...competition.standings };
  
  if (homeScore > awayScore) {
    newStandings[homeTeam].wins++;
    newStandings[awayTeam].losses++;
  } else {
    newStandings[awayTeam].wins++;
    newStandings[homeTeam].losses++;
  }
  
  newStandings[homeTeam].pointsFor += homeScore;
  newStandings[homeTeam].pointsAgainst += awayScore;
  newStandings[awayTeam].pointsFor += awayScore;
  newStandings[awayTeam].pointsAgainst += homeScore;

  // Check if competition is complete
  const remainingGames = newSchedule.filter(g => g.status === 'scheduled');
  const isComplete = remainingGames.length === 0;

  let champion = null;
  if (isComplete) {
    // Find team with most wins
    champion = Object.entries(newStandings)
      .sort((a, b) => b[1].wins - a[1].wins)[0][0];
  }

  return {
    success: true,
    competition: {
      ...competition,
      schedule: newSchedule,
      standings: newStandings,
      status: isComplete ? 'completed' : 'active',
      champion
    }
  };
}

export function getStandings(competition) {
  return Object.entries(competition.standings)
    .map(([team, stats]) => ({
      team,
      ...stats,
      winPct: stats.wins + stats.losses > 0 
        ? (stats.wins / (stats.wins + stats.losses)).toFixed(3)
        : '.000'
    }))
    .sort((a, b) => b.wins - a.wins || a.losses - b.losses);
}

export function getNextGame(competition) {
  return competition.schedule.find(g => g.status === 'scheduled') || null;
}

export function getRemainingGames(competition) {
  return competition.schedule.filter(g => g.status === 'scheduled');
}

export function getCompletedGames(competition) {
  return competition.schedule.filter(g => g.status === 'completed');
}