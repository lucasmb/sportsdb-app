<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Season } from '@/types/leagues'
import BaseModal from './BaseModal.vue'

interface Props {
  isOpen: boolean
  seasons: Season[]
  leagueName: string | null
  loading: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()
const emit = defineEmits<{
  close: []
}>()

const selectedSeason = ref<Season | null>(null)

// When seasons update, default to the first one
watch(
  () => props.seasons,
  (newSeasons) => {
    if (newSeasons && newSeasons.length > 0) {
      selectedSeason.value = newSeasons[0] || null
    } else {
      selectedSeason.value = null
    }
  },
  { immediate: true },
)

function selectSeason(season: Season) {
  selectedSeason.value = season
}
</script>

<template>
  <BaseModal :is-open="isOpen" @close="emit('close')">
    <template #title>
      {{ leagueName }}
    </template>

    <div class="flex flex-col gap-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-64 gap-4">
        <div
          class="w-12 h-12 border-4 border-app-primary border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="text-app-text-muted">{{ t('app.loading') }}</p>
      </div>

      <!-- Content -->
      <template v-else>
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Main Badge Preview -->
          <div
            class="flex-1 flex flex-col items-center justify-center bg-app-surface rounded-2xl p-8 min-h-64 border border-app-border"
          >
            <template v-if="selectedSeason">
              <img
                :src="selectedSeason.strBadge"
                :alt="selectedSeason.strSeason"
                class="max-w-full max-h-64 object-contain drop-shadow-2xl animate-scale-up"
              />
              <p class="mt-4 font-bold text-app-text-muted">
                Season {{ selectedSeason.strSeason }}
              </p>
            </template>
            <div v-else class="flex flex-col items-center gap-4 text-center">
              <div
                class="w-32 h-32 flex items-center justify-center rounded-full bg-app-surface-muted text-app-text-muted/30 border-2 border-dashed border-app-border"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p class="text-app-text-muted font-medium italic">{{ t('app.noBadge') }}</p>
            </div>
          </div>

          <!-- Gallery Sidebar -->
          <div v-if="seasons?.length > 1" class="w-full md:w-48">
            <h3
              class="text-sm font-semibold uppercase tracking-wider text-app-text-muted mb-4 px-1"
            >
              {{ t('app.alternate') }} ({{ seasons?.length ?? 0 }})
            </h3>
            <div
              class="grid grid-cols-3 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar"
            >
              <button
                v-for="season in seasons"
                :key="season.idSeason"
                class="aspect-square p-2 bg-app-surface border rounded-lg transition-all hover:border-app-primary flex items-center justify-center overflow-hidden group"
                :class="
                  selectedSeason?.idSeason === season.idSeason
                    ? 'border-app-primary ring-2 ring-app-primary/20'
                    : 'border-app-border'
                "
                @click="selectSeason(season)"
              >
                <img
                  :src="season.strBadge"
                  :alt="season.strSeason"
                  class="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <button
          class="px-6 py-2 bg-app-primary hover:bg-app-secondary text-white rounded-lg font-semibold transition-colors shadow-lg shadow-app-primary/20"
          @click="emit('close')"
        >
          {{ t('app.close') }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
@reference "../assets/main.css";

@keyframes scale-up {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-up {
  animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-app-border rounded-full;
}
</style>
