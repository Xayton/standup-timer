<script setup lang="ts">
import Timer from "./components/Timer.vue";
</script>

<template>
  <img src="/timer.svg" class="logo" alt="Timer"/>
  <Timer :seconds="50"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
