<script setup lang="ts">
import TimerLine from "./components/TimerLine.vue";
import Footer from "./components/Footer.vue";
import {secToTime} from "./composables/secToTime.ts";
import {useInterval} from "./composables/useInterval.ts";
import {computed, Ref, ref} from "vue";
import {getUrlQueryParameters, TimerItem} from "./composables/urlQueryParams.ts";


// Get the configuration from the query parameters.
let {standupName, totalTime, random, timers: rawTimers} = getUrlQueryParameters();
const timers: Ref<TimerItem[]> = ref(rawTimers);
let activeTimerIndex = ref<number | null>(null);

// If requested with a query parameter, shuffle the contents of the timers list.
if (random) randomize();

// Save the previous tick of the interval. The browser might delay or skip events when saving power.
let prevTime: number = 0;

const {start, stop} = useInterval(1000, () => {
  // If there is a previous time, use it to compute the increment. Most of the time it will be the useInterval
  // frequency (so 1 second), but it might be more if the browser skips events to save power.
  // If previous time is zero, this is the first tick. Just add 1 second.
  const increment = prevTime === 0 ? 1 : Math.round((Date.now() - prevTime) / 1000);
  prevTime = Date.now();

  if (activeTimerIndex.value !== null) timers.value[activeTimerIndex.value].seconds += increment;
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
    prevTime = 0;
    start();
  }
}

const remaining = computed(() => Math.max(0, totalTime - timers.value.reduce((sum, t) => sum + t.seconds, 0)));
const totalTimerTime = computed(() => timers.value.reduce((sum, t) => sum + t.max, 0));

const totalUsed = computed(() => timers.value.reduce((sum, t) => sum + t.seconds, 0));
const totalExtra = computed(() => Math.max(0, totalUsed.value - timers.value.reduce((sum, t) => sum + t.max, 0)));

function randomize() {
  for (let i = timers.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = timers.value[i];
    timers.value[i] = timers.value[j];
    timers.value[j] = temp;
  }
}

function deleteLine(index: number) {
  if (activeTimerIndex.value !== null) {
    if (index < activeTimerIndex.value) {
      // If deleting a line before the current active line, update it.
      activeTimerIndex.value = activeTimerIndex.value - 1;
    } else if (index === activeTimerIndex.value) {
      // Deleting the currently active line.
      activeTimerIndex.value = null;
    }
  }
  timers.value.splice(index, 1);
}

const pipMode = ref(false);

async function openDocumentPip() {
  if (!('documentPictureInPicture' in window)) return;
  if (pipMode.value) return;

  const timer = document.querySelector("#pip");
  const lines = document.querySelector("#lines");
  if (!timer || !lines) return;

  const pipOptions = {
    height: lines.clientHeight + 115,
    width: 320
  }

  // @ts-ignore: this is because the documentPictureInPicture is experimental.
  const pipWindow = await window.documentPictureInPicture.requestWindow(pipOptions);

  pipMode.value = true;

  // Copy style sheets over from the initial document.
  [...document.styleSheets].forEach((styleSheet) => {
    const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
    const style = document.createElement('style');

    style.textContent = cssRules;
    pipWindow.document.head.appendChild(style);
  });

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(timer);

  // Move the player back when the Picture-in-Picture window closes.
  pipWindow.addEventListener("pagehide", () => {
    const pipContainer = document.querySelector("#pip-container");
    const timer = pipWindow.document.querySelector("#pip");

    pipContainer?.append(timer);
    pipMode.value = false;
  });
}

</script>

<template>
  <div class="header">
    <img src="/timer.svg" class="logo" alt="Timer"/>
    <div>
      <h1>{{ standupName }}</h1>
      <span><b>{{ secToTime(totalTime) }}</b>&nbsp
        <span v-if="totalExtra == 0">({{ secToTime(remaining) }} remaining)</span>
        <span v-else class="overtime">+{{ secToTime(totalExtra) }}</span>
      </span>
    </div>
  </div>

  <div id="lines">
    <TimerLine v-for="(t, index) in timers"
               :name="t.name" :seconds="t.seconds" :max="t.max" :active="index === activeTimerIndex"
               @toggle="toggle(index)" @delete="deleteLine(index)"/>
  </div>
  <Footer :total-users="timers.length" :total-time="totalTimerTime" @randomize="randomize"
          @pip="openDocumentPip"></Footer>

  <div id="pip-container">
    <div id="pip" v-show="pipMode">
      <TimerLine v-for="(t, index) in timers"
                 :name="t.name" :seconds="t.seconds" :max="t.max" :active="index === activeTimerIndex"
                 @toggle="toggle(index)" @delete="deleteLine(index)"/>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  margin-bottom: 1.5rem;
}

.header h1 {
  margin-top: 1rem;
  margin-bottom: 0.4rem;
}

.logo {
  height: 5em;
  padding: 0.6em;
}

#pip {
  margin: 0 auto;
  padding: 1rem 2rem;
  width: 100%;
}

.overtime {
  color: var(--color3);
}
</style>
