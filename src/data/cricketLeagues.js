// REAL WORLD CRICKET LEAGUES AND TOURNAMENTS

export const cricketLeagues = {
  ipl: {
    id: 'ipl',
    name: 'IPL',
    fullName: 'Indian Premier League',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 1000000000, // 100 Crore INR (~$12M USD)
    format: 'T20',
    teams: [
      { name: 'Mumbai Indians', code: 'MI', rating: 85 },
      { name: 'Chennai Super Kings', code: 'CSK', rating: 86 },
      { name: 'Royal Challengers Bangalore', code: 'RCB', rating: 82 },
      { name: 'Kolkata Knight Riders', code: 'KKR', rating: 84 },
      { name: 'Delhi Capitals', code: 'DC', rating: 80 },
      { name: 'Rajasthan Royals', code: 'RR', rating: 81 },
      { name: 'Sunrisers Hyderabad', code: 'SRH', rating: 79 },
      { name: 'Punjab Kings', code: 'PBKS', rating: 77 },
      { name: 'Gujarat Titans', code: 'GT', rating: 83 },
      { name: 'Lucknow Super Giants', code: 'LSG', rating: 80 }
    ]
  },
  bbl: {
    id: 'bbl',
    name: 'BBL',
    fullName: 'Big Bash League',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 2000000,
    format: 'T20',
    teams: [
      { name: 'Perth Scorchers', code: 'PRS', rating: 82 },
      { name: 'Sydney Sixers', code: 'SYS', rating: 81 },
      { name: 'Melbourne Stars', code: 'MLS', rating: 78 },
      { name: 'Melbourne Renegades', code: 'MLR', rating: 75 },
      { name: 'Sydney Thunder', code: 'SYT', rating: 76 },
      { name: 'Brisbane Heat', code: 'BRH', rating: 77 },
      { name: 'Adelaide Strikers', code: 'ADS', rating: 79 },
      { name: 'Hobart Hurricanes', code: 'HOB', rating: 74 }
    ]
  },
  psl: {
    id: 'psl',
    name: 'PSL',
    fullName: 'Pakistan Super League',
    country: 'Pakistan',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 1500000,
    format: 'T20',
    teams: [
      { name: 'Lahore Qalandars', code: 'LQ', rating: 83 },
      { name: 'Multan Sultans', code: 'MS', rating: 84 },
      { name: 'Islamabad United', code: 'IU', rating: 82 },
      { name: 'Peshawar Zalmi', code: 'PZ', rating: 80 },
      { name: 'Karachi Kings', code: 'KK', rating: 78 },
      { name: 'Quetta Gladiators', code: 'QG', rating: 77 }
    ]
  },
  cpl: {
    id: 'cpl',
    name: 'CPL',
    fullName: 'Caribbean Premier League',
    country: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    format: 'T20',
    teams: [
      { name: 'Trinbago Knight Riders', code: 'TKR', rating: 83 },
      { name: 'Guyana Amazon Warriors', code: 'GAW', rating: 81 },
      { name: 'Jamaica Tallawahs', code: 'JT', rating: 79 },
      { name: 'Barbados Royals', code: 'BR', rating: 80 },
      { name: 'St Kitts & Nevis Patriots', code: 'SNP', rating: 76 },
      { name: 'Saint Lucia Kings', code: 'SLK', rating: 77 }
    ]
  },
  the_hundred: {
    id: 'the_hundred',
    name: 'The Hundred',
    fullName: 'The Hundred',
    country: 'England',
    image: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: true,
    salaryCap: 1000000,
    format: '100-ball',
    teams: [
      { name: 'Oval Invincibles', code: 'OVI', rating: 82 },
      { name: 'Trent Rockets', code: 'TRK', rating: 80 },
      { name: 'Southern Brave', code: 'SBR', rating: 81 },
      { name: 'Birmingham Phoenix', code: 'BPH', rating: 78 },
      { name: 'Manchester Originals', code: 'MNO', rating: 77 },
      { name: 'London Spirit', code: 'LSP', rating: 76 },
      { name: 'Northern Superchargers', code: 'NSC', rating: 79 },
      { name: 'Welsh Fire', code: 'WFI', rating: 75 }
    ]
  },
  sa20: {
    id: 'sa20',
    name: 'SA20',
    fullName: 'SA20 League',
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    format: 'T20',
    teams: [
      { name: 'Sunrisers Eastern Cape', code: 'SEC', rating: 82 },
      { name: 'Joburg Super Kings', code: 'JSK', rating: 80 },
      { name: 'MI Cape Town', code: 'MICT', rating: 81 },
      { name: 'Durban Super Giants', code: 'DSG', rating: 79 },
      { name: 'Pretoria Capitals', code: 'PC', rating: 78 },
      { name: 'Paarl Royals', code: 'PR', rating: 77 }
    ]
  },
  icc_world_cup: {
    id: 'icc_world_cup',
    name: 'World Cup',
    fullName: 'ICC Cricket World Cup',
    country: 'International',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    format: 'ODI',
    isInternational: true,
    teams: [
      { name: 'India', code: 'IND', rating: 92 },
      { name: 'Australia', code: 'AUS', rating: 90 },
      { name: 'England', code: 'ENG', rating: 87 },
      { name: 'New Zealand', code: 'NZ', rating: 85 },
      { name: 'South Africa', code: 'SA', rating: 86 },
      { name: 'Pakistan', code: 'PAK', rating: 84 },
      { name: 'West Indies', code: 'WI', rating: 78 },
      { name: 'Sri Lanka', code: 'SL', rating: 79 },
      { name: 'Bangladesh', code: 'BAN', rating: 76 },
      { name: 'Afghanistan', code: 'AFG', rating: 75 }
    ]
  },
  t20_world_cup: {
    id: 't20_world_cup',
    name: 'T20 World Cup',
    fullName: 'ICC T20 World Cup',
    country: 'International',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    format: 'T20',
    isInternational: true,
    teams: [
      { name: 'India', code: 'IND', rating: 93 },
      { name: 'England', code: 'ENG', rating: 89 },
      { name: 'Australia', code: 'AUS', rating: 88 },
      { name: 'West Indies', code: 'WI', rating: 84 },
      { name: 'Pakistan', code: 'PAK', rating: 86 },
      { name: 'South Africa', code: 'SA', rating: 85 },
      { name: 'New Zealand', code: 'NZ', rating: 83 },
      { name: 'Sri Lanka', code: 'SL', rating: 80 },
      { name: 'Afghanistan', code: 'AFG', rating: 81 },
      { name: 'Bangladesh', code: 'BAN', rating: 77 }
    ]
  },
  champions_trophy: {
    id: 'champions_trophy',
    name: 'Champions Trophy',
    fullName: 'ICC Champions Trophy',
    country: 'International',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    format: 'ODI',
    isInternational: true,
    teams: [
      { name: 'India', code: 'IND', rating: 91 },
      { name: 'Australia', code: 'AUS', rating: 89 },
      { name: 'England', code: 'ENG', rating: 88 },
      { name: 'Pakistan', code: 'PAK', rating: 85 },
      { name: 'New Zealand', code: 'NZ', rating: 84 },
      { name: 'South Africa', code: 'SA', rating: 86 },
      { name: 'Bangladesh', code: 'BAN', rating: 78 },
      { name: 'Afghanistan', code: 'AFG', rating: 76 }
    ]
  },
  wtc: {
    id: 'wtc',
    name: 'WTC',
    fullName: 'World Test Championship',
    country: 'International',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    hasSalaryCap: false,
    salaryCap: null,
    format: 'Test',
    isInternational: true,
    teams: [
      { name: 'Australia', code: 'AUS', rating: 93 },
      { name: 'India', code: 'IND', rating: 92 },
      { name: 'England', code: 'ENG', rating: 85 },
      { name: 'South Africa', code: 'SA', rating: 84 },
      { name: 'New Zealand', code: 'NZ', rating: 86 },
      { name: 'Pakistan', code: 'PAK', rating: 80 },
      { name: 'Sri Lanka', code: 'SL', rating: 78 },
      { name: 'West Indies', code: 'WI', rating: 75 },
      { name: 'Bangladesh', code: 'BAN', rating: 72 }
    ]
  }
};

export function getLeagueList() {
  return Object.values(cricketLeagues).map(league => ({
    id: league.id,
    name: league.name,
    fullName: league.fullName,
    country: league.country,
    image: league.image,
    teamCount: league.teams.length,
    hasSalaryCap: league.hasSalaryCap,
    format: league.format,
    isInternational: league.isInternational || false
  }));
}

export function getLeagueById(id) {
  return cricketLeagues[id] || null;
}

export function getTeamsForLeague(leagueId) {
  const league = cricketLeagues[leagueId];
  if (!league) return [];
  
  return league.teams.map(team => ({
    ...team,
    sport: 'cricket',
    league: leagueId,
    format: league.format,
    isNationalTeam: league.isInternational || false,
    roster: [],
    wins: 0,
    losses: 0,
    draws: 0,
    budget: league.hasSalaryCap ? league.salaryCap : null,
    salaryUsed: 0
  }));
}