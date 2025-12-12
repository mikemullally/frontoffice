import React from 'react';
import { 
  Card, 
  StatCard, 
  PlayerCard, 
  Table, 
  TableHeader, 
  TableHeaderCell, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  ProgressBar 
} from './ui';

export default function DemoDashboard() {
  const team = {
    name: "New York Knicks",
    wins: 32,
    losses: 17,
    salaryUsed: 125000000,
    salaryCap: 140000000
  };

  const players = [
    { name: "Jalen Brunson", position: "PG", team: "NYK", shooting: 82, defense: 70, rebounding: 48, ballHandling: 88, passing: 80 },
    { name: "Julius Randle", position: "PF", team: "NYK", shooting: 78, defense: 68, rebounding: 82, ballHandling: 78, passing: 72 },
    { name: "RJ Barrett", position: "SF", team: "NYK", shooting: 72, defense: 72, rebounding: 68, ballHandling: 75, passing: 62 }
  ];

  const standings = [
    { rank: 1, team: "Boston Celtics", wins: 38, losses: 12, pct: ".760" },
    { rank: 2, team: "New York Knicks", wins: 32, losses: 17, pct: ".653" },
    { rank: 3, team: "Milwaukee Bucks", wins: 30, losses: 19, pct: ".612" },
    { rank: 4, team: "Cleveland Cavaliers", wins: 29, losses: 19, pct: ".604" },
    { rank: 5, team: "Miami Heat", wins: 28, losses: 21, pct: ".571" }
  ];

  const getOverall = (p) => {
    return Math.round((p.shooting + p.defense + p.rebounding + p.ballHandling + p.passing) / 5);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">🏀 {team.name}</h1>
            <p className="text-slate-400 mt-1">2024-25 Season Dashboard</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" icon="⚙️">Settings</Button>
            <Button variant="primary" icon="▶️">Play Next Game</Button>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard 
            label="Record" 
            value={`${team.wins}-${team.losses}`} 
            subvalue="2nd in Eastern Conference"
            color="green"
          />
          <StatCard 
            label="Win Rate" 
            value=".653" 
            trend={5.2}
            color="blue"
          />
          <StatCard 
            label="Points Per Game" 
            value="118.4" 
            subvalue="3rd in NBA"
            color="orange"
          />
          <StatCard 
            label="Roster" 
            value="12/15" 
            subvalue="3 spots available"
            color="cyan"
          />
        </div>

        {/* Salary Cap */}
        <Card>
          <h3 className="text-lg font-bold text-white mb-4">Salary Cap</h3>
          <ProgressBar 
            value={team.salaryUsed} 
            max={team.salaryCap}
            label="Cap Space"
            color="dynamic"
            size="lg"
          />
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-emerald-400">$15.0M available</span>
            <span className="text-slate-400">89% utilized</span>
          </div>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Player Cards */}
          <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Top Players</h3>
              <Button variant="ghost" size="sm">View All →</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {players.map((player) => (
                <PlayerCard 
                  key={player.name}
                  player={player}
                  rating={getOverall(player)}
                  sport="basketball"
                />
              ))}
            </div>
          </div>

          {/* Standings */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Standings</h3>
              <Button variant="ghost" size="sm">Full →</Button>
            </div>
            <Table>
              <TableHeader>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Team</TableHeaderCell>
                <TableHeaderCell align="center">W</TableHeaderCell>
                <TableHeaderCell align="center">L</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {standings.map((row) => (
                  <TableRow key={row.rank} highlight={row.team === team.name}>
                    <TableCell>{row.rank}</TableCell>
                    <TableCell highlight={row.team === team.name}>{row.team}</TableCell>
                    <TableCell align="center">{row.wins}</TableCell>
                    <TableCell align="center">{row.losses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Action Buttons */}
        <Card>
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            <Button variant="primary" fullWidth icon="📋">Manage Roster</Button>
            <Button variant="success" fullWidth icon="✍️">Sign Free Agent</Button>
            <Button variant="secondary" fullWidth icon="🔄">Make Trade</Button>
            <Button variant="danger" fullWidth icon="📅">View Schedule</Button>
          </div>
        </Card>

      </div>
    </div>
  );
}