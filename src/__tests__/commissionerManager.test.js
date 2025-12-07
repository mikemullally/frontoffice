import { describe, it, expect } from 'vitest';
import {
  createLeague,
  addTeamToLeague,
  removeTeamFromLeague,
  updateLeagueRules,
  setTVDeal,
  getLeagueRevenue,
  canStartSeason
} from '../core/commissionerManager';
import { createTeam } from '../core/teamManager';

describe('commissionerManager', () => {

  describe('createLeague', () => {
    it('creates league with name and sport', () => {
      const league = createLeague('Test League', 'basketball');
      
      expect(league.name).toBe('Test League');
      expect(league.sport).toBe('basketball');
    });

    it('starts with empty teams', () => {
      const league = createLeague('Test League', 'basketball');
      
      expect(league.teams).toEqual([]);
    });

    it('sets default rules for basketball', () => {
      const league = createLeague('Test League', 'basketball');
      
      expect(league.rules.salaryCap).toBe(140000000);
      expect(league.rules.maxRosterSize).toBe(15);
      expect(league.rules.draftEnabled).toBe(true);
      expect(league.rules.playoffTeams).toBe(8);
    });

    it('sets no salary cap for cricket', () => {
      const league = createLeague('Test League', 'cricket');
      
      expect(league.rules.salaryCap).toBe(null);
    });

    it('starts with zero revenue', () => {
      const league = createLeague('Test League', 'basketball');
      
      expect(league.revenue.tvDeal).toBe(0);
      expect(league.revenue.sponsorships).toBe(0);
      expect(league.revenue.ticketSales).toBe(0);
    });
  });

  describe('addTeamToLeague', () => {
    it('adds team to league', () => {
      const league = createLeague('Test League', 'basketball');
      const team = createTeam('Team A', 'basketball');
      
      const result = addTeamToLeague(league, team);
      
      expect(result.success).toBe(true);
      expect(result.league.teams.length).toBe(1);
      expect(result.league.teams[0].name).toBe('Team A');
    });

    it('prevents duplicate teams', () => {
      let league = createLeague('Test League', 'basketball');
      const team = createTeam('Team A', 'basketball');
      league = addTeamToLeague(league, team).league;
      
      const result = addTeamToLeague(league, team);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Team already in league');
    });

    it('can add multiple different teams', () => {
      let league = createLeague('Test League', 'basketball');
      league = addTeamToLeague(league, createTeam('Team A', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team B', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team C', 'basketball')).league;
      
      expect(league.teams.length).toBe(3);
    });
  });

  describe('removeTeamFromLeague', () => {
    it('removes team from league', () => {
      let league = createLeague('Test League', 'basketball');
      league = addTeamToLeague(league, createTeam('Team A', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team B', 'basketball')).league;
      
      const result = removeTeamFromLeague(league, 'Team A');
      
      expect(result.success).toBe(true);
      expect(result.league.teams.length).toBe(1);
      expect(result.league.teams[0].name).toBe('Team B');
    });

    it('fails if team not found', () => {
      const league = createLeague('Test League', 'basketball');
      
      const result = removeTeamFromLeague(league, 'Nonexistent');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Team not found');
    });
  });

  describe('updateLeagueRules', () => {
    it('updates specific rules', () => {
      const league = createLeague('Test League', 'basketball');
      
      const updated = updateLeagueRules(league, { playoffTeams: 16 });
      
      expect(updated.rules.playoffTeams).toBe(16);
      expect(updated.rules.salaryCap).toBe(140000000); // unchanged
    });

    it('can update multiple rules at once', () => {
      const league = createLeague('Test League', 'basketball');
      
      const updated = updateLeagueRules(league, { 
        playoffTeams: 4,
        draftEnabled: false 
      });
      
      expect(updated.rules.playoffTeams).toBe(4);
      expect(updated.rules.draftEnabled).toBe(false);
    });
  });

  describe('setTVDeal', () => {
    it('sets TV deal revenue', () => {
      const league = createLeague('Test League', 'basketball');
      
      const updated = setTVDeal(league, 1000000000);
      
      expect(updated.revenue.tvDeal).toBe(1000000000);
    });
  });

  describe('getLeagueRevenue', () => {
    it('calculates total revenue', () => {
      let league = createLeague('Test League', 'basketball');
      league = setTVDeal(league, 100000000);
      league.revenue.sponsorships = 50000000;
      league.revenue.ticketSales = 25000000;
      
      const revenue = getLeagueRevenue(league);
      
      expect(revenue.total).toBe(175000000);
    });

    it('calculates per-team revenue', () => {
      let league = createLeague('Test League', 'basketball');
      league = addTeamToLeague(league, createTeam('Team A', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team B', 'basketball')).league;
      league = setTVDeal(league, 100000000);
      
      const revenue = getLeagueRevenue(league);
      
      expect(revenue.perTeam).toBe(50000000);
    });

    it('handles zero teams', () => {
      let league = createLeague('Test League', 'basketball');
      league = setTVDeal(league, 100000000);
      
      const revenue = getLeagueRevenue(league);
      
      expect(revenue.perTeam).toBe(0);
    });
  });

  describe('canStartSeason', () => {
    it('requires at least 4 teams', () => {
      let league = createLeague('Test League', 'basketball');
      league = addTeamToLeague(league, createTeam('Team A', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team B', 'basketball')).league;
      
      const result = canStartSeason(league);
      
      expect(result.canStart).toBe(false);
      expect(result.error).toBe('Need at least 4 teams');
    });

    it('allows start with 4+ teams', () => {
      let league = createLeague('Test League', 'basketball');
      league = addTeamToLeague(league, createTeam('Team A', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team B', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team C', 'basketball')).league;
      league = addTeamToLeague(league, createTeam('Team D', 'basketball')).league;
      
      const result = canStartSeason(league);
      
      expect(result.canStart).toBe(true);
    });
  });

});