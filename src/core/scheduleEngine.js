// SCHEDULE ENGINE
// Creates balanced schedules and manages calendar-based simulation

/**
 * Creates a full season schedule for a league
 */
export function createSeasonSchedule(teams, config) {
  const {
    gamesPerTeam = 82,
    startDate = '2024-10-22',
    playoffTeams = 16,
    playoffRounds = 4,
    playoffGamesPerRound = 7,
    minDaysBetweenGames = 1,
    maxGamesPerWeek = 4,
    targetGamesPerWeek = 3,
    backToBackAllowed = true
  } = config;

  // Generate all matchups needed
  const matchups = generateMatchups(teams, gamesPerTeam);
  
  // Distribute games across calendar with constraints
  const calendar = distributeGamesToCalendar(matchups, teams, {
    startDate,
    minDaysBetweenGames,
    maxGamesPerWeek,
    targetGamesPerWeek,
    backToBackAllowed
  });
  
  // Initialize standings
  const standings = initializeStandings(teams);

  return {
    teams,
    calendar,
    standings,
    currentDate: startDate,
    currentDayIndex: 0,
    phase: 'regular',
    config: {
      gamesPerTeam,
      playoffTeams,
      playoffRounds,
      playoffGamesPerRound
    },
    playoffs: null,
    champion: null
  };
}

/**
 * Generates all matchups for a season
 */
/**
 * Generates all matchups for a season ensuring equal games per team
 */
function generateMatchups(teams, gamesPerTeam) {
  const matchups = [];
  const teamCount = teams.length;
  
  // For a round-robin, each team plays every other team
  // We need to figure out how many times each pair plays
  const gamesPerTeamPerOpponent = gamesPerTeam / (teamCount - 1);
  
  // If it doesn't divide evenly, we need to handle it carefully
  const baseGamesPerPair = Math.floor(gamesPerTeamPerOpponent);
  const extraGamesNeeded = gamesPerTeam - (baseGamesPerPair * (teamCount - 1));
  
  // Track games per team to ensure balance
  const teamGameCount = {};
  teams.forEach(t => teamGameCount[t.name] = 0);
  
  // Generate base matchups (each pair plays baseGamesPerPair times)
  for (let round = 0; round < baseGamesPerPair; round++) {
    for (let i = 0; i < teamCount; i++) {
      for (let j = i + 1; j < teamCount; j++) {
        // Alternate home/away each round
        if (round % 2 === 0) {
          matchups.push({ home: teams[i], away: teams[j] });
        } else {
          matchups.push({ home: teams[j], away: teams[i] });
        }
        teamGameCount[teams[i].name]++;
        teamGameCount[teams[j].name]++;
      }
    }
  }
  
  // Add extra games if needed to reach exact gamesPerTeam
  // This distributes extra games as evenly as possible
  if (extraGamesNeeded > 0) {
    const pairs = [];
    for (let i = 0; i < teamCount; i++) {
      for (let j = i + 1; j < teamCount; j++) {
        pairs.push([i, j]);
      }
    }
    
    // Shuffle pairs and add games until all teams have enough
    const shuffledPairs = shuffleArray(pairs);
    let pairIndex = 0;
    
    while (Object.values(teamGameCount).some(count => count < gamesPerTeam)) {
      const [i, j] = shuffledPairs[pairIndex % shuffledPairs.length];
      
      // Only add if both teams need more games
      if (teamGameCount[teams[i].name] < gamesPerTeam && 
          teamGameCount[teams[j].name] < gamesPerTeam) {
        // Alternate home/away
        if (Math.random() > 0.5) {
          matchups.push({ home: teams[i], away: teams[j] });
        } else {
          matchups.push({ home: teams[j], away: teams[i] });
        }
        teamGameCount[teams[i].name]++;
        teamGameCount[teams[j].name]++;
      }
      
      pairIndex++;
      
      // Safety check
      if (pairIndex > shuffledPairs.length * 10) {
        console.warn('Could not balance schedule perfectly');
        break;
      }
    }
  }
  
  // Verify all teams have equal games
  const gameCounts = Object.values(teamGameCount);
  const allEqual = gameCounts.every(c => c === gameCounts[0]);
  if (!allEqual) {
    console.warn('Schedule not perfectly balanced:', teamGameCount);
  }
  
  return shuffleArray(matchups);
}

/**
 * Distributes games across a calendar with realistic constraints
 * Ensures all teams end with equal games played
 */
function distributeGamesToCalendar(matchups, teams, options) {
  const {
    startDate,
    minDaysBetweenGames,
    maxGamesPerWeek,
    backToBackAllowed
  } = options;

  const calendar = [];
  const teamLastPlayed = {};
  const teamGamesThisWeek = {};
  const teamTotalGames = {};
  
  teams.forEach(team => {
    teamLastPlayed[team.name] = -minDaysBetweenGames - 1;
    teamGamesThisWeek[team.name] = 0;
    teamTotalGames[team.name] = 0;
  });
  
  const remainingMatchups = [...matchups];
  let currentDay = 0;
  let currentWeek = 0;
  
  const maxGamesPerDay = Math.floor(teams.length / 2);

  while (remainingMatchups.length > 0) {
    const dayGames = [];
    const teamsPlayingToday = new Set();
    
    // Check for new week
    const newWeek = Math.floor(currentDay / 7);
    if (newWeek > currentWeek) {
      currentWeek = newWeek;
      teams.forEach(team => {
        teamGamesThisWeek[team.name] = 0;
      });
    }
    
    // Calculate target games - prioritize teams with fewer games
    const avgGames = Object.values(teamTotalGames).reduce((a, b) => a + b, 0) / teams.length;
    
    // Sort matchups to prioritize teams that are behind
    remainingMatchups.sort((a, b) => {
      const aMinGames = Math.min(teamTotalGames[a.home.name], teamTotalGames[a.away.name]);
      const bMinGames = Math.min(teamTotalGames[b.home.name], teamTotalGames[b.away.name]);
      return aMinGames - bMinGames; // Prioritize matchups with teams that have fewer games
    });
    
    // Find games for this day
    for (let i = 0; i < remainingMatchups.length && dayGames.length < maxGamesPerDay; i++) {
      const matchup = remainingMatchups[i];
      const homeTeam = matchup.home.name;
      const awayTeam = matchup.away.name;
      
      // Check rest days
      const daysSinceHomePlayed = currentDay - teamLastPlayed[homeTeam];
      const daysSinceAwayPlayed = currentDay - teamLastPlayed[awayTeam];
      
      const minRest = backToBackAllowed ? 1 : minDaysBetweenGames;
      const homeRested = daysSinceHomePlayed >= minRest;
      const awayRested = daysSinceAwayPlayed >= minRest;
      
      // Check not already playing today
      const homeAvailable = !teamsPlayingToday.has(homeTeam);
      const awayAvailable = !teamsPlayingToday.has(awayTeam);
      
      // Check weekly limits
      const homeUnderWeeklyLimit = teamGamesThisWeek[homeTeam] < maxGamesPerWeek;
      const awayUnderWeeklyLimit = teamGamesThisWeek[awayTeam] < maxGamesPerWeek;
      
      if (homeRested && awayRested && 
          homeAvailable && awayAvailable && 
          homeUnderWeeklyLimit && awayUnderWeeklyLimit) {
        
        dayGames.push({
          home: matchup.home,
          away: matchup.away,
          homeScore: null,
          awayScore: null,
          played: false
        });
        
        teamsPlayingToday.add(homeTeam);
        teamsPlayingToday.add(awayTeam);
        teamLastPlayed[homeTeam] = currentDay;
        teamLastPlayed[awayTeam] = currentDay;
        teamGamesThisWeek[homeTeam]++;
        teamGamesThisWeek[awayTeam]++;
        teamTotalGames[homeTeam]++;
        teamTotalGames[awayTeam]++;
        
        remainingMatchups.splice(i, 1);
        i--; // Adjust index since we removed an element
      }
    }
    
    // Add day to calendar if it has games
    if (dayGames.length > 0) {
      calendar.push({
        date: addDays(startDate, currentDay),
        dayIndex: currentDay,
        games: dayGames
      });
    }
    
    currentDay++;
    
    // Safety check
    if (currentDay > 600) {
      console.warn('Schedule generation exceeded 600 days');
      console.warn('Remaining matchups:', remainingMatchups.length);
      console.warn('Team games:', teamTotalGames);
      break;
    }
  }
  
  // Log final game counts for verification
  console.log('Final team game counts:', teamTotalGames);
  
  return calendar;
}

/**
 * Initialize standings for all teams
 */
function initializeStandings(teams) {
  const standings = {};
  teams.forEach(team => {
    standings[team.name] = {
      team: team.name,
      code: team.code,
      rating: team.rating,
      wins: 0,
      losses: 0,
      draws: 0,
      ties: 0,
      noResult: 0,
      gamesPlayed: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      streak: 0,
      last10: []
    };
  });
  return standings;
}

/**
 * Simulate all games for the current day
 */
export function simulateDay(schedule, simulateGame) {
  const day = schedule.calendar[schedule.currentDayIndex];
  
  if (!day) {
    if (schedule.phase === 'regular') {
      return startPlayoffs(schedule);
    }
    return { success: false, error: 'No more games', schedule };
  }
  
  const updatedGames = day.games.map(game => {
    if (game.played) return game;
    
    const result = simulateGame(game.home, game.away);
    return {
      ...game,
      homeScore: result.homeScore,
      awayScore: result.awayScore,
      played: true
    };
  });
  
  const updatedStandings = { ...schedule.standings };
  updatedGames.forEach(game => {
    if (!game.played) return;
    
    const homeWon = game.homeScore > game.awayScore;
    const awayWon = game.awayScore > game.homeScore;
    const isDraw = game.homeScore === game.awayScore;
    const homeName = game.home.name;
    const awayName = game.away.name;
    
    // Update home team
    updatedStandings[homeName] = {
      ...updatedStandings[homeName],
      wins: updatedStandings[homeName].wins + (homeWon ? 1 : 0),
      losses: updatedStandings[homeName].losses + (awayWon ? 1 : 0),
      draws: updatedStandings[homeName].draws + (isDraw ? 1 : 0),
      gamesPlayed: updatedStandings[homeName].gamesPlayed + 1,
      pointsFor: updatedStandings[homeName].pointsFor + game.homeScore,
      pointsAgainst: updatedStandings[homeName].pointsAgainst + game.awayScore,
      streak: homeWon 
        ? Math.max(1, updatedStandings[homeName].streak + 1)
        : isDraw 
          ? 0
          : Math.min(-1, updatedStandings[homeName].streak - 1),
      last10: [...updatedStandings[homeName].last10, homeWon ? 'W' : isDraw ? 'D' : 'L'].slice(-10)
    };
    
    // Update away team
    updatedStandings[awayName] = {
      ...updatedStandings[awayName],
      wins: updatedStandings[awayName].wins + (awayWon ? 1 : 0),
      losses: updatedStandings[awayName].losses + (homeWon ? 1 : 0),
      draws: updatedStandings[awayName].draws + (isDraw ? 1 : 0),
      gamesPlayed: updatedStandings[awayName].gamesPlayed + 1,
      pointsFor: updatedStandings[awayName].pointsFor + game.awayScore,
      pointsAgainst: updatedStandings[awayName].pointsAgainst + game.homeScore,
      streak: awayWon 
        ? Math.max(1, updatedStandings[awayName].streak + 1)
        : isDraw 
          ? 0
          : Math.min(-1, updatedStandings[awayName].streak - 1),
      last10: [...updatedStandings[awayName].last10, awayWon ? 'W' : isDraw ? 'D' : 'L'].slice(-10)
    };
  });
  
  const updatedCalendar = [...schedule.calendar];
  updatedCalendar[schedule.currentDayIndex] = {
    ...day,
    games: updatedGames
  };
  
  return {
    success: true,
    schedule: {
      ...schedule,
      calendar: updatedCalendar,
      standings: updatedStandings,
      currentDayIndex: schedule.currentDayIndex + 1,
      currentDate: schedule.calendar[schedule.currentDayIndex + 1]?.date || day.date
    },
    gamesPlayed: updatedGames,
    day: day.date
  };
}

/**
 * Simulate multiple days at once
 */
export function simulateDays(schedule, simulateGame, numDays) {
  let currentSchedule = schedule;
  const results = [];
  
  for (let i = 0; i < numDays; i++) {
    const result = simulateDay(currentSchedule, simulateGame);
    if (!result.success) break;
    
    currentSchedule = result.schedule;
    results.push(result);
  }
  
  return {
    success: true,
    schedule: currentSchedule,
    daysSimulated: results.length,
    results
  };
}

/**
 * Simulate until end of regular season
 */
export function simulateRegularSeason(schedule, simulateGame) {
  let currentSchedule = schedule;
  
  while (currentSchedule.phase === 'regular' && 
         currentSchedule.currentDayIndex < currentSchedule.calendar.length) {
    const result = simulateDay(currentSchedule, simulateGame);
    if (!result.success) break;
    currentSchedule = result.schedule;
  }
  
  return startPlayoffs(currentSchedule);
}

/**
 * Start playoffs after regular season
 */
function startPlayoffs(schedule) {
  if (schedule.config.playoffTeams === 0) {
    // No playoffs (e.g., soccer leagues) - season is complete
    const sortedTeams = getSortedStandings(schedule.standings);
    return {
      success: true,
      schedule: {
        ...schedule,
        phase: 'complete',
        champion: sortedTeams[0]
      }
    };
  }

  const sortedTeams = getSortedStandings(schedule.standings);
  const playoffTeams = sortedTeams.slice(0, schedule.config.playoffTeams);
  
  const firstRound = [];
  for (let i = 0; i < playoffTeams.length / 2; i++) {
    firstRound.push({
      higher: playoffTeams[i],
      lower: playoffTeams[playoffTeams.length - 1 - i],
      higherWins: 0,
      lowerWins: 0,
      games: [],
      winner: null
    });
  }
  
  return {
    success: true,
    schedule: {
      ...schedule,
      phase: 'playoffs',
      playoffs: {
        rounds: [firstRound],
        currentRound: 0,
        winsNeeded: Math.ceil(schedule.config.playoffGamesPerRound / 2)
      }
    }
  };
}

/**
 * Simulate a playoff game
 */
export function simulatePlayoffGame(schedule, seriesIndex, simulateGame) {
  const playoffs = schedule.playoffs;
  const currentRound = playoffs.rounds[playoffs.currentRound];
  const series = currentRound[seriesIndex];
  
  if (series.winner) {
    return { success: false, error: 'Series already complete' };
  }
  
  const gamesPlayed = series.higherWins + series.lowerWins;
  const higherHome = [0, 1, 4, 6].includes(gamesPlayed);
  
  const home = higherHome ? series.higher : series.lower;
  const away = higherHome ? series.lower : series.higher;
  
  const result = simulateGame(
    { name: home.team, rating: home.rating },
    { name: away.team, rating: away.rating }
  );
  
  const homeWon = result.homeScore > result.awayScore;
  const higherWon = higherHome ? homeWon : !homeWon;
  
  const updatedSeries = {
    ...series,
    higherWins: series.higherWins + (higherWon ? 1 : 0),
    lowerWins: series.lowerWins + (higherWon ? 0 : 1),
    games: [...series.games, {
      home: home.team,
      away: away.team,
      homeScore: result.homeScore,
      awayScore: result.awayScore
    }]
  };
  
  if (updatedSeries.higherWins >= playoffs.winsNeeded) {
    updatedSeries.winner = series.higher;
  } else if (updatedSeries.lowerWins >= playoffs.winsNeeded) {
    updatedSeries.winner = series.lower;
  }
  
  const updatedRound = [...currentRound];
  updatedRound[seriesIndex] = updatedSeries;
  
  const updatedRounds = [...playoffs.rounds];
  updatedRounds[playoffs.currentRound] = updatedRound;
  
  return {
    success: true,
    schedule: {
      ...schedule,
      playoffs: {
        ...playoffs,
        rounds: updatedRounds
      }
    },
    series: updatedSeries,
    game: {
      home: home.team,
      away: away.team,
      homeScore: result.homeScore,
      awayScore: result.awayScore,
      higherWon
    }
  };
}

/**
 * Advance to next playoff round if current round is complete
 */
export function advancePlayoffRound(schedule) {
  const playoffs = schedule.playoffs;
  const currentRound = playoffs.rounds[playoffs.currentRound];
  
  const allComplete = currentRound.every(series => series.winner);
  if (!allComplete) {
    return { success: false, error: 'Round not complete' };
  }
  
  const winners = currentRound.map(series => series.winner);
  
  if (winners.length === 1) {
    return {
      success: true,
      schedule: {
        ...schedule,
        champion: winners[0],
        phase: 'complete'
      },
      champion: winners[0]
    };
  }
  
  const nextRound = [];
  for (let i = 0; i < winners.length / 2; i++) {
    nextRound.push({
      higher: winners[i],
      lower: winners[winners.length - 1 - i],
      higherWins: 0,
      lowerWins: 0,
      games: [],
      winner: null
    });
  }
  
  return {
    success: true,
    schedule: {
      ...schedule,
      playoffs: {
        ...playoffs,
        rounds: [...playoffs.rounds, nextRound],
        currentRound: playoffs.currentRound + 1
      }
    }
  };
}

/**
 * Get sorted standings
 */
export function getSortedStandings(standings) {
  return Object.values(standings).sort((a, b) => {
    const aWinPct = a.gamesPlayed > 0 ? a.wins / a.gamesPlayed : 0;
    const bWinPct = b.gamesPlayed > 0 ? b.wins / b.gamesPlayed : 0;
    if (bWinPct !== aWinPct) return bWinPct - aWinPct;
    
    const aDiff = a.pointsFor - a.pointsAgainst;
    const bDiff = b.pointsFor - b.pointsAgainst;
    return bDiff - aDiff;
  });
}

/**
 * Get season progress info
 */
export function getSeasonProgress(schedule) {
  const totalRegularSeasonDays = schedule.calendar.length;
  const daysCompleted = schedule.currentDayIndex;
  
  const totalGames = schedule.calendar.reduce((sum, day) => sum + day.games.length, 0);
  const gamesCompleted = schedule.calendar
    .slice(0, schedule.currentDayIndex)
    .reduce((sum, day) => sum + day.games.filter(g => g.played).length, 0);
  
  return {
    phase: schedule.phase,
    totalDays: totalRegularSeasonDays,
    daysCompleted,
    daysRemaining: totalRegularSeasonDays - daysCompleted,
    totalGames,
    gamesCompleted,
    percentComplete: Math.round((gamesCompleted / totalGames) * 100)
  };
}

// Helper functions
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}