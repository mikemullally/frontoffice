import { describe, it, expect } from 'vitest';
import {
  createNewCareer,
  selectRole,
  getAvailableRoles,
  getAvailableSports,
  ROLES,
  SPORTS
} from '../core/careerManager';

describe('careerManager', () => {

  describe('createNewCareer', () => {
    it('creates career with player name', () => {
      const career = createNewCareer('Mike');
      
      expect(career.playerName).toBe('Mike');
    });

    it('starts with no role or sport selected', () => {
      const career = createNewCareer('Mike');
      
      expect(career.currentRole).toBe(null);
      expect(career.currentSport).toBe(null);
    });

    it('starts with zero reputation', () => {
      const career = createNewCareer('Mike');
      
      expect(career.reputation).toBe(0);
    });

    it('starts with empty achievements and history', () => {
      const career = createNewCareer('Mike');
      
      expect(career.achievements).toEqual([]);
      expect(career.careerHistory).toEqual([]);
    });
  });

  describe('selectRole', () => {
    it('sets role and sport on career', () => {
      let career = createNewCareer('Mike');
      career = selectRole(career, ROLES.MANAGER, SPORTS.BASKETBALL);
      
      expect(career.currentRole).toBe('manager');
      expect(career.currentSport).toBe('basketball');
    });

    it('can select commissioner role', () => {
      let career = createNewCareer('Mike');
      career = selectRole(career, ROLES.COMMISSIONER, SPORTS.SOCCER);
      
      expect(career.currentRole).toBe('commissioner');
      expect(career.currentSport).toBe('soccer');
    });

    it('preserves player name when selecting role', () => {
      let career = createNewCareer('Mike');
      career = selectRole(career, ROLES.ATHLETE, SPORTS.CRICKET);
      
      expect(career.playerName).toBe('Mike');
    });
  });

  describe('getAvailableRoles', () => {
    it('returns all roles', () => {
      const career = createNewCareer('Mike');
      const roles = getAvailableRoles(career);
      
      expect(roles).toContain('athlete');
      expect(roles).toContain('manager');
      expect(roles).toContain('commissioner');
      expect(roles.length).toBe(3);
    });
  });

  describe('getAvailableSports', () => {
    it('returns all sports', () => {
      const career = createNewCareer('Mike');
      const sports = getAvailableSports(career);
      
      expect(sports).toContain('basketball');
      expect(sports).toContain('soccer');
      expect(sports).toContain('cricket');
      expect(sports.length).toBe(3);
    });
  });

  describe('ROLES constant', () => {
    it('has correct role values', () => {
      expect(ROLES.ATHLETE).toBe('athlete');
      expect(ROLES.MANAGER).toBe('manager');
      expect(ROLES.COMMISSIONER).toBe('commissioner');
    });
  });

  describe('SPORTS constant', () => {
    it('has correct sport values', () => {
      expect(SPORTS.BASKETBALL).toBe('basketball');
      expect(SPORTS.SOCCER).toBe('soccer');
      expect(SPORTS.CRICKET).toBe('cricket');
    });
  });

});