// BASKETBALL GAME MANAGER
// Manages quarters, timeouts, substitutions, fatigue
import { basketballPossession } from './possessionEngine';

export function createGame(homeTeam, awayTeam, settings = {}) {
  return {
    homeTeam,
    awayTeam,
    settings: {
      quarterLength: settings.quarterLength || 12,
      quarters: settings.quarters || 4,
      ...settings
    },
    state: {
      quarter: 1,
      homeScore: 0,
      awayScore: 0,
      possession: 'home',
      log: []
    },
    stats: {
      home: createTeamStats(homeTeam),
      away: createTeamStats(awayTeam)
    },
    status: 'pending' // pending, active, completed
  };
}

function createTeamStats(team) {
  const playerStats = {};
  team.roster?.forEach(player => {
    playerStats[player.name] = {
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      fouls: 0,
      minutes: 0,
      fatigue: 0
    };
  });

  return {
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    players: playerStats
  };
}

export function startGame(game) {
  return {
    ...game,
    status: 'active',
    state: {
      ...game.state,
      log: [...game.state.log, { event: 'Game started', quarter: 1 }]
    }
  };
}

export function simulateGame(game) {
  let currentGame = startGame(game);

  // Simulate each quarter
  for (let q = 1; q <= currentGame.settings.quarters; q++) {
    currentGame = simulateQuarter(currentGame, q, basketballPossession);
  }

  currentGame = {
    ...currentGame,
    status: 'completed',
    state: {
      ...currentGame.state,
      log: [...currentGame.state.log, { 
        event: 'Game ended', 
        finalScore: `${currentGame.state.homeScore}-${currentGame.state.awayScore}` 
      }]
    }
  };

  return currentGame;
}

function simulateQuarter(game, quarterNumber, possessionEngine) {
  let currentGame = {
    ...game,
    state: {
      ...game.state,
      quarter: quarterNumber,
      log: [...game.state.log, { event: `Quarter ${quarterNumber} started` }]
    }
  };

  // Each quarter has ~24 possessions per team
  const possessionsPerTeam = 24;

  for (let i = 0; i < possessionsPerTeam; i++) {
    // Home possession
    currentGame = simulatePossession(currentGame, 'home', possessionEngine);
    
    // Away possession
    currentGame = simulatePossession(currentGame, 'away', possessionEngine);
  }

  currentGame = {
    ...currentGame,
    state: {
      ...currentGame.state,
      log: [...currentGame.state.log, { 
        event: `Quarter ${quarterNumber} ended`,
        score: `${currentGame.state.homeScore}-${currentGame.state.awayScore}`
      }]
    }
  };

  return currentGame;
}

function simulatePossession(game, teamSide, possessionEngine) {
  const offenseTeam = teamSide === 'home' ? game.homeTeam : game.awayTeam;
  const defenseTeam = teamSide === 'home' ? game.awayTeam : game.homeTeam;

  // Use possession engine if provided, otherwise simple random
  let result;
  if (possessionEngine) {
    result = possessionEngine(offenseTeam, defenseTeam);
  } else {
    result = simplePossession();
  }

  // Update scores
  const newState = { ...game.state };
  if (teamSide === 'home') {
    newState.homeScore += result.points;
  } else {
    newState.awayScore += result.points;
  }

  // Update stats
  const newStats = { ...game.stats };
  const teamStats = teamSide === 'home' ? 'home' : 'away';
  newStats[teamStats] = {
    ...newStats[teamStats],
    points: newStats[teamStats].points + result.points,
    rebounds: newStats[teamStats].rebounds + result.rebounds,
    assists: newStats[teamStats].assists + result.assists,
    turnovers: newStats[teamStats].turnovers + result.turnovers
  };

  return {
    ...game,
    state: newState,
    stats: newStats
  };
}

// Fallback simple possession (will be replaced by possession engine)
function simplePossession() {
  const rand = Math.random();
  
  if (rand < 0.15) {
    // Turnover
    return { points: 0, rebounds: 0, assists: 0, turnovers: 1 };
  } else if (rand < 0.55) {
    // Made shot
    const isThree = Math.random() < 0.3;
    return { 
      points: isThree ? 3 : 2, 
      rebounds: 0, 
      assists: Math.random() < 0.6 ? 1 : 0, 
      turnovers: 0 
    };
  } else {
    // Missed shot
    return { points: 0, rebounds: 1, assists: 0, turnovers: 0 };
  }
}

export function getGameSummary(game) {
  return {
    homeTeam: game.homeTeam.name,
    awayTeam: game.awayTeam.name,
    homeScore: game.state.homeScore,
    awayScore: game.state.awayScore,
    winner: game.state.homeScore > game.state.awayScore 
      ? game.homeTeam.name 
      : game.awayTeam.name,
    stats: game.stats,
    log: game.state.log
  };
}