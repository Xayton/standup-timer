<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps<{ seconds: number }>()

const sec = ref(props.seconds);

let intervalId: number;
onMounted(() => {
  intervalId = window.setInterval(() => sec.value -= 1, 1000)
})

onUnmounted(() => window.clearInterval(intervalId))
</script>

<template>
  <h1>Timer: {{sec}} sec</h1>
  <button @click="sec = props.seconds">Reset</button>
</template>

<style scoped>
</style>
