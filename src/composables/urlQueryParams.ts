export interface TimerItem {
    name: string;
    
    seconds: number;
    max: number;
}

export function getUrlQueryParameters() {
    const searchParams = new URLSearchParams(window.location.search);
    
    const timers: TimerItem[] = [];
    let standupName = "Stand-up timer";
    let totalTime = 0;
    

    for (const p of searchParams) {
        const paramName = p[0].trim();
        if (paramName.length > 0) {
            if (paramName === "name") {
                standupName = p[1];
                continue;
            }

            const seconds = parseInt(p[1]);
            if (isNaN(seconds)) continue;

            if (paramName === "total") {
                totalTime = seconds;
            } else {
                timers.push({name: paramName, seconds: 0, max: seconds});
            }
        }
    }

    return {standupName, totalTime, timers}
}
