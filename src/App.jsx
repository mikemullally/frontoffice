import React, { useState } from 'react';
import CareerSetup from './components/careerSetup';
import { createNewCareer, selectRole } from './core/careerManager';

export default function App() {
  const [career, setCareer] = useState(null);
  const [screen, setScreen] = useState('setup');

  const handleCareerComplete = ({ playerName, sport, role }) => {
    let newCareer = createNewCareer(playerName);
    newCareer = selectRole(newCareer, role, sport);
    setCareer(newCareer);
    setScreen('dashboard');
  };

  if (screen === 'setup') {
    return <CareerSetup onComplete={handleCareerComplete} />;
  }

  if (screen === 'dashboard') {
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
                <span className="ml-2 capitalize">{career.currentSport}</span>
              </div>
              <div>
                <span className="text-slate-400">Role:</span>
                <span className="ml-2 capitalize">{career.currentRole}</span>
              </div>
            </div>
            
            <div className="mt-6 text-center text-slate-400">
              {career.currentRole === 'manager' && (
                <p>Team Manager coming soon...</p>
              )}
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