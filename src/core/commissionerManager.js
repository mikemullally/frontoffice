// COMMISSIONER MANAGER
// Manages league creation, rules, teams, and revenue

import { getSportConfig } from '../data/sportConfig';

export function createLeague(name, sport) {
  const config = getSportConfig(sport);
  
  return {
    name,
    sport,
    teams: [],
    rules: {
      salaryCap: config.hasSalaryCap ? config.defaultSalaryCap : null,
      maxRosterSize: config.rosterSize,
      draftEnabled: true,
      playoffTeams: 8
    },
    season: null,
    revenue: {
      tvDeal: 0,
      sponsorships: 0,
      ticketSales: 0
    },
    reputation: 0
  };
}

export function addTeamToLeague(league, team) {
  if (league.teams.find(t => t.name === team.name)) {
    return { success: false, error: 'Team already in league' };
  }

  return {
    success: true,
    league: {
      ...league,
      teams: [...league.teams, team]
    }
  };
}

export function removeTeamFromLeague(league, teamName) {
  if (!league.teams.find(t => t.name === teamName)) {
    return { success: false, error: 'Team not found' };
  }

  return {
    success: true,
    league: {
      ...league,
      teams: league.teams.filter(t => t.name !== teamName)
    }
  };
}

export function updateLeagueRules(league, newRules) {
  return {
    ...league,
    rules: {
      ...league.rules,
      ...newRules
    }
  };
}

export function setTVDeal(league, amount) {
  return {
    ...league,
    revenue: {
      ...league.revenue,
      tvDeal: amount
    }
  };
}

export function getLeagueRevenue(league) {
  const { tvDeal, sponsorships, ticketSales } = league.revenue;
  return {
    total: tvDeal + sponsorships + ticketSales,
    perTeam: league.teams.length > 0 
      ? (tvDeal + sponsorships + ticketSales) / league.teams.length 
      : 0,
    breakdown: league.revenue
  };
}

export function canStartSeason(league) {
  const minTeams = 4;
  if (league.teams.length < minTeams) {
    return { canStart: false, error: `Need at least ${minTeams} teams` };
  }
  return { canStart: true };
}