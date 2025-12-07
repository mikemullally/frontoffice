import React, { useState } from 'react';
import CareerSetup from './components/careerSetup';
import TeamDashboard from './components/teamDashboard';
import RosterView from './components/rosterView';
import { createNewCareer, selectRole } from './core/careerManager';
import { createTeam, removePlayer } from './core/teamManager';
import { getSportConfig } from './data/sportConfig';

export default function App() {
  const [career, setCareer] = useState(null);
  const [team, setTeam] = useState(null);
  const [screen, setScreen] = useState('setup');

  const handleCareerComplete = ({ playerName, sport, role }) => {
    let newCareer = createNewCareer(playerName);
    newCareer = selectRole(newCareer, role, sport);
    setCareer(newCareer);

    // If manager role, create a team
    if (role === 'manager') {
      const config = getSportConfig(sport);
      const newTeam = createTeam(`${playerName}'s ${config.name} Team`, sport);
      setTeam(newTeam);
      setScreen('team-dashboard');
    } else {
      setScreen('dashboard');
    }
  };

  const handleReleasePlayer = (playerName) => {
    const result = removePlayer(team, playerName);
    if (result.success) {
      setTeam(result.team);
    }
  };

  // Career Setup
  if (screen === 'setup') {
    return <CareerSetup onComplete={handleCareerComplete} />;
  }

  // Team Manager - Dashboard
  if (screen === 'team-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🏆 {career.playerName}'s Career
          </h1>
          
          <TeamDashboard 
            team={team}
            onViewRoster={() => setScreen('roster')}
            onSignPlayer={() => setScreen('sign-player')}
          />
        </div>
      </div>
    );
  }

  // Team Manager - Roster View
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

  // Sign Player (placeholder for now)
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

  // Generic dashboard for other roles
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
              {career.currentRole === 'commissioner' && (
                <p>Commissioner Manager coming soon...</p>
              )}
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