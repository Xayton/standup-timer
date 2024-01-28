<script setup lang="ts">
import {computed} from "vue";
import {secToTime} from "../composables/secToTime.ts";

defineEmits(['toggle', 'delete']);

const props = defineProps<{ name: string; seconds: number; max: number; active: boolean }>()
const percentage = computed(() => Math.min(Math.floor(props.seconds / props.max * 100), 100) + "%");
const overtime = computed(() => props.seconds > props.max);

</script>

<template>
  <div class="line" :class="{active: active}" @click="$emit('toggle')">
    <div class="line-background"></div>
    <b>{{ name }}</b>
    <span><span class="overtime" v-if="overtime">+{{secToTime(seconds - max)}}</span>{{ secToTime(max) }}</span>

    <span class="remove-line" @click.stop="$emit('delete')">&#x2715;</span>
  </div>
</template>

<style scoped>
.line {
  border: var(--color4) 1px solid;
  border-radius: 6px;
  margin: 10px 0;
  padding: 6px;

  cursor: pointer;

  display: flex;
  justify-content: space-between;

  position: relative;
  /* overflow: hidden; */
}

.remove-line {
  display: none;
  color: var(--color3);
  
  position: absolute;
  left: -30px;
  width: 30px;
  top: 6px;
  padding-left: 10px;
}

/* Show the "remove-line" when the line is hovered. */
.line:hover > .remove-line {
  display: block;
}

/* Continue showing the "remove-line" when the mouse hover moves onto it. */
.remove-line:hover {
  display: block;
}

.overtime {
  color: var(--color3);
  margin-right: 1rem;
}

.active {
  box-shadow: 0 0 0 3px rgba(227, 227, 227, .4);
}

.line-background {
  background-color: var(--color2);
  width: v-bind(percentage);

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  z-index: -1;
}
</style>
