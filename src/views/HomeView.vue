<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLeagueStore } from '@/stores/leagues'
import type { League, Season } from '@/types/leagues'
import FilterDropdown from '@/components/FilterDropdown.vue'
import SearchBar from '@/components/SearchBar.vue'
import LeagueCard from '@/components/LeagueCard.vue'
import SeasonBadgeModal from '@/components/SeasonBadgeModal.vue'

const { t } = useI18n()
const leagueStore = useLeagueStore()

const isModalOpen = ref(false)
const currentLeagueName = ref<string | null>(null)
const seasons = ref<Season[]>([])
const badgeLoading = ref(false)
const searchQuery = ref('')
const selectedSport = ref('all_leagues')

const filteredLeagues = computed(() => {
  if (!Array.isArray(leagueStore.leagues)) return []
  return leagueStore.leagues.filter((league) => {
    const matchesSearch =
      league.strLeague.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (league.strLeagueAlternate?.toLowerCase().includes(searchQuery.value.toLowerCase()) ?? false)
    const matchesSport =
      selectedSport.value === 'all_leagues' || league.strSport === selectedSport.value
    return matchesSearch && matchesSport
  })
})

async function showBadge(leagueId: string) {
  const league = leagueStore.leagues.find((l: League) => l.idLeague === leagueId)
  currentLeagueName.value = league?.strLeague || null
  isModalOpen.value = true
  badgeLoading.value = true
  seasons.value = await leagueStore.fetchBadges(leagueId)
  badgeLoading.value = false
}

onMounted(() => {
  leagueStore.fetchLeagues()
})

watch(selectedSport, (newSport) => {
  leagueStore.fetchLeagues(newSport)
})
</script>

<template>
  <div class="">
    <!-- Search Section -->
    <section class="mb-12 text-center md:text-left">
      <h2 class="text-4xl font-extrabold mb-4">{{ t('app.title') }}</h2>
      <div class="flex flex-col md:flex-row gap-4 max-w-2xl">
        <SearchBar v-model="searchQuery" />
        <FilterDropdown v-model="selectedSport" :sports="leagueStore.sports" />
      </div>
    </section>

    <!--Leagues cards -->
    <div
      v-if="leagueStore.leaguesFetching"
      class="flex flex-col items-center justify-center py-24 gap-4"
    >
      <div
        class="w-12 h-12 border-4 border-app-primary border-t-transparent rounded-full animate-spin"
      ></div>
      <p class="text-app-text-muted font-medium">{{ t('app.loading') }}</p>
    </div>

    <template v-else>
      <div v-if="filteredLeagues.length === 0" class="text-center py-24">
        <p class="text-xl text-app-text-muted">
          {{ t('app.noLeagues') }}
        </p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <LeagueCard
          v-for="league in filteredLeagues"
          :key="league.idLeague"
          :league="league"
          @click="showBadge"
        />
      </div>
    </template>

    <!-- Modal -->
    <SeasonBadgeModal
      :is-open="isModalOpen"
      :seasons="seasons"
      :league-name="currentLeagueName"
      :loading="badgeLoading"
      @close="isModalOpen = false"
    />
  </div>
</template>
