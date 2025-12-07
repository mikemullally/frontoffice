import React from 'react';
import { getStandings, getNextGame, getRemainingGames } from '../core/competitionManager';
import { getSportConfig } from '../data/sportConfig';

export default function CompetitionDashboard({ 
  competition, 
  onViewSchedule, 
  onViewStandings,
  onPlayNextGame,
  onBack 
}) {
  const config = getSportConfig(competition.sport);
  const standings = getStandings(competition);
  const nextGame = getNextGame(competition);
  const remainingGames = getRemainingGames(competition);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          {config.emoji} {competition.name}
        </h2>
        <button onClick={onBack} className="text-slate-400 hover:text-white">
          ← Back
        </button>
      </div>

      {/* Status */}
      <div className="bg-slate-700 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-white">{competition.teams.length}</div>
            <div className="text-slate-400 text-sm">Teams</div>
          </div>
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-blue-400">
              {competition.schedule.length - remainingGames.length}
            </div>
            <div className="text-slate-400 text-sm">Games Played</div>
          </div>
          <div className="bg-slate-600 rounded p-4">
            <div className="text-3xl font-bold text-yellow-400">{remainingGames.length}</div>
            <div className="text-slate-400 text-sm">Games Left</div>
          </div>
        </div>
      </div>

      {/* Champion Banner */}
      {competition.champion && (
        <div className="bg-yellow-500 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-black">
            🏆 {competition.champion} wins the championship! 🏆
          </div>
        </div>
      )}

      {/* Next Game */}
      {nextGame && (
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Next Game</h3>
          <div className="flex justify-between items-center">
            <div className="text-white text-xl">
              {nextGame.homeTeam} vs {nextGame.awayTeam}
            </div>
            <button
              onClick={onPlayNextGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              Play Game
            </button>
          </div>
        </div>
      )}

      {/* Quick Standings */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Standings</h3>
        <div className="space-y-2">
          {standings.slice(0, 4).map((team, index) => (
            <div 
              key={team.team}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-white">
                {index + 1}. {team.team}
              </span>
              <span className="text-slate-400">
                {team.wins}-{team.losses}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onViewStandings}
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold"
        >
          Full Standings
        </button>
        <button
          onClick={onViewSchedule}
          className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-bold"
        >
          View Schedule
        </button>
      </div>
    </div>
  );
}