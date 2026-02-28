<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="w-full">
    <input
      v-model="model"
      type="text"
      :placeholder="t('app.search')"
      class="w-full px-4 py-2 rounded-lg border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-app-primary outline-none transition-all"
    />
  </div>
</template>
