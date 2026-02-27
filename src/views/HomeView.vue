<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useLeagueStore } from '@/stores/leagues'
import FilterDropdown from '@/components/FilterDropdown.vue'
import SearchBar from '@/components/SearchBar.vue'
import LeagueCard from '@/components/LeagueCard.vue'

const leagueStore = useLeagueStore()

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
  console.log(leagueId)
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
      <h2 class="text-4xl font-extrabold mb-4">Leagues</h2>
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
      <p class="text-app-text-muted font-medium">Loading...</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <LeagueCard
        v-for="league in filteredLeagues"
        :key="league.idLeague"
        :league="league"
        @click="showBadge"
      />
    </div>
  </div>
</template>
