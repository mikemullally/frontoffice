// TEAM MANAGER
// Manages roster, recruiting, financials, and competition entries

import { getSportConfig } from '../data/sportConfig';

export function createTeam(name, sport) {
  const config = getSportConfig(sport);
  
  return {
    name,
    sport,
    roster: [],
    budget: config.hasSalaryCap ? config.defaultSalaryCap : null,
    salaryUsed: 0,
    wins: 0,
    losses: 0,
    competitionsEntered: []
  };
}

export function addPlayer(team, player, salary) {
  const config = getSportConfig(team.sport);
  
  // Check salary cap if sport has one
  if (config.hasSalaryCap && team.salaryUsed + salary > team.budget) {
    return { success: false, error: 'Over salary cap' };
  }

  // Check roster size
  if (team.roster.length >= config.rosterSize) {
    return { success: false, error: 'Roster full' };
  }

  const playerWithContract = {
    ...player,
    salary: config.hasSalaryCap ? salary : 0,
    contractYears: 1
  };

  return {
    success: true,
    team: {
      ...team,
      roster: [...team.roster, playerWithContract],
      salaryUsed: team.salaryUsed + (config.hasSalaryCap ? salary : 0)
    }
  };
}

export function removePlayer(team, playerName) {
  const player = team.roster.find(p => p.name === playerName);
  if (!player) {
    return { success: false, error: 'Player not found' };
  }

  return {
    success: true,
    team: {
      ...team,
      roster: team.roster.filter(p => p.name !== playerName),
      salaryUsed: team.salaryUsed - (player.salary || 0)
    }
  };
}

export function setLineup(team, starterNames) {
  const config = getSportConfig(team.sport);
  
  if (starterNames.length !== config.startersCount) {
    return { success: false, error: `Need exactly ${config.startersCount} starters` };
  }

  const starters = starterNames.map(name => 
    team.roster.find(p => p.name === name)
  );

  if (starters.some(p => !p)) {
    return { success: false, error: 'Invalid player in lineup' };
  }

  return {
    success: true,
    lineup: starters
  };
}

export function getRosterValue(team) {
  const config = getSportConfig(team.sport);
  const stats = config.statCategories;
  
  return team.roster.reduce((sum, player) => {
    const avg = stats.reduce((s, stat) => s + (player[stat] || 0), 0) / stats.length;
    return sum + avg;
  }, 0);
}

export function getSalaryCap(team) {
  const config = getSportConfig(team.sport);
  
  if (!config.hasSalaryCap) {
    return null;
  }
  
  return {
    total: team.budget,
    used: team.salaryUsed,
    available: team.budget - team.salaryUsed
  };
}