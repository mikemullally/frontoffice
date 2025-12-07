import { describe, it, expect } from 'vitest';
import {
  sportConfig,
  getSportConfig,
  getPositionsForSport,
  getStatCategories
} from '../data/sportConfig';

describe('sportConfig', () => {

  describe('sportConfig object', () => {
    it('has basketball config', () => {
      expect(sportConfig.basketball).toBeDefined();
      expect(sportConfig.basketball.name).toBe('Basketball');
    });

    it('has soccer config', () => {
      expect(sportConfig.soccer).toBeDefined();
      expect(sportConfig.soccer.name).toBe('Soccer');
    });

    it('has cricket config', () => {
      expect(sportConfig.cricket).toBeDefined();
      expect(sportConfig.cricket.name).toBe('Cricket');
    });
  });

  describe('basketball config', () => {
    const config = sportConfig.basketball;

    it('has correct positions', () => {
      expect(config.positions).toEqual(['PG', 'SG', 'SF', 'PF', 'C']);
    });

    it('has 5 starters', () => {
      expect(config.startersCount).toBe(5);
    });

    it('has roster size of 15', () => {
      expect(config.rosterSize).toBe(15);
    });

    it('has salary cap', () => {
      expect(config.hasSalaryCap).toBe(true);
      expect(config.defaultSalaryCap).toBe(140000000);
    });

    it('has correct stat categories', () => {
      expect(config.statCategories).toContain('shooting');
      expect(config.statCategories).toContain('defense');
      expect(config.statCategories).toContain('rebounding');
    });

    it('has game terms', () => {
      expect(config.gameTerms.period).toBe('Quarter');
      expect(config.gameTerms.periods).toBe(4);
      expect(config.gameTerms.score).toBe('Points');
    });
  });

  describe('soccer config', () => {
    const config = sportConfig.soccer;

    it('has 11 starters', () => {
      expect(config.startersCount).toBe(11);
    });

    it('has 2 halves', () => {
      expect(config.gameTerms.period).toBe('Half');
      expect(config.gameTerms.periods).toBe(2);
    });

    it('scores goals', () => {
      expect(config.gameTerms.score).toBe('Goals');
    });
  });

  describe('cricket config', () => {
    const config = sportConfig.cricket;

    it('has no salary cap', () => {
      expect(config.hasSalaryCap).toBe(false);
      expect(config.defaultSalaryCap).toBe(null);
    });

    it('has innings', () => {
      expect(config.gameTerms.period).toBe('Innings');
    });

    it('scores runs', () => {
      expect(config.gameTerms.score).toBe('Runs');
    });
  });

  describe('getSportConfig', () => {
    it('returns basketball config', () => {
      const config = getSportConfig('basketball');
      expect(config.name).toBe('Basketball');
    });

    it('returns null for invalid sport', () => {
      const config = getSportConfig('baseball');
      expect(config).toBe(null);
    });
  });

  describe('getPositionsForSport', () => {
    it('returns basketball positions', () => {
      const positions = getPositionsForSport('basketball');
      expect(positions).toEqual(['PG', 'SG', 'SF', 'PF', 'C']);
    });

    it('returns empty array for invalid sport', () => {
      const positions = getPositionsForSport('invalid');
      expect(positions).toEqual([]);
    });
  });

  describe('getStatCategories', () => {
    it('returns basketball stats', () => {
      const stats = getStatCategories('basketball');
      expect(stats).toContain('shooting');
      expect(stats.length).toBe(5);
    });

    it('returns soccer stats', () => {
      const stats = getStatCategories('soccer');
      expect(stats).toContain('pace');
      expect(stats).toContain('dribbling');
    });
  });

});