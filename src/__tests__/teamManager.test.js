import { describe, it, expect } from 'vitest';
import { 
  createTeam, 
  addPlayer, 
  removePlayer, 
  getSalaryCap 
} from '../core/teamManager';

describe('teamManager', () => {

  describe('createTeam', () => {
    it('creates a team with correct name and sport', () => {
      const team = createTeam('Test Team', 'basketball');
      
      expect(team.name).toBe('Test Team');
      expect(team.sport).toBe('basketball');
    });

    it('starts with empty roster', () => {
      const team = createTeam('Test Team', 'basketball');
      
      expect(team.roster).toEqual([]);
    });

    it('sets salary cap for basketball', () => {
      const team = createTeam('Test Team', 'basketball');
      
      expect(team.budget).toBe(140000000);
    });

    it('sets no salary cap for cricket', () => {
      const team = createTeam('Test Team', 'cricket');
      
      expect(team.budget).toBe(null);
    });
  });

  describe('addPlayer', () => {
    it('adds player to roster', () => {
      const team = createTeam('Test Team', 'basketball');
      const player = { name: 'John Doe', position: 'PG', shooting: 75 };
      
      const result = addPlayer(team, player, 5000000);
      
      expect(result.success).toBe(true);
      expect(result.team.roster.length).toBe(1);
      expect(result.team.roster[0].name).toBe('John Doe');
    });

    it('tracks salary used', () => {
      const team = createTeam('Test Team', 'basketball');
      const player = { name: 'John Doe', position: 'PG' };
      
      const result = addPlayer(team, player, 10000000);
      
      expect(result.team.salaryUsed).toBe(10000000);
    });

    it('rejects player if over salary cap', () => {
      const team = createTeam('Test Team', 'basketball');
      const player = { name: 'Expensive Player', position: 'C' };
      
      const result = addPlayer(team, player, 150000000);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Over salary cap');
    });

    it('allows any salary for cricket (no cap)', () => {
      const team = createTeam('Test Team', 'cricket');
      const player = { name: 'Cricket Star', position: 'BAT' };
      
      const result = addPlayer(team, player, 999999999);
      
      expect(result.success).toBe(true);
    });
  });

  describe('removePlayer', () => {
    it('removes player from roster', () => {
      let team = createTeam('Test Team', 'basketball');
      const player = { name: 'John Doe', position: 'PG' };
      team = addPlayer(team, player, 5000000).team;
      
      const result = removePlayer(team, 'John Doe');
      
      expect(result.success).toBe(true);
      expect(result.team.roster.length).toBe(0);
    });

    it('returns salary to available cap', () => {
      let team = createTeam('Test Team', 'basketball');
      const player = { name: 'John Doe', position: 'PG' };
      team = addPlayer(team, player, 10000000).team;
      
      const result = removePlayer(team, 'John Doe');
      
      expect(result.team.salaryUsed).toBe(0);
    });

    it('fails if player not found', () => {
      const team = createTeam('Test Team', 'basketball');
      
      const result = removePlayer(team, 'Nobody');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Player not found');
    });
  });

  describe('getSalaryCap', () => {
    it('calculates available cap correctly', () => {
      let team = createTeam('Test Team', 'basketball');
      const player = { name: 'John Doe', position: 'PG' };
      team = addPlayer(team, player, 40000000).team;
      
      const cap = getSalaryCap(team);
      
      expect(cap.total).toBe(140000000);
      expect(cap.used).toBe(40000000);
      expect(cap.available).toBe(100000000);
    });

    it('returns null for sports without salary cap', () => {
      const team = createTeam('Test Team', 'cricket');
      
      const cap = getSalaryCap(team);
      
      expect(cap).toBe(null);
    });
  });

});