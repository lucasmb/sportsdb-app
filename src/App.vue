<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeLangSwitcher from './components/ThemeLangSwitcher.vue'
</script>

<template>
  <div class="bg-app-surface-muted text-app-text transition-colors duration-300">
    <!-- Header -->
    <header class="sticky w-full">
      <div class="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-black text-app-primary">
          SPORTSDB<span class="text-app-text ms-2">APP</span>
        </h1>

        <ThemeLangSwitcher />
      </div>
    </header>
  </div>
  <!-- Main content-->
  <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <RouterView />
  </main>
</template>

<style scoped></style>
