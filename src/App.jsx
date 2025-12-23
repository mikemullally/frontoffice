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
import { getLeagueById as getBasketballLeagueById, getTeamsForLeague as getBasketballTeams, getLeagueList as getBasketballLeagues } from './data/basketballLeagues';
import { getLeagueById as getSoccerLeagueById, getTeamsForLeague as getSoccerTeams, getLeagueList as getSoccerLeagues } from './data/soccerLeagues';
import { getLeagueById as getCricketLeagueById, getTeamsForLeague as getCricketTeams, getLeagueList as getCricketLeagues } from './data/cricketLeagues';
import { createSeason, startSeason, advanceWeek, advancePhase } from './core/seasonManager';
import CommissionerSeasonDashboard from './components/commissionerSeasonDashboard';
import { createSeasonSchedule, simulateDay, simulateDays, simulateRegularSeason } from './core/scheduleEngine';
import { getLeagueConfig } from './data/leagueConfigs';
import SeasonCalendarDashboard from './components/SeasonCalendarDashboard';
import LeagueEditor from './components/LeagueEditor';
import LeagueSettings from './components/LeagueSettings';

export default function App() {
  const [career, setCareer] = useState(null);
  const [team, setTeam] = useState(null);
  const [league, setLeague] = useState(null);
  const [competition, setCompetition] = useState(null);
  const [screen, setScreen] = useState('intro');
  const [season, setSeason] = useState(null);

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

const handleCreateCustomLeague = (name) => {
  const sport = career.currentSport;
  const newLeague = {
    id: `custom_${Date.now()}`,
    name,
    isCustom: true,
    teams: [],
    config: {
      gamesPerTeam: sport === 'basketball' ? 82 : sport === 'soccer' ? 38 : 14,
      startDate: '2024-10-01',
      minDaysBetweenGames: sport === 'basketball' ? 1 : 3,
      maxGamesPerWeek: sport === 'basketball' ? 4 : 2,
      backToBackAllowed: sport === 'basketball',
      playoffTeams: sport === 'soccer' ? 0 : 8,
      playoffRounds: sport === 'soccer' ? 0 : 3,
      playoffGamesPerRound: sport === 'basketball' ? 7 : 1,
      allowDraws: sport !== 'basketball',
      pointsForWin: sport === 'soccer' ? 3 : sport === 'cricket' ? 2 : 0,
      pointsForDraw: 1,
      pointsForLoss: 0
    }
  };
  
  setEditingLeague(newLeague);
  setScreen('league-settings');
};

const handleSaveLeague = (updatedLeague) => {
  const sport = career.currentSport;
  
  setCustomLeagues(prev => {
    const sportLeagues = prev[sport] || [];
    const existingIndex = sportLeagues.findIndex(l => l.id === updatedLeague.id);
    
    if (existingIndex >= 0) {
      // Update existing
      const updated = [...sportLeagues];
      updated[existingIndex] = updatedLeague;
      return { ...prev, [sport]: updated };
    } else {
      // Add new
      return { ...prev, [sport]: [...sportLeagues, updatedLeague] };
    }
  });
  
  setEditingLeague(null);
  setScreen('league-editor');
};

const handleDeleteLeague = () => {
  if (!editingLeague || !editingLeague.isCustom) return;
  
  const sport = career.currentSport;
  
  setCustomLeagues(prev => ({
    ...prev,
    [sport]: (prev[sport] || []).filter(l => l.id !== editingLeague.id)
  }));
  
  setEditingLeague(null);
  setScreen('league-editor');
};

const handleSelectLeagueForEdit = (league) => {
  setEditingLeague(league);
  setScreen('league-settings');
};

const handleStartCustomLeague = (league) => {
  // Use custom league config
  const schedule = createSeasonSchedule(league.teams, league.config);
  
  const newLeague = {
    id: league.id,
    name: league.name,
    sport: career.currentSport,
    teams: league.teams,
    isCustom: true,
    config: league.config
  };
  
  setLeague(newLeague);
  setSeason(schedule);
  setScreen('season-calendar');
};

const handleSelectLeague = (leagueId) => {
  let leagueData, teams;
  
  if (career.currentSport === 'basketball') {
    leagueData = getBasketballLeagueById(leagueId);
    teams = getBasketballTeams(leagueId);
  } else if (career.currentSport === 'soccer') {
    leagueData = getSoccerLeagueById(leagueId);
    teams = getSoccerTeams(leagueId);
  } else if (career.currentSport === 'cricket') {
    leagueData = getCricketLeagueById(leagueId);
    teams = getCricketTeams(leagueId);
  } else {
    return;
  }
  
  const newLeague = createLeague(leagueData.fullName, career.currentSport);
  
  newLeague.id = leagueId;
  newLeague.hasSalaryCap = leagueData.hasSalaryCap;
  newLeague.rules.salaryCap = leagueData.salaryCap;
  newLeague.format = leagueData.format;
  newLeague.isInternational = leagueData.isInternational || false;
  
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
    // Get league config for scheduling
    const config = getLeagueConfig(league.id, league.sport);
    
    // Create the schedule
    const schedule = createSeasonSchedule(league.teams, config);
    
    setSeason(schedule);
    setScreen('season-calendar');
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

const [customLeagues, setCustomLeagues] = useState({
  basketball: [],
  soccer: [],
  cricket: []
});
const [editingLeague, setEditingLeague] = useState(null);

const getAllLeaguesForSport = (sport) => {
  // Get built-in leagues
  let builtInLeagues = [];
  if (sport === 'basketball') {
    builtInLeagues = getBasketballLeagues().map(l => ({ ...l, isCustom: false }));
  } else if (sport === 'soccer') {
    builtInLeagues = getSoccerLeagues().map(l => ({ ...l, isCustom: false }));
  } else if (sport === 'cricket') {
    builtInLeagues = getCricketLeagues().map(l => ({ ...l, isCustom: false }));
  }
  
  // Add custom leagues
  const custom = customLeagues[sport] || [];
  
  return [...builtInLeagues, ...custom];
};


  const simulateGame = (homeTeam, awayTeam) => {
    // Simple rating-based simulation
    const homeRating = homeTeam.rating || 70;
    const awayRating = awayTeam.rating || 70;
    const homeAdvantage = 3;
    
    // Basketball scores
    if (league.sport === 'basketball') {
      const homeBase = 95 + (homeRating - 70) * 0.5 + homeAdvantage;
      const awayBase = 95 + (awayRating - 70) * 0.5;
      
      const homeScore = Math.round(homeBase + (Math.random() - 0.5) * 30);
      const awayScore = Math.round(awayBase + (Math.random() - 0.5) * 30);
      
      // No ties in basketball
      if (homeScore === awayScore) {
        return { homeScore: homeScore + 1, awayScore };
      }
      return { homeScore, awayScore };
    }
    
    // Soccer scores
    if (league.sport === 'soccer') {
      const homeStrength = (homeRating / 100) + 0.1; // Home advantage
      const awayStrength = awayRating / 100;
      
      const homeScore = Math.floor(Math.random() * 3 * homeStrength + Math.random());
      const awayScore = Math.floor(Math.random() * 3 * awayStrength + Math.random());
      
      return { homeScore, awayScore };
    }
    
    // Cricket scores
    if (league.sport === 'cricket') {
      const homeBase = 150 + (homeRating - 70) * 2;
      const awayBase = 150 + (awayRating - 70) * 2;
      
      const homeScore = Math.round(homeBase + (Math.random() - 0.5) * 80);
      const awayScore = Math.round(awayBase + (Math.random() - 0.5) * 80);
      
      return { homeScore, awayScore };
    }
    
    return { homeScore: 0, awayScore: 0 };
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
      <CommissionerDashboard
        league={league}
        onManageTeams={() => setScreen('league-teams')}
        onEditRules={() => setScreen('league-rules')}
        onManageRevenue={() => setScreen('league-revenue')}
        onEditLeagues={() => setScreen('league-editor')}
        onStartSeason={handleStartSeason}
        onBack={() => setScreen('league-select')}
        onQuit={() => {
          setCareer(null);
          setTeam(null);
          setLeague(null);
          setSeason(null);
          setCompetition(null);
          setScreen('intro');
        }}
      />
    );
  }

  if (screen === 'commissioner-season') {
    return (
      <CommissionerSeasonDashboard
        season={season}
        league={league}
        onAdvanceWeek={() => {
          const result = advanceWeek(season);
          if (result.success) {
            setSeason(result.season);
          }
        }}
        onAdvancePhase={() => {
          const result = advancePhase(season);
          if (result.success) {
            setSeason(result.season);
          }
        }}
        onPhaseAction={(action) => {
          console.log('Phase action:', action);
          // We'll implement these later
        }}
        onBack={() => setScreen('commissioner-dashboard')}
      />
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

  if (screen === 'season-calendar') {
    return (
      <SeasonCalendarDashboard
        schedule={season}
        league={league}
        onSimulateDay={() => {
          const result = simulateDay(season, simulateGame);
          if (result.success) {
            setSeason(result.schedule);
          }
        }}
        onSimulateWeek={() => {
          const result = simulateDays(season, simulateGame, 7);
          if (result.success) {
            setSeason(result.schedule);
          }
        }}
        onSimulateSeason={() => {
          const result = simulateRegularSeason(season, simulateGame);
          if (result.success) {
            setSeason(result.schedule);
          }
        }}
        onBack={() => setScreen('commissioner-dashboard')}
        onQuit={() => {
          // Reset all state and go to intro
          setCareer(null);
          setTeam(null);
          setLeague(null);
          setSeason(null);
          setCompetition(null);
          setScreen('intro');
        }}
      />
    );
  }

  if (screen === 'league-editor') {
  return (
    <LeagueEditor
      sport={career.currentSport}
      leagues={getAllLeaguesForSport(career.currentSport)}
      onSelectLeague={(league) => {
        if (league.isCustom) {
          handleSelectLeagueForEdit(league);
        } else {
          // For built-in leagues, go to league select to start season
          handleSelectLeague(league.id);
        }
      }}
      onCreateLeague={handleCreateCustomLeague}
      onBack={() => setScreen('commissioner-dashboard')}
      onQuit={() => {
        setCareer(null);
        setTeam(null);
        setLeague(null);
        setSeason(null);
        setCompetition(null);
        setScreen('intro');
      }}
    />
  );
}

  if (screen === 'league-settings') {
    return (
      <LeagueSettings
        league={editingLeague}
        sport={career.currentSport}
        onSave={handleSaveLeague}
        onDelete={editingLeague?.isCustom ? handleDeleteLeague : null}
        onBack={() => {
          setEditingLeague(null);
          setScreen('league-editor');
        }}
        onQuit={() => {
          setCareer(null);
          setTeam(null);
          setLeague(null);
          setSeason(null);
          setCompetition(null);
          setEditingLeague(null);
          setScreen('intro');
        }}
      />
    );
  }
}