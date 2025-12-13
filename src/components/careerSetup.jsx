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

const nationalities = [
  'American', 'British', 'Canadian', 'Australian', 'Indian',
  'Brazilian', 'German', 'French', 'Spanish', 'Italian',
  'Japanese', 'Chinese', 'Mexican', 'Argentine', 'Dutch',
  'Portuguese', 'South African', 'Nigerian', 'Jamaican', 'Other'
];

export default function CareerSetup({ onComplete, onBack }) {
  const [profile, setProfile] = useState({
    name: '',
    nationality: '',
    age: 30
  });
  const [selectedRole, setSelectedRole] = useState('manager');
  const [selectedSport, setSelectedSport] = useState('basketball');

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    if (!isValid) return;
    onComplete({
      profile,
      playerName: profile.name,
      sport: selectedSport,
      role: selectedRole
    });
  };

  const isValid = profile.name.trim() && profile.nationality && profile.age && selectedRole && selectedSport;

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
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          
          <h1 
            className="text-3xl font-serif text-white mb-6 text-center flex-shrink-0"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Create Your Career
          </h1>

          <div className="flex-1 flex gap-8 min-h-0">
            
            {/* Left Column: Profile */}
            <div className="w-1/3 flex flex-col gap-4">
              <h2 className="text-white/60 text-xs uppercase tracking-wider">Your Profile</h2>
              
              {/* Name */}
              <div>
                <label className="text-white/40 text-xs block mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  placeholder="Enter name"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
                  autoFocus
                />
              </div>

              {/* Nationality */}
              <div>
                <label className="text-white/40 text-xs block mb-1">Nationality</label>
                <select
                  value={profile.nationality}
                  onChange={(e) => handleProfileChange('nationality', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">Select nationality</option>
                  {nationalities.map(nat => (
                    <option key={nat} value={nat} className="bg-black">{nat}</option>
                  ))}
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="text-white/40 text-xs block mb-1">Age: {profile.age}</label>
                <input
                  type="range"
                  min="18"
                  max="70"
                  value={profile.age}
                  onChange={(e) => handleProfileChange('age', parseInt(e.target.value))}
                  className="w-full accent-white"
                />
                <div className="flex justify-between text-white/30 text-xs">
                  <span>18</span>
                  <span>70</span>
                </div>
              </div>

              {/* Profile Summary */}
              {profile.name && profile.nationality && (
                <div className="mt-auto bg-white/5 border border-white/10 p-4">
                  <p className="text-white font-semibold">{profile.name}</p>
                  <p className="text-white/60 text-sm">{profile.age} years old • {profile.nationality}</p>
                </div>
              )}
            </div>

            {/* Right Column: Role & Sport */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
              
              {/* Role Selection */}
              <div className="flex-1 flex flex-col min-h-0">
                <h2 className="text-white/60 text-xs uppercase tracking-wider mb-2 flex-shrink-0">
                  Choose Your Role
                </h2>
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

              {/* Sport Selection */}
              <div className="flex-1 flex flex-col min-h-0">
                <h2 className="text-white/60 text-xs uppercase tracking-wider mb-2 flex-shrink-0">
                  Choose Your Sport
                </h2>
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

            </div>

          </div>

          {/* Start Button */}
          <div className="flex justify-between items-center pt-4 flex-shrink-0">
            <div>
              {isValid && (
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  {profile.name} • {roleData[selectedRole].label} • {sportData[selectedSport].label}
                </p>
              )}
            </div>
            <button
              onClick={handleComplete}
              disabled={!isValid}
              className="px-12 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              Start Career
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}