<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMoon as farMoon } from "@fortawesome/free-regular-svg-icons"; // Regular (outlined)
import { faMoon as fasMoon } from "@fortawesome/free-solid-svg-icons"; // Solid (filled)

// Receive `toggleThemeMode` from parent (App.vue)
defineProps<{
  toggleDark: () => void;
  isDark: boolean;
}>();
</script>

<template>
  <nav class="shadow-sm bg-white dark:bg-[#2B3845] transition-colors duration-300">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
      <h1 class="text-2xl">Where in the world?</h1>
      <div class="flex items-center">
        <font-awesome-icon class="text-xl pr-2" :icon="isDark ? fasMoon : farMoon" />
        <button @click="toggleDark()">Dark Mode</button>
      </div>
    </div>
  </nav>
</template>
