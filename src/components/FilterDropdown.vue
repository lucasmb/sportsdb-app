<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  sports: string[]
}

const { t } = useI18n()

defineProps<Props>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="w-full md:w-48">
    <select
      v-model="model"
      class="w-full px-4 py-2 rounded-lg border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-app-primary outline-none transition-all cursor-pointer"
    >
      <option value="all_leagues">{{ t('app.filterBySport') }}</option>
      <!-- Ensure priority for requested sports -->
      <option v-for="sport in sports" :key="sport" :value="sport">
        {{ sport }}
      </option>
    </select>
  </div>
</template>
