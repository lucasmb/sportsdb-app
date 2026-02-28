<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

const { t, locale } = useI18n()
const isDark = ref<boolean>(false)

const toggleTheme = (): void => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = (): void => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleLanguage = (): void => {
  locale.value = locale.value === 'en' ? 'es' : 'en'
  localStorage.setItem('locale', locale.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const savedLocale = localStorage.getItem('locale')

  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    updateTheme()
  }

  if (savedLocale) {
    locale.value = savedLocale
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Lang Switch -->
    <button
      class="px-3 py-1.5 rounded-lg bg-app-surface-muted text-app-text text-sm font-medium hover:bg-app-border transition-colors uppercase border border-app-border"
      @click="toggleLanguage"
    >
      {{ locale }}
    </button>

    <!-- Theme Switch -->
    <button
      class="p-2 rounded-lg bg-app-surface-muted text-app-text-muted hover:text-app-primary hover:bg-app-border transition-colors shadow-sm border border-app-border"
      :title="isDark ? t('app.theme.light') : t('app.theme.dark')"
      @click="toggleTheme"
    >
      <svg
        v-if="isDark"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.757 7.757l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transition-transform group-hover:rotate-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  </div>
</template>
