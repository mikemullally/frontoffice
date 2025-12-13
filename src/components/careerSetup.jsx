import React, { useState } from 'react';
import { ROLES, SPORTS } from '../core/careerManager';

const sportData = {
  basketball: {
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    label: 'Basketball'
  },
  soccer: {
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    label: 'Soccer'
  },
  cricket: {
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    label: 'Cricket'
  }
};

const roleData = {
  athlete: {
    image: 'https://images.unsplash.com/photo-1461896836934-b5520d834b64?auto=format&fit=crop&w=800&q=80',
    label: 'Athlete',
    description: 'Play the game'
  },
  manager: {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    label: 'Manager',
    description: 'Build a team'
  },
  commissioner: {
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    label: 'Commissioner',
    description: 'Run the league'
  }
};

export default function CareerSetup({ onComplete, onBack }) {
  const [playerName, setPlayerName] = useState('');
  const [selectedSport, setSelectedSport] = useState('basketball');
  const [selectedRole, setSelectedRole] = useState('manager');

  const handleComplete = () => {
    if (!playerName.trim()) return;
    onComplete({
      playerName,
      sport: selectedSport,
      role: selectedRole
    });
  };

  const isValid = playerName.trim() && selectedSport && selectedRole;

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 flex-shrink-0">
        <div 
          className="text-xl font-serif italic text-white/80"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          front office.
        </div>
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors text-sm"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full max-w-3xl mx-auto flex flex-col">
          
          <h1 
            className="text-3xl font-serif text-white mb-6 text-center flex-shrink-0"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Create Your Career
          </h1>

          {/* Name Input */}
          <div className="max-w-sm mx-auto mb-6 flex-shrink-0 w-full">
            <label className="text-white/60 text-xs uppercase tracking-wider block mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter name"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-lg placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              autoFocus
            />
          </div>

          {/* Selections Grid */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            
            {/* Sport Selection */}
            <div className="flex-1 flex flex-col min-h-0">
              <label className="text-white/60 text-xs uppercase tracking-wider block mb-2 text-center flex-shrink-0">
                Choose Your Sport
              </label>
              <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
                {Object.values(SPORTS).map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`relative overflow-hidden group transition-all duration-300 ${
                      selectedSport === sport 
                        ? 'ring-2 ring-white' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${sportData[sport].image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-end p-3">
                      <span 
                        className="text-white text-sm font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'Arial Black, sans-serif' }}
                      >
                        {sportData[sport].label}
                      </span>
                    </div>
                    {selectedSport === sport && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-white flex items-center justify-center">
                        <span className="text-black text-xs font-bold">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Selection */}
            <div className="flex-1 flex flex-col min-h-0">
              <label className="text-white/60 text-xs uppercase tracking-wider block mb-2 text-center flex-shrink-0">
                Choose Your Role
              </label>
              <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
                {Object.values(ROLES).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`relative overflow-hidden group transition-all duration-300 ${
                      selectedRole === role 
                        ? 'ring-2 ring-white' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${roleData[role].image})` }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-3">
                      <span 
                        className="text-white text-sm font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'Arial Black, sans-serif' }}
                      >
                        {roleData[role].label}
                      </span>
                      <span className="text-white/70 text-xs">
                        {roleData[role].description}
                      </span>
                    </div>
                    {selectedRole === role && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-white flex items-center justify-center">
                        <span className="text-black text-xs font-bold">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Start Button */}
          <div className="text-center pt-4 flex-shrink-0">
            <button
              onClick={handleComplete}
              disabled={!isValid}
              className="px-12 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              Start Career
            </button>
            
            {isValid && (
              <p className="text-white/40 mt-3 text-xs uppercase tracking-wider">
                {playerName} • {sportData[selectedSport].label} • {roleData[selectedRole].label}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}