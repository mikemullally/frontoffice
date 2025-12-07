import React from 'react';
import { getSportConfig } from '../data/sportConfig';

export default function ScheduleView({ competition, onBack }) {
  const config = getSportConfig(competition.sport);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Schedule</h2>
        <button onClick={onBack} className="text-slate-400 hover:text-white">
          ← Back
        </button>
      </div>

      <div className="space-y-2">
        {competition.schedule.map((game, index) => (
          <div 
            key={index}
            className={`bg-slate-700 rounded-lg p-4 ${
              game.status === 'completed' ? 'opacity-75' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className={`text-white ${
                  game.status === 'completed' && game.homeScore > game.awayScore 
                    ? 'font-bold' : ''
                }`}>
                  {game.homeTeam}
                </span>
                <span className="text-slate-500 mx-2">vs</span>
                <span className={`text-white ${
                  game.status === 'completed' && game.awayScore > game.homeScore 
                    ? 'font-bold' : ''
                }`}>
                  {game.awayTeam}
                </span>
              </div>
              
              <div className="text-right">
                {game.status === 'completed' ? (
                  <span className="text-blue-400 font-bold">
                    {game.homeScore} - {game.awayScore}
                  </span>
                ) : (
                  <span className="text-slate-400 text-sm">Scheduled</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}