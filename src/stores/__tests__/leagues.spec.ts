import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { ref } from 'vue'

// Mock useFetch
const mockDoFetch = vi.fn()
vi.mock('@/composables/useFetch', () => ({
  useFetch: vi.fn(() => ({
    data: ref(null),
    loading: ref(false),
    error: ref(null),
    doFetch: mockDoFetch,
  })),
}))

// Import after mocking
import { useLeagueStore } from '@/stores/leagues'
import { useFetch } from '@/composables/useFetch'

describe('League Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock sessionStorage
    const storageMock = (() => {
      let store: Record<string, string> = {}
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString()
        },
        removeItem: (key: string) => {
          delete store[key]
        },
        clear: () => {
          store = {}
        },
        length: 0,
        key: (index: number) => null,
      }
    })()
    vi.stubGlobal('sessionStorage', storageMock)
    vi.clearAllMocks()
  })

  it('initializes with empty leagues', () => {
    const store = useLeagueStore()
    expect(store.leagues).toEqual([])
    expect(store.leaguesFetching).toBe(false)
  })

  it('fetches all leagues and updates state explicitly', async () => {
    const mockData = {
      countries: [
        {
          idLeague: '4328',
          strLeague: 'English Premier League',
          strSport: 'Soccer',
          strLeagueAlternate: '',
        },
      ],
    }

    // Setup mock return
    mockDoFetch.mockResolvedValue(mockData)

    const store = useLeagueStore()
    await store.fetchLeagues()

    expect(store.leagues).toHaveLength(1)
    expect(store.leagues[0]?.strLeague).toBe('English Premier League')
    expect(store.sports).toContain('Soccer')
    expect(mockDoFetch).toHaveBeenCalled()
    expect(sessionStorage.getItem('leagues_cache')).not.toBeNull()
  })

  it('caches sport results', async () => {
    const mockData = { countries: [] }
    mockDoFetch.mockResolvedValue(mockData)

    const store = useLeagueStore()

    await store.fetchLeagues('Soccer')
    await store.fetchLeagues('Soccer')

    // Second call should NOT call doFetch because of store cache
    expect(mockDoFetch).toHaveBeenCalledTimes(1)
  })

  it('handles fetch errors gracefully in explicit action', async () => {
    const errorMsg = 'Server Error: 500'
    mockDoFetch.mockRejectedValue(new Error(errorMsg))

    // We need to simulate the error ref update too if store depends on it
    const mockFetch = useFetch as Mock
    mockFetch.mockReturnValueOnce({
      data: ref(null),
      loading: ref(false),
      error: ref(errorMsg),
      doFetch: mockDoFetch,
    })

    const store = useLeagueStore()
    await store.fetchLeagues()

    expect(store.error).toBe(errorMsg)
  })
})
