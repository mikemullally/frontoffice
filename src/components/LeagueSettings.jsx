import React, { useState } from 'react';
import QuitButton from './ui/QuitButton';

export default function LeagueSettings({
  league,
  sport,
  onSave,
  onDelete,
  onBack,
  onQuit
}) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    name: league.name || '',
    // Schedule settings
    gamesPerTeam: league.config?.gamesPerTeam || 30,
    startDate: league.config?.startDate || '2024-10-01',
    minDaysBetweenGames: league.config?.minDaysBetweenGames || 2,
    maxGamesPerWeek: league.config?.maxGamesPerWeek || 2,
    backToBackAllowed: league.config?.backToBackAllowed || false,
    // Playoff settings
    playoffTeams: league.config?.playoffTeams || 8,
    playoffRounds: league.config?.playoffRounds || 3,
    playoffGamesPerRound: league.config?.playoffGamesPerRound || 7,
    // Standings settings
    allowDraws: league.config?.allowDraws || sport === 'soccer' || sport === 'cricket',
    pointsForWin: league.config?.pointsForWin || (sport === 'soccer' ? 3 : sport === 'cricket' ? 2 : 0),
    pointsForDraw: league.config?.pointsForDraw || 1,
    pointsForLoss: league.config?.pointsForLoss || 0,
    // Teams
    teams: league.teams || []
  });

  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCode, setNewTeamCode] = useState('');
  const [newTeamRating, setNewTeamRating] = useState(70);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTeam = () => {
    if (newTeamName.trim() && newTeamCode.trim()) {
      const newTeam = {
        name: newTeamName.trim(),
        code: newTeamCode.trim().toUpperCase(),
        rating: parseInt(newTeamRating) || 70
      };
      setSettings(prev => ({
        ...prev,
        teams: [...prev.teams, newTeam]
      }));
      setNewTeamName('');
      setNewTeamCode('');
      setNewTeamRating(70);
    }
  };

  const handleRemoveTeam = (index) => {
    setSettings(prev => ({
      ...prev,
      teams: prev.teams.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateTeamRating = (index, rating) => {
    setSettings(prev => ({
      ...prev,
      teams: prev.teams.map((team, i) => 
        i === index ? { ...team, rating: parseInt(rating) || 70 } : team
      )
    }));
  };

  const handleSave = () => {
    onSave({
      ...league,
      name: settings.name,
      isCustom: true,
      teams: settings.teams,
      config: {
        gamesPerTeam: settings.gamesPerTeam,
        startDate: settings.startDate,
        minDaysBetweenGames: settings.minDaysBetweenGames,
        maxGamesPerWeek: settings.maxGamesPerWeek,
        backToBackAllowed: settings.backToBackAllowed,
        playoffTeams: settings.playoffTeams,
        playoffRounds: settings.playoffRounds,
        playoffGamesPerRound: settings.playoffGamesPerRound,
        allowDraws: settings.allowDraws,
        pointsForWin: settings.pointsForWin,
        pointsForDraw: settings.pointsForDraw,
        pointsForLoss: settings.pointsForLoss
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'teams', label: `Teams (${settings.teams.length})` },
    { id: 'schedule', label: 'Schedule' },
    { id: 'playoffs', label: 'Playoffs' },
    { id: 'standings', label: 'Standings' }
  ];

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <div className="h-4 w-px bg-white/20" />
          <QuitButton onQuit={onQuit} />
          <div>
            <h1 
              className="text-xl font-bold text-white uppercase tracking-wider"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              {league.id ? 'Edit League' : 'New League'}
            </h1>
            <p className="text-white/60 text-xs">
              {settings.name || 'Untitled League'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {league.isCustom && onDelete && (
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-500/20 text-red-400 font-bold uppercase tracking-wider text-sm hover:bg-red-500/30 transition-colors"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-500 text-black font-bold uppercase tracking-wider text-sm hover:bg-emerald-400 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
              activeTab === tab.id 
                ? 'text-white border-b-2 border-white' 
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                  League Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          )}

          {/* Teams Tab */}
          {activeTab === 'teams' && (
            <div className="space-y-6">
              {/* Add Team Form */}
              <div className="bg-white/5 border border-white/10 p-4">
                <h3 className="text-white font-semibold mb-4">Add Team</h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Team name"
                      className="w-full bg-black/30 border border-white/10 px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newTeamCode}
                      onChange={(e) => setNewTeamCode(e.target.value.slice(0, 4))}
                      placeholder="Code"
                      maxLength={4}
                      className="w-full bg-black/30 border border-white/10 px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 uppercase"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newTeamRating}
                      onChange={(e) => setNewTeamRating(e.target.value)}
                      min="1"
                      max="99"
                      className="w-full bg-black/30 border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30"
                    />
                    <button
                      onClick={handleAddTeam}
                      disabled={!newTeamName.trim() || !newTeamCode.trim()}
                      className="px-4 bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Team List */}
              <div>
                <h3 className="text-white/40 text-xs uppercase tracking-wider mb-3">
                  Teams ({settings.teams.length})
                </h3>
                {settings.teams.length === 0 ? (
                  <div className="text-center py-8 border border-white/10 bg-white/5">
                    <p className="text-white/40">No teams added yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {settings.teams.map((team, index) => (
                      <div 
                        key={index}
                        className="bg-white/5 border border-white/10 p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-white/30 text-sm w-6">{index + 1}</span>
                          <span className="text-white font-semibold">{team.name}</span>
                          <span className="text-white/40 text-sm">{team.code}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 text-xs">Rating:</span>
                            <input
                              type="number"
                              value={team.rating}
                              onChange={(e) => handleUpdateTeamRating(index, e.target.value)}
                              min="1"
                              max="99"
                              className="w-16 bg-black/30 border border-white/10 px-2 py-1 text-white text-sm text-center focus:outline-none focus:border-white/30"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveTeam(index)}
                            className="text-red-400 hover:text-red-300 text-sm px-2"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Games Per Team
                  </label>
                  <input
                    type="number"
                    value={settings.gamesPerTeam}
                    onChange={(e) => handleChange('gamesPerTeam', parseInt(e.target.value) || 0)}
                    min="1"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Season Start Date
                  </label>
                  <input
                    type="date"
                    value={settings.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Min Days Between Games
                  </label>
                  <input
                    type="number"
                    value={settings.minDaysBetweenGames}
                    onChange={(e) => handleChange('minDaysBetweenGames', parseInt(e.target.value) || 1)}
                    min="1"
                    max="7"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Max Games Per Week
                  </label>
                  <input
                    type="number"
                    value={settings.maxGamesPerWeek}
                    onChange={(e) => handleChange('maxGamesPerWeek', parseInt(e.target.value) || 1)}
                    min="1"
                    max="7"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="backToBack"
                  checked={settings.backToBackAllowed}
                  onChange={(e) => handleChange('backToBackAllowed', e.target.checked)}
                  className="w-5 h-5 accent-emerald-500"
                />
                <label htmlFor="backToBack" className="text-white">
                  Allow back-to-back games
                </label>
              </div>
            </div>
          )}

          {/* Playoffs Tab */}
          {activeTab === 'playoffs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Playoff Teams
                  </label>
                  <input
                    type="number"
                    value={settings.playoffTeams}
                    onChange={(e) => handleChange('playoffTeams', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                  <p className="text-white/30 text-xs mt-1">Set to 0 for no playoffs</p>
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Playoff Rounds
                  </label>
                  <input
                    type="number"
                    value={settings.playoffRounds}
                    onChange={(e) => handleChange('playoffRounds', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Games Per Round
                  </label>
                  <input
                    type="number"
                    value={settings.playoffGamesPerRound}
                    onChange={(e) => handleChange('playoffGamesPerRound', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                  <p className="text-white/30 text-xs mt-1">Best of X series</p>
                </div>
              </div>
            </div>
          )}

          {/* Standings Tab */}
          {activeTab === 'standings' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  id="allowDraws"
                  checked={settings.allowDraws}
                  onChange={(e) => handleChange('allowDraws', e.target.checked)}
                  className="w-5 h-5 accent-emerald-500"
                />
                <label htmlFor="allowDraws" className="text-white">
                  Allow draws/ties
                </label>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Points for Win
                  </label>
                  <input
                    type="number"
                    value={settings.pointsForWin}
                    onChange={(e) => handleChange('pointsForWin', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Points for Draw
                  </label>
                  <input
                    type="number"
                    value={settings.pointsForDraw}
                    onChange={(e) => handleChange('pointsForDraw', parseInt(e.target.value) || 0)}
                    min="0"
                    disabled={!settings.allowDraws}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30 disabled:opacity-30"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                    Points for Loss
                  </label>
                  <input
                    type="number"
                    value={settings.pointsForLoss}
                    onChange={(e) => handleChange('pointsForLoss', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 mt-6">
                <h4 className="text-white font-semibold mb-2">Points Preview</h4>
                <p className="text-white/60 text-sm">
                  Win: {settings.pointsForWin} pts • 
                  {settings.allowDraws && ` Draw: ${settings.pointsForDraw} pts •`}
                  {' '}Loss: {settings.pointsForLoss} pts
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}