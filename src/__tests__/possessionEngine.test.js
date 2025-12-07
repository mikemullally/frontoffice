import { describe, it, expect } from 'vitest';
import { 
  simulatePossession, 
  basketballPossession 
} from '../engines/basketball/possessionEngine';

describe('possessionEngine', () => {

  // Helper to create a test team
  const createTestTeam = (ratings = {}) => ({
    name: 'Test Team',
    roster: [
      { 
        name: 'Player 1', 
        position: 'PG',
        shooting: ratings.shooting || 70,
        defense: ratings.defense || 70,
        rebounding: ratings.rebounding || 70,
        ballHandling: ratings.ballHandling || 70,
        passing: ratings.passing || 70
      },
      { 
        name: 'Player 2', 
        position: 'SG',
        shooting: ratings.shooting || 70,
        defense: ratings.defense || 70,
        rebounding: ratings.rebounding || 70,
        ballHandling: ratings.ballHandling || 70,
        passing: ratings.passing || 70
      },
      { 
        name: 'Player 3', 
        position: 'SF',
        shooting: ratings.shooting || 70,
        defense: ratings.defense || 70,
        rebounding: ratings.rebounding || 70,
        ballHandling: ratings.ballHandling || 70,
        passing: ratings.passing || 70
      },
      { 
        name: 'Player 4', 
        position: 'PF',
        shooting: ratings.shooting || 70,
        defense: ratings.defense || 70,
        rebounding: ratings.rebounding || 70,
        ballHandling: ratings.ballHandling || 70,
        passing: ratings.passing || 70
      },
      { 
        name: 'Player 5', 
        position: 'C',
        shooting: ratings.shooting || 70,
        defense: ratings.defense || 70,
        rebounding: ratings.rebounding || 70,
        ballHandling: ratings.ballHandling || 70,
        passing: ratings.passing || 70
      }
    ]
  });

  describe('simulatePossession', () => {
    it('returns a result object', () => {
      const offense = createTestTeam();
      const defense = createTestTeam();
      
      const result = simulatePossession(offense, defense);
      
      expect(result).toHaveProperty('points');
      expect(result).toHaveProperty('rebounds');
      expect(result).toHaveProperty('assists');
      expect(result).toHaveProperty('turnovers');
    });

    it('points are 0, 2, or 3', () => {
      const offense = createTestTeam();
      const defense = createTestTeam();
      
      // Run many possessions to check all outcomes
      const points = new Set();
      for (let i = 0; i < 100; i++) {
        const result = simulatePossession(offense, defense);
        points.add(result.points);
      }
      
      // Should only have 0, 2, or 3
      points.forEach(p => {
        expect([0, 2, 3]).toContain(p);
      });
    });

    it('turnovers are 0 or 1', () => {
      const offense = createTestTeam();
      const defense = createTestTeam();
      
      for (let i = 0; i < 50; i++) {
        const result = simulatePossession(offense, defense);
        expect([0, 1]).toContain(result.turnovers);
      }
    });

    it('high shooting team scores more often', () => {
      const goodShooters = createTestTeam({ shooting: 95 });
      const badDefense = createTestTeam({ defense: 40 });
      const badShooters = createTestTeam({ shooting: 40 });
      const goodDefense = createTestTeam({ defense: 95 });
      
      let goodPoints = 0;
      let badPoints = 0;
      const iterations = 500;
      
      for (let i = 0; i < iterations; i++) {
        goodPoints += simulatePossession(goodShooters, badDefense).points;
        badPoints += simulatePossession(badShooters, goodDefense).points;
      }
      
      // Good shooters vs bad defense should score more
      expect(goodPoints).toBeGreaterThan(badPoints);
    });

    it('high ball handling reduces turnovers', () => {
      const goodHandlers = createTestTeam({ ballHandling: 95 });
      const badHandlers = createTestTeam({ ballHandling: 40 });
      const avgDefense = createTestTeam({ defense: 70 });
      
      let goodTurnovers = 0;
      let badTurnovers = 0;
      const iterations = 500;
      
      for (let i = 0; i < iterations; i++) {
        goodTurnovers += simulatePossession(goodHandlers, avgDefense).turnovers;
        badTurnovers += simulatePossession(badHandlers, avgDefense).turnovers;
      }
      
      // Good ball handlers should have fewer turnovers
      expect(goodTurnovers).toBeLessThan(badTurnovers);
    });
  });

  describe('basketballPossession', () => {
    it('is an alias for simulatePossession', () => {
      const offense = createTestTeam();
      const defense = createTestTeam();
      
      const result = basketballPossession(offense, defense);
      
      expect(result).toHaveProperty('points');
      expect(result).toHaveProperty('turnovers');
    });
  });

  describe('empty team handling', () => {
    it('handles teams with no roster', () => {
      const emptyTeam = { name: 'Empty', roster: [] };
      const normalTeam = createTestTeam();
      
      // Should not throw
      const result = simulatePossession(emptyTeam, normalTeam);
      
      expect(result).toHaveProperty('points');
    });

    it('handles teams with players array instead of roster', () => {
      const altTeam = {
        name: 'Alt Team',
        players: [
          { name: 'P1', shooting: 70, defense: 70, rebounding: 70, ballHandling: 70, passing: 70 }
        ]
      };
      const normalTeam = createTestTeam();
      
      const result = simulatePossession(altTeam, normalTeam);
      
      expect(result).toHaveProperty('points');
    });
  });

});