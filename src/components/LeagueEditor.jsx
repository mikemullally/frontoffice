import React, { useState } from 'react';
import QuitButton from './ui/QuitButton';

export default function LeagueEditor({ 
  sport,
  leagues,
  onSelectLeague,
  onCreateLeague,
  onBack,
  onQuit
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');

  const sportEmoji = {
    basketball: '🏀',
    soccer: '⚽',
    cricket: '🏏'
  };

  const handleCreate = () => {
    if (newLeagueName.trim()) {
      onCreateLeague(newLeagueName.trim());
      setNewLeagueName('');
      setShowCreateModal(false);
    }
  };

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
              League Editor
            </h1>
            <p className="text-white/60 text-xs">
              {sportEmoji[sport]} {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-2 bg-emerald-500 text-black font-bold uppercase tracking-wider text-sm hover:bg-emerald-400 transition-colors"
        >
          + New League
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Existing Leagues */}
          <div className="mb-8">
            <h2 className="text-white/60 text-xs uppercase tracking-wider mb-4">
              Existing Leagues
            </h2>
            
            {leagues.length === 0 ? (
              <div className="text-center py-12 border border-white/10 bg-white/5">
                <p className="text-white/40">No leagues yet</p>
                <p className="text-white/30 text-sm mt-2">Create your first league to get started</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leagues.map((league) => (
                  <button
                    key={league.id}
                    onClick={() => onSelectLeague(league)}
                    className="w-full bg-white/5 border border-white/10 p-4 flex justify-between items-center hover:bg-white/10 transition-colors text-left"
                  >
                    <div>
                      <h3 className="text-white font-semibold">{league.name}</h3>
                      <p className="text-white/40 text-sm">
                        {league.teams?.length || league.teamCount || 0} teams
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {league.isCustom && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1">
                          Custom
                        </span>
                      )}
                      <span className="text-white/30">→</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Create League Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 p-8 max-w-md w-full mx-4">
            <h2 
              className="text-xl font-bold text-white uppercase tracking-wider mb-6"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              Create New League
            </h2>
            
            <div className="mb-6">
              <label className="text-white/40 text-xs block mb-2">League Name</label>
              <input
                type="text"
                value={newLeagueName}
                onChange={(e) => setNewLeagueName(e.target.value)}
                placeholder="Enter league name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                autoFocus
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewLeagueName('');
                }}
                className="flex-1 py-3 bg-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newLeagueName.trim()}
                className="flex-1 py-3 bg-emerald-500 text-black font-bold uppercase tracking-wider text-sm hover:bg-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}