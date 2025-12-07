import { describe, it, expect } from 'vitest';
import {
  createGame,
  startGame,
  simulateGame,
  getGameSummary
} from '../engines/basketball/gameManager';

describe('gameManager', () => {

  const createTestTeam = (name) => ({
    name,
    roster: [
      { name: `${name} PG`, position: 'PG', shooting: 75, defense: 70, rebounding: 60, ballHandling: 85, passing: 80 },
      { name: `${name} SG`, position: 'SG', shooting: 80, defense: 65, rebounding: 55, ballHandling: 75, passing: 70 },
      { name: `${name} SF`, position: 'SF', shooting: 75, defense: 75, rebounding: 70, ballHandling: 70, passing: 65 },
      { name: `${name} PF`, position: 'PF', shooting: 65, defense: 80, rebounding: 85, ballHandling: 55, passing: 60 },
      { name: `${name} C`, position: 'C', shooting: 55, defense: 85, rebounding: 90, ballHandling: 45, passing: 55 }
    ]
  });

  describe('createGame', () => {
    it('creates game with home and away teams', () => {
      const home = createTestTeam('Home');
      const away = createTestTeam('Away');
      
      const game = createGame(home, away);
      
      expect(game.homeTeam.name).toBe('Home');
      expect(game.awayTeam.name).toBe('Away');
    });

    it('starts with pending status', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      expect(game.status).toBe('pending');
    });

    it('starts with 0-0 score', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      expect(game.state.homeScore).toBe(0);
      expect(game.state.awayScore).toBe(0);
    });

    it('has default settings', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      expect(game.settings.quarters).toBe(4);
      expect(game.settings.quarterLength).toBe(12);
    });

    it('accepts custom settings', () => {
      const game = createGame(
        createTestTeam('Home'), 
        createTestTeam('Away'),
        { quarters: 2, quarterLength: 10 }
      );
      
      expect(game.settings.quarters).toBe(2);
      expect(game.settings.quarterLength).toBe(10);
    });
  });

  describe('startGame', () => {
    it('changes status to active', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      const started = startGame(game);
      
      expect(started.status).toBe('active');
    });

    it('adds start event to log', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      const started = startGame(game);
      
      expect(started.state.log.length).toBeGreaterThan(0);
      expect(started.state.log[0].event).toBe('Game started');
    });
  });

  describe('simulateGame', () => {
    it('completes the game', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      const completed = simulateGame(game);
      
      expect(completed.status).toBe('completed');
    });

    it('produces realistic basketball scores', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      const completed = simulateGame(game);
      
      // NBA games typically 80-130 points per team
      expect(completed.state.homeScore).toBeGreaterThan(60);
      expect(completed.state.homeScore).toBeLessThan(160);
      expect(completed.state.awayScore).toBeGreaterThan(60);
      expect(completed.state.awayScore).toBeLessThan(160);
    });

    it('tracks team stats', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      const completed = simulateGame(game);
      
      expect(completed.stats.home.points).toBe(completed.state.homeScore);
      expect(completed.stats.away.points).toBe(completed.state.awayScore);
    });

    it('logs quarter events', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      
      const completed = simulateGame(game);
      
      const quarterStarts = completed.state.log.filter(e => e.event.includes('started'));
      const quarterEnds = completed.state.log.filter(e => e.event.includes('ended'));
      
      expect(quarterStarts.length).toBeGreaterThanOrEqual(4);
      expect(quarterEnds.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('getGameSummary', () => {
    it('returns summary with team names', () => {
      const game = createGame(createTestTeam('Lakers'), createTestTeam('Celtics'));
      const completed = simulateGame(game);
      
      const summary = getGameSummary(completed);
      
      expect(summary.homeTeam).toBe('Lakers');
      expect(summary.awayTeam).toBe('Celtics');
    });

    it('returns final scores', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      const completed = simulateGame(game);
      
      const summary = getGameSummary(completed);
      
      expect(summary.homeScore).toBe(completed.state.homeScore);
      expect(summary.awayScore).toBe(completed.state.awayScore);
    });

    it('determines winner correctly', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      const completed = simulateGame(game);
      
      const summary = getGameSummary(completed);
      
      if (summary.homeScore > summary.awayScore) {
        expect(summary.winner).toBe('Home');
      } else {
        expect(summary.winner).toBe('Away');
      }
    });

    it('includes game log', () => {
      const game = createGame(createTestTeam('Home'), createTestTeam('Away'));
      const completed = simulateGame(game);
      
      const summary = getGameSummary(completed);
      
      expect(summary.log.length).toBeGreaterThan(0);
    });
  });

  describe('game balance', () => {
    it('better team wins more often', () => {
      const goodTeam = {
        name: 'Good',
        roster: [
          { name: 'Star PG', shooting: 90, defense: 85, rebounding: 70, ballHandling: 95, passing: 90 },
          { name: 'Star SG', shooting: 92, defense: 80, rebounding: 65, ballHandling: 85, passing: 80 },
          { name: 'Star SF', shooting: 88, defense: 85, rebounding: 80, ballHandling: 80, passing: 75 },
          { name: 'Star PF', shooting: 80, defense: 90, rebounding: 90, ballHandling: 65, passing: 70 },
          { name: 'Star C', shooting: 70, defense: 92, rebounding: 95, ballHandling: 50, passing: 65 }
        ]
      };
      
      const badTeam = {
        name: 'Bad',
        roster: [
          { name: 'Weak PG', shooting: 50, defense: 45, rebounding: 40, ballHandling: 55, passing: 50 },
          { name: 'Weak SG', shooting: 52, defense: 40, rebounding: 35, ballHandling: 50, passing: 45 },
          { name: 'Weak SF', shooting: 48, defense: 50, rebounding: 50, ballHandling: 45, passing: 40 },
          { name: 'Weak PF', shooting: 45, defense: 55, rebounding: 60, ballHandling: 35, passing: 35 },
          { name: 'Weak C', shooting: 40, defense: 58, rebounding: 65, ballHandling: 30, passing: 30 }
        ]
      };
      
      let goodWins = 0;
      const games = 20;
      
      for (let i = 0; i < games; i++) {
        const game = createGame(goodTeam, badTeam);
        const completed = simulateGame(game);
        if (completed.state.homeScore > completed.state.awayScore) {
          goodWins++;
        }
      }
      
      // Good team should win majority
      expect(goodWins).toBeGreaterThan(games / 2);
    });
  });

});