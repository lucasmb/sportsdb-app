<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
}

defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="relative w-full max-w-2xl bg-app-surface rounded-2xl shadow-2xl transition-all scale-in overflow-hidden border border-app-border"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-app-border">
          <h2 class="text-xl font-bold text-app-text">
            <slot name="title">{{ title }}</slot>
          </h2>
          <button
            class="p-2 text-app-text-muted hover:text-app-text transition-colors"
            @click="emit('close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
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

        <!-- Content -->
        <div class="p-6">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="p-6 border-t border-app-border bg-app-surface-muted/50">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale-up {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scale-up 0.3s ease-out forwards;
}
</style>
