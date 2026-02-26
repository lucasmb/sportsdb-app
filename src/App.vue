<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="w-full">
      <div class="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl">SPORTSDB<span class="text-app-text">APP</span></h1>
      </div>
    </header>
  </div>
  <!-- Main content-->
  <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <RouterView />
  </main>
</template>

<style scoped></style>
