import { describe, it, expect } from 'vitest';
import { 
  createCompetition,
  addTeamToCompetition,
  generateSchedule,
  recordGameResult,
  getStandings,
  COMPETITION_TYPES
} from '../core/competitionManager';
import { createTeam } from '../core/teamManager';

describe('competitionManager', () => {

  describe('createCompetition', () => {
    it('creates competition with correct properties', () => {
      const comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      
      expect(comp.name).toBe('Test League');
      expect(comp.sport).toBe('basketball');
      expect(comp.type).toBe('league');
      expect(comp.status).toBe('pending');
    });

    it('starts with empty teams and schedule', () => {
      const comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      
      expect(comp.teams).toEqual([]);
      expect(comp.schedule).toEqual([]);
    });
  });

  describe('addTeamToCompetition', () => {
    it('adds team to competition', () => {
      const comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      const team = createTeam('Team A', 'basketball');
      
      const result = addTeamToCompetition(comp, team);
      
      expect(result.success).toBe(true);
      expect(result.competition.teams.length).toBe(1);
    });

    it('prevents duplicate teams', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      const team = createTeam('Team A', 'basketball');
      comp = addTeamToCompetition(comp, team).competition;
      
      const result = addTeamToCompetition(comp, team);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Team already in competition');
    });
  });

  describe('generateSchedule', () => {
    it('requires at least 2 teams', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      const team = createTeam('Team A', 'basketball');
      comp = addTeamToCompetition(comp, team).competition;
      
      const result = generateSchedule(comp);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Need at least 2 teams');
    });

    it('creates round-robin schedule for league', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      comp = addTeamToCompetition(comp, createTeam('Team A', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team B', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team C', 'basketball')).competition;
      
      const result = generateSchedule(comp);
      
      // 3 teams = 3 games (A vs B, A vs C, B vs C)
      expect(result.success).toBe(true);
      expect(result.competition.schedule.length).toBe(3);
      expect(result.competition.status).toBe('active');
    });

    it('initializes standings for all teams', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      comp = addTeamToCompetition(comp, createTeam('Team A', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team B', 'basketball')).competition;
      
      const result = generateSchedule(comp);
      
      expect(result.competition.standings['Team A']).toBeDefined();
      expect(result.competition.standings['Team B']).toBeDefined();
      expect(result.competition.standings['Team A'].wins).toBe(0);
    });
  });

  describe('recordGameResult', () => {
    it('records score and updates standings', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      comp = addTeamToCompetition(comp, createTeam('Team A', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team B', 'basketball')).competition;
      comp = generateSchedule(comp).competition;
      
      const result = recordGameResult(comp, 'Team A', 'Team B', 100, 90);
      
      expect(result.success).toBe(true);
      expect(result.competition.standings['Team A'].wins).toBe(1);
      expect(result.competition.standings['Team B'].losses).toBe(1);
    });

    it('tracks points for and against', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      comp = addTeamToCompetition(comp, createTeam('Team A', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team B', 'basketball')).competition;
      comp = generateSchedule(comp).competition;
      
      const result = recordGameResult(comp, 'Team A', 'Team B', 100, 90);
      
      expect(result.competition.standings['Team A'].pointsFor).toBe(100);
      expect(result.competition.standings['Team A'].pointsAgainst).toBe(90);
    });

    it('marks competition complete when all games played', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      comp = addTeamToCompetition(comp, createTeam('Team A', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team B', 'basketball')).competition;
      comp = generateSchedule(comp).competition;
      
      const result = recordGameResult(comp, 'Team A', 'Team B', 100, 90);
      
      expect(result.competition.status).toBe('completed');
      expect(result.competition.champion).toBe('Team A');
    });
  });

  describe('getStandings', () => {
    it('sorts teams by wins', () => {
      let comp = createCompetition('Test League', 'basketball', COMPETITION_TYPES.LEAGUE);
      comp = addTeamToCompetition(comp, createTeam('Team A', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team B', 'basketball')).competition;
      comp = addTeamToCompetition(comp, createTeam('Team C', 'basketball')).competition;
      comp = generateSchedule(comp).competition;
      
      // Team B beats Team A
      comp = recordGameResult(comp, 'Team A', 'Team B', 90, 100).competition;
      // Team C beats Team A  
      comp = recordGameResult(comp, 'Team A', 'Team C', 85, 95).competition;
      
      const standings = getStandings(comp);
      
      // Team B and C have 1 win, Team A has 0
      expect(standings[0].wins).toBe(1);
      expect(standings[2].team).toBe('Team A');
      expect(standings[2].wins).toBe(0);
    });
  });

});