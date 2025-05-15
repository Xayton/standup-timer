<script setup lang="ts">
import {secToTime} from "../composables/secToTime.ts";

defineProps<{ totalUsers: number; totalTime: number }>();
defineEmits(['randomize', 'pip']);

function supportsPip(): boolean {
  return 'documentPictureInPicture' in window;
}
</script>

<template>
  <div class="footer">
    <i>{{ totalUsers }} {{ totalUsers === 1 ? 'person' : 'people' }} ({{ secToTime(totalTime) }})</i>
    <span class="pip" v-if="supportsPip" @click="$emit('pip')">PIP</span>
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
  transition: transform 0.1s ease;
}

/* Show some feedback (a slight animation) when the icon is pressed. */
.icon:active {
  transform: scale(0.85);
}

.pip {
  border: var(--color4) 1px solid;
  border-radius: 4px;

  cursor: pointer;

  line-height: 0.95rem;
  padding: 2px;
}

</style>
