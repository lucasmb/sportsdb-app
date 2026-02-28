<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="w-full relative group">
    <input
      v-model="model"
      type="text"
      :placeholder="t('app.search')"
      class="w-full pl-4 pr-10 py-2 rounded-lg border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-app-primary outline-none transition-all duration-300"
    />
    <button
      v-if="model"
      @click="model = ''"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-muted hover:text-app-primary transition-colors duration-200 p-1 rounded-full hover:bg-app-border/10 outline-none"
      aria-label="Clear search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>
