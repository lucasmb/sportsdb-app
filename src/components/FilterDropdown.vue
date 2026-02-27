<script setup lang="ts">
interface Props {
  sports: string[]
}

defineProps<Props>()
const model = defineModel<string>()
</script>

<template>
  <div class="w-full md:w-48">
    <select
      v-model="model"
      class="w-full px-4 py-2 rounded-lg border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-app-primary outline-none transition-all cursor-pointer"
    >
      <option value="all_leagues">Filter by sports</option>
      <!-- Ensure priority for requested sports -->
      <option v-for="sport in sports" :key="sport" :value="sport">
        {{ sport }}
      </option>
    </select>
  </div>
</template>
