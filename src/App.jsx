import React, { useState } from 'react';
import CareerSetup from './components/careerSetup';
import TeamDashboard from './components/teamDashboard';
import RosterView from './components/rosterView';
import CommissionerDashboard from './components/commissionerDashboard';
import LeagueTeamsView from './components/leagueTeamsView';
import CompetitionDashboard from './components/competitionDashboard';
import StandingsView from './components/standingsView';
import ScheduleView from './components/scheduleView';
import { createNewCareer, selectRole } from './core/careerManager';
import { createTeam, removePlayer } from './core/teamManager';
import { createLeague, addTeamToLeague, removeTeamFromLeague } from './core/commissionerManager';
import { createCompetition, generateSchedule, recordGameResult, COMPETITION_TYPES } from './core/competitionManager';
import { getSportConfig } from './data/sportConfig';
import { createGame, simulateGame, getGameSummary } from './engines/basketball/gameManager';
import DemoDashboard from './components/DemoDashboard';
import IntroScreen from './components/IntroScreen';
import LeagueSelect from './components/leagueSelect';
import { getLeagueById, getTeamsForLeague } from './data/basketballLeagues';


export default function App() {
  const [career, setCareer] = useState(null);
  const [team, setTeam] = useState(null);
  const [league, setLeague] = useState(null);
  const [competition, setCompetition] = useState(null);
  const [screen, setScreen] = useState('intro');

  const handleCareerComplete = ({ profile, playerName, sport, role }) => {
    let newCareer = createNewCareer(playerName);
    newCareer = selectRole(newCareer, role, sport);
    newCareer.profile = profile;
    setCareer(newCareer);

    const config = getSportConfig(sport);

    if (role === 'manager') {
      const newTeam = createTeam(`${playerName}'s ${config.name} Team`, sport);
      setTeam(newTeam);
      setScreen('team-dashboard');
    } else if (role === 'commissioner') {
      // Go to league selection instead of creating empty league
      setScreen('league-select');
    } else {
      setScreen('dashboard');
    }
  };

  const handleSelectLeague = (leagueId) => {
  const leagueData = getLeagueById(leagueId);
  const teams = getTeamsForLeague(leagueId);
  
  const newLeague = createLeague(leagueData.fullName, career.currentSport);
  
  // Override with real league data
  newLeague.id = leagueId;
  newLeague.hasSalaryCap = leagueData.hasSalaryCap;
  newLeague.rules.salaryCap = leagueData.salaryCap;
  
  // Add all real teams
  let updatedLeague = newLeague;
  teams.forEach(team => {
    const result = addTeamToLeague(updatedLeague, team);
    if (result.success) {
      updatedLeague = result.league;
    }
  });
  
  setLeague(updatedLeague);
  setScreen('commissioner-dashboard');
};
  // Team Manager handlers
  const handleReleasePlayer = (playerName) => {
    const result = removePlayer(team, playerName);
    if (result.success) {
      setTeam(result.team);
    }
  };

  // Commissioner handlers
  const handleAddTeam = () => {
    const config = getSportConfig(league.sport);
    const teamNumber = league.teams.length + 1;
    const newTeam = createTeam(`${config.name} Team ${teamNumber}`, league.sport);
    const result = addTeamToLeague(league, newTeam);
    if (result.success) {
      setLeague(result.league);
    }
  };

  const handleRemoveTeam = (teamName) => {
    const result = removeTeamFromLeague(league, teamName);
    if (result.success) {
      setLeague(result.league);
    }
  };

  const handleStartSeason = () => {
    if (league.teams.length < 4) {
      alert('Need at least 4 teams to start a season');
      return;
    }

    const newCompetition = createCompetition(
      `${league.name} Season`,
      league.sport,
      COMPETITION_TYPES.LEAGUE,
      league.teams
    );

    const result = generateSchedule(newCompetition);
    if (result.success) {
      setCompetition(result.competition);
      setScreen('competition-dashboard');
    }
  };

  // Competition handlers
const handlePlayNextGame = () => {
  const nextGame = competition.schedule.find(g => g.status === 'scheduled');
  if (!nextGame) return;

  const homeTeam = competition.teams.find(t => t.name === nextGame.homeTeam);
  const awayTeam = competition.teams.find(t => t.name === nextGame.awayTeam);

  let homeScore, awayScore;

  if (competition.sport === 'basketball') {
    const game = createGame(homeTeam, awayTeam);
    const completedGame = simulateGame(game);
    const summary = getGameSummary(completedGame);
    homeScore = summary.homeScore;
    awayScore = summary.awayScore;
  } else if (competition.sport === 'soccer') {
    homeScore = Math.floor(Math.random() * 5);
    awayScore = Math.floor(Math.random() * 5);
  } else {
    homeScore = Math.floor(Math.random() * 200) + 100;
    awayScore = Math.floor(Math.random() * 200) + 100;
  }

  const result = recordGameResult(
    competition,
    nextGame.homeTeam,
    nextGame.awayTeam,
    homeScore,
    awayScore
  );

  if (result.success) {
    setCompetition(result.competition);
  }
};

// Intro Screen
if (screen === 'intro' || screen === 'setup') {
  return (
    <IntroScreen 
      onNewCareer={() => setScreen('career-setup')}
      onContinue={() => alert('No saved career yet!')}
    />
  );
}

// Career Setup
if (screen === 'career-setup') {
  return (
    <CareerSetup 
      onComplete={handleCareerComplete} 
      onBack={() => setScreen('intro')}
    />
  );
}

if (screen === 'league-select') {
  return (
    <LeagueSelect 
      sport={career.currentSport}
      onSelectLeague={handleSelectLeague}
      onBack={() => setScreen('career-setup')}
    />
  );
}

  // ========== TEAM MANAGER SCREENS ==========
if (screen === 'team-dashboard') {
  return (
    <TeamDashboard 
      team={team}
      onViewRoster={() => setScreen('roster')}
      onSignPlayer={() => setScreen('sign-player')}
      onEnterCompetition={() => setScreen('enter-competition')}
    />
  );
}

if (screen === 'enter-competition') {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setScreen('team-dashboard')}
          className="text-white/60 hover:text-white transition-colors text-sm mb-8"
        >
          ← Back
        </button>
        <h2 
          className="text-3xl font-bold text-white uppercase tracking-wider mb-8"
          style={{ fontFamily: 'Arial Black, sans-serif' }}
        >
          Enter Competition
        </h2>
        <div className="bg-white/5 border border-white/10 p-8 text-center text-white/40">
          Competition selection coming soon...
        </div>
      </div>
    </div>
  );
}

  if (screen === 'roster') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <RosterView 
            team={team}
            onBack={() => setScreen('team-dashboard')}
            onReleasePlayer={handleReleasePlayer}
          />
        </div>
      </div>
    );
  }

  if (screen === 'sign-player') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Sign Player</h2>
            <button
              onClick={() => setScreen('team-dashboard')}
              className="text-slate-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <div className="bg-slate-700 rounded-lg p-8 text-center text-slate-400">
            Free agent signing coming soon...
          </div>
        </div>
      </div>
    );
  }

  // ========== COMMISSIONER SCREENS ==========
  if (screen === 'commissioner-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🏆 {career.playerName}'s Career
          </h1>
          <CommissionerDashboard 
            league={league}
            onManageTeams={() => setScreen('league-teams')}
            onEditRules={() => setScreen('league-rules')}
            onManageRevenue={() => setScreen('league-revenue')}
            onStartSeason={handleStartSeason}
          />
        </div>
      </div>
    );
  }

  if (screen === 'league-teams') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <LeagueTeamsView 
            league={league}
            onBack={() => setScreen('commissioner-dashboard')}
            onAddTeam={handleAddTeam}
            onRemoveTeam={handleRemoveTeam}
          />
        </div>
      </div>
    );
  }

  if (screen === 'league-rules') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">League Rules</h2>
            <button
              onClick={() => setScreen('commissioner-dashboard')}
              className="text-slate-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <div className="bg-slate-700 rounded-lg p-8 text-center text-slate-400">
            Rules editor coming soon...
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'league-revenue') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Revenue & Deals</h2>
            <button
              onClick={() => setScreen('commissioner-dashboard')}
              className="text-slate-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <div className="bg-slate-700 rounded-lg p-8 text-center text-slate-400">
            Revenue management coming soon...
          </div>
        </div>
      </div>
    );
  }

  // ========== COMPETITION SCREENS ==========
  if (screen === 'competition-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <CompetitionDashboard 
            competition={competition}
            onViewSchedule={() => setScreen('schedule')}
            onViewStandings={() => setScreen('standings')}
            onPlayNextGame={handlePlayNextGame}
            onBack={() => setScreen('commissioner-dashboard')}
          />
        </div>
      </div>
    );
  }

  if (screen === 'standings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <StandingsView 
            competition={competition}
            onBack={() => setScreen('competition-dashboard')}
          />
        </div>
      </div>
    );
  }

  if (screen === 'schedule') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <ScheduleView 
            competition={competition}
            onBack={() => setScreen('competition-dashboard')}
          />
        </div>
      </div>
    );
  }

  // ========== GENERIC DASHBOARD ==========
  if (screen === 'dashboard') {
    const config = getSportConfig(career.currentSport);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🏆 {career.playerName}'s Career
          </h1>
          
          <div className="bg-slate-700 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <span className="text-slate-400">Sport:</span>
                <span className="ml-2">{config.emoji} {config.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Role:</span>
                <span className="ml-2 capitalize">{career.currentRole}</span>
              </div>
            </div>
            
            <div className="mt-6 text-center text-slate-400">
              {career.currentRole === 'athlete' && (
                <p>Athlete career coming soon...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}