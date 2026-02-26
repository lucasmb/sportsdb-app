import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLeagueStore = defineStore('leagues', () => {
  const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/123/search_all_leagues.php'

  const leagues = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  return { leagues, loading, error }
})
