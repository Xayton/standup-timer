<script setup lang="ts">
import TimerLine from "./components/TimerLine.vue";
import Footer from "./components/Footer.vue";
import {secToTime} from "./composables/secToTime.ts";
import {useInterval} from "./composables/useInterval.ts";
import {computed, Ref, ref} from "vue";
import {getUrlQueryParameters, TimerItem} from "./composables/urlQueryParams.ts";


// Get the configuration from the query parameters.
let {standupName, totalTime, timers: rawTimers} = getUrlQueryParameters();
const timers: Ref<TimerItem[]> = ref(rawTimers);
let activeTimerIndex = ref<number | null>(null);

const {start, stop} = useInterval(1000, () => {
  if (activeTimerIndex.value !== null) timers.value[activeTimerIndex.value].seconds += 1;
}, false);

function toggle(index: number) {
  if (activeTimerIndex.value !== null) {
    if (activeTimerIndex.value === index) {
      activeTimerIndex.value = null;
      stop();
    } else {
      activeTimerIndex.value = index;
    }
  } else {
    activeTimerIndex.value = index;
    start();
  }
}

const remaining = computed(() => Math.max(0, totalTime - timers.value.reduce((sum, t) => sum + t.seconds, 0)));
const totalTimerTime = computed(() => timers.value.reduce((sum, t) => sum + t.max, 0));

function randomize() {
  for (let i = timers.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = timers.value[i];
    timers.value[i] = timers.value[j];
    timers.value[j] = temp;
  }
}

function deleteLine(index: number) {
  timers.value.splice(index, 1);
}

</script>

<template>
  <div class="header">
    <img src="/timer.svg" class="logo" alt="Timer"/>
    <div>
      <h1>{{ standupName }}</h1>
      <span><b>{{ secToTime(totalTime) }}</b> ({{secToTime(remaining)}} remaining)</span>
    </div>
  </div>

  <TimerLine v-for="(t, index) in timers" 
             :name="t.name" :seconds="t.seconds" :max="t.max" :active="index === activeTimerIndex"
             @toggle="toggle(index)" @delete="deleteLine(index)" />
  
  <Footer :total-users="timers.length" :total-time="totalTimerTime" @randomize="randomize"></Footer>
</template>

<style scoped>
.header {
  display: flex;
  margin-bottom: 2rem;
}

.header h1 {
  margin-top: 1rem;
  margin-bottom: 0.4rem;
}

.logo {
  height: 5em;
  padding: 0.6em;
}
</style>
