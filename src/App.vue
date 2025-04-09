<script setup>
import NavBar from "./components/NavBar.vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark(); // Detects system dark mode
const toggleDark = useToggle(isDark); // Toggles dark mode
</script>
<template>
  <div class="bg-[#F9F9F9] dark:bg-[#202C36] min-h-screen text-[#111517] dark:text-white">
    <NavBar :toggleDark="toggleDark" :isDark="isDark" />
    <RouterView />
  </div>
</template>
