// REAL WORLD SOCCER LEAGUES AND TEAMS

export const soccerLeagues = {
  premier_league: {
    id: 'premier_league',
    name: 'Premier League',
    fullName: 'English Premier League',
    country: 'England',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Manchester City', code: 'MCI', rating: 91 },
      { name: 'Arsenal', code: 'ARS', rating: 88 },
      { name: 'Liverpool', code: 'LIV', rating: 87 },
      { name: 'Manchester United', code: 'MUN', rating: 82 },
      { name: 'Chelsea', code: 'CHE', rating: 81 },
      { name: 'Tottenham Hotspur', code: 'TOT', rating: 80 },
      { name: 'Newcastle United', code: 'NEW', rating: 79 },
      { name: 'Aston Villa', code: 'AVL', rating: 78 },
      { name: 'Brighton', code: 'BHA', rating: 76 },
      { name: 'West Ham United', code: 'WHU', rating: 75 },
      { name: 'Crystal Palace', code: 'CRY', rating: 73 },
      { name: 'Fulham', code: 'FUL', rating: 72 },
      { name: 'Brentford', code: 'BRE', rating: 72 },
      { name: 'Everton', code: 'EVE', rating: 71 },
      { name: 'Nottingham Forest', code: 'NFO', rating: 71 },
      { name: 'Wolverhampton', code: 'WOL', rating: 70 },
      { name: 'Bournemouth', code: 'BOU', rating: 70 },
      { name: 'Leicester City', code: 'LEI', rating: 69 },
      { name: 'Ipswich Town', code: 'IPS', rating: 67 },
      { name: 'Southampton', code: 'SOU', rating: 66 }
    ]
  },
  la_liga: {
    id: 'la_liga',
    name: 'La Liga',
    fullName: 'La Liga Española',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Real Madrid', code: 'RMA', rating: 90 },
      { name: 'FC Barcelona', code: 'BAR', rating: 88 },
      { name: 'Atlético Madrid', code: 'ATM', rating: 84 },
      { name: 'Athletic Bilbao', code: 'ATH', rating: 79 },
      { name: 'Real Sociedad', code: 'RSO', rating: 78 },
      { name: 'Real Betis', code: 'BET', rating: 77 },
      { name: 'Villarreal', code: 'VIL', rating: 77 },
      { name: 'Sevilla', code: 'SEV', rating: 75 },
      { name: 'Valencia', code: 'VAL', rating: 74 },
      { name: 'Girona', code: 'GIR', rating: 76 },
      { name: 'Getafe', code: 'GET', rating: 72 },
      { name: 'Celta Vigo', code: 'CEL', rating: 72 },
      { name: 'Osasuna', code: 'OSA', rating: 71 },
      { name: 'Rayo Vallecano', code: 'RAY', rating: 70 },
      { name: 'Mallorca', code: 'MLL', rating: 70 },
      { name: 'Las Palmas', code: 'LPA', rating: 69 },
      { name: 'Alavés', code: 'ALA', rating: 68 },
      { name: 'Espanyol', code: 'ESP', rating: 68 },
      { name: 'Leganés', code: 'LEG', rating: 67 },
      { name: 'Valladolid', code: 'VLD', rating: 66 }
    ]
  },
  bundesliga: {
    id: 'bundesliga',
    name: 'Bundesliga',
    fullName: 'German Bundesliga',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Bayern Munich', code: 'BAY', rating: 89 },
      { name: 'Bayer Leverkusen', code: 'LEV', rating: 86 },
      { name: 'Borussia Dortmund', code: 'BVB', rating: 84 },
      { name: 'RB Leipzig', code: 'RBL', rating: 82 },
      { name: 'VfB Stuttgart', code: 'STU', rating: 78 },
      { name: 'Eintracht Frankfurt', code: 'SGE', rating: 77 },
      { name: 'Wolfsburg', code: 'WOB', rating: 74 },
      { name: 'Freiburg', code: 'FRE', rating: 75 },
      { name: 'Borussia Mönchengladbach', code: 'BMG', rating: 73 },
      { name: 'Hoffenheim', code: 'HOF', rating: 73 },
      { name: 'Werder Bremen', code: 'SVW', rating: 72 },
      { name: 'Mainz 05', code: 'M05', rating: 71 },
      { name: 'Union Berlin', code: 'UNB', rating: 72 },
      { name: 'FC Augsburg', code: 'AUG', rating: 70 },
      { name: 'FC Köln', code: 'KOE', rating: 69 },
      { name: 'Heidenheim', code: 'HDH', rating: 68 },
      { name: 'St. Pauli', code: 'STP', rating: 67 },
      { name: 'Holstein Kiel', code: 'KIE', rating: 66 }
    ]
  },
  serie_a: {
    id: 'serie_a',
    name: 'Serie A',
    fullName: 'Italian Serie A',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1516475429286-465d815a0df7?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Inter Milan', code: 'INT', rating: 87 },
      { name: 'AC Milan', code: 'MIL', rating: 83 },
      { name: 'Juventus', code: 'JUV', rating: 82 },
      { name: 'Napoli', code: 'NAP', rating: 81 },
      { name: 'Atalanta', code: 'ATA', rating: 82 },
      { name: 'Roma', code: 'ROM', rating: 78 },
      { name: 'Lazio', code: 'LAZ', rating: 77 },
      { name: 'Fiorentina', code: 'FIO', rating: 76 },
      { name: 'Bologna', code: 'BOL', rating: 75 },
      { name: 'Torino', code: 'TOR', rating: 73 },
      { name: 'Monza', code: 'MON', rating: 71 },
      { name: 'Udinese', code: 'UDI', rating: 71 },
      { name: 'Genoa', code: 'GEN', rating: 70 },
      { name: 'Cagliari', code: 'CAG', rating: 69 },
      { name: 'Lecce', code: 'LEC', rating: 68 },
      { name: 'Parma', code: 'PAR', rating: 68 },
      { name: 'Empoli', code: 'EMP', rating: 67 },
      { name: 'Como', code: 'COM', rating: 66 },
      { name: 'Verona', code: 'VER', rating: 66 },
      { name: 'Venezia', code: 'VEN', rating: 65 }
    ]
  },
  ligue_1: {
    id: 'ligue_1',
    name: 'Ligue 1',
    fullName: 'French Ligue 1',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Paris Saint-Germain', code: 'PSG', rating: 88 },
      { name: 'Monaco', code: 'MON', rating: 80 },
      { name: 'Marseille', code: 'OM', rating: 78 },
      { name: 'Lille', code: 'LIL', rating: 77 },
      { name: 'Lyon', code: 'OL', rating: 76 },
      { name: 'Nice', code: 'NIC', rating: 75 },
      { name: 'Lens', code: 'LEN', rating: 76 },
      { name: 'Rennes', code: 'REN', rating: 74 },
      { name: 'Brest', code: 'BRE', rating: 73 },
      { name: 'Reims', code: 'REI', rating: 71 },
      { name: 'Toulouse', code: 'TOU', rating: 71 },
      { name: 'Montpellier', code: 'MTP', rating: 70 },
      { name: 'Strasbourg', code: 'STR', rating: 70 },
      { name: 'Nantes', code: 'NAN', rating: 69 },
      { name: 'Auxerre', code: 'AUX', rating: 67 },
      { name: 'Angers', code: 'ANG', rating: 66 },
      { name: 'Le Havre', code: 'HAV', rating: 66 },
      { name: 'Saint-Étienne', code: 'STE', rating: 65 }
    ]
  },
  brasileirao: {
    id: 'brasileirao',
    name: 'Brasileirão',
    fullName: 'Campeonato Brasileiro Série A',
    country: 'Brazil',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    teams: [
      { name: 'Flamengo', code: 'FLA', rating: 83 },
      { name: 'Palmeiras', code: 'PAL', rating: 84 },
      { name: 'São Paulo', code: 'SAO', rating: 79 },
      { name: 'Fluminense', code: 'FLU', rating: 77 },
      { name: 'Corinthians', code: 'COR', rating: 76 },
      { name: 'Atlético Mineiro', code: 'CAM', rating: 78 },
      { name: 'Botafogo', code: 'BOT', rating: 79 },
      { name: 'Internacional', code: 'INT', rating: 76 },
      { name: 'Grêmio', code: 'GRE', rating: 75 },
      { name: 'Cruzeiro', code: 'CRU', rating: 74 },
      { name: 'Athletico Paranaense', code: 'CAP', rating: 74 },
      { name: 'Santos', code: 'SAN', rating: 72 },
      { name: 'Fortaleza', code: 'FOR', rating: 73 },
      { name: 'Bahia', code: 'BAH', rating: 72 },
      { name: 'Vasco da Gama', code: 'VAS', rating: 71 },
      { name: 'Red Bull Bragantino', code: 'RBB', rating: 73 },
      { name: 'Cuiabá', code: 'CUI', rating: 68 },
      { name: 'Vitória', code: 'VIT', rating: 67 },
      { name: 'Juventude', code: 'JUV', rating: 66 },
      { name: 'Atlético Goianiense', code: 'ACG', rating: 65 }
    ]
  },
  mls: {
    id: 'mls',
    name: 'MLS',
    fullName: 'Major League Soccer',
    country: 'USA & Canada',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 5500000,
    teams: [
      { name: 'Inter Miami', code: 'MIA', rating: 80 },
      { name: 'LAFC', code: 'LAFC', rating: 79 },
      { name: 'LA Galaxy', code: 'LAG', rating: 76 },
      { name: 'Atlanta United', code: 'ATL', rating: 74 },
      { name: 'Seattle Sounders', code: 'SEA', rating: 75 },
      { name: 'Cincinnati', code: 'CIN', rating: 77 },
      { name: 'Columbus Crew', code: 'CLB', rating: 78 },
      { name: 'New York Red Bulls', code: 'RBNY', rating: 73 },
      { name: 'NYCFC', code: 'NYC', rating: 74 },
      { name: 'Philadelphia Union', code: 'PHI', rating: 75 },
      { name: 'Portland Timbers', code: 'POR', rating: 72 },
      { name: 'Austin FC', code: 'ATX', rating: 73 },
      { name: 'Nashville SC', code: 'NSH', rating: 72 },
      { name: 'Toronto FC', code: 'TOR', rating: 70 },
      { name: 'CF Montréal', code: 'MTL', rating: 71 },
      { name: 'Vancouver Whitecaps', code: 'VAN', rating: 69 },
      { name: 'Houston Dynamo', code: 'HOU', rating: 72 },
      { name: 'Orlando City', code: 'ORL', rating: 73 },
      { name: 'Charlotte FC', code: 'CLT', rating: 70 },
      { name: 'DC United', code: 'DC', rating: 68 },
      { name: 'Chicago Fire', code: 'CHI', rating: 67 },
      { name: 'Colorado Rapids', code: 'COL', rating: 71 },
      { name: 'FC Dallas', code: 'DAL', rating: 70 },
      { name: 'Minnesota United', code: 'MIN', rating: 72 },
      { name: 'New England Revolution', code: 'NE', rating: 71 },
      { name: 'Real Salt Lake', code: 'RSL', rating: 73 },
      { name: 'San Jose Earthquakes', code: 'SJ', rating: 66 },
      { name: 'Sporting Kansas City', code: 'SKC', rating: 70 },
      { name: 'St. Louis City', code: 'STL', rating: 74 }
    ]
  }
};

export function getLeagueList() {
  return Object.values(soccerLeagues).map(league => ({
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
  return soccerLeagues[id] || null;
}

export function getTeamsForLeague(leagueId) {
  const league = soccerLeagues[leagueId];
  if (!league) return [];
  
  return league.teams.map(team => ({
    ...team,
    sport: 'soccer',
    league: leagueId,
    roster: [],
    wins: 0,
    losses: 0,
    draws: 0,
    budget: league.hasSalaryCap ? league.salaryCap : null,
    salaryUsed: 0
  }));
}