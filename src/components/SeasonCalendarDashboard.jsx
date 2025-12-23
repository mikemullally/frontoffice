import React, { useState } from 'react';
import { getSeasonProgress } from '../core/scheduleEngine';
import { 
  getStandingsConfig, 
  sortStandings, 
  calculateStandingsValues,
  getCellValue,
  formatStandingsValue 
} from '../data/standingsConfig';
import QuitButton from './ui/QuitButton';

export default function SeasonCalendarDashboard({
  schedule,
  league,
  onSimulateDay,
  onSimulateWeek,
  onSimulateSeason,
  onBack,
  onQuit
}) {
  const [view, setView] = useState('standings');
  
  const progress = getSeasonProgress(schedule);
  const standingsConfig = getStandingsConfig(league.sport);
  const sortedStandings = sortStandings(schedule.standings, standingsConfig);
  
  // Calculate values for leader (for games behind calculation)
  const leader = sortedStandings[0] ? calculateStandingsValues(sortedStandings[0], standingsConfig) : null;
  
  const today = schedule.calendar[schedule.currentDayIndex];
  const yesterday = schedule.currentDayIndex > 0 
    ? schedule.calendar[schedule.currentDayIndex - 1] 
    : null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get zone color for a position (soccer relegation/champions league zones)
  const getZoneColor = (position) => {
    if (!standingsConfig.zones) return null;
    
    for (const zone of standingsConfig.zones) {
      if (position >= zone.positions[0] && position <= zone.positions[1]) {
        return zone.color;
      }
    }
    return null;
  };

  const getZoneBorderClass = (position) => {
    const color = getZoneColor(position);
    if (!color) return '';
    
    const colorMap = {
      emerald: 'border-l-2 border-l-emerald-500',
      blue: 'border-l-2 border-l-blue-500',
      red: 'border-l-2 border-l-red-500',
      yellow: 'border-l-2 border-l-yellow-500'
    };
    
    return colorMap[color] || '';
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <div className="h-4 w-px bg-white/20" /> {/* Divider */}
          <QuitButton onQuit={onQuit} />
          <div>
            <h1 
              className="text-xl font-bold text-white uppercase tracking-wider"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              {league.name}
            </h1>
            <p className="text-white/60 text-xs">
              {schedule.phase === 'regular' ? 'Regular Season' : 'Playoffs'} • {progress.percentComplete}% Complete
            </p>
          </div>
        </div>
        
        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p className="text-white">{progress.gamesCompleted} / {progress.totalGames}</p>
            <p className="text-white/40 text-xs">Games Played</p>
          </div>
          <div className="w-32 h-2 bg-white/10">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progress.percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex border-b border-white/10 flex-shrink-0">
        <button
          onClick={() => setView('standings')}
          className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
            view === 'standings' 
              ? 'text-white border-b-2 border-white' 
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          {standingsConfig.label}
        </button>
        {['calendar', 'results'].map(tab => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
              view === tab 
                ? 'text-white border-b-2 border-white' 
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Standings/Calendar/Results */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* Standings View */}
          {view === 'standings' && (
            <div className="max-w-5xl mx-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                    {standingsConfig.columns.map(col => (
                      <th 
                        key={col.id} 
                        className={`py-3 px-2 ${col.width} ${
                          col.align === 'center' ? 'text-center' : 
                          col.align === 'right' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedStandings.map((team, index) => {
                    const position = index + 1;
                    const isPlayoffSpot = standingsConfig.playoffLine && position <= schedule.config.playoffTeams;
                    const isPlayoffLine = standingsConfig.playoffLine && position === schedule.config.playoffTeams;
                    const zoneClass = getZoneBorderClass(position);
                    
                    return (
                      <tr 
                        key={team.team}
                        className={`border-b border-white/5 ${zoneClass} ${
                          isPlayoffSpot ? 'bg-white/5' : ''
                        } ${isPlayoffLine ? 'border-b-2 border-b-white/20' : ''}`}
                      >
                        {standingsConfig.columns.map(col => {
                          // Handle rank column specially
                          if (col.id === 'rank') {
                            return (
                              <td key={col.id} className="py-3 px-2 text-center text-white/40">
                                {position}
                              </td>
                            );
                          }
                          
                          // Handle team column specially
                          if (col.id === 'team') {
                            return (
                              <td key={col.id} className="py-3 px-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-semibold">{team.team}</span>
                                  <span className="text-white/30 text-xs">{team.rating}</span>
                                </div>
                              </td>
                            );
                          }
                          
                          // Get and format value
                          const rawValue = getCellValue(team, col.id, standingsConfig, leader);
                          const displayValue = formatStandingsValue(rawValue, col.id, standingsConfig);
                          
                          // Determine styling
                          const isHighlight = col.highlight;
                          const isStreak = col.id === 'streak';
                          
                          let textClass = 'text-white';
                          if (isStreak && typeof rawValue === 'number') {
                            textClass = rawValue > 0 ? 'text-emerald-400' : rawValue < 0 ? 'text-red-400' : 'text-white/40';
                          } else if (isHighlight) {
                            textClass = 'text-white font-bold';
                          }
                          
                          return (
                            <td 
                              key={col.id} 
                              className={`py-3 px-2 ${
                                col.align === 'center' ? 'text-center' : 
                                col.align === 'right' ? 'text-right' : 'text-left'
                              } ${textClass}`}
                            >
                              {displayValue}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {/* Legend for zones (soccer) */}
              {standingsConfig.zones && (
                <div className="flex gap-6 mt-4 text-xs">
                  {standingsConfig.zones.map(zone => (
                    <div key={zone.label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 bg-${zone.color}-500`} />
                      <span className="text-white/50">{zone.label}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {standingsConfig.playoffLine && schedule.config.playoffTeams > 0 && (
                <p className="text-white/30 text-xs mt-4 text-center">
                  Top {schedule.config.playoffTeams} teams qualify for playoffs
                </p>
              )}
            </div>
          )}

          {/* Calendar View */}
          {view === 'calendar' && (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {schedule.calendar.slice(
                  Math.max(0, schedule.currentDayIndex - 3),
                  schedule.currentDayIndex + 10
                ).map((day, index) => {
                  const actualIndex = Math.max(0, schedule.currentDayIndex - 3) + index;
                  const isToday = actualIndex === schedule.currentDayIndex;
                  const isPast = actualIndex < schedule.currentDayIndex;
                  
                  return (
                    <div 
                      key={day.date}
                      className={`border ${
                        isToday ? 'border-emerald-500 bg-emerald-500/10' : 
                        isPast ? 'border-white/5 bg-white/5' : 'border-white/10'
                      } p-4`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`font-semibold ${isToday ? 'text-emerald-400' : 'text-white'}`}>
                            {formatDate(day.date)}
                          </span>
                          {isToday && (
                            <span className="text-xs bg-emerald-500 text-black px-2 py-0.5 font-bold">
                              TODAY
                            </span>
                          )}
                        </div>
                        <span className="text-white/40 text-sm">
                          {day.games.length} games
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {day.games.map((game, gIndex) => (
                          <div 
                            key={gIndex}
                            className="bg-black/30 p-2 text-sm flex justify-between items-center"
                          >
                            <span className="text-white/70">{game.away.name}</span>
                            <span className="text-white/30">@</span>
                            <span className="text-white">{game.home.name}</span>
                            {game.played && (
                              <span className="text-emerald-400 ml-2">
                                {game.awayScore}-{game.homeScore}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results View */}
          {view === 'results' && (
            <div className="max-w-4xl mx-auto">
              {yesterday ? (
                <div>
                  <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">
                    Yesterday's Results - {formatDate(yesterday.date)}
                  </h3>
                  <div className="space-y-2">
                    {yesterday.games.map((game, index) => {
                      const homeWon = game.homeScore > game.awayScore;
                      const isDraw = game.homeScore === game.awayScore;
                      
                      return (
                        <div 
                          key={index}
                          className="bg-white/5 border border-white/10 p-4 flex items-center justify-between"
                        >
                          <div className="flex-1 text-right">
                            <span className={!homeWon && !isDraw ? 'text-white font-semibold' : 'text-white/60'}>
                              {game.away.name}
                            </span>
                          </div>
                          <div className="px-6 text-center">
                            <span className={`text-2xl font-bold ${!homeWon && !isDraw ? 'text-white' : isDraw ? 'text-white/70' : 'text-white/40'}`}>
                              {game.awayScore}
                            </span>
                            <span className="text-white/30 mx-2">-</span>
                            <span className={`text-2xl font-bold ${homeWon ? 'text-white' : isDraw ? 'text-white/70' : 'text-white/40'}`}>
                              {game.homeScore}
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className={homeWon ? 'text-white font-semibold' : 'text-white/60'}>
                              {game.home.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/40 py-8">
                  No results yet - simulate some games!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Panel - Today's Games & Controls */}
        <div className="w-80 border-l border-white/10 p-4 flex flex-col flex-shrink-0">
          
          {/* Current Date */}
          <div className="mb-4">
            <p className="text-white/40 text-xs uppercase tracking-wider">Current Date</p>
            <p className="text-white text-lg font-semibold">
              {today ? formatDate(today.date) : 'Season Complete'}
            </p>
          </div>

          {/* Today's Games */}
          {today && (
            <div className="flex-1 overflow-y-auto mb-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                Today's Games ({today.games.length})
              </p>
              <div className="space-y-2">
                {today.games.map((game, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 border border-white/10 p-3"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">{game.away.code || game.away.name.slice(0, 3).toUpperCase()}</span>
                      <span className="text-white/30">@</span>
                      <span className="text-white">{game.home.code || game.home.name.slice(0, 3).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/30 mt-1">
                      <span>{game.away.rating}</span>
                      <span>{game.home.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Simulation Controls */}
          {schedule.phase === 'regular' && today && (
            <div className="space-y-2">
              <button
                onClick={onSimulateDay}
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                Simulate Day
              </button>
              <button
                onClick={onSimulateWeek}
                className="w-full py-3 bg-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-colors"
              >
                Simulate Week
              </button>
              <button
                onClick={onSimulateSeason}
                className="w-full py-3 bg-white/5 text-white/70 font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors"
              >
                Sim to Playoffs
              </button>
            </div>
          )}

          {/* Playoffs or Season Complete */}
          {schedule.phase === 'playoffs' && (
            <div className="text-center py-4">
              <p className="text-emerald-400 font-bold uppercase tracking-wider">
                Playoffs Started!
              </p>
              <p className="text-white/40 text-sm mt-2">
                Playoff bracket coming soon...
              </p>
            </div>
          )}

          {schedule.phase === 'complete' && (
            <div className="text-center py-4">
              <p className="text-yellow-400 font-bold uppercase tracking-wider">
                🏆 Season Complete!
              </p>
              <p className="text-white text-lg mt-2">
                {schedule.champion?.team || 'Champion'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}