import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/composables/useFetch'
import { useSessionStorage } from '@/composables/useSessionStorage'
import type { League, Season, LeaguesResponse, SeasonsResponse } from '@/types/leagues'

const BASE_API_URL = 'https://www.thesportsdb.com/api/v1/json/123'
const SEARCH_LEAGUES_URL = `${BASE_API_URL}/search_all_leagues.php`
const ALL_LEAGUES_URL = `${BASE_API_URL}/all_leagues.php`

export const useLeagueStore = defineStore('leagues', () => {
  const { getItem, setItem, removeItem } = useSessionStorage()

  const {
    loading: leaguesFetching,
    error: leaguesError,
    doFetch: doLeaguesFetch,
  } = useFetch<LeaguesResponse>()

  const {
    loading: badgeLoading,
    error: badgeError,
    doFetch: doBadgeFetch,
  } = useFetch<SeasonsResponse>()

  // Cache for badges: leagueId -> Season[]
  const badgeCache = ref<Map<string, Season[]>>(new Map())

  // Cache for sports: sportName -> League[]
  const leaguesCache = ref<Map<string, League[]>>(
    new Map(Object.entries(getItem('leagues_cache', {}))),
  )

  const activeSport = ref('all_leagues')
  const error = ref<string | null>(null)

  // --- Persistence Helpers ---
  const saveLeaguesCache = () => {
    setItem('leagues_cache', Object.fromEntries(leaguesCache.value))
  }

  const saveBadges = () => {
    setItem('badges_cache', Object.fromEntries(badgeCache.value))
  }

  // --- Getters ---
  const leagues = computed(() => leaguesCache.value.get(activeSport.value) || [])

  const sports = computed(() => {
    const BASE_SPORTS = ['Baseball', 'Basketball', 'Motorsport', 'Rugby', 'Soccer']
    //In case we have full api without limits
    const currentSports = leagues.value?.map((l) => l.strSport) || []
    return [...new Set([...BASE_SPORTS, ...currentSports])]
  })

  // --- Getters end ---

  // --- Functions ---
  async function fetchLeagues(sport?: string) {
    const isAll = !sport || sport === 'all_leagues'
    const cacheKey = isAll ? 'all_leagues' : sport
    activeSport.value = cacheKey

    if (leaguesCache.value.has(cacheKey)) {
      return
    }

    error.value = null
    const url = isAll ? ALL_LEAGUES_URL : `${SEARCH_LEAGUES_URL}?s=${encodeURIComponent(sport)}`

    try {
      const data = await doLeaguesFetch(url)

      const newLeagues = data?.countries || data?.leagues || []
      const finalLeagues = Array.isArray(newLeagues) ? newLeagues : []

      leaguesCache.value.set(cacheKey, finalLeagues)

      saveLeaguesCache()
    } catch (e: unknown) {
      error.value = leaguesError.value
    }
  }

  async function fetchBadges(leagueId: string): Promise<Season[]> {
    if (badgeCache.value.has(leagueId)) {
      return badgeCache.value.get(leagueId)!
    }

    try {
      const data = await doBadgeFetch(
        `${BASE_API_URL}/search_all_seasons.php?badge=1&id=${leagueId}`,
      )

      const seasons = (data?.seasons || []) as Season[]
      const filteredSeasons = seasons.filter((s) => s.strBadge)

      if (filteredSeasons.length > 0) {
        badgeCache.value.set(leagueId, filteredSeasons)
        saveBadges()
      }
      return filteredSeasons
    } catch (e) {
      console.error(`Failed to fetch badges for league ${leagueId}`, e)
      return []
    }
  }

  return {
    leagues,
    leaguesFetching,
    badgeLoading,
    error,
    sports,
    fetchLeagues,
    fetchBadges,
  }
})
