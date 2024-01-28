import {onMounted, onUnmounted} from "vue";

export function useInterval(interval: number, callback: () => void, initStarted: boolean = true) {
    let intervalId: number | null = null;

    const start = function () {
        if (intervalId == null) {
            intervalId = setInterval(callback, interval);
        }
    }
    const stop = function () {
        if (intervalId != null) clearInterval(intervalId);
        intervalId = null;
    }

    if (initStarted) onMounted(start);
    onUnmounted(stop);

    return {start, stop};
}