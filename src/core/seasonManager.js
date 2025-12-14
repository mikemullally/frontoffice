// SEASON MANAGER
// Controls the flow of a season through phases and weeks

import { getSeasonStructure, getNextPhase } from '../data/seasonStructure';

export function createSeason(league) {
  const structure = getSeasonStructure(league.id, league.sport);
  
  return {
    leagueId: league.id,
    leagueName: league.name,
    sport: league.sport,
    year: new Date().getFullYear(),
    structure,
    currentPhaseIndex: 0,
    currentWeek: 1,
    status: 'not_started', // not_started, active, completed
    phases: structure.phases.map(phase => ({
      ...phase,
      status: 'pending', // pending, active, completed
      results: {},
      currentWeek: 0
    })),
    history: [],
    champion: null
  };
}

export function startSeason(season) {
  if (season.status !== 'not_started') {
    return { success: false, error: 'Season already started' };
  }
  
  const updatedSeason = {
    ...season,
    status: 'active',
    phases: season.phases.map((phase, index) => ({
      ...phase,
      status: index === 0 ? 'active' : 'pending',
      currentWeek: index === 0 ? 1 : 0
    }))
  };
  
  return { 
    success: true, 
    season: updatedSeason,
    currentPhase: updatedSeason.phases[0]
  };
}

export function getCurrentPhase(season) {
  return season.phases[season.currentPhaseIndex] || null;
}

export function advanceWeek(season) {
  const currentPhase = getCurrentPhase(season);
  
  if (!currentPhase || season.status !== 'active') {
    return { success: false, error: 'Cannot advance week' };
  }
  
  const newWeek = currentPhase.currentWeek + 1;
  
  // Check if phase is complete
  if (newWeek > currentPhase.weeks) {
    return advancePhase(season);
  }
  
  // Update the week within current phase
  const updatedPhases = [...season.phases];
  updatedPhases[season.currentPhaseIndex] = {
    ...currentPhase,
    currentWeek: newWeek
  };
  
  return {
    success: true,
    season: {
      ...season,
      currentWeek: season.currentWeek + 1,
      phases: updatedPhases
    },
    currentPhase: updatedPhases[season.currentPhaseIndex],
    phaseChanged: false
  };
}

export function advancePhase(season) {
  const currentPhase = getCurrentPhase(season);
  
  if (!currentPhase) {
    return { success: false, error: 'No current phase' };
  }
  
  const nextPhaseIndex = season.currentPhaseIndex + 1;
  
  // Check if season is complete
  if (nextPhaseIndex >= season.phases.length) {
    return completeSeason(season);
  }
  
  // Mark current phase as complete, next phase as active
  const updatedPhases = season.phases.map((phase, index) => {
    if (index === season.currentPhaseIndex) {
      return { ...phase, status: 'completed' };
    }
    if (index === nextPhaseIndex) {
      return { ...phase, status: 'active', currentWeek: 1 };
    }
    return phase;
  });
  
  const updatedSeason = {
    ...season,
    currentPhaseIndex: nextPhaseIndex,
    phases: updatedPhases,
    history: [
      ...season.history,
      {
        phaseId: currentPhase.id,
        phaseName: currentPhase.name,
        completedAt: new Date().toISOString()
      }
    ]
  };
  
  return {
    success: true,
    season: updatedSeason,
    currentPhase: updatedPhases[nextPhaseIndex],
    phaseChanged: true,
    previousPhase: currentPhase
  };
}

export function completeSeason(season) {
  const updatedPhases = season.phases.map(phase => ({
    ...phase,
    status: 'completed'
  }));
  
  return {
    success: true,
    season: {
      ...season,
      status: 'completed',
      phases: updatedPhases
    },
    seasonComplete: true
  };
}

export function getSeasonProgress(season) {
  const totalWeeks = season.phases.reduce((sum, p) => sum + p.weeks, 0);
  const completedWeeks = season.phases.reduce((sum, p, index) => {
    if (index < season.currentPhaseIndex) {
      return sum + p.weeks;
    }
    if (index === season.currentPhaseIndex) {
      return sum + (p.currentWeek - 1);
    }
    return sum;
  }, 0);
  
  return {
    totalPhases: season.phases.length,
    completedPhases: season.currentPhaseIndex,
    currentPhase: season.currentPhaseIndex + 1,
    totalWeeks,
    completedWeeks,
    percentComplete: Math.round((completedWeeks / totalWeeks) * 100)
  };
}

export function getPhaseActivities(phase) {
  switch (phase.type) {
    case 'event':
      return phase.activities || [];
    case 'games':
      return ['schedule', 'simulate', 'standings'];
    case 'playoffs':
      return ['bracket', 'simulate', 'results'];
    case 'tournament':
      return ['groups', 'simulate', 'bracket'];
    case 'transaction':
      return phase.activities || ['signings', 'trades'];
    default:
      return [];
  }
}