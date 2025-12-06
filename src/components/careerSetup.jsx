import React, { useState } from 'react';
import { ROLES, SPORTS } from '../core/careerManager';

export default function CareerSetup({ onComplete }) {
  const [step, setStep] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const sportEmojis = {
    basketball: '🏀',
    soccer: '⚽',
    cricket: '🏏'
  };

  const roleDescriptions = {
    athlete: 'Play the game. Compete for championships.',
    manager: 'Build a team. Make trades. Win titles.',
    commissioner: 'Run the league. Set rules. Grow the sport.'
  };

  const handleComplete = () => {
    onComplete({
      playerName,
      sport: selectedSport,
      role: selectedRole
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🏆 Front Office
        </h1>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              What's your name?
            </h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 rounded text-lg"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!playerName.trim()}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white py-3 rounded-lg font-bold"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Sport */}
        {step === 2 && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Choose your sport
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.values(SPORTS).map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`p-6 rounded-lg text-center transition-all ${
                    selectedSport === sport
                      ? 'bg-blue-500 ring-4 ring-blue-300'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                >
                  <div className="text-4xl mb-2">{sportEmojis[sport]}</div>
                  <div className="text-white font-bold capitalize">{sport}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!selectedSport}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white py-3 rounded-lg font-bold"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Role */}
        {step === 3 && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Choose your role
            </h2>
            <div className="space-y-4">
              {Object.values(ROLES).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedRole === role
                      ? 'bg-blue-500 ring-4 ring-blue-300'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                >
                  <div className="text-white font-bold capitalize text-xl">
                    {role}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {roleDescriptions[role]}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleComplete}
              disabled={!selectedRole}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-3 rounded-lg font-bold"
            >
              Start Career
            </button>
          </div>
        )}
      </div>
    </div>
  );
}