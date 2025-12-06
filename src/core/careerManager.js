// CAREER MANAGER
// Manages role selection, job negotiations, and career progression

export const ROLES = {
  ATHLETE: 'athlete',
  MANAGER: 'manager',
  COMMISSIONER: 'commissioner'
};

export const SPORTS = {
  BASKETBALL: 'basketball',
  SOCCER: 'soccer',
  CRICKET: 'cricket'
};

export function createNewCareer(playerName) {
  return {
    playerName,
    currentRole: null,
    currentSport: null,
    currentTeam: null,
    currentLeague: null,
    reputation: 0,
    achievements: [],
    careerHistory: []
  };
}

export function getAvailableRoles(career) {
  // For now, all roles available
  // Later: unlock based on reputation/achievements
  return Object.values(ROLES);
}

export function getAvailableSports(career) {
  // For now, all sports available
  return Object.values(SPORTS);
}

export function selectRole(career, role, sport) {
  return {
    ...career,
    currentRole: role,
    currentSport: sport
  };
}