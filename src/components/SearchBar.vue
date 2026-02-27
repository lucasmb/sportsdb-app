<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <input
      v-model="model"
      type="text"
      placeholder="Search a sport"
      class="w-full px-4 py-2 rounded-lg border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-app-primary outline-none transition-all"
    />
  </div>
</template>
