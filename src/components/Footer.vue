<script setup lang="ts">
import {secToTime} from "../composables/secToTime.ts";

defineProps<{ totalUsers: number; totalTime: number }>();
defineEmits(['randomize']);
</script>

<template>
  <div class="footer">
    <i>{{ totalUsers }} users ({{ secToTime(totalTime) }})</i>
    <img src="/dices.svg" class="icon" alt="Randomize order" @click="$emit('randomize')"/>
  </div>
</template>

<style scoped>
.footer {
  border: var(--color4) 1px solid;
  border-radius: 6px;
  margin: 25px 0;
  padding: 6px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  height: 20px;
  cursor: pointer;
  
  margin-left: 12px;
}

</style>
