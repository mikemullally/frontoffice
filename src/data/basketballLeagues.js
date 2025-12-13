// REAL WORLD BASKETBALL LEAGUES AND TEAMS

export const basketballLeagues = {
  nba: {
    id: 'nba',
    name: 'NBA',
    fullName: 'National Basketball Association',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1504450758481-7338bbe7524a?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 140000000,
    teams: [
      { name: 'Atlanta Hawks', code: 'ATL', rating: 72 },
      { name: 'Boston Celtics', code: 'BOS', rating: 88 },
      { name: 'Brooklyn Nets', code: 'BKN', rating: 68 },
      { name: 'Charlotte Hornets', code: 'CHA', rating: 65 },
      { name: 'Chicago Bulls', code: 'CHI', rating: 70 },
      { name: 'Cleveland Cavaliers', code: 'CLE', rating: 82 },
      { name: 'Dallas Mavericks', code: 'DAL', rating: 78 },
      { name: 'Denver Nuggets', code: 'DEN', rating: 85 },
      { name: 'Detroit Pistons', code: 'DET', rating: 62 },
      { name: 'Golden State Warriors', code: 'GSW', rating: 76 },
      { name: 'Houston Rockets', code: 'HOU', rating: 66 },
      { name: 'Indiana Pacers', code: 'IND', rating: 74 },
      { name: 'LA Clippers', code: 'LAC', rating: 73 },
      { name: 'Los Angeles Lakers', code: 'LAL', rating: 75 },
      { name: 'Memphis Grizzlies', code: 'MEM', rating: 71 },
      { name: 'Miami Heat', code: 'MIA', rating: 74 },
      { name: 'Milwaukee Bucks', code: 'MIL', rating: 83 },
      { name: 'Minnesota Timberwolves', code: 'MIN', rating: 80 },
      { name: 'New Orleans Pelicans', code: 'NOP', rating: 72 },
      { name: 'New York Knicks', code: 'NYK', rating: 77 },
      { name: 'Oklahoma City Thunder', code: 'OKC', rating: 81 },
      { name: 'Orlando Magic', code: 'ORL', rating: 70 },
      { name: 'Philadelphia 76ers', code: 'PHI', rating: 76 },
      { name: 'Phoenix Suns', code: 'PHX', rating: 74 },
      { name: 'Portland Trail Blazers', code: 'POR', rating: 64 },
      { name: 'Sacramento Kings', code: 'SAC', rating: 73 },
      { name: 'San Antonio Spurs', code: 'SAS', rating: 67 },
      { name: 'Toronto Raptors', code: 'TOR', rating: 69 },
      { name: 'Utah Jazz', code: 'UTA', rating: 66 },
      { name: 'Washington Wizards', code: 'WAS', rating: 63 }
    ]
  },
  euroleague: {
    id: 'euroleague',
    name: 'EuroLeague',
    fullName: 'Turkish Airlines EuroLeague',
    country: 'Europe',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Real Madrid', code: 'RMA', rating: 86 },
      { name: 'FC Barcelona', code: 'BAR', rating: 84 },
      { name: 'Olympiacos', code: 'OLY', rating: 80 },
      { name: 'Panathinaikos', code: 'PAN', rating: 79 },
      { name: 'Fenerbahçe', code: 'FEN', rating: 78 },
      { name: 'Anadolu Efes', code: 'EFS', rating: 77 },
      { name: 'CSKA Moscow', code: 'CSK', rating: 75 },
      { name: 'Maccabi Tel Aviv', code: 'MAC', rating: 76 },
      { name: 'Žalgiris Kaunas', code: 'ZAL', rating: 74 },
      { name: 'Bayern Munich', code: 'BAY', rating: 73 },
      { name: 'AS Monaco', code: 'MON', rating: 77 },
      { name: 'Virtus Bologna', code: 'VIR', rating: 75 },
      { name: 'Partizan Belgrade', code: 'PAR', rating: 76 },
      { name: 'Crvena Zvezda', code: 'CZV', rating: 74 },
      { name: 'ALBA Berlin', code: 'ALB', rating: 72 },
      { name: 'Baskonia', code: 'BAS', rating: 73 }
    ]
  },
  cba: {
    id: 'cba',
    name: 'CBA',
    fullName: 'Chinese Basketball Association',
    country: 'China',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 40000000,
    teams: [
      { name: 'Guangdong Southern Tigers', code: 'GUA', rating: 82 },
      { name: 'Liaoning Flying Leopards', code: 'LIA', rating: 80 },
      { name: 'Beijing Ducks', code: 'BEI', rating: 76 },
      { name: 'Shanghai Sharks', code: 'SHA', rating: 74 },
      { name: 'Zhejiang Lions', code: 'ZHE', rating: 78 },
      { name: 'Xinjiang Flying Tigers', code: 'XIN', rating: 75 },
      { name: 'Shandong Heroes', code: 'SHD', rating: 73 },
      { name: 'Jilin Northeast Tigers', code: 'JIL', rating: 71 },
      { name: 'Shenzhen Aviators', code: 'SHZ', rating: 74 },
      { name: 'Fujian Sturgeons', code: 'FUJ', rating: 70 },
      { name: 'Guangzhou Loong Lions', code: 'GZH', rating: 69 },
      { name: 'Nanjing Monkey Kings', code: 'NAN', rating: 68 }
    ]
  },
  nbl: {
    id: 'nbl',
    name: 'NBL',
    fullName: 'National Basketball League',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 5000000,
    teams: [
      { name: 'Perth Wildcats', code: 'PER', rating: 78 },
      { name: 'Melbourne United', code: 'MEL', rating: 77 },
      { name: 'Sydney Kings', code: 'SYD', rating: 79 },
      { name: 'Brisbane Bullets', code: 'BRI', rating: 72 },
      { name: 'Adelaide 36ers', code: 'ADE', rating: 71 },
      { name: 'New Zealand Breakers', code: 'NZB', rating: 73 },
      { name: 'Illawarra Hawks', code: 'ILL', rating: 70 },
      { name: 'Cairns Taipans', code: 'CAI', rating: 69 },
      { name: 'South East Melbourne Phoenix', code: 'SEM', rating: 74 },
      { name: 'Tasmania JackJumpers', code: 'TAS', rating: 75 }
    ]
  }
};

export function getLeagueList() {
  return Object.values(basketballLeagues).map(league => ({
    id: league.id,
    name: league.name,
    fullName: league.fullName,
    country: league.country,
    image: league.image,
    teamCount: league.teams.length,
    hasSalaryCap: league.hasSalaryCap
  }));
}

export function getLeagueById(id) {
  return basketballLeagues[id] || null;
}

export function getTeamsForLeague(leagueId) {
  const league = basketballLeagues[leagueId];
  if (!league) return [];
  
  return league.teams.map(team => ({
    ...team,
    sport: 'basketball',
    league: leagueId,
    roster: [],
    wins: 0,
    losses: 0,
    budget: league.hasSalaryCap ? league.salaryCap : null,
    salaryUsed: 0
  }));
}