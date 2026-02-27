<script setup lang="ts">
import type { League } from '@/stores/leagues'

interface Props {
  league: League
}
defineProps<Props>()
const emit = defineEmits<{
  click: [id: string]
}>()
</script>

<template>
  <div
    class="p-4 rounded-xl border border-app-border bg-app-surface hover:shadow-lg hover:border-app-primary transition-all cursor-pointer group flex gap-4"
    @click="emit('click', league.idLeague)"
  >
    <div class="flex flex-col gap-1 min-w-0">
      <span class="text-xs font-semibold uppercase tracking-wider text-app-primary">
        {{ league.strSport }}
      </span>
      <h3
        class="text-lg font-bold text-app-text group-hover:text-app-primary transition-colors truncate"
      >
        {{ league.strLeague }}
      </h3>
      <p v-if="league.strLeagueAlternate" class="text-sm text-app-text-muted italic truncate">
        {{ league.strLeagueAlternate }}
      </p>
    </div>
  </div>
</template>
