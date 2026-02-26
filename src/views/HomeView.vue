<template>
  <div class="min-h-screen">
    <h2>Home View</h2>
    <div v-if="leagueStore.loading" class="flex flex-col items-center justify-center py-24 gap-4">
      <p class="text-app-text-muted font-medium">Loading...</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <LeagueCard v-for="val in 10" :key="val" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLeagueStore } from '@/stores/leagues'
import LeagueCard from '@/components/LeagueCard.vue'

const leagueStore = useLeagueStore()
</script>
