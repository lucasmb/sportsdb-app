export interface League {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string
}

export interface Season {
  idSeason: string
  strSeason: string
  strBadge: string
}

export interface LeaguesResponse {
  countries?: League[]
  leagues?: League[]
}

export interface SeasonsResponse {
  seasons?: Season[]
}
