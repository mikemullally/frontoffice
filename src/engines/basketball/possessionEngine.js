// BASKETBALL POSSESSION ENGINE
// Determines possession outcomes based on player ratings

export function simulatePossession(offenseTeam, defenseTeam, context = {}) {
  const offenseRatings = getTeamRatings(offenseTeam);
  const defenseRatings = getTeamRatings(defenseTeam);

  const result = {
    points: 0,
    rebounds: 0,
    assists: 0,
    turnovers: 0,
    steals: 0,
    blocks: 0,
    shooter: null,
    assister: null,
    rebounder: null
  };

  // Step 1: Check for turnover
  const turnoverChance = calculateTurnoverChance(offenseRatings, defenseRatings);
  if (Math.random() * 100 < turnoverChance) {
    result.turnovers = 1;
    result.steals = 1;
    return result;
  }

  // Step 2: Determine shot type
  const shotType = determineShotType(offenseRatings);

  // Step 3: Calculate shot success
  const shotChance = calculateShotChance(offenseRatings, defenseRatings, shotType);
  const shotMade = Math.random() * 100 < shotChance;

  if (shotMade) {
    // Made shot
    result.points = shotType === 'three' ? 3 : 2;
    result.shooter = selectShooter(offenseTeam, shotType);
    
    // Check for assist
    if (Math.random() < 0.65) {
      result.assists = 1;
      result.assister = selectAssister(offenseTeam, result.shooter);
    }
  } else {
    // Missed shot - rebound battle
    const reboundResult = simulateRebound(offenseTeam, defenseTeam, offenseRatings, defenseRatings);
    result.rebounds = 1;
    result.rebounder = reboundResult.rebounder;

    // Offensive rebound = second chance
    if (reboundResult.offensive) {
      const secondChance = simulateSecondChance(offenseTeam, defenseTeam, offenseRatings, defenseRatings);
      result.points = secondChance.points;
      if (secondChance.points > 0) {
        result.shooter = secondChance.shooter;
      }
    }
  }

  return result;
}

function getTeamRatings(team) {
  const players = team.roster || team.players || [];
  
  if (players.length === 0) {
    return {
      shooting: 60,
      defense: 60,
      rebounding: 60,
      ballHandling: 60,
      passing: 60
    };
  }

  const sum = players.reduce((acc, player) => ({
    shooting: acc.shooting + (player.shooting || 60),
    defense: acc.defense + (player.defense || 60),
    rebounding: acc.rebounding + (player.rebounding || 60),
    ballHandling: acc.ballHandling + (player.ballHandling || 60),
    passing: acc.passing + (player.passing || 60)
  }), { shooting: 0, defense: 0, rebounding: 0, ballHandling: 0, passing: 0 });

  const count = players.length;
  return {
    shooting: sum.shooting / count,
    defense: sum.defense / count,
    rebounding: sum.rebounding / count,
    ballHandling: sum.ballHandling / count,
    passing: sum.passing / count
  };
}

function calculateTurnoverChance(offense, defense) {
  // Base turnover rate ~14%
  // Better ball handling = fewer turnovers
  // Better defense = more turnovers forced
  const base = 14;
  const ballHandlingFactor = (60 - offense.ballHandling) / 10;
  const defenseFactor = (defense.defense - 60) / 15;
  
  return Math.max(5, Math.min(25, base + ballHandlingFactor + defenseFactor));
}

function determineShotType(offense) {
  // Higher shooting = more likely to attempt threes
  const threePointRate = 30 + (offense.shooting - 60) / 3;
  return Math.random() * 100 < threePointRate ? 'three' : 'two';
}

function calculateShotChance(offense, defense, shotType) {
  // Base percentages: 2PT ~52%, 3PT ~36%
  const base = shotType === 'three' ? 36 : 52;
  
  // Offense shooting helps
  const shootingBonus = (offense.shooting - 60) / 4;
  
  // Defense hurts
  const defensePenalty = (defense.defense - 60) / 5;
  
  // Passing creates better shots
  const passingBonus = (offense.passing - 60) / 8;
  
  return Math.max(20, Math.min(70, base + shootingBonus - defensePenalty + passingBonus));
}

function simulateRebound(offenseTeam, defenseTeam, offenseRatings, defenseRatings) {
  // Offensive rebound rate ~25% in NBA
  const offRebChance = 20 + (offenseRatings.rebounding - defenseRatings.rebounding) / 3;
  const isOffensive = Math.random() * 100 < offRebChance;

  const reboundingTeam = isOffensive ? offenseTeam : defenseTeam;
  const players = reboundingTeam.roster || reboundingTeam.players || [];
  
  // Select rebounder weighted by rebounding skill
  const rebounder = selectPlayerBySkill(players, 'rebounding');

  return {
    offensive: isOffensive,
    rebounder: rebounder?.name || 'Unknown'
  };
}

function simulateSecondChance(offenseTeam, defenseTeam, offenseRatings, defenseRatings) {
  // Second chance is usually a close shot
  const shotChance = calculateShotChance(offenseRatings, defenseRatings, 'two') + 10;
  
  if (Math.random() * 100 < shotChance) {
    const players = offenseTeam.roster || offenseTeam.players || [];
    const shooter = selectPlayerBySkill(players, 'rebounding'); // Usually the rebounder
    return { points: 2, shooter: shooter?.name };
  }
  
  return { points: 0, shooter: null };
}

function selectShooter(team, shotType) {
  const players = team.roster || team.players || [];
  const skill = shotType === 'three' ? 'shooting' : 'shooting';
  const shooter = selectPlayerBySkill(players, skill);
  return shooter?.name || 'Unknown';
}

function selectAssister(team, shooterName) {
  const players = team.roster || team.players || [];
  const eligible = players.filter(p => p.name !== shooterName);
  const assister = selectPlayerBySkill(eligible, 'passing');
  return assister?.name || 'Unknown';
}

function selectPlayerBySkill(players, skill) {
  if (!players || players.length === 0) return null;

  // Weight selection by skill rating
  const totalSkill = players.reduce((sum, p) => sum + (p[skill] || 60), 0);
  let random = Math.random() * totalSkill;

  for (const player of players) {
    random -= (player[skill] || 60);
    if (random <= 0) return player;
  }

  return players[0];
}

// Export a simple function that matches what gameManager expects
export function basketballPossession(offenseTeam, defenseTeam) {
  return simulatePossession(offenseTeam, defenseTeam);
}