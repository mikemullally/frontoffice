import React from 'react';
import { getCurrentPhase, getSeasonProgress, getPhaseActivities } from '../core/seasonManager';

const phaseIcons = {
  event: '📋',
  games: '🏟️',
  playoffs: '🏆',
  tournament: '🎯',
  transaction: '✍️'
};

const phaseColors = {
  pending: 'bg-white/10 border-white/20',
  active: 'bg-emerald-500/20 border-emerald-500',
  completed: 'bg-white/5 border-white/10'
};

export default function CommissionerSeasonDashboard({ 
  season, 
  league,
  onAdvanceWeek,
  onAdvancePhase,
  onPhaseAction,
  onBack 
}) {
  const currentPhase = getCurrentPhase(season);
  const progress = getSeasonProgress(season);
  const activities = currentPhase ? getPhaseActivities(currentPhase) : [];

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 flex-shrink-0 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <div>
            <h1 
              className="text-xl font-bold text-white uppercase tracking-wider"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              {league.name}
            </h1>
            <p className="text-white/60 text-sm">
              {season.year} Season
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white/60 text-xs uppercase tracking-wider">Progress</p>
            <p className="text-white font-bold">{progress.percentComplete}%</p>
          </div>
          <div className="w-32 h-2 bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress.percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Phase Timeline */}
        <div className="w-80 border-r border-white/10 p-4 overflow-y-auto flex-shrink-0">
          <h2 className="text-white/60 text-xs uppercase tracking-wider mb-4">
            Season Timeline
          </h2>
          
          <div className="space-y-2">
            {season.phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`p-4 border ${phaseColors[phase.status]} transition-all`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{phaseIcons[phase.type]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold truncate ${
                        phase.status === 'active' ? 'text-emerald-400' : 
                        phase.status === 'completed' ? 'text-white/50' : 'text-white'
                      }`}>
                        {phase.name}
                      </h3>
                      {phase.status === 'active' && (
                        <span className="text-xs bg-emerald-500 text-black px-2 py-0.5 font-bold">
                          NOW
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-xs mt-1">
                      {phase.month || `${phase.weeks} weeks`}
                    </p>
                    {phase.status === 'active' && (
                      <p className="text-emerald-400 text-xs mt-1">
                        Week {phase.currentWeek} of {phase.weeks}
                      </p>
                    )}
                    {phase.status === 'completed' && (
                      <p className="text-white/30 text-xs mt-1">✓ Completed</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Current Phase Details */}
        <div className="flex-1 p-6 overflow-y-auto">
          {currentPhase ? (
            <div className="max-w-3xl">
              
              {/* Phase Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{phaseIcons[currentPhase.type]}</span>
                  <div>
                    <h2 
                      className="text-3xl font-bold text-white uppercase tracking-wider"
                      style={{ fontFamily: 'Arial Black, sans-serif' }}
                    >
                      {currentPhase.name}
                    </h2>
                    <p className="text-white/60">
                      Week {currentPhase.currentWeek} of {currentPhase.weeks}
                    </p>
                  </div>
                </div>
                <p className="text-white/70 mt-4">
                  {currentPhase.description}
                </p>
              </div>

              {/* Week Progress */}
              <div className="bg-white/5 border border-white/10 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Phase Progress</h3>
                  <span className="text-white/60 text-sm">
                    {currentPhase.currentWeek}/{currentPhase.weeks} weeks
                  </span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: currentPhase.weeks }, (_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-3 ${
                        i < currentPhase.currentWeek 
                          ? 'bg-emerald-500' 
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Phase Activities */}
              <div className="mb-8">
                <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">
                  Available Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {activities.map(activity => (
                    <button
                      key={activity}
                      onClick={() => onPhaseAction(activity)}
                      className="bg-white/5 border border-white/10 p-4 text-left hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white capitalize font-medium">
                        {activity.replace('_', ' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phase-Specific Content */}
              {currentPhase.type === 'games' && (
                <div className="bg-white/5 border border-white/10 p-6 mb-6">
                  <h3 className="text-white font-semibold mb-2">Games This Week</h3>
                  <p className="text-white/60 text-sm">
                    {currentPhase.gamesPerTeam} games per team this phase
                  </p>
                </div>
              )}

              {currentPhase.type === 'playoffs' && currentPhase.rounds && (
                <div className="bg-white/5 border border-white/10 p-6 mb-6">
                  <h3 className="text-white font-semibold mb-4">Playoff Rounds</h3>
                  <div className="space-y-2">
                    {currentPhase.rounds.map((round, index) => (
                      <div 
                        key={round.name}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-white/70">{round.name}</span>
                        <span className="text-white/40">
                          {round.teams} teams • Best of {round.games}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentPhase.type === 'event' && currentPhase.activities && (
                <div className="bg-white/5 border border-white/10 p-6 mb-6">
                  <h3 className="text-white font-semibold mb-4">Event Agenda</h3>
                  <div className="space-y-2">
                    {currentPhase.activities.map(activity => (
                      <div 
                        key={activity}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-2 h-2 bg-emerald-500" />
                        <span className="text-white/70 capitalize">
                          {activity.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advance Buttons */}
              <div className="flex gap-4">
                {currentPhase.currentWeek < currentPhase.weeks ? (
                  <button
                    onClick={onAdvanceWeek}
                    className="flex-1 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Advance Week
                  </button>
                ) : (
                  <button
                    onClick={onAdvancePhase}
                    className="flex-1 py-4 bg-emerald-500 text-black font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    Complete Phase →
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-white/40 text-xl mb-4">🏆 Season Complete!</p>
                {season.champion && (
                  <p className="text-white text-2xl font-bold">
                    Champion: {season.champion}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}